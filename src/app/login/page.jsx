"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { Mail, EyeOff, Eye, Loader2 } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { isEnglish } = useLanguage();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const res = await login(email, password);
    if (res.success) {
      router.push("/dashboard");
    } else {
      setError(res.error);
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">{isEnglish ? 'Sign In' : 'تسجيل الدخول'}</h1>
        <p className="text-gray-500 text-sm">
          {isEnglish ? 'Welcome! Sign in to start a seamless and exceptional experience.' : 'مرحباً بك! سجّل دخولك لتبدأ تجربة سلسة ومميزة'}
        </p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold border border-red-100 text-right">
            {error}
          </div>
        )}

        <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <label className="text-sm font-bold text-gray-700">
            {isEnglish ? 'Email Address' : 'البريد الالكتروني'}
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={isEnglish ? 'Email Address' : 'البريد الالكتروني'}
              className={`w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'}`}
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="w-full h-14 px-4 pl-12 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-left tracking-widest"
              dir="ltr"
            />
          </div>
        </div>

        <div className="flex justify-end mt-[-10px]">
          <Link href="/forgot-password" className="text-xs font-bold text-[#2A5CBA] hover:underline">
            {isEnglish ? 'Forgot your password?' : 'هل نسيت كلمة المرور؟'}
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#de6d3a] text-white py-4 rounded-2xl font-bold hover:bg-[#d65a22] transition-colors mt-6 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isEnglish ? 'Sign In' : 'تسجيل الدخول')}
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">{isEnglish ? "Don't have an account? " : "ليس لديك حساب؟ "}</span>
        <Link href="/register" className="font-bold text-[#EB682C] hover:underline">
          {isEnglish ? 'Create a new account' : 'إنشاء حساب جديد'}
        </Link>
      </div>
    </AuthLayout>
  );
}
