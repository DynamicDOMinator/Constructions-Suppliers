"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PricingOfferDetailsPage({ params }) {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const offerItems = [
    { name: "أنابيب ووصلات ومآخذ توصيل", duration: "أيام من 4-7", price: "500 ريال", notes: "شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية ملاحظات المورد" },
    { name: "ارضيات الخزف بورسلان", duration: "أيام من 4-7", price: "500 ريال", notes: "" },
    { name: "مكيف هواء 360 كاسيت", duration: "أيام من 4-7", price: "500 ريال", notes: "" },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal text-right">
      <Navbar />
      
      <div className="font-tajawal w-full pb-20 relative mt-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 max-w-5xl mx-auto px-6">
          <div className="w-6"></div> {/* Spacer for centering */}
          <h2 className="text-3xl font-bold text-[#EB682C]">عروض التسعير</h2>
          <Link href="/quotes" className="text-[#EB682C] hover:text-[#d65a22] transition-colors">
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 text-right mb-6">عرض شركة الحلول الصناعية</h3>

          {/* Offer Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
            <table className="w-full text-right text-sm">
              <thead className="bg-[#F8FAFC] text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6 font-bold border-l border-gray-100 w-1/4">الملاحظات ↕</th>
                  <th className="py-4 px-6 font-bold border-l border-gray-100 w-1/6">السعر ↕</th>
                  <th className="py-4 px-6 font-bold border-l border-gray-100 w-1/6">مدة التوريد ↕</th>
                  <th className="py-4 px-6 font-bold w-1/4">اسم المنتج ↕</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {offerItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 text-gray-600 border-l border-gray-100 leading-relaxed text-xs">
                      {item.notes}
                    </td>
                    <td className="py-5 px-6 text-gray-800 border-l border-gray-100 font-bold">
                      {item.price}
                    </td>
                    <td className="py-5 px-6 text-gray-800 border-l border-gray-100 font-bold">
                      {item.duration}
                    </td>
                    <td className="py-5 px-6 text-gray-900 font-bold">
                      {item.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reject Reason Textarea */}
          {showRejectReason && (
            <div className="mb-8 animate-in fade-in slide-in-from-top-2">
              <label className="block text-right font-bold text-gray-700 mb-3 text-sm">سبب الرفض</label>
              <textarea 
                rows={4} 
                placeholder="اذكر سبب الرفض" 
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-xs text-gray-600 outline-none resize-none focus:border-orange-300 transition-colors"
              ></textarea>
              <div className="mt-4">
                <button 
                  onClick={() => setShowRejectReason(false)}
                  className="w-full bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d65a22] transition-colors shadow-sm"
                >
                  ارسال السبب
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!showRejectReason && (
            <div className="flex flex-col md:flex-row gap-4 mt-10">
              <button 
                onClick={() => setShowSuccessModal(true)}
                className="flex-1 bg-[#D97746] hover:bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-sm"
              >
                قبول طلب التسعير
              </button>
              
              <button 
                onClick={() => setShowRejectReason(true)}
                className="flex-1 bg-[#3B5BDB] hover:bg-[#2A5CBA] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-sm"
              >
                رفض طلب التسعير
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

              <h3 className="text-[#EB682C] text-2xl font-bold mb-2">تم قبول طلب التسعير بنجاح</h3>
              <p className="text-gray-500 text-sm mb-8">سيتم مراجعة طلبك والتواصل معك في اقرب وقت</p>

              <div className="w-full flex flex-col gap-3">
                <button className="w-full bg-[#D97746] hover:bg-[#EB682C] text-white py-3.5 rounded-xl font-bold transition-colors">
                  بدء محادثة مع المورد
                </button>
                
                <Link href="/" className="w-full">
                  <button className="w-full bg-[#3B5BDB] hover:bg-[#2A5CBA] text-white py-3.5 rounded-xl font-bold transition-colors">
                    الرجوع للصفحة الرئيسية
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
