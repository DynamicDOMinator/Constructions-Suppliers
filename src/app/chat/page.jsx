"use client";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { Search, Paperclip, Send, MoreHorizontal, ArrowRight } from 'lucide-react';

const conversations = [
  { id: 1, name: 'م/ أحمد علي', message: 'نعم، يمكننا البدء بالتصميم الأسبوع القادم', time: 'الآن', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', active: true },
  { id: 2, name: 'م/ محمد خالد', message: 'تكلفة الإشراف تعتمد على مساحة المشروع', time: '12 دقيقة', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', active: false },
  { id: 3, name: 'م/ سعيد سالم', message: 'تم استلام الدفعة الأولى بنجاح', time: 'ساعة واحدة', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', active: false },
  { id: 4, name: 'م/ أسامة جلال', message: 'هل قمت باستخراج التصاريح؟', time: '5h', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', active: false },
];

const messages = [
  { id: 1, sender: 'me', text: 'السلام عليكم مهندس أحمد، كيف الحال؟' },
  { id: 2, sender: 'me', text: 'أردت الاستفسار عن إمكانية عمل تصميم معماري لفيلا مساحتها 400 متر مربع.' },
  { id: 3, sender: 'them', text: 'وعليكم السلام ورحمة الله أخي الكريم.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 4, sender: 'them', text: 'نعم بالتأكيد، يمكننا عمل التصميم المعماري والواجهات بالكامل.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 5, sender: 'me', text: 'ممتاز، ما هي الخطوات المطلوبة للبدء؟ وهل يمكنني معرفة التكلفة التقريبية؟' },
  { id: 6, sender: 'them', text: 'مبدئياً أحتاج إلى كروكي الأرض أو الصك لمعرفة الأبعاد والاشتراطات.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 7, sender: 'them', text: 'بعدها سأرسل لك عرض سعر تفصيلي يشمل جميع المخططات.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 8, sender: 'me', text: 'سأقوم بإرسال الكروكي لك الآن.' },
  { id: 9, sender: 'them', text: 'نعم، يمكننا البدء بالتصميم الأسبوع القادم فور الموافقة على عرض السعر.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
];

export default function UserChatPage() {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFC] flex flex-col font-tajawal">
      <Navbar />

      <div className="flex-grow p-2 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100" data-aos="zoom-in" data-aos-duration="500">
          {/* Conversations Sidebar */}
          <div className={`${isMobileChatOpen ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 md:min-w-[280px] lg:min-w-[320px] border-l border-gray-100 flex-col bg-white h-full`}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-900">المحادثات</h2>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">4</span>
              </div>
              
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="بحث..." 
                  className="w-full bg-gray-50 border-none rounded-xl py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-[#EB682C] outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
              {conversations.map((chat, idx) => (
                <div 
                  key={chat.id} 
                  onClick={() => setIsMobileChatOpen(true)}
                  data-aos="fade-left"
                  data-aos-delay={100 + (idx * 50)}
                  className={`flex items-start gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${chat.active ? 'bg-orange-50/50 scale-[1.02] shadow-sm' : 'hover:bg-gray-50'}`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                    </div>
                    {chat.active && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className={`${isMobileChatOpen ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#F9FAFB]/30 h-full`}>
            {/* Chat Header */}
            <div className="px-4 md:px-8 py-3 md:py-4 border-b border-gray-100 bg-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button 
                  className="md:hidden text-gray-500 hover:text-gray-700 ml-2"
                  onClick={() => setIsMobileChatOpen(false)}
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="م/ أحمد علي" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">م/ أحمد علي</h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-500">متصل الآن</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6">
              {messages.map((msg, idx) => (
                <div 
                  key={msg.id} 
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                  className={`flex items-end gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.sender === 'them' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1 border border-gray-100">
                      <img src={msg.avatar} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div 
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3 shadow-sm transform transition-transform hover:scale-[1.01] ${
                      msg.sender === 'me' 
                        ? 'bg-[#EB682C] text-white rounded-br-sm' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 md:p-6 bg-white border-t border-gray-100">
              <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-2 px-4 focus-within:ring-2 focus-within:ring-[#EB682C] focus-within:border-transparent transition-all shadow-sm">
                <button className="text-[#EB682C] p-2 hover:bg-orange-50 rounded-xl transition-colors">
                  <Send className="w-5 h-5 transform rotate-180" />
                </button>
                <input 
                  type="text" 
                  placeholder="اكتب رسالة للمهندس..." 
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
                />
                <button className="text-gray-400 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
