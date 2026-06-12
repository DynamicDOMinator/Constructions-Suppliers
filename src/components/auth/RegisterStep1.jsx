"use client";
import { useState } from 'react';
import { User, Mail, EyeOff, Eye, ChevronDown } from 'lucide-react';

export default function RegisterStep1({ onNext, formData, setFormData }) {
  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ code: '+966', flagUrl: 'https://flagcdn.com/w40/sa.png' });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    if (formData.password.length < 6) {
      setError("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل");
      return;
    }
    if (formData.password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }
    setError("");
    onNext();
  };

  const countries = [
    { code: '+966', flagUrl: 'https://flagcdn.com/w40/sa.png', name: 'السعودية' },
    { code: '+20', flagUrl: 'https://flagcdn.com/w40/eg.png', name: 'مصر' },
  ];
  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">إنشاء حساب جديد</h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
          هلاً بك! أنشئ حسابك الآن لتبدأ رحلتك معنا، واستمتع بالفرص والخدمات
        </p>
      </div>

      <form className="flex flex-col gap-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold border border-red-100 text-right">
            {error}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2 text-right w-full md:w-1/2">
            <label className="text-sm font-bold text-gray-700">الاسم</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={formData.name || ""}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="الاسم" 
                className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C]" 
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-right w-full md:w-1/2">
            <label className="text-sm font-bold text-gray-700">البريد الالكتروني</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                value={formData.email || ""}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="البريد الالكتروني" 
                className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C]" 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">رقم الهاتف</label>
          <div className="flex flex-row-reverse h-14 border border-gray-200 rounded-2xl relative focus-within:border-[#EB682C] bg-white">
            <input 
              type="tel" 
              value={formData.phone || ""}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="flex-1 h-full px-4 text-sm focus:outline-none text-left bg-transparent" 
              dir="ltr" 
            />
            
            <div 
              className="h-full px-4 flex items-center justify-center gap-2 shrink-0 border-l border-gray-200 cursor-pointer hover:bg-gray-50 rounded-r-xl transition-colors"
              onClick={() => setShowCountries(!showCountries)}
            >
              <span className="text-sm font-bold text-gray-600" dir="ltr">{selectedCountry.code}</span>
              <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showCountries ? 'rotate-180' : ''}`} />
              <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 shrink-0">
                <img src={selectedCountry.flagUrl} alt="flag" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Dropdown */}
            {showCountries && (
              <div className="absolute top-[105%] right-0 w-32 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50">
                {countries.map((country, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                    onClick={() => {
                      setSelectedCountry(country);
                      setShowCountries(false);
                    }}
                  >
                    <span className="text-sm font-bold text-gray-600" dir="ltr">{country.code}</span>
                    <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                      <img src={country.flagUrl} alt={country.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
          <div className="relative">
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <Eye className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              )}
            </button>
            <input 
              type={showPassword ? "text" : "password"}
              value={formData.password || ""}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••••••" 
              className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-left tracking-widest" 
              dir="ltr" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">تأكيد كلمة المرور</label>
          <div className="relative">
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <Eye className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              )}
            </button>
            <input 
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••" 
              className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-left tracking-widest" 
              dir="ltr" 
            />
          </div>
        </div>

        <button 
          type="button" 
          onClick={handleNext}
          className="w-full bg-[#de6d3a] text-white py-4 rounded-2xl font-bold hover:bg-[#d65a22] transition-colors mt-6 text-lg"
        >
          انشاء الحساب
        </button>

      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">لديك حساب؟ </span>
        <a href="/login" className="font-bold text-[#de6d3a] hover:underline">
          تسجيل الدخول
        </a>
      </div>
    </div>
  );
}
