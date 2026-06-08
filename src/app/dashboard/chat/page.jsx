"use client";
import React, { useState } from 'react';
import { Search, Paperclip, Send, MoreHorizontal, ArrowRight } from 'lucide-react';

const conversations = [
  { id: 1, name: 'م/ محمود فتوح', message: 'جاري مراجعة طلب التسعير الخاص بك', time: 'الآن', avatar: '/avatar.jpg', active: true },
  { id: 2, name: 'م/ أحمد علي', message: 'تم إرسال عرض السعر النهائي', time: '12 دقيقة', avatar: '/avatar.jpg', active: false },
  { id: 3, name: 'شركة المقاولات الحديثة', message: 'نحتاج بعض التعديلات على المخطط', time: 'ساعة واحدة', avatar: '/avatar.jpg', active: false },
  { id: 4, name: 'م/ أشرف سالم', message: 'هل يمكننا تحديد موعد للاجتماع؟', time: '5h', avatar: '/avatar.jpg', active: false },
  { id: 5, name: 'مؤسسة البناء المتطور', message: 'شكراً لك، تم استلام المخططات', time: '2d', avatar: '/avatar.jpg', active: false },
  { id: 6, name: 'م/ محمد نصر', message: 'المواصفات المطلوبة غير واضحة', time: '1 يوم', avatar: '/avatar.jpg', active: false },
];

const messages = [
  { id: 1, sender: 'me', text: 'السلام عليكم مهندس محمود' },
  { id: 2, sender: 'me', text: 'لقد قمت بإرسال طلب تسعير بخصوص مشروع الفيلّا الجديد، هل استلمته؟' },
  { id: 3, sender: 'them', text: 'وعليكم السلام ورحمة الله', avatar: '/avatar.jpg' },
  { id: 4, sender: 'them', text: 'نعم، لقد استلمت الطلب للتو وأقوم بمراجعته الآن.', avatar: '/avatar.jpg' },
  { id: 5, sender: 'them', text: 'سأرسل لك التسعير النهائي خلال ساعتين كحد أقصى.', avatar: '/avatar.jpg' },
  { id: 6, sender: 'me', text: 'ممتاز جداً، هل تحتاج إلى أي تفاصيل إضافية حول المخططات المعمارية أو المواصفات؟' },
  { id: 7, sender: 'them', text: 'أحتاج فقط إلى التأكيد على نوع التشطيبات المطلوبة للواجهة الخارجية.', avatar: '/avatar.jpg' },
  { id: 8, sender: 'me', text: 'سيتم استخدام حجر هاشمي طبيعي، سأرسل لك المواصفات الدقيقة في ملف منفصل.' },
  { id: 9, sender: 'them', text: 'تمام، في انتظار الملف لبدء التسعير بدقة.', avatar: '/avatar.jpg' },
  { id: 10, sender: 'them', text: 'شكراً لتعاونك 👍', avatar: '/avatar.jpg' },
];

export default function ChatPage() {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      {/* Conversations Sidebar */}
      <div className={`${isMobileChatOpen ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 md:min-w-[300px] border-l border-gray-100 flex-col bg-white h-full`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-gray-900">المحادثات</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">12</span>
          </div>
          
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="بحث. رسائل البحث" 
              className="w-full bg-gray-50 border-none rounded-xl py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3">
          {conversations.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setIsMobileChatOpen(true)}
              className={`flex items-start gap-4 p-3 rounded-2xl mb-1 cursor-pointer transition-colors ${chat.active ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src="https://i.pravatar.cc/150?img=11" alt={chat.name} className="w-full h-full object-cover" />
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
        <div className="px-4 md:px-8 py-3 md:py-5 border-b border-gray-100 bg-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700 ml-2"
              onClick={() => setIsMobileChatOpen(false)}
            >
              <ArrowRight className="w-6 h-6" />
            </button>
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="محمود فتوح" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">محمود فتوح</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-500">متصل</span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
              {msg.sender === 'them' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mb-1">
                  <img src="https://i.pravatar.cc/150?img=11" alt="avatar" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div 
                className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                  msg.sender === 'me' 
                    ? 'bg-[#3b5998] text-white rounded-br-sm' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-100">
          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-2 px-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all shadow-sm">
            <button className="text-blue-600 p-2 hover:bg-blue-50 rounded-xl transition-colors">
              <Send className="w-5 h-5 transform rotate-180" /> {/* Rotating because RTL usually has paperplane pointing left */}
            </button>
            <input 
              type="text" 
              placeholder="اكتب رسالة" 
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
            />
            <button className="text-gray-400 p-2 hover:bg-gray-50 rounded-xl transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
