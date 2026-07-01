"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Paperclip, Send, MoreHorizontal, ArrowRight } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

function LiveChatContent({ heightClass = "h-[calc(100vh-120px)]" }) {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const { isEnglish } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const targetUserParam = searchParams.get('user');

  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [echoInstance, setEchoInstance] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);
  const [userStatuses, setUserStatuses] = useState({});

  const isUserOnline = (otherUser) => {
    const checkValue = (val) => val === true || val === 'true' || val === 1 || val === '1' || val === 'online';
    const uuid = otherUser?.uuid || otherUser?.id;
    if (uuid && userStatuses[uuid] !== undefined) {
      return checkValue(userStatuses[uuid]);
    }
    return checkValue(otherUser?.is_online ?? otherUser?.online ?? otherUser?.status ?? false);
  };

  // Helper to get the other user's info from the chat object
  const getOtherUser = (chat) => {
    if (!chat || !user) return { name: 'Unknown', uuid: '', id: '', avatar_url: '' };
    const myId = user.uuid || user.id;
    if (!myId) return { name: 'Unknown', uuid: '', id: '', avatar_url: '' };
    
    if (chat.user1 && (chat.user1.uuid === myId || chat.user1.id === myId)) {
      return chat.user2 || { name: 'Unknown', uuid: '', id: '', avatar_url: '' };
    }
    if (chat.user2 && (chat.user2.uuid === myId || chat.user2.id === myId)) {
      return chat.user1 || { name: 'Unknown', uuid: '', id: '', avatar_url: '' };
    }
    
    return chat.user1 || chat.user2 || { name: 'Unknown', uuid: '', id: '', avatar_url: '' };
  };

  // Format time helper
  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString(isEnglish ? 'en-US' : 'ar-EG', {
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Initialize Echo
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    window.Pusher = Pusher;

    // Use backend.prosental.com as configured
    const echo = new Echo({
      broadcaster: 'reverb',
      key: '8f4c1d2a9b7e6c5d3a1f0e9d8c7b6a5',
      wsHost: 'backend.prosental.com',
      wsPort: 443,
      wssPort: 443,
      forceTLS: true,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: 'https://backend.prosental.com/api/broadcasting/auth',
      auth: {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json'
        }
      }
    });

    echo.connector.pusher.connection.bind('state_change', (states) => {
      console.log('Echo connection state:', states.current);
      setConnectionStatus(states.current);
      // When a fresh connection is established (e.g. after login),
      // clear all offline locks so real is_online:true events are accepted
      if (states.current === 'connected') {
        offlineLockRef.current = {};
        lastOnlineRef.current  = {};
        console.log('[Chat] Connection established — all status locks cleared');
      }
    });

    setEchoInstance(echo);

    return () => {
      echo.disconnect();
    };
  }, []);

  // Fetch initial conversations
  useEffect(() => {
    loadConversations();
  }, []);

  // Mark current user as ONLINE on mount and keep alive with heartbeat.
  // Call OFFLINE on unmount so status is accurate when leaving the chat page.
  useEffect(() => {
    const setOnline = async () => {
      try {
        const res = await api.post('/auth/chat/online');
        console.log('[Chat] Marked self as online');

        // The API returns an array of online users:
        // [{ user_uuid, name, is_online }, ...]
        // Seed userStatuses from this authoritative list.
        const onlineUsers = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
        if (onlineUsers.length > 0) {
          setUserStatuses(prev => {
            const updated = { ...prev };
            // First mark ALL known users as offline (reset)
            Object.keys(updated).forEach(k => { updated[k] = false; });
            // Then mark the ones returned as online
            onlineUsers.forEach(u => {
              const uuid = u.user_uuid || u.uuid || u.id;
              if (uuid) {
                const checkValue = (val) => val === true || val === 'true' || val === 1 || val === '1' || val === 'online';
                updated[uuid] = checkValue(u.is_online ?? u.online ?? u.status);
              }
            });
            return updated;
          });
          console.log('[Chat] Seeded online statuses from API:', onlineUsers.length, 'users');
        }
      } catch (e) {
        console.error('[Chat] Failed to set online status', e);
      }
    };

    setOnline();
    // Heartbeat every 30 seconds to keep online status fresh
    const heartbeat = setInterval(setOnline, 30000);

    return () => {
      clearInterval(heartbeat);
      // Mark offline when leaving the chat
      const token = localStorage.getItem('access_token');
      if (token) {
        fetch('https://backend.prosental.com/api/auth/chat/offline', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token },
          keepalive: true
        }).catch(() => {});
      }
    };
  }, []);


  // Re-fetch conversations whenever WebSocket connects to get fresh is_online values.
  // This fixes the race condition where a user's online event fires before our
  // subscription is ready, causing stale offline status until a reload.
  useEffect(() => {
    if (connectionStatus === 'connected') {
      console.log('[Chat] WebSocket connected — refreshing conversation statuses');
      loadConversations();
    }
  }, [connectionStatus]);

  // Extract unique partner UUIDs as a string so we don't re-subscribe on every conversation array update
  const partnerUuidsString = [...new Set(conversations.map(c => {
    const other = getOtherUser(c);
    return other.uuid || other.id;
  }).filter(Boolean))].sort().join(',');

  // offlineLockRef: tracks when a user genuinely went offline
  //   → blocks the backend's spurious is_online:true side-effect during logout
  // lastOnlineRef: tracks when we last received is_online:true per user
  //   → if is_online:false arrives within 2s of is_online:true it's an out-of-order
  //     stale delivery from a PREVIOUS session and should be ignored
  const offlineLockRef = useRef({});
  const lastOnlineRef  = useRef({});

  // Handle user online status subscription
  useEffect(() => {
    if (!echoInstance) return;

    const OFFLINE_LOCK_MS    = 5000; // block spurious is_online:true for 5s after genuine logout
    const OUT_OF_ORDER_MS    = 2000; // ignore is_online:false that arrives within 2s of is_online:true
                                     // (stale out-of-order delivery from a previous session)

    const handleStatusChange = (e) => {
      const user_uuid = e.user_uuid || e.uuid || e.user?.uuid || e.user?.id || e.id;
      const is_online = e.is_online !== undefined ? e.is_online : e.status;
      const now = Date.now();

      if (!user_uuid) return;

      if (is_online === false || is_online === 0 || is_online === '0' || is_online === 'offline') {
        // Check if we just saw this user come online very recently.
        // If yes, this offline event is arriving OUT OF ORDER from a previous session — ignore it.
        const lastOnlineAt = lastOnlineRef.current[user_uuid];
        if (lastOnlineAt && (now - lastOnlineAt) < OUT_OF_ORDER_MS) {
          console.log('[Chat] Ignoring out-of-order is_online:false for', user_uuid, '(arrived after recent online)');
          return;
        }
        // Genuine offline — set lock and update status
        offlineLockRef.current[user_uuid] = now;
        console.log('[Chat] User went offline:', user_uuid);
        setUserStatuses(prev => ({ ...prev, [user_uuid]: false }));
      } else {
        // Check if we're within the offline lock window (spurious re-online after logout)
        const lockedAt = offlineLockRef.current[user_uuid];
        if (lockedAt && (now - lockedAt) < OFFLINE_LOCK_MS) {
          console.log('[Chat] Ignoring stale is_online:true for', user_uuid, '(offline lock active)');
          return;
        }
        // Genuine online — record timestamp and update status
        lastOnlineRef.current[user_uuid] = now;
        console.log('[Chat] User is online:', user_uuid);
        setUserStatuses(prev => {
          if (prev[user_uuid] === true) return prev;
          return { ...prev, [user_uuid]: true };
        });
      }
    };

    const subscribedChannels = [];

    const subscribeTo = (channelName, isPrivate) => {
      try {
        const channel = isPrivate
          ? echoInstance.private(channelName)
          : echoInstance.channel(channelName);

        channel.listen('.UserStatusChanged', handleStatusChange)
               .listen('UserStatusChanged', handleStatusChange);

        if (isPrivate) {
          channel.error((err) => {
            console.log(`[Chat] Private status channel ${channelName} auth failed or not allowed:`, err);
          });
        }

        subscribedChannels.push(channelName);
      } catch (err) {
        console.error(`Error subscribing to channel ${channelName}:`, err);
      }
    };

    // Subscribe to current user's own status channels (public & private)
    if (user?.uuid) {
      subscribeTo(`user-status.${user.uuid}`, false);
      subscribeTo(`user-status.${user.uuid}`, true);
    }

    // Subscribe to partners' status channels (public & private)
    if (partnerUuidsString) {
      const uniqueUuids = partnerUuidsString.split(',');
      uniqueUuids.forEach(uuid => {
        subscribeTo(`user-status.${uuid}`, false);
        subscribeTo(`user-status.${uuid}`, true);
      });
    }

    return () => {
      subscribedChannels.forEach(name => {
        try {
          echoInstance.leave(name);
        } catch (err) {
          console.error(`Error leaving channel ${name}:`, err);
        }
      });
    };
  }, [partnerUuidsString, echoInstance, user?.uuid]);

  // Handle beforeunload to send offline status
  useEffect(() => {
    const handleBeforeUnload = () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        fetch('https://backend.prosental.com/api/auth/chat/offline', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          keepalive: true
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle target user param (opening chat from another page)
  useEffect(() => {
    if (targetUserParam && user) {
      openChatWithUser(targetUserParam);
    }
  }, [targetUserParam, user]);

  const loadConversations = async () => {
    try {
      const res = await api.get('/auth/chat/conversations');
      const fetchedConversations = res.data;
      setConversations(fetchedConversations);

      // Seed userStatuses from the API's is_online values.
      // This ensures correct status is shown immediately on load AND on reconnect
      // (before or instead of real-time events, which may have been missed).
      setUserStatuses(prev => {
        const updated = { ...prev };
        fetchedConversations.forEach(chat => {
          [chat.user1, chat.user2].forEach(u => {
            const uuid = u?.uuid || u?.id;
            if (uuid) {
              const uOnline = u?.is_online ?? u?.online ?? u?.status;
              const apiOnline = uOnline === true || uOnline === 1 || uOnline === '1' || uOnline === 'true' || uOnline === 'online';
              // Always seed from API — real-time events will override this if they arrive
              updated[uuid] = apiOnline;
            }
          });
        });
        return updated;
      });

      // Fetch the last message for each conversation individually to populate the sidebar
      fetchedConversations.forEach(async (chat) => {
        try {
          const msgRes = await api.get(`/auth/chat/${chat.uuid}/last-message`);
          if (msgRes.data && msgRes.data.message) {
            updateConversationLastMessage(chat.uuid, msgRes.data.message);
          }
        } catch (err) {
          // 404 means no messages yet, which is completely fine
        }
      });
    } catch (e) {
      console.error('Failed to load conversations', e);
    }
  };

  const openChatWithUser = async (targetUuid) => {
    if (!targetUuid || targetUuid === 'undefined' || targetUuid === 'null') return;
    try {
      // 1. Create or get the conversation
      const res = await api.post(`/auth/chat/conversations`, { user_uuid: targetUuid });
      const newChatResponse = res.data;
      
      // 2. Fetch the full list of conversations to ensure we have the eager-loaded user relations
      const listRes = await api.get('/auth/chat/conversations');
      const fetchedConversations = listRes.data;
      setConversations(fetchedConversations);

      // 3. Find the complete chat object with user data
      const fullChat = fetchedConversations.find(c => c.uuid === newChatResponse.uuid) || newChatResponse;
      
      selectChat(fullChat);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        console.error('Target user not found:', e.response.data.message);
        alert(isEnglish ? 'User not found or unavailable for chat' : 'المستخدم غير موجود أو غير متاح للمحادثة');
      } else {
        console.error('Failed to open chat', e);
      }
    }
  };

  const updateConversationLastMessage = (chatUuid, msgText) => {
    setConversations(prev => prev.map(c => {
      if (c.uuid === chatUuid) {
        return { ...c, frontend_last_message: msgText };
      }
      return c;
    }));
  };

  const selectChat = async (chat) => {
    setActiveChat(chat);
    setMessages([]);
    setIsMobileChatOpen(true);
    setLoadingMessages(true);
    try {
      const res = await api.get(`/auth/chat/${chat.uuid}/messages`);
      setMessages(res.data);
      if (res.data && res.data.length > 0) {
        updateConversationLastMessage(chat.uuid, res.data[res.data.length - 1].message);
      }
      scrollToBottom();
    } catch (e) {
      console.error('Failed to load messages', e);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (!echoInstance || !activeChat?.uuid) return;
    
    const channelName = `chat.${activeChat.uuid}`;
    
    const channel = echoInstance.private(channelName);
    channel.listen('MessageSent', (e) => {
      setMessages(prev => {
        if (!prev.find(m => m.uuid === e.message.uuid)) {
          return [...prev, e.message];
        }
        return prev;
      });
      updateConversationLastMessage(activeChat.uuid, e.message.message);
      scrollToBottom();
    }).error((error) => {
      console.error('Subscription error:', error);
    });

    return () => {
      echoInstance.leave(channelName);
    };
  }, [activeChat?.uuid, echoInstance]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const text = newMessage;
    setNewMessage('');

    try {
      const res = await api.post(`/auth/chat/${activeChat.uuid}/messages`, { message: text });
      
      setMessages(prev => {
        if (!prev.find(m => m.uuid === res.data.uuid)) {
          return [...prev, res.data];
        }
        return prev;
      });
      updateConversationLastMessage(activeChat.uuid, res.data.message);
      scrollToBottom();
    } catch (error) {
      console.error('Failed to send message', error);
      // Optional: Add visual feedback for failure
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };



  return (
    <div className={`flex ${heightClass} bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 ${isEnglish ? 'flex-row' : 'flex-row'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
      
      {/* Conversations Sidebar */}
      <div className={`${isMobileChatOpen ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 md:min-w-[300px] border-${isEnglish ? 'r' : 'l'} border-gray-100 flex-col bg-white h-full`}>
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">{isEnglish ? 'Conversations' : 'المحادثات'}</h2>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">{conversations.length}</span>
            </div>
            {/* Connection indicator */}
            <div className="flex items-center gap-1.5" title={connectionStatus}>
              <span className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></span>
              <span className="text-[10px] text-gray-400 font-bold">{connectionStatus === 'connected' ? (isEnglish ? 'Live' : 'متصل') : (isEnglish ? 'Connecting...' : 'جاري الاتصال...')}</span>
            </div>
          </div>
          
          <div className="relative">
            <Search className={`absolute ${isEnglish ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5`} />
            <input 
              type="text" 
              placeholder={isEnglish ? 'Search messages...' : 'بحث في الرسائل...'} 
              className={`w-full bg-gray-50 border-none rounded-xl py-3 ${isEnglish ? 'pl-10 pr-4' : 'pr-10 pl-4'} text-sm focus:ring-2 focus:ring-[#EB682C] outline-none transition-shadow`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {conversations.length === 0 ? (
             <div className="text-center text-gray-400 text-sm py-10">
               {isEnglish ? 'No conversations yet' : 'لا توجد محادثات بعد'}
             </div>
          ) : conversations.map((chat) => {
            const otherUser = getOtherUser(chat);
            const isActive = activeChat?.uuid === chat.uuid;
            return (
              <div 
                key={chat.uuid} 
                onClick={() => selectChat(chat)}
                className={`flex items-start gap-4 p-3 rounded-2xl mb-1 cursor-pointer transition-colors ${isActive ? 'bg-[#EB682C]/5 border border-[#EB682C]/10' : 'hover:bg-gray-50 border border-transparent'}`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-[#EB682C] font-bold text-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                    {otherUser.avatar_url ? (
                      <img src={otherUser.avatar_url} alt={otherUser.name} className="w-full h-full object-cover" />
                    ) : (
                      otherUser.name?.charAt(0) || 'U'
                    )}
                  </div>
                  {/* Online status */}
                  {isUserOnline(otherUser) && (
                    <div className={`absolute bottom-0 ${isEnglish ? 'right-0' : 'left-0'} w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white`}></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`font-semibold truncate ${isActive ? 'text-[#EB682C]' : 'text-gray-900'}`}>{otherUser.name}</h3>
                    {/* Optionally display last message time if you have it in chat object */}
                  </div>
                  <p className="text-xs text-gray-400 truncate font-medium">
                    {chat.frontend_last_message || chat.last_message?.message || (typeof chat.last_message === 'string' ? chat.last_message : (chat.latest_message?.message || chat.latest_message || (isEnglish ? 'New conversation' : 'محادثة جديدة')))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${isMobileChatOpen ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#F9FAFB]/50 h-full relative`}>
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <p className="font-medium text-lg text-gray-500">{isEnglish ? 'Select a conversation to start' : 'اختر محادثة للبدء'}</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="px-4 md:px-8 py-3 md:py-4 border-b border-gray-100 bg-white flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center gap-4">
                <button 
                  className={`md:hidden text-gray-500 hover:text-gray-700 bg-gray-50 p-2 rounded-xl ${isEnglish ? 'mr-2' : 'ml-2'}`}
                  onClick={() => setIsMobileChatOpen(false)}
                >
                  <ArrowRight className={`w-5 h-5 ${isEnglish ? 'rotate-180' : ''}`} />
                </button>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-[#EB682C] font-bold text-xl overflow-hidden flex items-center justify-center">
                    {getOtherUser(activeChat).avatar_url ? (
                      <img src={getOtherUser(activeChat).avatar_url} alt={getOtherUser(activeChat).name} className="w-full h-full object-cover" />
                    ) : (
                      getOtherUser(activeChat).name?.charAt(0) || 'U'
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{getOtherUser(activeChat).name}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isUserOnline(getOtherUser(activeChat)) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span className="text-xs text-gray-500 font-medium">
                      {isUserOnline(getOtherUser(activeChat)) ? (isEnglish ? 'Online' : 'متصل') : (isEnglish ? 'Offline' : 'غير متصل')}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-[#EB682C] bg-gray-50 p-2 rounded-xl transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EB682C]"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  {isEnglish ? 'No messages yet. Say hi!' : 'لا توجد رسائل حتى الآن. قل مرحباً!'}
                </div>
              ) : messages.map((msg) => {
                const isMe = msg.sender.uuid === user?.uuid;
                return (
                  <div key={msg.uuid} className={`flex items-end gap-3 ${isMe ? (isEnglish ? 'flex-row-reverse' : 'flex-row-reverse') : ''}`}>
                    
                    {/* Avatar for 'them' */}
                    {!isMe && (
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-[#EB682C] font-bold text-xs overflow-hidden flex items-center justify-center flex-shrink-0 mb-1">
                        {msg.sender.avatar_url ? (
                          <img src={msg.sender.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          msg.sender.name?.charAt(0) || 'U'
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-col">
                      <div 
                        className={`max-w-md rounded-2xl px-5 py-3 shadow-sm ${
                          isMe 
                            ? `bg-[#EB682C] text-white ${isEnglish ? 'rounded-br-sm' : 'rounded-bl-sm'}` 
                            : `bg-white text-gray-800 border border-gray-100 ${isEnglish ? 'rounded-bl-sm' : 'rounded-br-sm'}`
                        }`}
                      >
                        <p className="text-sm font-medium leading-relaxed">{msg.message}</p>
                      </div>
                      <span className={`text-[10px] text-gray-400 mt-1 ${isMe ? (isEnglish ? 'text-right' : 'text-left') : (isEnglish ? 'text-left' : 'text-right')}`}>
                        {formatTime(msg.created_at)}
                      </span>
                    </div>

                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 md:p-6 bg-white border-t border-gray-100">
              <form onSubmit={sendMessage} className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-2 px-4 focus-within:ring-2 focus-within:ring-[#EB682C]/30 focus-within:border-[#EB682C] transition-all shadow-inner`}>
                <button type="submit" disabled={!newMessage.trim()} className="text-white bg-[#EB682C] p-2.5 hover:bg-[#d65a22] rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm">
                  <Send className={`w-4 h-4 ${isEnglish ? '' : 'transform rotate-180'}`} />
                </button>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={isEnglish ? 'Type a message...' : 'اكتب رسالتك هنا...'} 
                  className={`flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400 ${isEnglish ? 'text-left' : 'text-right'}`}
                />
                <button type="button" className="text-gray-400 p-2 hover:bg-gray-200 rounded-xl transition-colors shrink-0">
                  <Paperclip className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function LiveChat({ heightClass }) {
  return (
    <Suspense fallback={
      <div className={`flex ${heightClass || 'h-[calc(100vh-120px)]'} items-center justify-center bg-white rounded-2xl`}>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#EB682C]"></div>
      </div>
    }>
      <LiveChatContent heightClass={heightClass} />
    </Suspense>
  );
}
