"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { MapPin, Loader2, Building2, Briefcase, FileText } from "lucide-react";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";

export default function BOQRequestDetailsPage({ params }) {
  const { id } = use(params);
  const { isEnglish } = useLanguage();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/auth/boqs/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error("Failed to fetch boq details:", err);
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
  const location = sender.company_profile?.location || sender.engineer_profile?.location || (isEnglish ? "Unspecified" : "غير محدد");

  return (
    <div className={`font-tajawal max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? "ltr" : "rtl"}>
      
      {/* Header section with User info */}
      <div className={`flex flex-col ${isEnglish ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between items-start md:items-center gap-4 mb-8`}>
        
        <div className={`flex items-center ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-4 ${isEnglish ? 'text-left order-1 md:order-1' : 'text-right order-1 md:order-2'}`}>
          <div>
            <h3 className="font-bold text-gray-900 text-xl">{senderName}</h3>
            <div className={`flex items-center gap-1 text-gray-500 text-sm mt-1 ${isEnglish ? 'justify-start' : 'justify-end'}`}>
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
          <h1 className="text-2xl font-bold text-gray-900">{isEnglish ? `BOQ Request Details # ${request.id}` : `تفاصيل طلب المقايسة # ${request.id}`}</h1>
        </div>

      </div>

      {/* Details Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col mb-8">
        <div className="w-full overflow-x-auto">
          <table className={`w-full ${isEnglish ? 'text-left' : 'text-right'} min-w-[600px]`}>
            <thead className="bg-[#1f2937] text-white">
              <tr>
                <th className={`py-4 px-6 font-bold w-1/3 ${isEnglish ? 'border-r' : 'border-l'} border-gray-700`}>{isEnglish ? "Product Name" : "أسم المنتج"}</th>
                <th className={`py-4 px-6 font-bold w-1/6 ${isEnglish ? 'border-r' : 'border-l'} border-gray-700`}>{isEnglish ? "Duration" : "المدة"}</th>
                <th className={`py-4 px-6 font-bold w-1/6 ${isEnglish ? 'border-r' : 'border-l'} border-gray-700`}>{isEnglish ? "Quantity" : "الكمية"}</th>
                <th className="py-4 px-6 font-bold w-1/3">{isEnglish ? "Notes" : "الملاحظات"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {request.items && request.items.length > 0 ? (
                request.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors bg-white">
                    <td className={`py-5 px-6 text-gray-900 font-bold ${isEnglish ? 'border-r' : 'border-l'} border-gray-100`}>
                      {item.item_name || item.product_name || "—"}
                    </td>
                    <td className={`py-5 px-6 text-gray-900 font-bold ${isEnglish ? 'border-r' : 'border-l'} border-gray-100 text-center`}>
                      {item.reply_supply_duration || item.duration || "—"}
                    </td>
                    <td className={`py-5 px-6 text-gray-900 font-bold ${isEnglish ? 'border-r' : 'border-l'} border-gray-100 text-center`}>
                      {item.quantity || "—"}
                    </td>
                    <td className="py-5 px-6 text-gray-600 leading-relaxed text-xs">
                      {item.technical_description || item.notes || request.notes || (isEnglish ? "None" : "لا يوجد")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500 font-bold">
                    {isEnglish ? "No products added to this request" : "لا توجد منتجات مضافة لهذا الطلب"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOQ Info Card */}
      <div className={`bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm p-6 ${isEnglish ? 'text-left' : 'text-right'} flex flex-col gap-6`}>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-start gap-3">
            <Building2 className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-bold text-gray-700 w-32">{isEnglish ? "Project Name:" : "اسم المشروع:"}</span>
            <span className="text-base font-bold text-gray-900">{request.project_name || (isEnglish ? "No name" : "بدون اسم")}</span>
          </div>
          <div className="flex flex-row items-center justify-start gap-3">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-bold text-gray-700 w-32">{isEnglish ? "Project Type:" : "نوع المشروع:"}</span>
            <span className="text-base text-gray-900">{request.project_type || "—"}</span>
          </div>
          <div className="flex flex-row items-center justify-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-bold text-gray-700 w-32">{isEnglish ? "Project Location:" : "موقع المشروع:"}</span>
            <span className="text-base text-gray-900">{request.project_location || "—"}</span>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-gray-900 text-lg mb-2">{isEnglish ? "Project Description" : "وصف المشروع"}</h4>
          <p className={`text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl ${isEnglish ? 'text-left' : 'text-right'}`}>
            {request.description || (isEnglish ? "No additional description." : "لا يوجد وصف إضافي.")}
          </p>
        </div>

        {(request.original_boq_file || request.technical_specs_file || request.design_drawings_file) && (
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-gray-900 text-lg mb-2">{isEnglish ? "Attachments and Documents" : "المرفقات والوثائق"}</h4>
            <div className={`flex flex-wrap ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-4`}>
              {request.original_boq_file && (
                <a href={request.original_boq_file} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-orange-50 border border-orange-100 text-[#EB682C] px-5 py-3 rounded-xl text-sm font-bold hover:bg-orange-100 transition-colors">
                  <span>{isEnglish ? "Download Original BOQ" : "تحميل المقايسة الأصلية"}</span>
                  <FileText className="w-5 h-5" />
                </a>
              )}
              {request.technical_specs_file && (
                <a href={request.technical_specs_file} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 px-5 py-3 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
                  <span>{isEnglish ? "Technical Specs" : "المواصفات الفنية"}</span>
                  <FileText className="w-5 h-5" />
                </a>
              )}
              {request.design_drawings_file && (
                <a href={request.design_drawings_file} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-600 px-5 py-3 rounded-xl text-sm font-bold hover:bg-green-100 transition-colors">
                  <span>{isEnglish ? "Design Drawings" : "الرسومات التصميمية"}</span>
                  <FileText className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        )}

      </div>

      {request.status !== "accepted" && request.status !== "rejected" && (
        <Link href={`/dashboard/quotas/${id}/reply`} className="block mt-4">
          <button className="w-full bg-[#d6855c] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#c27147] transition-colors shadow-sm">
            {isEnglish ? "Reply to BOQ Request" : "الرد علي طلب المقايسة"}
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
