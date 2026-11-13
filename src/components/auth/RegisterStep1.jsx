"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { User, Mail, EyeOff, Eye, ChevronDown, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [topErrorObj, setTopErrorObj] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [serverErrors, setServerErrors] = useState({
    email: null, // { ar: string, en: string }
    phone: null, // { ar: string, en: string }
  });

  const topError = useMemo(() => {
    if (!topErrorObj) return "";
    if (typeof topErrorObj === "string") return topErrorObj;
    return isEnglish ? (topErrorObj.en || topErrorObj.ar) : (topErrorObj.ar || topErrorObj.en);
  }, [topErrorObj, isEnglish]);
  
  // Track touched fields for instant, inline validation
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const countryPickerRef = useRef(null);

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

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryPickerRef.current && !countryPickerRef.current.contains(event.target)) {
        setShowCountries(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowCountries(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Field validation helpers
  const clientNameError = useMemo(() => {
    const val = (formData.name || "").trim();
    if (!val) return isEnglish ? "Name is required" : "يرجى إدخال الاسم";
    if (val.length < 2) return isEnglish ? "Name must be at least 2 characters" : "يجب أن يتكون الاسم من حرفين على الأقل";
    return "";
  }, [formData.name, isEnglish]);

  const clientEmailError = useMemo(() => {
    const val = (formData.email || "").trim();
    if (!val) return isEnglish ? "Email is required" : "يرجى إدخال البريد الإلكتروني";
    if (!val.includes("@")) {
      return isEnglish ? "Email must contain @" : "يجب أن يحتوي البريد الإلكتروني على علامة @";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      return isEnglish
        ? "Please enter a valid email address (e.g. name@domain.com)"
        : "يرجى إدخال بريد إلكتروني صحيح (مثال: name@domain.com)";
    }
    return "";
  }, [formData.email, isEnglish]);

  const clientPhoneError = useMemo(() => {
    const val = (formData.phone || "").trim().replace(/[\s\-\(\)]/g, "");
    if (!val) return isEnglish ? "Phone number is required" : "يرجى إدخال رقم الهاتف";
    if (!/^\d+$/.test(val)) {
      return isEnglish ? "Phone number must contain digits only" : "رقم الهاتف يجب أن يحتوي على أرقام فقط";
    }
    if (val.length < 7 || val.length > 15) {
      return isEnglish ? "Phone must be between 7 and 15 digits" : "يجب أن يتكون رقم الهاتف من 7 إلى 15 رقماً";
    }
    return "";
  }, [formData.phone, isEnglish]);

  const nameError = clientNameError;

  const emailError = useMemo(() => {
    if (serverErrors.email) {
      return isEnglish ? serverErrors.email.en : serverErrors.email.ar;
    }
    return clientEmailError;
  }, [serverErrors.email, clientEmailError, isEnglish]);

  const phoneError = useMemo(() => {
    if (serverErrors.phone) {
      return isEnglish ? serverErrors.phone.en : serverErrors.phone.ar;
    }
    return clientPhoneError;
  }, [serverErrors.phone, clientPhoneError, isEnglish]);

  // On-blur availability check for Email
  const handleEmailBlur = async () => {
    setTouched((prev) => ({ ...prev, email: true }));
    const emailVal = (formData.email || "").trim();
    if (!emailVal || clientEmailError) return;

    try {
      const res = await api.post("/auth/check-exists", { email: emailVal });
      const data = res.data;
      if (data?.email_exists || (data?.exists && data?.errors?.email)) {
        setServerErrors((prev) => ({
          ...prev,
          email: {
            ar: data?.message_ar || "البريد الإلكتروني مسجل بالفعل",
            en: data?.message || "Email is already registered",
          },
        }));
      } else {
        setServerErrors((prev) => ({ ...prev, email: null }));
      }
    } catch (err) {
      if (err.response?.status === 422 && err.response?.data?.errors?.email) {
        setServerErrors((prev) => ({
          ...prev,
          email: {
            ar: "البريد الإلكتروني مسجل بالفعل",
            en: "Email is already registered",
          },
        }));
      }
    }
  };

  // On-blur availability check for Phone
  const handlePhoneBlur = async () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    const phoneVal = (formData.phone || "").trim().replace(/[\s\-\(\)]/g, "");
    if (!phoneVal || clientPhoneError) return;

    try {
      const res = await api.post("/auth/check-exists", { phone: phoneVal });
      const data = res.data;
      if (data?.phone_exists || (data?.exists && data?.errors?.phone)) {
        setServerErrors((prev) => ({
          ...prev,
          phone: {
            ar: data?.message_ar || "رقم الهاتف مسجل بالفعل",
            en: data?.message || "Phone number is already registered",
          },
        }));
      } else {
        setServerErrors((prev) => ({ ...prev, phone: null }));
      }
    } catch (err) {
      if (err.response?.status === 422 && err.response?.data?.errors?.phone) {
        setServerErrors((prev) => ({
          ...prev,
          phone: {
            ar: "رقم الهاتف مسجل بالفعل",
            en: "Phone number is already registered",
          },
        }));
      }
    }
  };

  // Password Strength & Requirement Analysis (Supports Arabic & English characters)
  const passwordAnalysis = useMemo(() => {
    const pwd = formData.password || "";
    // Supports English (a-z, A-Z) and Arabic characters (all Unicode letter categories)
    const hasLetters = /[a-zA-Z\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(pwd) || /\p{L}/u.test(pwd);
    // Supports English digits (0-9) and Arabic/Indic digits (٠-٩ and ۰-۹)
    const hasNumbers = /[0-9\u0660-\u0669\u06F0-\u06F9]/.test(pwd) || /\p{N}/u.test(pwd);
    const hasMinLength = pwd.length >= 6;
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(pwd);

    // Condition requirement: Must contain letters AND numbers AND min length 6
    const isConditionMet = hasLetters && hasNumbers && hasMinLength;

    let score = 0;
    let label = "";
    let barColor = "bg-gray-200";
    let textColor = "text-gray-400";
    let percent = 0;

    if (pwd.length === 0) {
      score = 0;
      label = isEnglish
        ? "Password must contain letters and numbers (min 6 characters)"
        : "يجب أن تحتوي كلمة المرور على أحرف وأرقام معاً (6 خانات كحد أدنى)";
      barColor = "bg-gray-200";
      textColor = "text-gray-400";
      percent = 0;
    } else if (!hasMinLength) {
      score = 1;
      label = isEnglish
        ? "Weak: Password must be at least 6 characters"
        : "ضعيفة: يجب ألا تقل كلمة المرور عن 6 خانات";
      barColor = "bg-red-500";
      textColor = "text-red-500";
      percent = 25;
    } else if (!hasLetters || !hasNumbers) {
      score = 2;
      label = !hasLetters
        ? (isEnglish ? "Medium: Please add letters" : "متوسطة: يلزم إضافة أحرف")
        : (isEnglish ? "Medium: Please add numbers" : "متوسطة: يلزم إضافة أرقام");
      barColor = "bg-amber-500";
      textColor = "text-amber-600";
      percent = 50;
    } else {
      // Met condition: Has letters AND numbers AND length >= 6 -> MUST BE GREEN
      if (pwd.length >= 8 && hasSpecial) {
        score = 4;
        label = isEnglish ? "Very Strong & Secure" : "قوية جداً ومحمية بالكامل ✓";
        barColor = "bg-emerald-600";
        textColor = "text-emerald-600";
        percent = 100;
      } else {
        score = 3;
        label = isEnglish
          ? "Good: Meets requirement (letters & numbers) ✓"
          : "جيدة: متوافقة مع الشرط (أحرف وأرقام) ✓";
        barColor = "bg-emerald-500";
        textColor = "text-emerald-600";
        percent = 80;
      }
    }

    return {
      hasLetters,
      hasNumbers,
      hasMinLength,
      isConditionMet,
      score,
      label,
      barColor,
      textColor,
      percent,
    };
  }, [formData.password, isEnglish]);

  const passwordError = useMemo(() => {
    const pwd = formData.password || "";
    if (!pwd) return isEnglish ? "Password is required" : "يرجى إدخال كلمة المرور";
    if (pwd.length < 6) {
      return isEnglish ? "Password must be at least 6 characters" : "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل";
    }
    if (!passwordAnalysis.hasLetters || !passwordAnalysis.hasNumbers) {
      return isEnglish
        ? "Password must contain both letters and numbers"
        : "كلمة المرور يجب أن تتضمن أحرفاً وأرقاماً معاً";
    }
    return "";
  }, [formData.password, passwordAnalysis, isEnglish]);

  const confirmPasswordError = useMemo(() => {
    if (!confirmPassword) return isEnglish ? "Please confirm your password" : "يرجى تأكيد كلمة المرور";
    if (confirmPassword !== formData.password) {
      return isEnglish ? "Passwords do not match" : "كلمتا المرور غير متطابقتين";
    }
    return "";
  }, [confirmPassword, formData.password, isEnglish]);

  const handleNext = async () => {
    // Mark all fields as touched to trigger full visual validation
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (clientNameError || clientEmailError || clientPhoneError || passwordError || confirmPasswordError) {
      const firstError = clientNameError || clientEmailError || clientPhoneError || passwordError || confirmPasswordError;
      setTopErrorObj(firstError);
      return;
    }

    if (!agreeTerms) {
      const err = isEnglish ? "You must agree to the Terms & Conditions" : "يجب الموافقة على الشروط والأحكام للمتابعة";
      setTermsError(err);
      setTopErrorObj({ ar: err, en: err });
      return;
    }

    setTopErrorObj(null);
    setIsChecking(true);

    try {
      const email = (formData.email || "").trim();
      const phone = (formData.phone || "").trim().replace(/[\s\-\(\)]/g, "");

      const res = await api.post("/auth/check-exists", {
        email,
        phone,
      });

      const data = res.data;
      const emailExists = Boolean(data?.email_exists || data?.errors?.email);
      const phoneExists = Boolean(data?.phone_exists || data?.errors?.phone);
      const exists = Boolean(data?.exists || emailExists || phoneExists);

      if (exists) {
        const emailErr = emailExists
          ? {
              ar: data?.message_ar || "البريد الإلكتروني مسجل بالفعل",
              en: data?.message || "Email is already registered",
            }
          : null;

        const phoneErr = phoneExists
          ? {
              ar: data?.message_ar || "رقم الهاتف مسجل بالفعل",
              en: data?.message || "Phone number is already registered",
            }
          : null;

        setServerErrors({
          email: emailErr,
          phone: phoneErr,
        });

        if (emailExists && phoneExists) {
          setTopErrorObj({
            ar: data?.message_ar || "البريد الإلكتروني ورقم الهاتف مسجلان بالفعل",
            en: data?.message || "Email and phone number are already registered",
          });
        } else if (emailExists) {
          setTopErrorObj(emailErr);
        } else {
          setTopErrorObj(phoneErr);
        }

        setIsChecking(false);
        return;
      }

      // Neither exists! Available to proceed to next step
      setServerErrors({ email: null, phone: null });
      setFormData((prev) => ({ ...prev, country_code: selectedCountry.code }));
      setIsChecking(false);
      onNext();
    } catch (err) {
      console.error("Check exists failed:", err);
      setIsChecking(false);

      if (err.response?.status === 422 && err.response?.data) {
        const errData = err.response.data;
        const errObj = errData.errors || {};
        const emailMsg = errObj.email ? (Array.isArray(errObj.email) ? errObj.email[0] : errObj.email) : "";
        const phoneMsg = errObj.phone ? (Array.isArray(errObj.phone) ? errObj.phone[0] : errObj.phone) : "";

        setServerErrors({
          email: emailMsg ? { ar: "البريد الإلكتروني مسجل بالفعل أو غير صالح", en: "Email is invalid or registered" } : null,
          phone: phoneMsg ? { ar: "رقم الهاتف مسجل بالفعل أو غير صالح", en: "Phone number is invalid or registered" } : null,
        });

        setTopErrorObj({
          ar: errData.message_ar || "يرجى التحقق من صحة البيانات المدخلة",
          en: errData.message || "Please check your entered details",
        });
        return;
      }

      setTopErrorObj({
        ar: "تعذر التحقق من توفر البريد أو الهاتف. يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى.",
        en: "Unable to verify email/phone availability. Please check your connection and try again.",
      });
    }
  };

  return (
    <div className="w-full" dir={isEnglish ? 'ltr' : 'rtl'} suppressHydrationWarning>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-[#EB682C] mb-3">
          {isEnglish ? 'Create a New Account' : 'إنشاء حساب جديد'}
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto font-medium">
          {isEnglish
            ? 'Welcome! Create your account now to start your journey with us and enjoy opportunities and services.'
            : 'أهلاً بك! أنشئ حسابك الآن لتبدأ رحلتك معنا، واستمتع بالفرص والخدمات'}
        </p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        {topError && (
          <div className="bg-red-50 text-red-700 p-3.5 rounded-2xl text-sm font-bold border border-red-200 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{topError}</span>
          </div>
        )}

        {/* Name Field - Full Width */}
        <div className={`flex flex-col gap-1.5 ${isEnglish ? 'text-left' : 'text-right'} w-full`}>
          <label className="text-sm font-bold text-gray-800">
            {isEnglish ? 'Name' : 'الاسم'} <span className="text-red-500">*</span>
          </label>
          <div className={`relative flex items-center h-14 border rounded-2xl bg-white overflow-hidden transition-all ${
            touched.name && nameError
              ? 'border-red-500 focus-within:border-red-600'
              : touched.name && !nameError
              ? 'border-emerald-400 focus-within:border-emerald-500'
              : 'border-gray-200 focus-within:border-[#EB682C]'
          }`}>
            <User className={`absolute left-4 w-5 h-5 pointer-events-none transition-colors z-10 ${
              touched.name && nameError ? 'text-red-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (topErrorObj) setTopErrorObj(null);
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              placeholder={isEnglish ? 'Your full name' : 'الاسم الكامل'}
              className="w-full h-full px-4 pl-12 text-sm focus:outline-none bg-transparent font-medium rounded-2xl"
            />
          </div>
          {touched.name && nameError && (
            <p className={`text-xs font-bold text-red-500 mt-1 flex items-center gap-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{nameError}</span>
            </p>
          )}
        </div>

        {/* Email Field - Full Width */}
        <div className={`flex flex-col gap-1.5 ${isEnglish ? 'text-left' : 'text-right'} w-full`}>
          <label className="text-sm font-bold text-gray-800">
            {isEnglish ? 'Email Address' : 'البريد الالكتروني'} <span className="text-red-500">*</span>
          </label>
          <div className={`relative flex items-center h-14 border rounded-2xl bg-white overflow-hidden transition-all ${
            touched.email && emailError
              ? 'border-red-500 focus-within:border-red-600'
              : touched.email && !emailError
              ? 'border-emerald-400 focus-within:border-emerald-500'
              : 'border-gray-200 focus-within:border-[#EB682C]'
          }`}>
            <Mail className={`absolute left-4 w-5 h-5 pointer-events-none transition-colors z-10 ${
              touched.email && emailError ? 'text-red-500' : 'text-gray-400'
            }`} />
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (serverErrors.email) setServerErrors((prev) => ({ ...prev, email: null }));
                if (topErrorObj) setTopErrorObj(null);
              }}
              onBlur={handleEmailBlur}
              placeholder={isEnglish ? 'name@example.com' : 'البريد الالكتروني (مثال: name@domain.com)'}
              className="w-full h-full px-4 pl-12 text-sm focus:outline-none bg-transparent font-medium rounded-2xl"
              dir="ltr"
            />
          </div>
          {touched.email && emailError && (
            <p className={`text-xs font-bold text-red-500 mt-1 flex items-center gap-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{emailError}</span>
            </p>
          )}
          {touched.email && !emailError && formData.email && (
            <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{isEnglish ? "Email is valid & available" : "البريد الإلكتروني متاح وصحيح"}</span>
            </p>
          )}
        </div>

        {/* Row 2: Phone Number */}
        <div className={`flex flex-col gap-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <label className="text-sm font-bold text-gray-800">
            {isEnglish ? 'Phone Number' : 'رقم الهاتف'} <span className="text-red-500">*</span>
          </label>
          <div className={`flex flex-row-reverse h-14 border rounded-2xl relative bg-white transition-all ${
            touched.phone && phoneError
              ? 'border-red-500 focus-within:border-red-600'
              : touched.phone && !phoneError
              ? 'border-emerald-400 focus-within:border-emerald-500'
              : 'border-gray-200 focus-within:border-[#EB682C]'
          }`}>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.phone || ""}
              onKeyDown={(e) => {
                if (
                  [
                    'Backspace',
                    'Delete',
                    'Tab',
                    'Escape',
                    'Enter',
                    'ArrowLeft',
                    'ArrowRight',
                    'ArrowUp',
                    'ArrowDown',
                    'Home',
                    'End',
                  ].includes(e.key) ||
                  ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
                ) {
                  return;
                }
                if (!/^[0-9٠-٩]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const normalized = e.target.value.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
                const onlyDigits = normalized.replace(/\D/g, "");
                setFormData({ ...formData, phone: onlyDigits });
                if (serverErrors.phone) setServerErrors((prev) => ({ ...prev, phone: null }));
                if (topErrorObj) setTopErrorObj(null);
              }}
              onBlur={handlePhoneBlur}
              className={`flex-1 h-full px-4 text-sm focus:outline-none text-left bg-transparent font-medium ${
                isEnglish ? 'rounded-r-2xl' : 'rounded-l-2xl'
              }`}
              dir="ltr"
              placeholder="5xxxxxxx"
            />

            <div ref={countryPickerRef} className="relative h-full shrink-0">
              <button
                type="button"
                className={`h-full px-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors select-none ${
                  isEnglish
                    ? 'border-r border-gray-200 rounded-l-2xl'
                    : 'border-l border-gray-200 rounded-r-2xl'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCountries((prev) => !prev);
                }}
                aria-expanded={showCountries}
              >
                <span className="text-sm font-bold text-gray-700" dir="ltr">
                  {selectedCountry.code}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                    showCountries ? 'rotate-180' : ''
                  }`}
                />
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 shrink-0">
                  <img src={selectedCountry.flagUrl} alt={selectedCountry.name} className="w-full h-full object-cover" />
                </div>
              </button>

              {/* Dropdown */}
              {showCountries && (
                <div
                  className={`absolute top-[108%] ${
                    isEnglish ? 'left-0' : 'right-0'
                  } w-52 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto font-tajawal animate-in fade-in zoom-in-95 duration-150`}
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
                      <span className="text-sm font-bold text-gray-700" dir="ltr">
                        {country.code}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700 font-medium">
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
          {touched.phone && phoneError && (
            <p className={`text-xs font-bold text-red-500 mt-1 flex items-center gap-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{phoneError}</span>
            </p>
          )}
          {touched.phone && !phoneError && formData.phone && (
            <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{isEnglish ? "Phone number available" : "رقم الهاتف متاح للاستخدام"}</span>
            </p>
          )}
        </div>

        {/* Row 3: Password with Strength Meter */}
        <div className={`flex flex-col gap-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <label className="text-sm font-bold text-gray-800">
            {isEnglish ? 'Password' : 'كلمة المرور'} <span className="text-red-500">*</span>
          </label>
          <div className={`relative flex items-center h-14 border rounded-2xl bg-white overflow-hidden transition-all ${
            touched.password && passwordError
              ? 'border-red-500 focus-within:border-red-600'
              : passwordAnalysis.isConditionMet
              ? 'border-emerald-400 focus-within:border-emerald-500'
              : 'border-gray-200 focus-within:border-[#EB682C]'
          }`}>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 z-10"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password || ""}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (topErrorObj) setTopErrorObj(null);
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              placeholder="••••••••••••"
              className="w-full h-full px-4 pl-12 text-sm focus:outline-none bg-transparent text-left tracking-widest font-medium rounded-2xl"
              dir="ltr"
            />
          </div>

          {/* 3 Requirement Lines stacked vertically, only shown when typing starts */}
          {Boolean(formData.password && formData.password.length > 0) && (
            <div className="flex flex-col gap-2 mt-2.5 p-3 rounded-2xl bg-gray-50/80 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
              {/* 1. Letters Line */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs min-w-[105px] shrink-0 font-bold flex items-center gap-1.5 transition-colors ${
                    isEnglish ? 'text-left justify-start' : 'text-right justify-start'
                  } ${
                    passwordAnalysis.hasLetters ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  <Check
                    className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                      passwordAnalysis.hasLetters ? 'opacity-100 text-emerald-500' : 'opacity-0'
                    }`}
                  />
                  <span className="whitespace-nowrap">{isEnglish ? 'Letters' : 'أحرف'}</span>
                </span>
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    passwordAnalysis.hasLetters
                      ? 'bg-emerald-500 shadow-xs shadow-emerald-500/20'
                      : 'bg-gray-200'
                  }`}
                />
              </div>

              {/* 2. Numbers Line */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs min-w-[105px] shrink-0 font-bold flex items-center gap-1.5 transition-colors ${
                    isEnglish ? 'text-left' : 'text-right'
                  } ${
                    passwordAnalysis.hasNumbers ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  <Check
                    className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                      passwordAnalysis.hasNumbers ? 'opacity-100 text-emerald-500' : 'opacity-0'
                    }`}
                  />
                  <span className="whitespace-nowrap">{isEnglish ? 'Numbers' : 'أرقام'}</span>
                </span>
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    passwordAnalysis.hasNumbers
                      ? 'bg-emerald-500 shadow-xs shadow-emerald-500/20'
                      : 'bg-gray-200'
                  }`}
                />
              </div>

              {/* 3. Min Length Line */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs min-w-[105px] shrink-0 font-bold flex items-center gap-1.5 transition-colors ${
                    isEnglish ? 'text-left' : 'text-right'
                  } ${
                    passwordAnalysis.hasMinLength ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  <Check
                    className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                      passwordAnalysis.hasMinLength ? 'opacity-100 text-emerald-500' : 'opacity-0'
                    }`}
                  />
                  <span className="whitespace-nowrap">{isEnglish ? '6+ Characters' : '6+ خانات'}</span>
                </span>
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    passwordAnalysis.hasMinLength
                      ? 'bg-emerald-500 shadow-xs shadow-emerald-500/20'
                      : 'bg-gray-200'
                  }`}
                />
              </div>

              {/* Strength status label */}
              <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 mt-0.5">
                <span className={`text-xs font-bold transition-colors ${passwordAnalysis.textColor}`}>
                  {passwordAnalysis.label}
                </span>
              </div>
            </div>
          )}

          {touched.password && passwordError && (
            <p className={`text-xs font-bold text-red-500 mt-1 flex items-center gap-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{passwordError}</span>
            </p>
          )}
        </div>

        {/* Row 4: Confirm Password */}
        <div className={`flex flex-col gap-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <label className="text-sm font-bold text-gray-800">
            {isEnglish ? 'Confirm Password' : 'تأكيد كلمة المرور'} <span className="text-red-500">*</span>
          </label>
          <div className={`relative flex items-center h-14 border rounded-2xl bg-white overflow-hidden transition-all ${
            touched.confirmPassword && confirmPasswordError
              ? 'border-red-500 focus-within:border-red-600'
              : confirmPassword && !confirmPasswordError
              ? 'border-emerald-400 focus-within:border-emerald-500'
              : 'border-gray-200 focus-within:border-[#EB682C]'
          }`}>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 z-10"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (topErrorObj) setTopErrorObj(null);
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
              placeholder="••••••••••••"
              className="w-full h-full px-4 pl-12 text-sm focus:outline-none bg-transparent text-left tracking-widest font-medium rounded-2xl"
              dir="ltr"
            />
          </div>
          {touched.confirmPassword && confirmPasswordError && (
            <p className={`text-xs font-bold text-red-500 mt-1 flex items-center gap-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{confirmPasswordError}</span>
            </p>
          )}
          {confirmPassword && !confirmPasswordError && formData.password && (
            <p className="text-xs font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{isEnglish ? "Passwords match" : "كلمتا المرور متطابقتان"}</span>
            </p>
          )}
        </div>

        {/* Row 5: Terms and Conditions */}
        <div className={`flex flex-col gap-1 mt-1 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none group py-1">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                if (termsError) setTermsError("");
                if (topErrorObj?.ar?.includes("الشروط") || topErrorObj?.en?.includes("Terms")) {
                  setTopErrorObj(null);
                }
              }}
              className="w-4 h-4 rounded text-[#EB682C] focus:ring-[#EB682C] focus:ring-offset-0 border-gray-300 accent-[#EB682C] cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">
              {isEnglish ? (
                <>
                  I agree to the{" "}
                  <Link
                    href="/conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#EB682C] underline hover:text-[#d65a22] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms & Conditions
                  </Link>
                </>
              ) : (
                <>
                  أوافق على{" "}
                  <Link
                    href="/conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#EB682C] underline hover:text-[#d65a22] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    الشروط والأحكام
                  </Link>
                </>
              )}
            </span>
          </label>
          {termsError && (
            <p className={`text-xs font-bold text-red-500 flex items-center gap-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{termsError}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isChecking}
          className="w-full bg-[#de6d3a] text-white py-4 rounded-2xl font-black hover:bg-[#d65a22] transition-all hover:scale-[1.01] active:scale-98 mt-4 text-lg shadow-md shadow-orange-500/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isChecking ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{isEnglish ? 'Checking availability...' : 'جاري التحقق من البيانات...'}</span>
            </>
          ) : (
            <span>{isEnglish ? 'Create Account' : 'انشاء الحساب'}</span>
          )}
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
