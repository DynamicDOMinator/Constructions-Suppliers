"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { MapPin, Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingRequestDetailsPage({ params }) {
  const { id } = use(params);
  const { isEnglish } = useLanguage();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/auth/quotes/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error("Failed to fetch quote details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-[#EB682C]" />
      </div>
    );
  }

  if (!request) {
    return <div className="text-center py-24 font-bold text-gray-500">{isEnglish ? "Request not found" : "الطلب غير موجود"}</div>;
  }

  const sender = request.sender || {};
  const senderName = sender.name || (isEnglish ? "No name" : "بدون اسم");
  const location = sender.company_profile?.location || sender.engineer_profile?.location || (isEnglish ? "Riyadh, Saudi Arabia" : "السعودية الرياض");

  return (
    <div className={`font-tajawal max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? "ltr" : "rtl"}>
      
      {/* Header section with User info */}
      <div className={`flex flex-col ${isEnglish ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between items-start md:items-center gap-4 mb-8`}>
        
        <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center gap-4 ${isEnglish ? 'text-left order-1 md:order-1' : 'text-right order-1 md:order-2'}`}>
          <div>
            <h3 className="font-bold text-gray-900 text-xl">{senderName}</h3>
            <div className={`flex items-center gap-1 text-gray-500 text-sm mt-1 ${isEnglish ? 'justify-start' : ''}`}>
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
            {sender.avatar ? (
              <img src={sender.avatar} alt={senderName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl text-gray-400 font-bold">{senderName.charAt(0)}</span>
            )}
          </div>
        </div>

        <div className={`${isEnglish ? 'text-left order-2 md:order-2' : 'text-right order-2 md:order-1'} w-full md:w-auto`}>
          <h1 className="text-2xl font-bold text-gray-900">{isEnglish ? `Request Details # ${request.id}` : `تفاصيل الطلب # ${request.id}`}</h1>
        </div>

      </div>

      {/* Details Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
        
        <div className="w-full overflow-x-auto">
          <table className={`w-full ${isEnglish ? 'text-left' : 'text-right'} min-w-[600px]`}>
            <thead className="bg-[#1f2937] text-white">
              <tr>
                <th className={`py-4 px-6 font-bold w-1/3 ${isEnglish ? 'border-r' : 'border-l'} border-gray-700`}>{isEnglish ? "Product Name" : "أسم المنتج"}</th>
                <th className={`py-4 px-6 font-bold w-1/6 ${isEnglish ? 'border-r' : 'border-l'} border-gray-700`}>{isEnglish ? "Quantity" : "الكمية"}</th>
                <th className="py-4 px-6 font-bold w-1/3">{isEnglish ? "Notes" : "الملاحظات"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {request.items?.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors bg-white">
                  <td className={`py-5 px-6 text-gray-900 font-bold ${isEnglish ? 'border-r' : 'border-l'} border-gray-100`}>
                    {item.product_name}
                  </td>
                  <td className={`py-5 px-6 text-gray-900 font-bold ${isEnglish ? 'border-r' : 'border-l'} border-gray-100 text-center`}>
                    {item.quantity}
                  </td>
                  <td className="py-5 px-6 text-gray-600 leading-relaxed text-xs">
                    {request.notes || (isEnglish ? "None" : "لا يوجد")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {request.status !== "accepted" && request.status !== "rejected" && (
        <Link href={`/dashboard/pricing/${id}/reply`} className="block mt-4">
          <button className="w-full bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#c27147] transition-colors shadow-sm">
            {isEnglish ? "Reply to Pricing Request" : "الرد علي طلب التسعير"}
          </button>
        </Link>
      )}

      {request.status === "accepted" && (
        <Link href={`/dashboard/chat?user=${request.sender_id}`} className="block mt-4">
          <button className="w-full bg-[#D97746] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#EB682C] transition-colors shadow-sm">
            {isEnglish ? "Start Chat with Client" : "بدء محادثة مع العميل"}
          </button>
        </Link>
      )}

    </div>
  );
}
