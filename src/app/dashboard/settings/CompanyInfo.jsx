"use client";
import { useState, useRef } from "react";
import { Edit, Upload } from "lucide-react";
import api from "@/lib/axios";
import Popup from "@/components/Popup";
import { useLanguage } from "@/context/LanguageContext";

export default function CompanyInfo({ user, refetchUser }) {
  const { isEnglish } = useLanguage();
  // We assume the company data might be in user.company or directly on the user for a company account.
  // We'll provide standard states.
  const [companyName, setCompanyName] = useState(user?.company_profile?.company_name || "");
  const [workField, setWorkField] = useState(user?.company_profile?.work_field || "");
  const [bio, setBio] = useState(user?.company_profile?.bio || "");
  const [location, setLocation] = useState(user?.company_profile?.location || "");
  const [licenseNumber, setLicenseNumber] = useState(user?.company_profile?.license_number || "");
  const [taxNumber, setTaxNumber] = useState(user?.company_profile?.tax_number || "");
  const [googleMapsLink, setGoogleMapsLink] = useState(user?.company_profile?.google_maps_link || "");
  const [website, setWebsite] = useState(user?.company_profile?.website || "");
  
  const [taxFile, setTaxFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);

  const [facebook, setFacebook] = useState(user?.socials?.facebook || "");
  const [instagram, setInstagram] = useState(user?.socials?.instagram || "");
  const [snapchat, setSnapchat] = useState(user?.socials?.snapchat || "");
  const [tiktok, setTiktok] = useState(user?.socials?.tiktok || "");

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isLoadingSocial, setIsLoadingSocial] = useState(false);

  const [popupState, setPopupState] = useState({ isOpen: false, type: "", title: "", message: "", onConfirm: null });

  const handleSaveInfo = async () => {
    setIsLoadingInfo(true);
    try {
      const formData = new FormData();
      formData.append("company_name", companyName);
      formData.append("work_field", workField);
      formData.append("bio", bio);
      formData.append("location", location);
      formData.append("license_number", licenseNumber);
      formData.append("tax_number", taxNumber);
      formData.append("website", website);
      formData.append("google_maps_link", googleMapsLink);
      
      if (taxFile) formData.append("tax_file", taxFile);
      if (licenseFile) formData.append("license_file", licenseFile);

      await api.post("/auth/profile/company", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (refetchUser) {
        await refetchUser();
      }

      setIsEditingInfo(false);
      setPopupState({
        isOpen: true,
        type: "success",
        title: isEnglish ? "Saved" : "تم الحفظ",
        message: isEnglish ? "Company information updated successfully" : "تم تحديث معلومات الشركة بنجاح",
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
    } catch (err) {
      console.error("Failed to update company info:", err);
      setPopupState({
        isOpen: true,
        type: "danger",
        title: isEnglish ? "Error" : "خطأ",
        message: err.response?.data?.message || (isEnglish ? "An error occurred while updating company info" : "حدث خطأ أثناء تحديث بيانات الشركة"),
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
    } finally {
      setIsLoadingInfo(false);
    }
  };

  const handleSaveSocial = async () => {
    setIsLoadingSocial(true);
    try {
      await api.post("/auth/profile/socials", {
        facebook,
        instagram,
        snapchat,
        tiktok
      });
      setIsEditingSocial(false);
      setPopupState({
        isOpen: true,
        type: "success",
        title: isEnglish ? "Saved" : "تم الحفظ",
        message: isEnglish ? "Socials updated successfully" : "تم تحديث وسائل التواصل بنجاح",
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
    } catch (err) {
      console.error("Failed to update social info:", err);
      setPopupState({
        isOpen: true,
        type: "danger",
        title: isEnglish ? "Error" : "خطأ",
        message: err.response?.data?.message || (isEnglish ? "An error occurred while updating socials" : "حدث خطأ أثناء تحديث وسائل التواصل"),
        onConfirm: () => setPopupState({ ...popupState, isOpen: false })
      });
    } finally {
      setIsLoadingSocial(false);
    }
  };

  return (
    <div className={isEnglish ? 'text-left' : 'text-right'}>
      {/* Company Info Section */}
      <div className="p-8 border-b border-gray-100">
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} justify-between items-center mb-6`}>
          <h2 className="text-xl font-bold text-gray-900">{isEnglish ? 'Company Information' : 'معلومات الشركة'}</h2>
          {!isEditingInfo && (
            <button 
              onClick={() => setIsEditingInfo(true)}
              className="text-[#EB682C] hover:text-[#4338ca] text-sm font-bold flex items-center gap-1 transition-colors"
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
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Company Name' : 'اسم الشركة'}</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'Company Name' : 'اسم الشركة'}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Field of Work' : 'مجال عمل الشركة'}</label>
                <input 
                  type="text" 
                  value={workField}
                  onChange={(e) => setWorkField(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'Field of Work' : 'مجال العمل'}
                />
              </div>
            </div>

            <div className="space-y-2" dir={isEnglish ? 'ltr' : 'rtl'}>
              <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Company Bio' : 'نبذة تعريفية عن الشركة'}</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-24 p-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none resize-none"
                placeholder={isEnglish ? 'Company Bio' : 'نبذة عن الشركة'}
              />
            </div>

            <div className="space-y-2" dir={isEnglish ? 'ltr' : 'rtl'}>
              <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Company Location' : 'موقع الشركة'}</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                placeholder={isEnglish ? 'Saudi Arabia, Riyadh' : 'السعودية، الرياض'}
              />
            </div>

            <div className="space-y-2" dir={isEnglish ? 'ltr' : 'rtl'}>
              <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Location Map Link' : 'رابط خريطة الموقع'}</label>
              <input 
                type="text" 
                value={googleMapsLink}
                onChange={(e) => setGoogleMapsLink(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                placeholder={isEnglish ? 'Google Maps Link' : 'رابط الموقع على جوجل ماب'}
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Tax Number' : 'رقم السجل الضريبي'}</label>
                <input 
                  type="text" 
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'Tax Number' : 'رقم السجل الضريبي'}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'License Number' : 'رقم الترخيص'}</label>
                <input 
                  type="text" 
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'License Number' : 'رقم الترخيص'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Tax Record' : 'السجل الضريبي'}</label>
                <div className="border-2 border-dashed border-[#EB682C]/30 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-orange-50/50 hover:bg-orange-50 transition-colors cursor-pointer relative">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setTaxFile(e.target.files?.[0])} accept=".pdf,.png,.jpg,.jpeg" />
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-[#EB682C]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-gray-700">{isEnglish ? 'Drag your files here or ' : 'اسحب ملفاتك هنا او '}<span className="text-[#EB682C]">{isEnglish ? 'click to upload' : 'اضغط لرفع الملفات'}</span></p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF (max. 800x400px)</p>
                  {taxFile && <p className="text-sm text-green-600 mt-2 font-bold">{taxFile.name}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Commercial License' : 'رخصة تجارية'}</label>
                <div className="border-2 border-dashed border-[#EB682C]/30 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-orange-50/50 hover:bg-orange-50 transition-colors cursor-pointer relative">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setLicenseFile(e.target.files?.[0])} accept=".pdf,.png,.jpg,.jpeg" />
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-[#EB682C]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-gray-700">{isEnglish ? 'Drag your files here or ' : 'اسحب ملفاتك هنا او '}<span className="text-[#EB682C]">{isEnglish ? 'click to upload' : 'اضغط لرفع الملفات'}</span></p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF (max. 800x400px)</p>
                  {licenseFile && <p className="text-sm text-green-600 mt-2 font-bold">{licenseFile.name}</p>}
                </div>
              </div>
            </div>

            <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-4 pt-4`}>
              <button 
                onClick={handleSaveInfo}
                disabled={isLoadingInfo}
                className="flex-1 bg-[#EB682C] text-white py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors disabled:opacity-50"
              >
                {isLoadingInfo ? (isEnglish ? 'Saving...' : 'جاري الحفظ...') : (isEnglish ? 'Save' : 'حفظ')}
              </button>
              <button 
                onClick={() => setIsEditingInfo(false)}
                className="flex-1 bg-white text-gray-700 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                {isEnglish ? 'Cancel' : 'إلغاء'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Company Name' : 'اسم الشركة'}</p>
              <p className="text-sm font-bold text-gray-900">{companyName || "-"}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Field of Work' : 'مجال الشركة'}</p>
              <p className="text-sm font-bold text-gray-900">{workField || "-"}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Company Location' : 'موقع الشركة'}</p>
              <p className="text-sm font-bold text-gray-900">{location || "-"}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'License Number' : 'رقم الترخيص'}</p>
              <p className="text-sm font-bold text-gray-900">{licenseNumber || "-"}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 md:col-span-2">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Tax Number' : 'رقم السجل الضريبي'}</p>
              <p className="text-sm font-bold text-gray-900">{taxNumber || "-"}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 md:col-span-3">
              <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Company Bio' : 'نبذة تعريفية'}</p>
              <p className="text-sm text-gray-900 leading-relaxed">{bio || "-"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Social Media Section */}
      <div className="p-8">
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} justify-between items-center mb-6`}>
          <h2 className="text-xl font-bold text-gray-900">{isEnglish ? 'Social Media' : 'وسائل التواصل'}</h2>
          {!isEditingSocial && (
            <button 
              onClick={() => setIsEditingSocial(true)}
              className="text-[#EB682C] hover:text-[#ad400d] text-sm font-bold flex items-center gap-1 transition-colors"
            >
              <Edit className="w-4 h-4" />
              {isEnglish ? 'Edit' : 'تعديل'}
            </button>
          )}
        </div>

        {isEditingSocial ? (
          <div className="space-y-6" dir={isEnglish ? 'ltr' : 'rtl'}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Website Link' : 'رابط الموقع الإلكتروني'}</label>
              <input 
                type="text" 
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                placeholder="https://"
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Facebook' : 'فيس بوك'}</label>
                <input 
                  type="text" 
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'Facebook Link' : 'رابط فيسبوك'}
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Instagram' : 'انستجرام'}</label>
                <input 
                  type="text" 
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'Instagram Link' : 'رابط انستجرام'}
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Snapchat' : 'سناب شات'}</label>
                <input 
                  type="text" 
                  value={snapchat}
                  onChange={(e) => setSnapchat(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'Snapchat Link' : 'رابط سناب شات'}
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'TikTok' : 'تيك توك'}</label>
                <input 
                  type="text" 
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#EB682C] focus:ring-4 focus:ring-[#EB682C]/10 transition-all outline-none"
                  placeholder={isEnglish ? 'TikTok Link' : 'رابط تيك توك'}
                  dir="ltr"
                />
              </div>
            </div>

            <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-4 pt-4`}>
              <button 
                onClick={handleSaveSocial}
                disabled={isLoadingSocial}
                className="flex-1 bg-[#EB682C] text-white py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors disabled:opacity-50"
              >
                {isLoadingSocial ? (isEnglish ? "Saving..." : "جاري الحفظ...") : (isEnglish ? "Save" : "حفظ")}
              </button>
              <button 
                onClick={() => setIsEditingSocial(false)}
                className="flex-1 bg-white text-gray-700 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                {isEnglish ? 'Cancel' : 'إلغاء'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex items-center justify-between group">
              <div>
                <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Facebook' : 'فيسبوك'}</p>
                <a href={facebook || "#"} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-900 group-hover:text-[#EB682C] transition-colors truncate block w-32">
                  {facebook || "-"}
                </a>
              </div>
              {facebook && <div className="w-8 h-8 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center group-hover:scale-110 transition-transform">📘</div>}
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex items-center justify-between group">
              <div>
                <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Instagram' : 'انستجرام'}</p>
                <a href={instagram || "#"} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-900 group-hover:text-[#EB682C] transition-colors truncate block w-32">
                  {instagram || "-"}
                </a>
              </div>
              {instagram && <div className="w-8 h-8 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center group-hover:scale-110 transition-transform">📸</div>}
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex items-center justify-between group">
              <div>
                <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Snapchat' : 'سناب شات'}</p>
                <a href={snapchat || "#"} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-900 group-hover:text-[#EB682C] transition-colors truncate block w-32">
                  {snapchat || "-"}
                </a>
              </div>
              {snapchat && <div className="w-8 h-8 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center group-hover:scale-110 transition-transform">👻</div>}
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex items-center justify-between group">
              <div>
                <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'TikTok' : 'تيك توك'}</p>
                <a href={tiktok || "#"} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-900 group-hover:text-[#EB682C] transition-colors truncate block w-32">
                  {tiktok || "-"}
                </a>
              </div>
              {tiktok && <div className="w-8 h-8 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center group-hover:scale-110 transition-transform">🎵</div>}
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex items-center justify-between group md:col-span-2 lg:col-span-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Website Link' : 'الموقع الإلكتروني'}</p>
                <a href={website || "#"} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-900 group-hover:text-[#EB682C] transition-colors truncate block w-full">
                  {website || "-"}
                </a>
              </div>
              {website && <div className="w-8 h-8 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center group-hover:scale-110 transition-transform">🔗</div>}
            </div>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex items-center justify-between group md:col-span-2 lg:col-span-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">{isEnglish ? 'Map Link' : 'خريطة الموقع'}</p>
                <a href={googleMapsLink || "#"} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-900 group-hover:text-[#EB682C] transition-colors truncate block w-full">
                  {googleMapsLink || "-"}
                </a>
              </div>
              {googleMapsLink && <div className="w-8 h-8 rounded-full bg-orange-50 text-[#EB682C] flex items-center justify-center group-hover:scale-110 transition-transform">🗺️</div>}
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
