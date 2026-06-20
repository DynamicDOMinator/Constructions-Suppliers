"use client";
import { useState, useEffect, useRef } from "react";
import { UploadCloud, ChevronDown, MoreVertical, Trash2, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";
import Popup from "@/components/Popup";

export default function AdsPage() {
  const { isEnglish } = useLanguage();
  
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Form State
  const [adName, setAdName] = useState("");
  const [adImage, setAdImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const [popupState, setPopupState] = useState({ isOpen: false, type: "", title: "", message: "", onConfirm: null });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/ads/my");
      // The API returns an array directly, or sometimes wrapped in data. We'll handle both.
      const fetchedAds = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      // Filter out nulls if any
      setAds(fetchedAds.filter(ad => ad !== null));
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAdImage(e.target.files[0]);
    }
  };

  const handleSubmitAd = async () => {
    if (!adName || !adImage) {
      return showPopup("تنبيه", "الرجاء إدخال اسم الإعلان واختيار صورة", "alert");
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", adName);
      formData.append("image", adImage);

      const res = await api.post("/auth/ads", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      showPopup("نجاح", res.data?.message || "تم إرسال الإعلان بنجاح.", "success");
      
      // Reset form
      setAdName("");
      setAdImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      fetchAds();
    } catch (error) {
      console.error("Failed to submit ad:", error);
      showPopup("خطأ", error.response?.data?.message || "حدث خطأ أثناء إرسال الإعلان", "danger");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAd = async (uuid) => {
    if (!window.confirm(isEnglish ? "Are you sure you want to delete this ad?" : "هل أنت متأكد من حذف هذا الإعلان؟")) {
      return;
    }

    try {
      const res = await api.delete(`/auth/ads/${uuid}`);
      showPopup("نجاح", res.data?.message || "تم حذف الإعلان بنجاح", "success");
      setActiveDropdown(null);
      fetchAds();
    } catch (error) {
      console.error("Failed to delete ad:", error);
      showPopup("خطأ", error.response?.data?.message || "حدث خطأ أثناء حذف الإعلان", "danger");
    }
  };

  const showPopup = (title, message, type) => {
    setPopupState({
      isOpen: true,
      title: isEnglish ? title : title,
      message: message,
      type: type,
      onConfirm: () => setPopupState({ ...popupState, isOpen: false })
    });
  };

  return (
    <div className={`font-tajawal max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 ${isEnglish ? 'ltr' : 'rtl'}`}>
      
      {/* Header */}
      <div className={isEnglish ? 'text-left' : 'text-right'}>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{isEnglish ? 'Ads' : 'الاعلانات'}</h1>
        <p className="text-sm text-gray-500">{isEnglish ? 'Upload and manage your advertisements.' : 'قم برفع وإدارة اعلاناتك.'}</p>
      </div>

      {/* Add Ad Form Section */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className={`flex flex-col ${isEnglish ? 'text-left' : 'text-right'} gap-2`}>
              <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Ad Name' : 'اسم الاعلان'}</label>
              <input 
                type="text" 
                value={adName}
                onChange={(e) => setAdName(e.target.value)}
                placeholder={isEnglish ? 'Ad Name' : 'مثال: عرض الصيف'} 
                className={`w-full h-14 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'}`} 
              />
            </div>
            
            <div className={`flex ${isEnglish ? 'justify-start' : 'justify-end'} mt-2`}>
              <button 
                onClick={handleSubmitAd}
                disabled={submitting || !adName || !adImage}
                className="bg-[#EB682C] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {submitting ? (isEnglish ? 'Uploading...' : 'جاري الرفع...') : (isEnglish ? 'Upload Ad' : 'رفع الإعلان')}
              </button>
            </div>
          </div>

          <div className={`flex flex-col ${isEnglish ? 'text-left' : 'text-right'} gap-2`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Upload your ad image' : 'ارفع صورة الاعلان الخاص بك'}</label>
            <div 
              className="relative border-2 border-dashed border-[#EB682C]/30 bg-[#EB682C]/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-[#EB682C]/10 cursor-pointer transition-colors overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
              />
              {adImage ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image src={URL.createObjectURL(adImage)} alt="Preview" fill className="object-cover opacity-50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 text-white font-bold">
                    <CheckCircle2 className="w-8 h-8 mb-2" />
                    <span>{adImage.name}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <UploadCloud className="w-6 h-6 text-[#EB682C]" />
                  </div>
                  <p className="text-sm font-bold text-gray-700 mb-1">
                    {isEnglish ? 'Drag your files here or ' : 'اسحب ملفاتك هنا او '} <span className="text-[#EB682C]">{isEnglish ? 'click to upload' : 'اضغط لرفع الملفات'}</span>
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG (max. 800x400px)</p>
                </>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Ads List Section */}
      <div className="pt-4 border-t border-gray-100">
        
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} justify-between items-center mb-6`}>
          <h2 className="text-xl font-bold text-gray-900">{isEnglish ? 'My Ads' : 'إعلاناتي'}</h2>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#EB682C]"></div>
          </div>
        ) : ads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6" dir={isEnglish ? 'ltr' : 'rtl'}>
            {ads.map((ad) => (
              <div key={ad.uuid} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                {/* Ad Image */}
                <div className="h-40 w-full relative bg-gray-100">
                  {ad.image_url ? (
                    <Image src={ad.image_url} alt={ad.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Image src={ad.image} alt={ad.name} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className={`absolute top-3 ${isEnglish ? 'left-3' : 'right-3'} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm
                    ${ad.status === 'approved' || ad.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {ad.status === 'approved' || ad.status === 'نشط' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>{ad.status === 'approved' || ad.status === 'نشط' ? (isEnglish ? 'Approved' : 'نشط') : (isEnglish ? 'Pending' : 'قيد المراجعة')}</span>
                  </div>
                </div>
                
                {/* Ad Content */}
                <div className="p-5 relative">
                  <div className={`flex ${isEnglish ? 'flex-row-reverse' : 'flex-row'} justify-between items-start mb-2`}>
                    <h3 className={`font-bold text-gray-900 text-sm ${isEnglish ? 'text-left' : 'text-right'} leading-tight line-clamp-2 pr-4`}>
                      {ad.name}
                    </h3>
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === ad.uuid ? null : ad.uuid)}
                      className="text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className={`${isEnglish ? 'text-left' : 'text-right'} text-xs text-gray-400 font-medium`}>
                    {new Date(ad.created_at).toLocaleDateString(isEnglish ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>

                  {/* Dropdown Menu */}
                  {activeDropdown === ad.uuid && (
                    <div className={`absolute top-12 ${isEnglish ? 'right-4' : 'left-4'} w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden ${isEnglish ? 'text-left' : 'text-right'}`}>
                      <button 
                        onClick={() => handleDeleteAd(ad.uuid)}
                        className={`w-full flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors`}
                      >
                        <Trash2 className="w-4 h-4" />
                        {isEnglish ? 'Delete' : 'حذف'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex justify-center items-center py-20 bg-white border border-gray-100 rounded-3xl">
            <div className="text-center text-gray-400 font-bold">
              <UploadCloud className="w-24 h-24 mx-auto mb-4 text-gray-200" />
              <p>{isEnglish ? 'No ads yet' : 'لا توجد اعلانات حتى الان'}</p>
              <p className="text-sm font-normal mt-2 text-gray-400">{isEnglish ? 'Upload an ad using the form above.' : 'قم برفع إعلان جديد باستخدام النموذج أعلاه.'}</p>
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
