"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { ChevronDown, MapPin, Loader2, Package } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingRequestsPage() {
  const { isEnglish } = useLanguage();
  const [activeTab, setActiveTab] = useState("pending"); // 'pending', 'accepted', 'rejected'
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/auth/quotes/received");
      const fetchedData = res.data;
      const dataArray = Array.isArray(fetchedData) ? fetchedData : (fetchedData?.data || []);
      setRequests(dataArray);
    } catch (err) {
      console.error("Failed to fetch pricing requests:", err);
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEnglish ? 'Sent Pricing Requests' : 'طلبات التسعير المرسلة'}</h1>
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
          {isEnglish ? 'Accepted' : 'المقبولة'}
        </button>
        <button 
          onClick={() => setActiveTab("rejected")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
            activeTab === "rejected" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {isEnglish ? 'Rejected' : 'المرفوضة'}
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
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">{isEnglish ? 'No requests' : 'لا توجد طلبات'}</h3>
          <p className="text-gray-500 text-sm">{isEnglish ? 'No pricing requests in this section yet.' : 'لا توجد طلبات تسعير في هذا القسم حتى الآن.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <Link href={`/dashboard/pricing/${req.uuid}`} key={req.uuid}>
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                
                <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} justify-between items-start mb-6`}>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-sm shrink-0 ${
                    req.status === "accepted" ? "bg-[#e8f6ed] text-[#42b871]"
                    : req.status === "rejected" ? "bg-red-100 text-red-700"
                    : "bg-[#fff3e0] text-[#ff9800]"
                  }`}>
                    {req.status === "accepted" ? (isEnglish ? "Accepted" : "مقبولة") : req.status === "rejected" ? (isEnglish ? "Rejected" : "مرفوضة") : (isEnglish ? "Pending" : "قيد الانتظار")}
                  </span>
                  
                  <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center gap-4 ${isEnglish ? 'text-left' : 'text-right'}`}>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">
                        {req.sender?.name || (isEnglish ? "No name" : "بدون اسم")}
                      </h3>
                      <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center ${isEnglish ? 'justify-start' : 'justify-end'} gap-1 text-gray-500 text-[10px]`}>
                        <span className="line-clamp-1">
                          {req.sender?.company_profile?.location || req.sender?.engineer_profile?.location || (isEnglish ? "Unspecified" : "غير محدد")}
                        </span>
                        <MapPin className="w-3 h-3 shrink-0" />
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50 flex items-center justify-center">
                      {req.sender?.avatar ? (
                        <img src={req.sender.avatar} alt={req.sender.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-xl">{req.sender?.name?.charAt(0) || "U"}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`${isEnglish ? 'text-left' : 'text-right'} flex-1 mb-6`}>
                  <h4 className="font-bold text-gray-900 text-xs mb-2">{isEnglish ? 'Notes' : 'ملاحظات'}</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-3">
                    {req.notes || (isEnglish ? "No additional notes." : "لا توجد ملاحظات إضافية.")}
                  </p>
                </div>

                <button className={`w-full text-white py-2.5 rounded-lg text-sm font-bold transition-colors mt-auto ${
                  req.status === "accepted" ? "bg-[#EB682C] hover:bg-[#EB682C]" : "bg-[#EB682C] hover:bg-[#c27147]"
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

