"use client";
import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Package,
  Tag,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  Search,
  X,
  FileText,
  ShoppingBag
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";
import QuoteCard from "@/components/quotes/QuoteCard";
import RecommendedSuppliers from "@/components/quotes/RecommendedSuppliers";
import { useLanguage } from "@/context/LanguageContext";

export default function QuotesGrid() {
  const { isEnglish } = useLanguage();
  const [activeTab, setActiveTab] = useState("pricing"); // "pricing" | "boq"
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRequests(activeTab);
  }, [activeTab]);

  const fetchRequests = async (tab) => {
    setLoading(true);
    try {
      const endpoint = tab === "pricing" ? "/auth/quotes/sent" : "/auth/boqs/sent";
      const res = await api.get(endpoint);
      const fetchedData = res.data;
      // Handle Laravel's { data: [...] } wrapper or direct array
      const dataArray = Array.isArray(fetchedData) ? fetchedData : (fetchedData?.data || []);
      setRequests(dataArray);
    } catch (err) {
      console.error(`Failed to fetch ${tab}:`, err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter requests locally by search query (supplier name, project name, or notes)
  const filteredRequests = useMemo(() => {
    if (!searchQuery.trim()) return requests;
    const q = searchQuery.toLowerCase().trim();
    return requests.filter((req) => {
      const name = req?.supplier?.company_profile?.company_name || req?.supplier?.name || req?.project_name || "";
      const notes = req?.notes || req?.description || "";
      const loc = req?.supplier?.company_profile?.location || req?.project_location || "";
      return (
        name.toLowerCase().includes(q) ||
        notes.toLowerCase().includes(q) ||
        loc.toLowerCase().includes(q)
      );
    });
  }, [requests, searchQuery]);

  // Statistics calculation for the current tab
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => !r.status || r.status === "pending").length;
    const replied = requests.filter(
      (r) => r.status === "replied" || r.status === "accepted"
    ).length;
    return { total, pending, replied };
  }, [requests]);

  return (
    <div className="w-full font-tajawal" dir={isEnglish ? "ltr" : "rtl"}>
      {/* 1. Hero Header Banner */}
      <div className="pt-6 px-4 md:px-12 relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden shadow-md min-h-[220px] md:min-h-[260px] flex flex-col justify-between p-6 md:p-10 text-white"
            data-aos="fade-up"
          >
            {/* Background Image */}
            <img
              src="/quotes-hero.jpg"
              alt="Quotes Hero Banner"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Dark Slate Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90 backdrop-blur-[0.5px]"></div>

            {/* Top Navigation Row */}
            <div className="relative z-10 flex items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm px-3.5 py-1.5 rounded-full transition-all border border-white/15"
              >
                {isEnglish ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                <span>{isEnglish ? "Back to Home" : "العودة للرئيسية"}</span>
              </Link>

              <span className="bg-[#EB682C] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                {isEnglish ? "Quotation Dashboard" : "لوحة متابعة المقايسات"}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="relative z-10 max-w-2xl my-auto py-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 tracking-tight">
                {isEnglish ? "My Requests & Quotations" : "مقايستي وطلبات التسعير"}
              </h1>
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed max-w-xl">
                {isEnglish
                  ? "Track, review, and manage all your sent pricing and BOQ requests directly with suppliers."
                  : "متابعة وإدارة كافة طلبات التسعير وجداول الكميات المرسلة للموردين والمصانع المعتمدة بكل سهولة واحترافية."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Section */}
      <section className="py-8 px-4 md:px-12 w-full">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" data-aos="fade-up" data-aos-delay="50">
            {/* Total Requests */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#EB682C] shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">
                  {isEnglish ? "Total Requests" : "إجمالي الطلبات"}
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-gray-900">
                  {stats.total}
                </span>
              </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">
                  {isEnglish ? "Awaiting Reply" : "قيد الانتظار"}
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-amber-600">
                  {stats.pending}
                </span>
              </div>
            </div>

            {/* Replied Requests */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">
                  {isEnglish ? "Offers Received" : "تم الرد والتسعير"}
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-emerald-600">
                  {stats.replied}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Row: Tabs & Search Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8" data-aos="fade-up" data-aos-delay="100">
            {/* Segmented Tab Pill */}
            <div className="flex bg-gray-200/80 p-1.5 rounded-2xl shadow-inner w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveTab("pricing");
                  setSearchQuery("");
                }}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === "pricing"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Tag className={`w-4 h-4 ${activeTab === "pricing" ? "text-[#EB682C]" : "text-gray-400"}`} />
                <span>{isEnglish ? "Pricing Requests" : "طلبات التسعير"}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("boq");
                  setSearchQuery("");
                }}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === "boq"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FileSpreadsheet className={`w-4 h-4 ${activeTab === "boq" ? "text-[#EB682C]" : "text-gray-400"}`} />
                <span>{isEnglish ? "BOQ Requests" : "طلبات المقايسة"}</span>
              </button>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
              <input
                type="text"
                placeholder={isEnglish ? "Filter requests..." : "بحث في الطلبات..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200/90 rounded-xl pr-9 pl-8 py-2.5 text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C] transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Section Subheading with Count */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>
                {activeTab === "pricing"
                  ? (isEnglish ? "Sent Pricing Requests" : "طلبات التسعير المرسلة")
                  : (isEnglish ? "Sent BOQ Requests" : "طلبات المقايسة المرسلة")}
              </span>
              <span className="text-xs bg-[#EB682C]/10 text-[#EB682C] px-2.5 py-0.5 rounded-full font-bold">
                {filteredRequests.length}
              </span>
            </h2>
          </div>

          {/* 3. Cards Grid / States */}
          {loading ? (
            <div className="flex flex-col justify-center items-center py-28 bg-white border border-gray-200/80 rounded-3xl shadow-xs">
              <Loader2 className="w-10 h-10 animate-spin text-[#EB682C] mb-3" />
              <p className="text-sm text-gray-500 font-medium">
                {isEnglish ? "Loading requests..." : "جاري تحميل الطلبات..."}
              </p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-20 px-6 bg-white border border-gray-200/80 rounded-3xl shadow-xs" data-aos="fade-up">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#EB682C] mb-4">
                {activeTab === "pricing" ? (
                  <Tag className="w-8 h-8" />
                ) : (
                  <FileSpreadsheet className="w-8 h-8" />
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {searchQuery
                  ? (isEnglish ? "No matching requests found" : "لا توجد نتائج مطابقة لبحثك")
                  : (isEnglish ? "No requests found" : "لا توجد طلبات حتى الآن")}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                {searchQuery
                  ? (isEnglish ? "Try adjusting your search terms to find what you are looking for." : "جرّب استخدام كلمات بحث أخرى أو إزالة الفلتر لعرض جميع الطلبات.")
                  : activeTab === "pricing"
                  ? (isEnglish ? "You haven't sent any pricing requests yet. Explore our verified products and suppliers." : "لم تقم بإرسال أي طلبات تسعير حتى الآن. يمكنك تصفح مواد البناء وطلب تسعير فوري من الموردين.")
                  : (isEnglish ? "You haven't sent any BOQ requests yet. You can submit your project bills of quantities to get accurate quotes." : "لم تقم بإرسال أي طلبات مقايسة حتى الآن. يمكنك رفع جدول كميات مشروعك والحصول على عروض أسعار متكاملة.")}
              </p>

              {!searchQuery && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-[#EB682C] text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#d65a22] transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isEnglish ? "Browse Products" : "تصفح المنتجات"}</span>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 text-xs md:text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <span>{isEnglish ? "Browse Services" : "تصفح الخدمات"}</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((req, idx) => (
                <div key={req.uuid || req.id || idx} data-aos="fade-up" data-aos-delay={(idx % 6) * 50}>
                  <QuoteCard req={req} type={activeTab} />
                </div>
              ))}
            </div>
          )}

          {/* 4. Marketing Suggested Companies & Direct Quote Recommendations */}
          <RecommendedSuppliers />

        </div>
      </section>
    </div>
  );
}
