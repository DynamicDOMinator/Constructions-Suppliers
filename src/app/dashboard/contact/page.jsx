"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";
import Popup from "@/components/Popup";

export default function ContactPage() {
  const { isEnglish } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [popupState, setPopupState] = useState({ isOpen: false, type: "", title: "", message: "", onConfirm: null });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return showPopup("تنبيه", "الرجاء تعبئة جميع الحقول المطلوبة", "alert");
    }

    setSubmitting(true);
    try {
      const res = await api.post("/auth/contact", formData);
      showPopup("نجاح", res.data?.message || "تم إرسال رسالتك بنجاح.", "success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send contact message:", error);
      showPopup("خطأ", error.response?.data?.message || "حدث خطأ أثناء إرسال الرسالة", "danger");
    } finally {
      setSubmitting(false);
    }
  };

  const showPopup = (title, message, type) => {
    setPopupState({
      isOpen: true,
      title: isEnglish ? title : title,
      message: message,
      type: type,
      onConfirm: () => setPopupState({ ...popupState, isOpen: false })
    });
  };

  return (
    <div className={`font-tajawal w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 relative pb-20 ${isEnglish ? 'ltr' : 'rtl'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
      
      {/* Header */}
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8`}>
        <div className={`w-full ${isEnglish ? 'text-left' : 'text-right'}`}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{isEnglish ? 'Contact Us' : 'تواصل معنا'}</h1>
          <p className="text-gray-500 text-sm">{isEnglish ? 'We are here to help and answer all your inquiries' : 'نحن هنا لمساعدتك والإجابة على جميع استفساراتك'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="col-span-1 flex flex-col gap-4">
          
          <div className={`bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <h3 className="text-xl font-bold text-[#EB682C] mb-2">{isEnglish ? 'Contact Information' : 'معلومات التواصل'}</h3>
            
            <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} items-start ${isEnglish ? 'justify-start' : 'justify-start'} gap-4 text-gray-600`}>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm mb-1">{isEnglish ? 'Email' : 'البريد الإلكتروني'}</span>
                <span className="text-xs" dir="ltr">support@constructions.com</span>
              </div>
            </div>

            <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} items-start ${isEnglish ? 'justify-start' : 'justify-start'} gap-4 text-gray-600`}>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm mb-1">{isEnglish ? 'Phone Number' : 'رقم الهاتف'}</span>
                <span className="text-xs" dir="ltr">+966 50 123 4567</span>
              </div>
            </div>

            <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} items-start ${isEnglish ? 'justify-start' : 'justify-start'} gap-4 text-gray-600`}>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm mb-1">{isEnglish ? 'Headquarters' : 'المقر الرئيسي'}</span>
                <span className="text-xs">{isEnglish ? 'Riyadh, Saudi Arabia' : 'الرياض، المملكة العربية السعودية'}</span>
              </div>
            </div>
            
          </div>
          
        </div>

        {/* Contact Form */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h3 className={`text-xl font-bold text-gray-900 ${isEnglish ? 'text-left' : 'text-right'} mb-6`}>{isEnglish ? 'Send us a message' : 'أرسل لنا رسالة'}</h3>
            
            <form className={`flex flex-col gap-5 ${isEnglish ? 'text-left' : 'text-right'}`} onSubmit={handleSubmit}>
              
              <div className={`flex flex-col md:${isEnglish ? 'flex-row' : 'flex-row'} gap-5`}>
                <div className="flex-1 w-full flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Full Name' : 'الاسم الكامل'}</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={isEnglish ? 'Full Name' : 'الاسم الكامل'} 
                    className={`w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors ${isEnglish ? 'text-left' : 'text-right'}`}
                  />
                </div>
                <div className="flex-1 w-full flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Email' : 'البريد الإلكتروني'}</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@mail.com" 
                    className={`w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors text-left`}
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Subject' : 'الموضوع'}</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={isEnglish ? 'Subject of the message' : 'موضوع الرسالة'} 
                  className={`w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-300 transition-colors ${isEnglish ? 'text-left' : 'text-right'}`}
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Your Message' : 'رسالتك'}</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder={isEnglish ? 'Write your message here in detail...' : 'اكتب رسالتك هنا بالتفصيل...'} 
                  className={`w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm outline-none focus:border-orange-300 transition-colors ${isEnglish ? 'text-left' : 'text-right'} resize-none`}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className={`bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d65a22] transition-colors mt-2 flex items-center justify-center gap-2 ${isEnglish ? 'flex-row' : 'flex-row-reverse'} disabled:opacity-50`}
              >
                <Send className={`w-5 h-5 ${isEnglish ? '' : 'rotate-180'}`} />
                {submitting ? (isEnglish ? 'Sending...' : 'جاري الإرسال...') : (isEnglish ? 'Send Message' : 'إرسال الرسالة')}
              </button>

            </form>
          </div>
        </div>

      </div>

      <Popup
        isOpen={popupState.isOpen}
        type={popupState.type}
        title={popupState.title}
        message={popupState.message}
        onConfirm={popupState.onConfirm}
        onCancel={() => setPopupState({ ...popupState, isOpen: false })}
      />
    </div>
  );
}
