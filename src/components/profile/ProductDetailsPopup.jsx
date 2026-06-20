"use client";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductDetailsPopup({ isOpen, onClose, product, supplierId }) {
  const { isEnglish } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    quantity: "1",
  });

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const form = new FormData();
      const notes = isEnglish ? `Pricing request for product ${product.name}` : `طلب تسعير للمنتج ${product.name}`;
      
      form.append("notes", notes);
      
      // Add product as item using the quotes API format
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
            <h2 className={`text-2xl font-bold text-gray-900 font-tajawal ${isEnglish ? 'text-left' : 'text-right'} w-full`}>{isEnglish ? "Product Details" : "تفاصيل المنتج"}</h2>
            <button onClick={onClose} className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="aspect-square bg-white rounded-2xl mb-6 overflow-hidden flex items-center justify-center border border-gray-100 p-4">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
            ) : (
              <span className="text-6xl">📦</span>
            )}
          </div>

          <h3 className={`font-bold text-gray-900 text-xl mb-2 ${isEnglish ? 'text-left' : 'text-right'}`}>{product.name}</h3>
          {product.model && <p className={`text-[#EB682C] font-bold text-sm mb-4 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Model:" : "الموديل:"} {product.model}</p>}
          
          <div className="mb-6">
            <h4 className={`font-bold text-gray-700 text-sm mb-2 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Product Description:" : "وصف المنتج:"}</h4>
            <p className={`text-gray-600 text-sm leading-relaxed ${isEnglish ? 'text-left' : 'text-right'}`}>{product.description || (isEnglish ? "No description available for this product." : "لا يوجد وصف متاح لهذا المنتج.")}</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
            <span className="text-gray-500 font-bold">{isEnglish ? "Estimated Price" : "السعر التقديري"}</span>
            <span className="font-bold text-[#EB682C] text-lg">{product.price ? `${product.price} ${isEnglish ? 'SAR' : 'ريال'}` : (isEnglish ? "Not specified" : "غير محدد")}</span>
          </div>
        </div>

        {/* Request Form Side */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-white relative">
          <button onClick={onClose} className={`hidden md:flex absolute top-6 ${isEnglish ? 'right-6' : 'left-6'} p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors`}>
            <X className="w-5 h-5" />
          </button>

          <h2 className={`text-2xl font-bold text-[#2A5CBA] mb-2 font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Request Pricing" : "طلب عرض سعر"}</h2>
          <p className={`text-gray-500 text-sm mb-8 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Please fill in your project details to get an accurate quote for this product." : "يرجى تعبئة تفاصيل مشروعك للحصول على تسعير دقيق لهذا المنتج."}</p>

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
            <form onSubmit={handleSubmit} className="space-y-5">


              <div>
                <label className={`block text-sm font-bold text-gray-700 mb-2 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Required Quantity" : "الكمية المطلوبة"} <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EB682C]/20 focus:border-[#EB682C] transition-all"
                />
              </div>

              {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d65a22] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-4 shadow-md shadow-[#EB682C]/20"
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
