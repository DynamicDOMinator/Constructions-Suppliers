"use client";
import { useState } from "react";
import { Edit } from "lucide-react";
import api from "@/lib/axios";
import Popup from "@/components/Popup";
import { useLanguage } from "@/context/LanguageContext";

export default function PersonalInfo({ user, refetchUser }) {
  const { isEnglish } = useLanguage();
  // We assume user object has a "name" property but the design splits it.
  // We'll split the name string for the UI.
  const [firstName, setFirstName] = useState(user?.name ? user.name.split(" ")[0] : "");
  const [lastName, setLastName] = useState(user?.name ? user.name.split(" ").slice(1).join(" ") : "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [language, setLanguage] = useState(user?.language || "ar"); // Assuming 'ar' is default if none

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const [popupState, setPopupState] = useState({ isOpen: false, type: "", title: "", message: "", onConfirm: null });

  const handleSaveInfo = async () => {
    setIsLoadingInfo(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await api.post("/auth/profile/update", {
        name: fullName,
        phone,
        language
      });
      
      if (refetchUser) {
        await refetchUser();
      }

      setIsEditingInfo(false);
      setPopupState({
        isOpen: true,
        type: "success",
        title: isEnglish ? "Saved" : "تم الحفظ",
        message: isEnglish ? "Personal information updated successfully" : "تم تحديث المعلومات الشخصية بنجاح",
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
    } catch (err) {
      console.error("Failed to update profile:", err);
      setPopupState({
        isOpen: true,
        type: "danger",
        title: isEnglish ? "Error" : "خطأ",
        message: err.response?.data?.message || (isEnglish ? "An error occurred while updating data" : "حدث خطأ أثناء تحديث البيانات"),
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
    } finally {
      setIsLoadingInfo(false);
    }
  };

  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPopupState({
        isOpen: true,
        type: "alert",
        title: isEnglish ? "Alert" : "تنبيه",
        message: isEnglish ? "New passwords do not match" : "كلمات المرور الجديدة غير متطابقة",
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
      return;
    }

    setIsLoadingPassword(true);
    try {
      await api.post("/auth/profile/password", {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      });
      setIsEditingPassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPopupState({
        isOpen: true,
        type: "success",
        title: isEnglish ? "Saved" : "تم الحفظ",
        message: isEnglish ? "Password changed successfully" : "تم تغيير كلمة المرور بنجاح",
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
    } catch (err) {
      console.error("Failed to update password:", err);
      setPopupState({
        isOpen: true,
        type: "danger",
        title: isEnglish ? "Error" : "خطأ",
        message: err.response?.data?.message || (isEnglish ? "An error occurred while changing password" : "حدث خطأ أثناء تغيير كلمة المرور"),
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
    } finally {
      setIsLoadingPassword(false);
    }
  };

  return (
    <div className={isEnglish ? 'text-left' : 'text-right'}>
      {/* Personal Info Section */}
      <div className="p-8 border-b border-gray-100">
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} justify-between items-center mb-6`}>
          <h2 className="text-xl font-bold text-gray-900">{isEnglish ? 'Personal Information' : 'المعلومات الشخصية'}</h2>
          {!isEditingInfo && (
            <button 
              onClick={() => setIsEditingInfo(true)}
              className="text-[#EB682C] hover:text-[#ad400d] text-sm font-bold flex items-center gap-1 transition-colors"
            >
              <Edit className="w-4 h-4" />
              {isEnglish ? 'Edit' : 'تعديل'}
            </button>
          )}
        </div>

        {isEditingInfo ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'First Name' : 'الاسم الأول'}</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'First Name' : 'الاسم الأول'}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Last Name' : 'الاسم الأخير'}</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'Last Name' : 'الاسم الأخير'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Phone Number' : 'رقم الهاتف'}</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder="+966"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Language' : 'اللغة'}</label>
                <div className="relative">
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none appearance-none"
                  >
                    <option value="ar">عربي</option>
                    <option value="en">English</option>
                  </select>
                  <div className={`absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 pointer-events-none`}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-4 pt-4`}>
              <button 
                onClick={handleSaveInfo}
                disabled={isLoadingInfo}
                className="flex-1 bg-[#EB682C] text-white py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors disabled:opacity-50"
              >
                {isLoadingInfo ? (isEnglish ? "Saving..." : "جاري الحفظ...") : (isEnglish ? "Save" : "حفظ")}
              </button>
              <button 
                onClick={() => {
                  setIsEditingInfo(false);
                  // Reset states
                  setFirstName(user?.name ? user.name.split(" ")[0] : "");
                  setLastName(user?.name ? user.name.split(" ").slice(1).join(" ") : "");
                  setPhone(user?.phone || "");
                  setLanguage(user?.language || "ar");
                }}
                className="flex-1 bg-white text-gray-700 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                {isEnglish ? 'Cancel' : 'إلغاء'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'First Name' : 'الاسم الأول'}</p>
              <p className="text-sm font-bold text-gray-900">{firstName || "-"}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Last Name' : 'الاسم الأخير'}</p>
              <p className="text-sm font-bold text-gray-900">{lastName || "-"}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Phone Number' : 'رقم الهاتف'}</p>
              <p className="text-sm font-bold text-gray-900" dir="ltr">{phone || "-"}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Language' : 'اللغة'}</p>
              <p className="text-sm font-bold text-gray-900">{language === 'en' ? 'English' : 'عربي'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Email & Password Section */}
      <div className="p-8">
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} justify-between items-center mb-6`}>
          <h2 className="text-xl font-bold text-gray-900">{isEnglish ? 'Email and Password' : 'البريد الالكتروني وكلمة المرور'}</h2>
          {!isEditingPassword && (
            <button 
              onClick={() => setIsEditingPassword(true)}
              className="text-[#EB682C] hover:text-[#ad400d] text-sm font-bold flex items-center gap-1 transition-colors"
            >
              <Edit className="w-4 h-4" />
              {isEnglish ? 'Edit' : 'تعديل'}
            </button>
          )}
        </div>

        {isEditingPassword ? (
          <div className="space-y-6" dir={isEnglish ? 'ltr' : 'rtl'}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Old Password' : 'كلمة المرور القديمة'}</label>
              <input 
                type="password" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                placeholder="••••••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isEnglish ? 'New Password' : 'كلمة المرور الجديدة'}</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                placeholder="••••••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Confirm New Password' : 'تأكيد كلمة المرور الجديدة'}</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                placeholder="••••••••••••"
              />
            </div>

            <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-4 pt-4`}>
              <button 
                onClick={handleSavePassword}
                disabled={isLoadingPassword}
                className="flex-1 bg-[#EB682C] text-white py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors disabled:opacity-50"
              >
                {isLoadingPassword ? (isEnglish ? "Saving..." : "جاري الحفظ...") : (isEnglish ? "Save" : "حفظ")}
              </button>
              <button 
                onClick={() => setIsEditingPassword(false)}
                className="flex-1 bg-white text-gray-700 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                {isEnglish ? 'Cancel' : 'إلغاء'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button className="text-[#4F46E5] text-sm font-bold hover:underline">
                {isEnglish ? 'Forgot Password?' : 'هل نسيت كلمة المرور'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Email Address' : 'البريد الإلكتروني'}</p>
              <p className="text-sm font-bold text-gray-900">{user?.email || "-"}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Password' : 'كلمة المرور'}</p>
              <p className="text-sm font-bold text-gray-900 tracking-widest">••••••••••••</p>
            </div>
          </div>
        )}
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
