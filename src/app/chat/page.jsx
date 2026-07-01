"use client";
import React from 'react';
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import LiveChat from "@/components/chat/LiveChat";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserChatPage() {
  const { isEnglish } = useLanguage();
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9FAFC] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB682C]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F9FAFC] flex flex-col font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar />

      <div className="flex-grow p-2 md:p-8 max-w-7xl mx-auto w-full">
        <LiveChat heightClass="h-[calc(100vh-140px)] min-h-[600px]" />
      </div>

      <Footer />
    </div>
  );
}
