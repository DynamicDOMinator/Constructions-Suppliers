"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Popup({ isOpen, title, message, type = "confirm", onConfirm, onCancel }) {
  const { isEnglish } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-in fade-in" dir={isEnglish ? "ltr" : "rtl"}>
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-xl transform transition-all scale-in-95 font-tajawal">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-[#EB682C]'}`}>
           {type === 'danger' ? (
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
           ) : type === 'success' ? (
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
             </svg>
           ) : (
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 text-sm">{message}</p>
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-3 justify-center`}>
          {type === 'alert' || type === 'success' ? (
            <button onClick={onConfirm} className="px-6 py-2.5 bg-[#EB682C] text-white font-bold rounded-xl hover:bg-[#d65a22] transition-colors w-full">
              {isEnglish ? "OK" : "حسناً"}
            </button>
          ) : (
            <>
              <button onClick={onCancel} className="flex-1 px-4 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                {isEnglish ? "Cancel" : "إلغاء"}
              </button>
              <button onClick={onConfirm} className={`flex-1 px-4 py-3 text-white font-bold rounded-xl transition-colors ${type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#EB682C] hover:bg-[#d65a22]'}`}>
                {isEnglish ? "Yes, confirm" : "نعم، متأكد"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
