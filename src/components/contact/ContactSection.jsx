"use client";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CountryCodePicker from "@/components/common/CountryCodePicker";
import { DEFAULT_COUNTRY } from "@/lib/countries";

export default function ContactSection() {
  const { isEnglish } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");

  return (
    <section className="py-12 px-6 md:px-12 font-tajawal max-w-[1400px] mx-auto w-full" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      
      {/* Top Title */}
      <div className={`${isEnglish ? 'text-left' : 'text-right'} mb-12`}>
        <h2 className="text-3xl font-bold text-gray-900">
          {isEnglish ? "Contact " : "تواصل "}
          <span className="text-[#EB682C]">{isEnglish ? "Us" : "معنا"}</span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Right Column: Info & Image (First in RTL flex-row) */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          
          {/* Phones Image */}
          <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg bg-gray-900">
            <img 
              src="callus.png" 
              alt="Hello Phones" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          {/* Contact Details Cards */}
          <div className="flex flex-col gap-4">
            
            {/* Email Card */}
            <div className="flex items-center gap-4 bg-[#F1F5F9] rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-5 h-5 text-[#2A5CBA]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-950 text-sm mb-1">{isEnglish ? "Email" : "البريد الالكتروني"}</h3>
                <p className="text-gray-900 font-bold text-xs" dir="ltr">info@construction-supplier.com</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-center gap-4 bg-[#F1F5F9] rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Phone className="w-5 h-5 text-[#2A5CBA]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-950 text-sm mb-1">{isEnglish ? "Phone Number" : "رقم الهاتف"}</h3>
                <p className="text-gray-900 font-bold text-xs" dir="ltr">15930 / 01000005536</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-4 bg-[#F1F5F9] rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-5 h-5 text-[#2A5CBA]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-950 text-sm mb-1">{isEnglish ? "Location" : "الموقع"}</h3>
                <p className="text-gray-900 font-bold text-xs">{isEnglish ? "Riyadh, Saudi Arabia" : "الرياض، المملكة العربية السعودية"}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Left Column: Form Container (Second in RTL flex-row) */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow">
            
            <div className={`${isEnglish ? 'text-left' : 'text-right'} mb-8`}>
              <span className="text-[#EB682C] text-xs font-bold mb-2 block">{isEnglish ? "Get an Inquiry" : "احصل على استفسار"}</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-950 mb-4 leading-tight">
                {isEnglish ? "Get in touch, we are here to help" : "تواصل معنا، نحن هنا لمساعدتك"}
              </h3>
              <p className="text-gray-800 text-sm font-semibold leading-relaxed max-w-sm mx-auto">
                {isEnglish ? "Have questions or feedback? We are here to help. Send us a message, and we will respond within 24 hours." : "هل لديك أسئلة أو ملاحظات؟ نحن هنا لمساعدتك. أرسل لنا رسالة، وسنقوم بالرد خلال 24 ساعة."}
              </p>
            </div>

            <form className="flex flex-col gap-5">
              
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm  font-bold text-gray-800 flex gap-1 items-center justify-start">
                  {isEnglish ? "Full Name" : "الاسم بالكامل"} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder={isEnglish ? "Mahmoud Tarek Mohamed" : "محمود طارق محمد"} 
                  className={`w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'}`}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-800 flex gap-1 items-center justify-start">
                  {isEnglish ? "Email Address" : "البريد الالكتروني"} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="For Example@gmail.com" 
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left"
                  dir="ltr"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-800 flex gap-1 items-center justify-start">
                  {isEnglish ? "Phone Number" : "رقم الهاتف"} <span className="text-red-500">*</span>
                </label>
                <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} h-12 border border-gray-200 rounded-xl relative focus-within:border-[#EB682C] transition-colors bg-white`}>
                  {/* Phone Input */}
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="5xxxxxxxx"
                    className={`flex-1 h-full px-4 text-sm focus:outline-none bg-transparent ${isEnglish ? 'rounded-r-xl' : 'rounded-l-xl'}`}
                    dir="ltr"
                  />
                  {/* Country Code Picker */}
                  <CountryCodePicker
                    selectedCountry={selectedCountry}
                    onSelect={setSelectedCountry}
                    isEnglish={isEnglish}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-800 flex gap-1 items-center justify-start">
                  {isEnglish ? "Message" : "الرسالة"} <span className="text-red-500">*</span>
                </label>
                <textarea 
                  placeholder={isEnglish ? "Write your message" : "اكتب رسالتك"} 
                  rows="5"
                  className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} resize-none`}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="button" 
                className="w-full bg-[#EB682C] text-white font-bold h-12 rounded-xl mt-2 hover:bg-[#d65a22] transition-colors cursor-pointer"
              >
                {isEnglish ? "Send Inquiry" : "ارسال استفسارك"}
              </button>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
