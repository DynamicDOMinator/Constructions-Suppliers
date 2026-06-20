"use client";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function QuoteCard({ req, type = "pricing" }) {
  const { isEnglish } = useLanguage();
  const status = req?.status;
  const uuid = req?.uuid || "123";
  const linkHref = type === "boq" ? `/boqs/${uuid}` : `/quotes/${uuid}`;

  if (status === "replied" || status === "accepted" || status === "rejected") {
    const supplierName = req.supplier?.company_profile?.company_name || req.supplier?.name || (isEnglish ? "No Name" : "بدون اسم");
    const supplierBio = req.supplier?.company_profile?.work_field || req.supplier?.company_profile?.bio || "";
    const location = req.supplier?.company_profile?.location || req.supplier?.engineer_profile?.location || (isEnglish ? "Unspecified" : "غير محدد");
    const avatar = req.supplier?.avatar;

    let totalPrice = 0;
    let duration = "—";
    let replyNotes = "—";

    if (req.items && req.items.length > 0) {
      req.items.forEach(item => {
        totalPrice += (parseFloat(item.reply_unit_price) || 0) * (item.quantity || 1);
      });
      duration = req.items[0].reply_supply_duration || "—";
      replyNotes = req.items[0].reply_notes || "—";
    }

    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow font-tajawal flex flex-col h-full" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
        
        {/* Supplier Header & Status */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start flex-row gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt={supplierName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl text-gray-400 font-bold">{supplierName.charAt(0)}</span>
              )}
            </div>
            <div className={isEnglish ? 'text-left' : 'text-right'}>
              <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{supplierName}</h3>
              <p className="text-gray-500 text-[10px] line-clamp-1">{supplierBio}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className={`text-[10px] font-bold px-2 py-1 rounded-sm shrink-0 ${
            status === "accepted" ? "bg-green-100 text-green-700"
            : status === "rejected" ? "bg-red-100 text-red-700"
            : "bg-blue-100 text-blue-700"
          }`}>
            {status === "accepted" ? (isEnglish ? "Accepted" : "مقبولة") : status === "rejected" ? (isEnglish ? "Rejected" : "مرفوضة") : (isEnglish ? "Replied" : "تم الرد")}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-start gap-1 text-gray-700 text-[10px] font-medium mb-5">
          <MapPin className="w-3.5 h-3.5" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Details List */}
        <div className="flex flex-col gap-3 mb-6">
          <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} justify-between items-center text-xs`}>
            <span className="font-bold text-gray-900">{totalPrice > 0 ? `${totalPrice} ${isEnglish ? "SAR" : "ريال"}` : "—"}</span>
            <span className="text-gray-500">{isEnglish ? "Price" : "السعر"}</span>
          </div>
          {duration && duration !== "—" && (
            <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} justify-between items-center text-xs`}>
              <span className="font-bold text-gray-900">{duration}</span>
              <span className="text-gray-500">{isEnglish ? "Supply Duration" : "مدة التوريد"}</span>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className={`flex flex-col gap-1 mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <span className="text-gray-900 text-xs font-bold">{isEnglish ? "Supplier Notes" : "ملاحظات المورد"}</span>
          <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2">{replyNotes}</p>
        </div>

        {/* Action Button */}
        <Link href={linkHref} className="mt-auto block">
          <button className="w-full bg-[#EB682C] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#c27147] transition-colors">
            {isEnglish ? "View Details" : "عرض التفاصيل"}
          </button>
        </Link>

      </div>
    );
  }

  // Pending UI
  const supplierNameFallback = req?.supplier?.company_profile?.company_name || req?.supplier?.name || (isEnglish ? "Unnamed Request" : "طلب بدون اسم");
  const projectName = req?.project_name || supplierNameFallback;
  const locationFallback = req?.supplier?.company_profile?.location || req?.supplier?.engineer_profile?.location || (isEnglish ? "Unspecified" : "غير محدد");
  const location = req?.project_location || locationFallback;
  const description = req?.notes || req?.description || (isEnglish ? "No additional notes." : "لا توجد ملاحظات إضافية.");

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow font-tajawal flex flex-col h-full" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      
      {/* Header: Project Name & Status */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start flex-row gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
            {req?.supplier?.avatar ? (
              <img src={req.supplier.avatar} alt={projectName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl text-gray-400 font-bold">{projectName.charAt(0)}</span>
            )}
          </div>
          <div className={isEnglish ? 'text-left' : 'text-right'}>
            <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{projectName}</h3>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 rounded-sm shrink-0 bg-[#fff3e0] text-[#ff9800]">
          {isEnglish ? "Pending" : "انتظار"}
        </span>
      </div>

      {/* Location */}
      <div className={`flex items-center ${isEnglish ? 'flex-row' : 'flex-row-reverse'} justify-end gap-1.5 text-gray-700 text-xs font-medium mb-3`}>
        <span className="line-clamp-1">{location}</span>
        <MapPin className="w-3.5 h-3.5" />
      </div>

      {/* Description */}
      <p className={`text-gray-500 text-[10px] leading-relaxed mb-6 line-clamp-3 ${isEnglish ? 'text-left' : 'text-right'}`}>
        {description}
      </p>

      {/* Details Grid */}
      <div className="flex flex-col gap-3 mb-6 mt-auto">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">{isEnglish ? "Request Date" : "تاريخ الطلب"}</span>
          <span className="font-bold text-gray-900">
            {req?.created_at ? new Date(req.created_at).toLocaleDateString(isEnglish ? "en-US" : "ar-EG") : "—"}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <Link href={linkHref} className="mt-auto block">
        <button className="w-full bg-[#EB682C] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#c27147] transition-colors">
          {isEnglish ? "View Details" : "عرض التفاصيل"}
        </button>
      </Link>

    </div>
  );
}
