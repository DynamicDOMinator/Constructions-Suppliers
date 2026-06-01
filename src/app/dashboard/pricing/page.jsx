"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";

export default function PricingRequestsPage() {
  const [activeTab, setActiveTab] = useState("accepted"); // 'accepted' or 'rejected'

  // Mock data for requests
  const requests = Array(9).fill(null).map((_, i) => ({
    id: i + 1,
    name: "محمود فتوح",
    location: "السعودية الرياض",
    notes: "شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: activeTab === "accepted" ? "مقبولة" : "مرفوضة",
  }));

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header section */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">طلبات التسعير المرسلة</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner mb-6">
        
        
          <button 
          onClick={() => setActiveTab("accepted")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
            activeTab === "accepted" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          طلبات التسعير المقبولة
        </button>
        <button 
          onClick={() => setActiveTab("rejected")}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
            activeTab === "rejected" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          طلبات التسعير المرفوضة
        </button>
      
      </div>

      {/* Filter and Title */}
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50">
          <ChevronDown className="w-4 h-4" />
          ترتيب
        </button>
        <h2 className="text-lg font-bold text-gray-900">الطلبات</h2>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <Link href={`/dashboard/pricing/1284795`} key={req.id}>
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
              
              <div className="flex flex-row-reverse justify-between items-start mb-6">
                <span className={`text-xs font-bold px-3 py-1 rounded-md ${
                  req.status === "مقبولة" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {req.status}
                </span>
                
                <div className="flex flex-row-reverse items-center gap-4 text-right">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{req.name}</h3>
                    <div className="flex flex-row-reverse items-center justify-end gap-1 text-gray-500 text-sm mt-1">
                      <span>{req.location}</span>
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img src={req.avatar} alt={req.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="text-right flex-1 mb-6">
                <h4 className="font-bold text-gray-900 mb-2">ملاحظات</h4>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {req.notes}
                </p>
              </div>

              {req.status === "مقبولة" && (
                <button className="w-full bg-[#EB682C] text-white py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors mt-auto">
                  بدء محادثة
                </button>
              )}
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
