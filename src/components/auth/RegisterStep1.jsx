"use client";
import { useState, useEffect, useRef } from 'react';
import { User, Mail, EyeOff, Eye, ChevronDown } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";

const ALL_COUNTRIES = [
  { code: '+966', flagUrl: 'https://flagcdn.com/w40/sa.png', name: 'السعودية', nameEn: 'Saudi Arabia', iso: 'SA' },
  { code: '+20', flagUrl: 'https://flagcdn.com/w40/eg.png', name: 'مصر', nameEn: 'Egypt', iso: 'EG' },
  { code: '+971', flagUrl: 'https://flagcdn.com/w40/ae.png', name: 'الإمارات', nameEn: 'UAE', iso: 'AE' },
  { code: '+965', flagUrl: 'https://flagcdn.com/w40/kw.png', name: 'الكويت', nameEn: 'Kuwait', iso: 'KW' },
  { code: '+974', flagUrl: 'https://flagcdn.com/w40/qa.png', name: 'قطر', nameEn: 'Qatar', iso: 'QA' },
  { code: '+973', flagUrl: 'https://flagcdn.com/w40/bh.png', name: 'البحرين', nameEn: 'Bahrain', iso: 'BH' },
  { code: '+968', flagUrl: 'https://flagcdn.com/w40/om.png', name: 'عُمان', nameEn: 'Oman', iso: 'OM' },
  { code: '+962', flagUrl: 'https://flagcdn.com/w40/jo.png', name: 'الأردن', nameEn: 'Jordan', iso: 'JO' },
];

const COUNTRY_MAP = {
  SA: ALL_COUNTRIES[0],
  EG: ALL_COUNTRIES[1],
  AE: ALL_COUNTRIES[2],
  KW: ALL_COUNTRIES[3],
  QA: ALL_COUNTRIES[4],
  BH: ALL_COUNTRIES[5],
  OM: ALL_COUNTRIES[6],
  JO: ALL_COUNTRIES[7],
};

export default function RegisterStep1({ onNext, formData, setFormData }) {
  const { isEnglish } = useLanguage();
  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(ALL_COUNTRIES[0]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  // Detect Country by IP Address
  useEffect(() => {
    if (formData.country_code) {
      const existing = ALL_COUNTRIES.find((c) => c.code === formData.country_code);
      if (existing) {
        setSelectedCountry(existing);
        return;
      }
    }

    const detectCountry = async () => {
      try {
        const res = await fetch("https://api.country.is");
        if (res.ok) {
          const data = await res.json();
          const iso = data?.country?.toUpperCase();
          if (iso && COUNTRY_MAP[iso]) {
            setSelectedCountry(COUNTRY_MAP[iso]);
            setFormData((prev) => ({ ...prev, country_code: COUNTRY_MAP[iso].code }));
            return;
          }
        }
      } catch (err) {
        // Try secondary IP lookup service
      }

      try {
        const res2 = await fetch("https://ipwho.is/");
        if (res2.ok) {
          const data2 = await res2.json();
          const iso2 = data2?.country_code?.toUpperCase();
          if (iso2 && COUNTRY_MAP[iso2]) {
            setSelectedCountry(COUNTRY_MAP[iso2]);
            setFormData((prev) => ({ ...prev, country_code: COUNTRY_MAP[iso2].code }));
          }
        }
      } catch (err2) {
        // Fallback remains default (Saudi Arabia +966)
      }
    };

    detectCountry();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountries(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNext = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError(isEnglish ? "Please fill in all required fields" : "يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    if (formData.password.length < 6) {
      setError(isEnglish ? "Password must be at least 6 characters" : "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل");
      return;
    }
    if (formData.password !== confirmPassword) {
      setError(isEnglish ? "Passwords do not match" : "كلمتا المرور غير متطابقتين");
      return;
    }
    setError("");
    setFormData((prev) => ({ ...prev, country_code: selectedCountry.code }));
    onNext();
  };

  return (
    <div className="w-full" dir={isEnglish ? 'ltr' : 'rtl'}>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">
          {isEnglish ? 'Create a New Account' : 'إنشاء حساب جديد'}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
          {isEnglish
            ? 'Welcome! Create your account now to start your journey with us and enjoy opportunities and services.'
            : 'أهلاً بك! أنشئ حسابك الآن لتبدأ رحلتك معنا، واستمتع بالفرص والخدمات'}
        </p>
      </div>

      <form className="flex flex-col gap-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold border border-red-100 text-right">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'} w-full md:w-1/2`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Name' : 'الاسم'}</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={isEnglish ? 'Name' : 'الاسم'}
                className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C]"
              />
            </div>
          </div>

          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'} w-full md:w-1/2`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Email Address' : 'البريد الالكتروني'}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={isEnglish ? 'Email Address' : 'البريد الالكتروني'}
                className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C]"
              />
            </div>
          </div>
        </div>

        <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Phone Number' : 'رقم الهاتف'}</label>
          <div className="flex flex-row-reverse h-14 border border-gray-200 rounded-2xl relative focus-within:border-[#EB682C] bg-white">
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="flex-1 h-full px-4 text-sm focus:outline-none text-left bg-transparent"
              dir="ltr"
              placeholder="5xxxxxxx"
            />

            <div
              className="h-full px-4 flex items-center justify-center gap-2 shrink-0 border-l border-gray-200 cursor-pointer hover:bg-gray-50 rounded-r-xl transition-colors select-none"
              onClick={() => setShowCountries(!showCountries)}
            >
              <span className="text-sm font-bold text-gray-600" dir="ltr">
                {selectedCountry.code}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                  showCountries ? 'rotate-180' : ''
                }`}
              />
              <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 shrink-0">
                <img src={selectedCountry.flagUrl} alt={selectedCountry.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Dropdown */}
            {showCountries && (
              <div
                ref={dropdownRef}
                className="absolute top-[105%] right-0 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto font-tajawal animate-in fade-in zoom-in-95 duration-150"
              >
                {ALL_COUNTRIES.map((country, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                      selectedCountry.code === country.code ? 'bg-orange-50/70 font-bold' : ''
                    }`}
                    onClick={() => {
                      setSelectedCountry(country);
                      setFormData((prev) => ({ ...prev, country_code: country.code }));
                      setShowCountries(false);
                    }}
                  >
                    <span className="text-sm font-bold text-gray-600" dir="ltr">
                      {country.code}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-700">
                        {isEnglish ? country.nameEn : country.name}
                      </span>
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src={country.flagUrl} alt={country.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Password' : 'كلمة المرور'}</label>
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••••••"
              className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-left tracking-widest"
              dir="ltr"
            />
          </div>
        </div>

        <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Confirm Password' : 'تأكيد كلمة المرور'}</label>
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
          {isEnglish ? 'Create Account' : 'انشاء الحساب'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">{isEnglish ? 'Already have an account? ' : 'لديك حساب؟ '}</span>
        <a href="/login" className="font-bold text-[#de6d3a] hover:underline">
          {isEnglish ? 'Sign In' : 'تسجيل الدخول'}
        </a>
      </div>
    </div>
  );
}
