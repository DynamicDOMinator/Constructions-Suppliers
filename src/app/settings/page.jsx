"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { User, Lock, Bell, Shield, Camera, Building2, Share2, Loader2, CheckCircle2, Briefcase } from "lucide-react";
import api from "@/lib/axios";

export default function SettingsPage() {
  const { user } = useAuth();
  const isEngineer = user?.type === "engineer";
  
  const [activeTab, setActiveTab] = useState("profile");
  
  // UI States
  const [loading, setLoading] = useState({});
  const [message, setMessage] = useState({});
  const [error, setError] = useState({});

  // Form States
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    language: user?.language || "ar"
  });

  const [emailData, setEmailData] = useState({
    email: user?.email || "",
    password: ""
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: ""
  });

  const [companyData, setCompanyData] = useState({
    company_name: "",
    website: "",
    work_field: "",
    bio: "",
    location: "",
    tax_number: "",
    tax_file: null,
    license_number: "",
    license_file: null,
    google_maps_link: ""
  });

  const [socialsData, setSocialsData] = useState({
    facebook: "",
    instagram: "",
    snapchat: "",
    tiktok: ""
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, profile: true });
    setMessage({ ...message, profile: null });
    setError({ ...error, profile: null });
    try {
      const res = await api.post("/auth/profile/update", profileData);
      setMessage({ ...message, profile: res.data.message });
    } catch (err) {
      setError({ ...error, profile: err.response?.data?.message || "حدث خطأ" });
    } finally {
      setLoading({ ...loading, profile: false });
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading({ ...loading, avatar: true });
      // Using generic endpoint for avatar upload
      await api.post("/auth/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // Optionally reload the page or update user context, relying on user refresh for now
      alert("تم تحديث الصورة بنجاح");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ أثناء رفع الصورة");
    } finally {
      setLoading({ ...loading, avatar: false });
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, email: true });
    setMessage({ ...message, email: null });
    setError({ ...error, email: null });
    try {
      const res = await api.post("/auth/profile/email/request", emailData);
      setMessage({ ...message, email: res.data.message });
      setEmailData({ ...emailData, password: "" }); // Clear password
    } catch (err) {
      setError({ ...error, email: err.response?.data?.message || "حدث خطأ" });
    } finally {
      setLoading({ ...loading, email: false });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, password: true });
    setMessage({ ...message, password: null });
    setError({ ...error, password: null });
    try {
      const res = await api.post("/auth/profile/password", passwordData);
      setMessage({ ...message, password: res.data.message });
      setPasswordData({ current_password: "", new_password: "" }); // Clear fields
    } catch (err) {
      setError({ ...error, password: err.response?.data?.message || "حدث خطأ" });
    } finally {
      setLoading({ ...loading, password: false });
    }
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, company: true });
    setMessage({ ...message, company: null });
    setError({ ...error, company: null });
    
    const formData = new FormData();
    Object.keys(companyData).forEach(key => {
      if (companyData[key] !== null && companyData[key] !== "") {
        formData.append(key, companyData[key]);
      }
    });

    try {
      const res = await api.post("/auth/profile/company", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage({ ...message, company: res.data.message });
    } catch (err) {
      setError({ ...error, company: err.response?.data?.message || "حدث خطأ" });
    } finally {
      setLoading({ ...loading, company: false });
    }
  };

  const handleUpdateSocials = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, socials: true });
    setMessage({ ...message, socials: null });
    setError({ ...error, socials: null });
    try {
      const res = await api.post("/auth/profile/socials", socialsData);
      setMessage({ ...message, socials: res.data.message });
    } catch (err) {
      setError({ ...error, socials: err.response?.data?.message || "حدث خطأ" });
    } finally {
      setLoading({ ...loading, socials: false });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-tajawal text-right flex flex-col" dir="rtl">
      <Navbar />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">الإعدادات</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === "profile" ? "bg-orange-50 text-[#EB682C] border-r-4 border-[#EB682C]" : "text-gray-600 hover:bg-gray-50 border-r-4 border-transparent"}`}
              >
                <User className="w-5 h-5" />
                الملف الشخصي
              </button>
              <button 
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === "security" ? "bg-orange-50 text-[#EB682C] border-r-4 border-[#EB682C]" : "text-gray-600 hover:bg-gray-50 border-r-4 border-transparent"}`}
              >
                <Lock className="w-5 h-5" />
                كلمة المرور والأمان
              </button>

              {!isEngineer && (
                <>
                  <button 
                    onClick={() => setActiveTab("company")}
                    className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === "company" ? "bg-orange-50 text-[#EB682C] border-r-4 border-[#EB682C]" : "text-gray-600 hover:bg-gray-50 border-r-4 border-transparent"}`}
                  >
                    <Building2 className="w-5 h-5" />
                    معلومات الشركة
                  </button>
                  <button 
                    onClick={() => setActiveTab("socials")}
                    className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === "socials" ? "bg-orange-50 text-[#EB682C] border-r-4 border-[#EB682C]" : "text-gray-600 hover:bg-gray-50 border-r-4 border-transparent"}`}
                  >
                    <Share2 className="w-5 h-5" />
                    روابط التواصل
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            {activeTab === "profile" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6">المعلومات الشخصية</h2>
                
                {/* Avatar Upload */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#EB682C] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#d65a22] transition-colors border-2 border-white cursor-pointer">
                      {loading.avatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                      <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                    </label>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{user?.name || "المستخدم"}</h3>
                    <p className="text-sm text-gray-500">{user?.type === "engineer" ? "مهندس" : "مورد"}</p>
                  </div>
                </div>

                <form onSubmit={handleUpdateProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">الاسم بالكامل</label>
                      <input 
                        type="text" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">رقم الهاتف</label>
                      <input 
                        type="text" 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">اللغة</label>
                      <select 
                        value={profileData.language}
                        onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                        className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right bg-white"
                        dir="rtl"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>

                  {message.profile && <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>{message.profile}</div>}
                  {error.profile && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error.profile}</div>}

                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button type="submit" disabled={loading.profile} className="bg-[#EB682C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors flex items-center justify-center min-w-[140px]">
                      {loading.profile ? <Loader2 className="w-5 h-5 animate-spin" /> : "حفظ التغييرات"}
                    </button>
                  </div>
                </form>

                <div className="mt-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">تغيير البريد الإلكتروني</h2>
                  <form onSubmit={handleUpdateEmail} className="max-w-md">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">البريد الإلكتروني الجديد</label>
                        <input 
                          type="email" 
                          value={emailData.email} 
                          onChange={(e) => setEmailData({...emailData, email: e.target.value})}
                          className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" 
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">كلمة المرور الحالية (للتأكيد)</label>
                        <input 
                          type="password" 
                          placeholder="••••••••" 
                          value={emailData.password}
                          onChange={(e) => setEmailData({...emailData, password: e.target.value})}
                          className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" 
                          required
                        />
                      </div>
                    </div>

                    {message.email && <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>{message.email}</div>}
                    {error.email && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error.email}</div>}

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                      <button type="submit" disabled={loading.email} className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors flex items-center justify-center min-w-[140px]">
                        {loading.email ? <Loader2 className="w-5 h-5 animate-spin" /> : "طلب تغيير الإيميل"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6">تغيير كلمة المرور</h2>
                
                <form onSubmit={handleUpdatePassword} className="flex flex-col gap-6 max-w-md">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">كلمة المرور الحالية</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={passwordData.current_password}
                      onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" 
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">كلمة المرور الجديدة</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={passwordData.new_password}
                      onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" 
                      required
                      minLength={6}
                    />
                  </div>

                  {message.password && <div className="mt-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>{message.password}</div>}
                  {error.password && <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error.password}</div>}

                  <div className="mt-4 pt-6 border-t border-gray-100 flex justify-end">
                    <button type="submit" disabled={loading.password} className="bg-[#EB682C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors flex items-center justify-center min-w-[140px]">
                      {loading.password ? <Loader2 className="w-5 h-5 animate-spin" /> : "تحديث كلمة المرور"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "company" && !isEngineer && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6">معلومات الشركة</h2>
                <form onSubmit={handleUpdateCompany} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">اسم الشركة</label>
                    <input type="text" value={companyData.company_name} onChange={(e) => setCompanyData({...companyData, company_name: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">الموقع الإلكتروني</label>
                    <input type="url" value={companyData.website} onChange={(e) => setCompanyData({...companyData, website: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" dir="ltr" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">مجال العمل</label>
                    <input type="text" value={companyData.work_field} onChange={(e) => setCompanyData({...companyData, work_field: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">الموقع (المدينة/المنطقة)</label>
                    <input type="text" value={companyData.location} onChange={(e) => setCompanyData({...companyData, location: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700">رابط خرائط جوجل</label>
                    <input type="url" value={companyData.google_maps_link} onChange={(e) => setCompanyData({...companyData, google_maps_link: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" dir="ltr" />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700">نبذة عن الشركة</label>
                    <textarea value={companyData.bio} onChange={(e) => setCompanyData({...companyData, bio: e.target.value})} className="w-full p-4 border border-gray-200 rounded-xl text-sm min-h-[100px] resize-none focus:outline-none focus:border-[#EB682C] text-right"></textarea>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">الرقم الضريبي</label>
                    <input type="text" value={companyData.tax_number} onChange={(e) => setCompanyData({...companyData, tax_number: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">ملف الضريبة (PDF/Image)</label>
                    <input type="file" onChange={(e) => setCompanyData({...companyData, tax_file: e.target.files[0]})} className="w-full text-sm border border-gray-200 rounded-xl p-2 focus:outline-none focus:border-[#EB682C]" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">رقم الترخيص</label>
                    <input type="text" value={companyData.license_number} onChange={(e) => setCompanyData({...companyData, license_number: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">ملف الترخيص (PDF/Image)</label>
                    <input type="file" onChange={(e) => setCompanyData({...companyData, license_file: e.target.files[0]})} className="w-full text-sm border border-gray-200 rounded-xl p-2 focus:outline-none focus:border-[#EB682C]" />
                  </div>

                  <div className="md:col-span-2">
                    {message.company && <div className="mt-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>{message.company}</div>}
                    {error.company && <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error.company}</div>}

                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                      <button type="submit" disabled={loading.company} className="bg-[#EB682C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors flex items-center justify-center min-w-[140px]">
                        {loading.company ? <Loader2 className="w-5 h-5 animate-spin" /> : "حفظ التغييرات"}
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            )}


            {activeTab === "socials" && !isEngineer && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6">روابط التواصل الاجتماعي</h2>
                <form onSubmit={handleUpdateSocials} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Facebook</label>
                    <input type="url" value={socialsData.facebook} onChange={(e) => setSocialsData({...socialsData, facebook: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left" dir="ltr" placeholder="https://facebook.com/..." />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Instagram</label>
                    <input type="url" value={socialsData.instagram} onChange={(e) => setSocialsData({...socialsData, instagram: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left" dir="ltr" placeholder="https://instagram.com/..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Snapchat</label>
                    <input type="url" value={socialsData.snapchat} onChange={(e) => setSocialsData({...socialsData, snapchat: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left" dir="ltr" placeholder="https://snapchat.com/add/..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">TikTok</label>
                    <input type="url" value={socialsData.tiktok} onChange={(e) => setSocialsData({...socialsData, tiktok: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left" dir="ltr" placeholder="https://tiktok.com/@..." />
                  </div>

                  <div className="md:col-span-2">
                    {message.socials && <div className="mt-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>{message.socials}</div>}
                    {error.socials && <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error.socials}</div>}

                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                      <button type="submit" disabled={loading.socials} className="bg-[#EB682C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors flex items-center justify-center min-w-[140px]">
                        {loading.socials ? <Loader2 className="w-5 h-5 animate-spin" /> : "حفظ الروابط"}
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
