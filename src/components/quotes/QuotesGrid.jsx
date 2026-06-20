"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Loader2, Package } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";
import QuoteCard from "@/components/quotes/QuoteCard";
import { useLanguage } from "@/context/LanguageContext";

export default function QuotesGrid() {
  const { isEnglish } = useLanguage();
  const [activeTab, setActiveTab] = useState("pricing"); // "pricing" | "boq"
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-6 md:px-12 bg-white font-tajawal w-full" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header Row */}
        <div className="relative flex items-center justify-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#EB682C]">
            {isEnglish ? "My Requests" : "مقايسيتي"}
          </h1>
          <Link href="/" className={`absolute ${isEnglish ? 'left-0 rotate-180' : 'right-0'} text-[#EB682C] hover:text-[#d65a22] transition-colors`}>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Tabs */}
        <div className={`flex bg-gray-100 p-1 rounded-xl shadow-inner mb-8 max-w-sm mx-auto ${isEnglish ? 'flex-row' : 'flex-row'}`}>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === "pricing"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {isEnglish ? "Pricing Requests" : "طلبات التسعير"}
          </button>
          <button
            onClick={() => setActiveTab("boq")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === "boq"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {isEnglish ? "BOQ Requests" : "طلبات المقايسة"}
          </button>
        </div>

        {/* Subtitle */}
        <div className={`${isEnglish ? 'text-left' : 'text-right'} mb-8`}>
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === "pricing" ? (isEnglish ? "Sent Pricing Requests" : "طلبات التسعير المرسلة") : (isEnglish ? "Sent BOQ Requests" : "طلبات المقايسة المرسلة")}
          </h2>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-[#EB682C]" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 border border-gray-100 rounded-2xl">
            <Package className="w-14 h-14 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">{isEnglish ? "No requests found" : "لا توجد طلبات"}</h3>
            <p className="text-gray-400 text-sm">
              {activeTab === "pricing"
                ? (isEnglish ? "You haven't sent any pricing requests yet." : "لم تقم بإرسال أي طلبات تسعير حتى الآن.")
                : (isEnglish ? "You haven't sent any BOQ requests yet." : "لم تقم بإرسال أي طلبات مقايسة حتى الآن.")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req, idx) => (
              <div key={req.uuid} data-aos="fade-up" data-aos-delay={idx * 100}>
                <QuoteCard req={req} type={activeTab} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
