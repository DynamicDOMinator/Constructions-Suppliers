"use client";
import { useState } from "react";
import Link from "next/link";
import { X, Loader2, LogIn } from "lucide-react";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetailsPopup({ isOpen, onClose, product, supplierId }) {
  const { isEnglish } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    quantity: "1",
    notes: "",
  });

  if (!isOpen || !product) return null;

  const isService = Boolean(product.isService || (!product.model && !product.price && !product.uuid));
  const isEquipment = Boolean(product.isEquipment);
  const itemTypeLabel = isService 
    ? (isEnglish ? "service" : "الخدمة") 
    : isEquipment 
      ? (isEnglish ? "equipment" : "المعدة") 
      : (isEnglish ? "product" : "المنتج");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user && !isAuthenticated) {
      setError(
        isEnglish
          ? "You must be logged in to submit a quote request. Please sign in or register."
          : "يجب تسجيل الدخول لإرسال طلب عرض السعر. يرجى تسجيل الدخول أو إنشاء حساب جديد."
      );
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const form = new FormData();
      const baseNote = isEnglish 
        ? `Pricing request for ${itemTypeLabel} ${product.name}` 
        : `طلب تسعير لـ ${itemTypeLabel} ${product.name}`;
      const finalNotes = formData.notes ? `${baseNote} - ${formData.notes}` : baseNote;
      
      form.append("notes", finalNotes);
      
      // Add product/service as item using the quotes API format
      form.append("items[0][supplier_id]", supplierId);
      form.append("items[0][product_name]", product.name);
      form.append("items[0][quantity]", formData.quantity);
      if (product.price) {
        form.append("items[0][original_price]", product.price);
      }

      await api.post("/auth/quotes", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(isEnglish ? "An error occurred while sending the request. Please try again later." : "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity" dir={isEnglish ? "ltr" : "rtl"}>
      <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col ${isEnglish ? 'md:flex-row-reverse' : 'md:flex-row'} max-h-[90vh]`}>
        
        {/* Product Details Side */}
        <div className={`w-full md:w-1/2 bg-gray-50 p-8 overflow-y-auto ${isEnglish ? 'border-r' : 'border-l'} border-gray-100`}>
          <div className="flex justify-between items-start mb-6">
            <h2 className={`text-2xl font-bold text-gray-900 font-tajawal ${isEnglish ? 'text-left' : 'text-right'} w-full`}>
              {isEnglish ? `${isService ? "Service" : isEquipment ? "Equipment" : "Product"} Details` : `تفاصيل ${itemTypeLabel}`}
            </h2>
            <button onClick={onClose} className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="aspect-square bg-white rounded-2xl mb-6 overflow-hidden flex items-center justify-center border border-gray-100 p-4">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
            ) : (
              <span className="text-6xl">{isService ? "🛠️" : isEquipment ? "🚜" : "📦"}</span>
            )}
          </div>

          <h3 className={`font-bold text-gray-900 text-xl mb-2 ${isEnglish ? 'text-left' : 'text-right'}`}>{product.name}</h3>
          {product.model && <p className={`text-[#EB682C] font-bold text-sm mb-4 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Model:" : "الموديل:"} {product.model}</p>}
          
          <div className="mb-6">
            <h4 className={`font-bold text-gray-700 text-sm mb-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
              {isEnglish ? "Description:" : "الوصف:"}
            </h4>
            <p className={`text-gray-600 text-sm leading-relaxed ${isEnglish ? 'text-left' : 'text-right'}`}>
              {product.description || (isEnglish ? "No description available." : "لا يوجد وصف متاح.")}
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <span className="text-gray-500 font-bold">{isEnglish ? "Estimated Price" : "السعر التقديري"}</span>
            <span className="font-bold text-[#EB682C] text-lg">
              {product.price ? `${product.price} ${isEnglish ? 'SAR' : 'ريال'}` : (isEnglish ? "Upon Request" : "حسب الطلب")}
            </span>
          </div>
        </div>

        {/* Request Form Side */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-white relative">
          <button onClick={onClose} className={`hidden md:flex absolute top-6 ${isEnglish ? 'right-6' : 'left-6'} p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors`}>
            <X className="w-5 h-5" />
          </button>

          <h2 className={`text-2xl font-bold text-[#2A5CBA] mb-2 font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Request Pricing" : "طلب عرض سعر"}</h2>
          <p className={`text-gray-500 text-sm mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
            {isEnglish 
              ? `Please fill in your details to get an accurate quote for this ${itemTypeLabel}.` 
              : `يرجى تعبئة التفاصيل للحصول على تسعير دقيق لـ ${itemTypeLabel}.`}
          </p>

          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{isEnglish ? "Sent successfully!" : "تم الإرسال بنجاح!"}</h3>
              <p className="text-gray-500">{isEnglish ? "The pricing request has been sent to the supplier." : "تم إرسال طلب عرض السعر إلى المورد."}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-bold text-gray-700 mb-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                  {isEnglish ? (isService ? "Quantity / Scope" : "Required Quantity") : (isService ? "الكمية / النطاق المطلوب" : "الكمية المطلوبة")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C]/20 focus:border-[#EB682C] transition-all font-semibold"
                />
              </div>

              <div>
                <label className={`block text-sm font-bold text-gray-700 mb-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                  {isEnglish ? "Notes / Special Requests (Optional)" : "ملاحظات أو مواصفات خاصة (اختياري)"}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes || ""}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={isEnglish ? "Describe your requirements, deadlines, or details..." : "اكتب أي متطلبات أو تفاصيل خاصة ترغب بها..."}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C]/20 focus:border-[#EB682C] transition-all text-sm resize-none font-tajawal"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl space-y-2">
                  <p className="text-red-600 text-sm font-bold">{error}</p>
                  {!user && !isAuthenticated && (
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EB682C] hover:underline"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>{isEnglish ? "Go to Sign In" : "الانتقال لتسجيل الدخول"}</span>
                    </Link>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#d65a22] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-4 shadow-md shadow-[#EB682C]/20 cursor-pointer"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEnglish ? "Send Request" : "إرسال الطلب")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
