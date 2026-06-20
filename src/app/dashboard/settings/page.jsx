"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, User } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import PersonalInfo from "./PersonalInfo";
import CompanyInfo from "./CompanyInfo";
import Popup from "@/components/Popup";

export default function SettingsPage() {
  const router = useRouter();
  const { user, refetchUser } = useAuth();
  const { isEnglish } = useLanguage();
  const [activeTab, setActiveTab] = useState("personal"); // 'personal' or 'company'
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [popupState, setPopupState] = useState({ isOpen: false, type: "", title: "", message: "", onConfirm: null });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setPopupState({
        isOpen: true,
        type: "alert",
        title: isEnglish ? "File too large" : "حجم الملف كبير",
        message: isEnglish ? "Image size must not exceed 2MB" : "يجب ألا يتجاوز حجم الصورة 2 ميجابايت",
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await api.post("/auth/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (refetchUser) {
        await refetchUser();
      }

      setPopupState({
        isOpen: true,
        type: "success",
        title: isEnglish ? "Success" : "نجاح",
        message: isEnglish ? "Profile picture updated successfully" : "تم تحديث الصورة الشخصية بنجاح",
        onConfirm: () => {
          setPopupState({ ...popupState, isOpen: false });
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
      setPopupState({
        isOpen: true,
        type: "danger",
        title: isEnglish ? "Error" : "خطأ",
        message: error.response?.data?.message || (isEnglish ? "An error occurred while updating the profile picture" : "حدث خطأ أثناء تحديث الصورة الشخصية"),
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="font-tajawal max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-12" dir={isEnglish ? 'ltr' : 'rtl'}>
      {/* Header */}
      <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} justify-between items-center mb-8`}>
        <h1 className={`text-2xl font-bold text-gray-900 flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center gap-2`}>
          {isEnglish ? 'Account Settings' : 'إعدادات الحساب'}
        </h1>
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
        >
          <ArrowLeft className={`w-5 h-5 ${isEnglish ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Avatar Section */}
      <div className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center justify-between`}>
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center gap-4`}>
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
          </div>
          <div className={isEnglish ? 'text-left' : 'text-right'}>
            <h3 className="font-bold text-gray-900 mb-1">{isEnglish ? 'Profile Picture' : 'صورة الملف الشخصي'}</h3>
            <p className="text-xs text-gray-500">{isEnglish ? 'Minimum 400x400px, PNG or JPEG format' : 'الحد الأدنى 400x400 بكسل، بصيغة PNG أو JPEG'}</p>
          </div>
        </div>

        <div>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <button 
            onClick={handleAvatarClick}
            disabled={isUploading}
            className="bg-[#EB682C] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#d65a22] transition-colors disabled:opacity-50"
          >
            {isUploading ? (isEnglish ? "Uploading..." : "جاري الرفع...") : (isEnglish ? "Change Profile Picture" : "تغيير صورة الملف الشخصي")}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`bg-gray-50/50 border border-gray-100 p-1 rounded-xl flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-2`}>
        <button 
          onClick={() => setActiveTab("personal")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${
            activeTab === "personal" 
              ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          }`}
        >
          {isEnglish ? 'Personal Information' : 'المعلومات الشخصية'}
        </button>
        <button 
          onClick={() => setActiveTab("company")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${
            activeTab === "company" 
              ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          }`}
        >
          {isEnglish ? 'Company Information' : 'معلومات الشركة'}
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {activeTab === "personal" ? <PersonalInfo user={user} refetchUser={refetchUser} /> : <CompanyInfo user={user} refetchUser={refetchUser} />}
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
