"use client";
import { MapPin, Calendar, ArrowUpRight, Clock, CheckCircle2, XCircle, Tag, Building2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function QuoteCard({ req, type = "pricing" }) {
  const { isEnglish } = useLanguage();
  const status = req?.status;
  const uuid = req?.uuid || req?.id || "123";
  const linkHref = type === "boq" ? `/boqs/${uuid}` : `/quotes/${uuid}`;

  // Check if request is replied, accepted, or rejected
  const isAnswered = status === "replied" || status === "accepted" || status === "rejected";

  const supplierName =
    req?.supplier?.company_profile?.company_name ||
    req?.supplier?.name ||
    req?.project_name ||
    (isEnglish ? "Unnamed Supplier" : "مورد بدون اسم");

  const supplierBio =
    req?.supplier?.company_profile?.work_field ||
    req?.supplier?.company_profile?.bio ||
    (type === "boq" ? (isEnglish ? "BOQ Request" : "طلب مقايسة") : (isEnglish ? "Pricing Request" : "طلب تسعير"));

  const locationFallback =
    req?.supplier?.company_profile?.location ||
    req?.supplier?.engineer_profile?.location ||
    req?.project_location ||
    (isEnglish ? "Unspecified location" : "موقع غير محدد");

  const avatar = req?.supplier?.avatar || req?.supplier?.avatar_url;
  const description = req?.notes || req?.description || (isEnglish ? "No additional notes specified." : "لا توجد تفاصيل أو ملاحظات إضافية.");

  // Calculate pricing if replied
  let totalPrice = 0;
  let duration = "—";
  let replyNotes = "";

  if (req?.items && req.items.length > 0) {
    req.items.forEach((item) => {
      totalPrice += (parseFloat(item.reply_unit_price) || 0) * (item.quantity || 1);
    });
    duration = req.items[0]?.reply_supply_duration || "—";
    replyNotes = req.items[0]?.reply_notes || "";
  }

  // Status badge config
  const getStatusBadge = () => {
    switch (status) {
      case "accepted":
        return {
          label: isEnglish ? "Accepted" : "مقبول",
          className: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
          dotColor: "bg-emerald-500",
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        };
      case "rejected":
        return {
          label: isEnglish ? "Rejected" : "مرفوض",
          className: "bg-rose-50 text-rose-700 border-rose-200/80",
          dotColor: "bg-rose-500",
          icon: <XCircle className="w-3.5 h-3.5" />,
        };
      case "replied":
        return {
          label: isEnglish ? "Offer Received" : "تم الرد والتسعير",
          className: "bg-blue-50 text-blue-700 border-blue-200/80",
          dotColor: "bg-blue-500",
          icon: <Tag className="w-3.5 h-3.5" />,
        };
      default:
        return {
          label: isEnglish ? "Pending Review" : "قيد الانتظار",
          className: "bg-amber-50 text-amber-700 border-amber-200/80",
          dotColor: "bg-amber-500 animate-pulse",
          icon: <Clock className="w-3.5 h-3.5" />,
        };
    }
  };

  const statusConfig = getStatusBadge();

  return (
    <div
      className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-gray-300 transition-all duration-300 font-tajawal flex flex-col h-full group"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      {/* Top Header: Logo, Name & Status */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center font-bold text-[#EB682C] text-lg shrink-0 overflow-hidden shadow-xs">
            {avatar ? (
              <img src={avatar} alt={supplierName} className="w-full h-full object-cover" />
            ) : (
              <span>{supplierName.charAt(0) || "ق"}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm md:text-base font-bold text-gray-900 truncate group-hover:text-[#EB682C] transition-colors">
              {supplierName}
            </h3>
            <p className="text-xs text-gray-400 truncate mt-0.5">{supplierBio}</p>
          </div>
        </div>

        {/* Modern Status Badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${statusConfig.className}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`}></span>
          <span>{statusConfig.label}</span>
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3 font-medium">
        <MapPin className="w-3.5 h-3.5 text-[#EB682C] shrink-0" />
        <span className="truncate">{locationFallback}</span>
      </div>

      {/* Description / Notes Box */}
      <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100 text-xs text-gray-600 leading-relaxed mb-4 flex-1">
        <p className="line-clamp-2">
          {replyNotes ? `${isEnglish ? "Supplier: " : "رد المورد: "}${replyNotes}` : description}
        </p>
      </div>

      {/* Replied Data Summary or Metadata */}
      {isAnswered && totalPrice > 0 ? (
        <div className="bg-orange-50/50 rounded-xl p-3 border border-orange-100/80 mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-gray-500 font-medium">
              {isEnglish ? "Quoted Price" : "السعر المقدم"}
            </span>
            <div className="flex items-baseline gap-1" dir="ltr">
              <span className="text-base font-extrabold text-gray-900">
                {totalPrice.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-[#EB682C]">
                {isEnglish ? "SAR" : "ريال"}
              </span>
            </div>
          </div>

          {duration && duration !== "—" && (
            <div className="text-right">
              <span className="text-[11px] text-gray-500 font-medium block">
                {isEnglish ? "Duration" : "مدة التوريد"}
              </span>
              <span className="text-xs font-bold text-gray-800">{duration}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs text-gray-500 py-2 border-t border-gray-100 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{isEnglish ? "Requested on" : "تاريخ الطلب:"}</span>
          </span>
          <span className="font-bold text-gray-800">
            {req?.created_at
              ? new Date(req.created_at).toLocaleDateString(isEnglish ? "en-US" : "ar-EG")
              : "—"}
          </span>
        </div>
      )}

      {/* Action Button */}
      <Link href={linkHref} className="mt-auto block w-full">
        <button className="w-full bg-[#EB682C] text-white py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold hover:bg-[#d65a22] transition-colors flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md cursor-pointer">
          <span>{isEnglish ? "View Details" : "عرض التفاصيل"}</span>
          <ArrowUpRight
            className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
              isEnglish ? "" : "rotate-[-90deg]"
            }`}
          />
        </button>
      </Link>
    </div>
  );
}
