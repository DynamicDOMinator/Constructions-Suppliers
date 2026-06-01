"use client";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="font-tajawal w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 relative pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="text-right w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تواصل معنا</h1>
          <p className="text-gray-500 text-sm">نحن هنا لمساعدتك والإجابة على جميع استفساراتك</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="col-span-1 flex flex-col gap-4">
          
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6 text-right">
            <h3 className="text-xl font-bold text-[#EB682C] mb-2">معلومات التواصل</h3>
            
            <div className="flex flex-row-reverse items-start justify-end gap-4 text-gray-600">
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm mb-1">البريد الإلكتروني</span>
                <span className="text-xs" dir="ltr">support@constructions.com</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start justify-end gap-4 text-gray-600">
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm mb-1">رقم الهاتف</span>
                <span className="text-xs" dir="ltr">+966 50 123 4567</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start justify-end gap-4 text-gray-600">
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm mb-1">المقر الرئيسي</span>
                <span className="text-xs">الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            
          </div>
          
        </div>

        {/* Contact Form */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 text-right mb-6">أرسل لنا رسالة</h3>
            
            <form className="flex flex-col gap-5 text-right" onSubmit={(e) => e.preventDefault()}>
              
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1 w-full flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    placeholder="example@mail.com" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors text-right"
                  />
                </div>
                <div className="flex-1 w-full flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">الاسم الكامل</label>
                  <input 
                    type="text" 
                    placeholder="الاسم الكامل" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors text-right"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">الموضوع</label>
                <input 
                  type="text" 
                  placeholder="موضوع الرسالة" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors text-right"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">رسالتك</label>
                <textarea 
                  rows={6}
                  placeholder="اكتب رسالتك هنا بالتفصيل..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm outline-none focus:border-orange-300 transition-colors text-right resize-none"
                ></textarea>
              </div>

              <button className="bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d65a22] transition-colors mt-2 flex items-center justify-center gap-2">
                إرسال الرسالة
                <Send className="w-5 h-5 rotate-180" />
              </button>

            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
