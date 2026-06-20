"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { ChevronDown, MapPin, Building2, Briefcase, FileText, Download, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function QuotasRequestsPage() {
  const { isEnglish } = useLanguage();
  const [activeTab, setActiveTab] = useState("accepted"); // 'accepted' or 'rejected'

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/auth/boqs/received");
      const fetchedData = res.data;
      const dataArray = Array.isArray(fetchedData) ? fetchedData : (fetchedData?.data || []);
      setRequests(dataArray);
    } catch (err) {
      console.error("Failed to fetch boq requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === "accepted") return req.status === "accepted";
    if (activeTab === "rejected") return req.status === "rejected";
    return req.status !== "accepted" && req.status !== "rejected"; // pending
  });

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4" dir={isEnglish ? 'ltr' : 'rtl'}>
      
      {/* Header section */}
      <div className={isEnglish ? 'text-left' : 'text-right'}>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEnglish ? 'Sent BOQ Requests' : 'طلبات المقايسة المرسلة'}</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner mb-6">
        <button 
          onClick={() => setActiveTab("pending")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
            activeTab === "pending" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {isEnglish ? 'Pending' : 'قيد الانتظار'}
        </button>
        <button 
          onClick={() => setActiveTab("accepted")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
            activeTab === "accepted" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {isEnglish ? 'Accepted' : 'مقبولة'}
        </button>
        <button 
          onClick={() => setActiveTab("rejected")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
            activeTab === "rejected" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {isEnglish ? 'Rejected' : 'مرفوضة'}
        </button>
      </div>

      {/* Filter and Title */}
      <div className="flex justify-between items-center mb-6">
   
        <h2 className="text-lg font-bold text-gray-900">{isEnglish ? 'Requests' : 'الطلبات'}</h2>
             <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">
          <ChevronDown className="w-4 h-4" />
          {isEnglish ? 'Sort' : 'ترتيب'}
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-[#EB682C]" />
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-24 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">{isEnglish ? 'No requests' : 'لا توجد طلبات'}</h3>
          <p className="text-gray-500 text-sm">{isEnglish ? 'No BOQ requests in this section yet.' : 'لا توجد طلبات مقايسة في هذا القسم حتى الآن.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <Link href={`/dashboard/quotas/${req.uuid}`} key={req.uuid}>
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                
                <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} justify-between items-start mb-6`}>
                  <span className={`text-xs font-bold px-3 py-1 rounded-md ${
                    req.status === "accepted" ? "bg-green-100 text-green-700"
                    : req.status === "rejected" ? "bg-red-100 text-red-700"
                    : "bg-orange-100 text-orange-700"
                  }`}>
                    {req.status === "accepted" ? (isEnglish ? "Accepted" : "مقبولة") : req.status === "rejected" ? (isEnglish ? "Rejected" : "مرفوضة") : (isEnglish ? "Pending" : "قيد الانتظار")}
                  </span>
                  
                  <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center gap-4 ${isEnglish ? 'text-left' : 'text-right'}`}>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{req.project_name || (isEnglish ? "No name" : "بدون اسم")}</h3>
                      <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center ${isEnglish ? 'justify-start' : 'justify-end'} gap-1 text-gray-500 text-sm mt-1`}>
                        <span className="line-clamp-1">{req.project_location || (isEnglish ? "Unspecified" : "غير محدد")}</span>
                        <MapPin className="w-4 h-4 shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra BOQ Details */}
                <div className={`flex flex-col gap-3 mb-4 bg-gray-50 p-4 rounded-xl ${isEnglish ? 'text-left' : 'text-right'}`}>
                  <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} items-center justify-start gap-2`}>
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-bold text-gray-700">{isEnglish ? 'Project Name:' : 'اسم المشروع:'}</span>
                    <span className="text-sm text-gray-600 line-clamp-1">{req.project_name}</span>
                  </div>
                  <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row'} items-center justify-start gap-2`}>
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-bold text-gray-700">{isEnglish ? 'Project Type:' : 'نوع المشروع:'}</span>
                    <span className="text-sm text-gray-600">{req.project_type}</span>
                  </div>
                </div>

                {/* Attachments Section */}
                {(req.original_boq_file || req.technical_specs_file || req.design_drawings_file) && (
                  <div className={`mb-6 flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                    <span className="text-xs font-bold text-gray-500 mb-1">{isEnglish ? 'Attachments & Documents:' : 'المرفقات والوثائق:'}</span>
                    <div className={`flex flex-wrap ${isEnglish ? 'flex-row' : 'flex-row'} gap-2`}>
                      {req.original_boq_file && (
                        <button className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-[#EB682C] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{isEnglish ? 'BOQ' : 'المقايسة'}</span>
                        </button>
                      )}
                      {req.technical_specs_file && (
                        <button className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-[#EB682C] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{isEnglish ? 'Specs' : 'المواصفات'}</span>
                        </button>
                      )}
                      {req.design_drawings_file && (
                        <button className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-[#EB682C] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{isEnglish ? 'Drawings' : 'الرسومات'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <div className={`${isEnglish ? 'text-left' : 'text-right'} flex-1 mb-6`}>
                  <h4 className="font-bold text-gray-900 mb-2">{isEnglish ? 'Description/Project Specs' : 'وصف/مواصفات المشروع'}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {req.description || (isEnglish ? "No additional notes." : "لا توجد ملاحظات إضافية.")}
                  </p>
                </div>

                <div className={`text-sm text-gray-400 ${isEnglish ? 'text-left' : 'text-right'}`}>
                  {req.created_at ? new Date(req.created_at).toLocaleDateString(isEnglish ? "en-US" : "ar-EG") : ""}
                </div>

                <button className={`w-full text-white py-3 rounded-xl text-sm font-bold transition-colors mt-4 ${
                  req.status === "accepted" ? "bg-[#EB682C] hover:bg-[#EB682C]" : "bg-[#d6855c] hover:bg-[#c27147]"
                }`}>
                  {req.status === "accepted" ? (isEnglish ? "Start Chat" : "بدء محادثة") : (isEnglish ? "View Details" : "عرض التفاصيل")}
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}
