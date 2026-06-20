"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";

export default function BOQOfferDetailsPage({ params }) {
  const { id } = use(params);
  const { isEnglish } = useLanguage();
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRejectSuccessModal, setShowRejectSuccessModal] = useState(false);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      await api.post(`/auth/boqs/${id}/accept`);
      setShowSuccessModal(true);
      await fetchDetails();
    } catch (err) {
      console.error(err);
      alert(isEnglish ? "An error occurred during acceptance" : "حدث خطأ أثناء القبول");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert(isEnglish ? "Please write the reason for rejection" : "الرجاء كتابة سبب الرفض");
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post(`/auth/boqs/${id}/reject`, { reason: rejectReason });
      setShowRejectReason(false);
      setRejectReason("");
      await fetchDetails();
      setShowRejectSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert(isEnglish ? "An error occurred during rejection" : "حدث خطأ أثناء الرفض");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className={`min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? "ltr" : "rtl"}>
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#EB682C]" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!request) {
    return (
      <main className={`min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? "ltr" : "rtl"}>
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <p className="text-gray-500 font-bold text-xl">{isEnglish ? "Request not found" : "الطلب غير موجود"}</p>
        </div>
        <Footer />
      </main>
    );
  }

  const supplierName = request.supplier?.company_profile?.company_name || request.supplier?.name || (isEnglish ? "No name" : "بدون اسم");

  return (
    <main className={`min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? "ltr" : "rtl"}>
      <Navbar />
      
      <div className="font-tajawal w-full pb-20 relative mt-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 max-w-5xl mx-auto px-6">
          <div className="w-6"></div> {/* Spacer for centering */}
          <h2 className="text-3xl font-bold text-[#EB682C]">{isEnglish ? "BOQ Offers" : "عروض المقايسة"}</h2>
          <Link href="/quotes" className="text-[#EB682C] hover:text-[#d65a22] transition-colors">
            {isEnglish ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <h3 className={`text-2xl font-bold text-gray-900 ${isEnglish ? 'text-left' : 'text-right'} mb-6`}>
            {isEnglish ? `Offer from ${supplierName}` : `عرض ${supplierName}`}
          </h3>

          {/* Offer Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
            <table className={`w-full ${isEnglish ? 'text-left' : 'text-right'} text-sm`}>
              <thead className="bg-[#F8FAFC] text-gray-400 border-b border-gray-100">
                <tr>
                  <th className={`py-4 px-6 font-bold ${isEnglish ? 'border-r' : 'border-l'} border-gray-100 w-1/4`}>{isEnglish ? "Product Name ↕" : "اسم المنتج ↕"}</th>
                  <th className={`py-4 px-6 font-bold ${isEnglish ? 'border-r' : 'border-l'} border-gray-100 w-1/6`}>{isEnglish ? "Supply Duration ↕" : "مدة التوريد ↕"}</th>
                  <th className={`py-4 px-6 font-bold ${isEnglish ? 'border-r' : 'border-l'} border-gray-100 w-1/6`}>{isEnglish ? "Price ↕" : "السعر ↕"}</th>
                  <th className="py-4 px-6 font-bold w-1/4">{isEnglish ? "Notes ↕" : "الملاحظات ↕"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {request.items?.map((item) => (
                  <tr key={item.uuid} className="hover:bg-gray-50/50 transition-colors">
                    <td className={`py-5 px-6 text-gray-900 font-bold ${isEnglish ? 'border-r' : 'border-l'} border-gray-100`}>
                      {item.item_name || item.product_name}
                    </td>
                    <td className={`py-5 px-6 text-gray-800 ${isEnglish ? 'border-r' : 'border-l'} border-gray-100 font-bold`}>
                      {item.reply_supply_duration || item.duration || "—"}
                    </td>
                    <td className={`py-5 px-6 text-gray-800 ${isEnglish ? 'border-r' : 'border-l'} border-gray-100 font-bold`}>
                      {item.reply_unit_price ? `${item.reply_unit_price} ${isEnglish ? 'SAR' : 'ريال'}` : "—"}
                    </td>
                    <td className="py-5 px-6 text-gray-600 leading-relaxed text-xs">
                      {item.reply_notes || item.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Status Display if already accepted/rejected */}
          {request.status === "accepted" && (
            <div className="text-center bg-green-50 text-green-700 py-4 rounded-xl font-bold">
              {isEnglish ? "This BOQ has been accepted" : "تم قبول هذه المقايسة"}
            </div>
          )}
          {request.status === "rejected" && (
            <div className="text-center bg-red-50 text-red-700 py-4 rounded-xl font-bold">
              {isEnglish ? "This BOQ has been rejected" : "تم رفض هذه المقايسة"}
            </div>
          )}

          {/* Reject Reason Textarea */}
          {showRejectReason && request.status !== "accepted" && request.status !== "rejected" && (
            <div className="mb-8 animate-in fade-in slide-in-from-top-2">
              <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-bold text-gray-700 mb-3 text-sm`}>{isEnglish ? "Reason for rejection" : "سبب الرفض"}</label>
              <textarea 
                rows={4} 
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder={isEnglish ? "Mention the reason for rejection" : "اذكر سبب الرفض"} 
                className={`w-full bg-white border border-gray-200 rounded-xl p-4 text-xs text-gray-600 outline-none resize-none focus:border-orange-300 transition-colors ${isEnglish ? 'text-left' : 'text-right'}`}
                disabled={isSubmitting}
              ></textarea>
              <div className={`mt-4 flex gap-4 ${isEnglish ? 'flex-row' : 'flex-row'}`}>
                <button 
                  onClick={handleReject}
                  disabled={isSubmitting}
                  className="flex-1 bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d65a22] transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isEnglish ? "Send Reason" : "ارسال السبب"}
                </button>
                <button 
                  onClick={() => setShowRejectReason(false)}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isEnglish ? "Cancel" : "إلغاء"}
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!showRejectReason && request.status !== "accepted" && request.status !== "rejected" && (
            <div className="flex flex-col md:flex-row gap-4 mt-10">
              <button 
                onClick={handleAccept}
                disabled={isSubmitting}
                className="flex-1 bg-[#D97746] hover:bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-sm disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                {isEnglish ? "Accept BOQ Request" : "قبول طلب المقايسة"}
              </button>
              
              <button 
                onClick={() => setShowRejectReason(true)}
                disabled={isSubmitting}
                className="flex-1 bg-[#3B5BDB] hover:bg-[#2A5CBA] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-sm disabled:opacity-50"
              >
                {isEnglish ? "Reject BOQ Request" : "رفض طلب المقايسة"}
              </button>
            </div>
          )}

        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative flex flex-col items-center text-center">
              
              {/* Close button */}
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Checkmark */}
              <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-green-200 mt-4">
                <Check className="w-10 h-10" strokeWidth={3} />
              </div>

              <h3 className="text-[#EB682C] text-2xl font-bold mb-2">{isEnglish ? "BOQ accepted successfully" : "تم قبول المقايسة بنجاح"}</h3>
              <p className="text-gray-500 text-sm mb-8">{isEnglish ? "Your request will be reviewed and you will be contacted shortly" : "سيتم مراجعة طلبك والتواصل معك في اقرب وقت"}</p>

              <div className="w-full flex flex-col gap-3">
                <Link href={`/dashboard/chat?user=${request.supplier?.uuid || request.supplier_id}`} className="w-full">
                  <button className="w-full bg-[#D97746] hover:bg-[#EB682C] text-white py-3.5 rounded-xl font-bold transition-colors">
                    {isEnglish ? "Start chat with supplier" : "بدء محادثة مع المورد"}
                  </button>
                </Link>
                
                <Link href="/" className="w-full">
                  <button className="w-full bg-[#3B5BDB] hover:bg-[#2A5CBA] text-white py-3.5 rounded-xl font-bold transition-colors">
                    {isEnglish ? "Back to Home Page" : "الرجوع للصفحة الرئيسية"}
                  </button>
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* Reject Success Modal */}
        {showRejectSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative flex flex-col items-center text-center">
              
              <button 
                onClick={() => setShowRejectSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-6 shadow-lg shadow-red-100 mt-4">
                <Check className="w-10 h-10" strokeWidth={3} />
              </div>

              <h3 className="text-gray-900 text-2xl font-bold mb-2">{isEnglish ? "Request rejected successfully" : "تم رفض الطلب بنجاح"}</h3>
              <p className="text-gray-500 text-sm mb-8">{isEnglish ? "The reason for rejection has been sent to the supplier." : "تم إرسال سبب الرفض إلى المورد."}</p>

              <div className="w-full flex flex-col gap-3">
                <Link href="/" className="w-full">
                  <button className="w-full bg-[#3B5BDB] hover:bg-[#2A5CBA] text-white py-3.5 rounded-xl font-bold transition-colors">
                    {isEnglish ? "Back to Home Page" : "الرجوع للصفحة الرئيسية"}
                  </button>
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
