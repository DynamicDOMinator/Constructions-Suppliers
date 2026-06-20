"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ChevronDown, Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function PricingReplyPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/auth/quotes/${id}`);
        setRequest(res.data);
        
        // Initialize replies state
        if (res.data?.items) {
          const initialReplies = {};
          res.data.items.forEach(item => {
            initialReplies[item.uuid] = { price: "", notes: "" };
          });
          setReplies(initialReplies);
        }
      } catch (err) {
        console.error("Failed to fetch quote details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleReplyChange = (itemUuid, field, value) => {
    setReplies(prev => ({
      ...prev,
      [itemUuid]: {
        ...prev[itemUuid],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        items: Object.entries(replies).map(([item_uuid, data]) => ({
          item_uuid,
          reply_unit_price: data.price ? parseFloat(data.price) : 0,
          reply_notes: data.notes || ""
        }))
      };
      
      await api.post(`/auth/quotes/${id}/reply`, payload);
      router.push("/dashboard/pricing");
    } catch (err) {
      console.error("Failed to submit reply:", err);
      alert("حدث خطأ أثناء إرسال الرد");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-[#EB682C]" />
      </div>
    );
  }

  if (!request) {
    return <div className="text-center py-24 font-bold text-gray-500">الطلب غير موجود</div>;
  }

  const senderName = request.sender?.name || "بدون اسم";

  return (
    <div className="font-tajawal max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
       
        <div className="text-right flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">طلبات التسعير</h1>
          <p className="text-sm font-bold text-gray-700">{senderName}</p>
        </div>
      </div>

      {/* Reply Form */}
      <div className="bg-white border border-[#fbd4bc] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-8 relative">
        
        {request.items?.map((item, idx) => (
          <div key={item.uuid} className="flex flex-col md:flex-row gap-8 relative z-10 pb-8 mb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
            
            {/* Right Side: Product Name & Price */}
            <div className="w-full md:w-1/2 flex flex-col text-right gap-4">
              <h2 className="text-sm font-bold text-[#3B5BDB]">{item.product_name}</h2>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700">السعر</label>
                <input 
                  type="number" 
                  placeholder="ملاحظات" 
                  value={replies[item.uuid]?.price || ""}
                  onChange={(e) => handleReplyChange(item.uuid, "price", e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right bg-[#fbfbfb]" 
                />
              </div>
            </div>

            {/* Left Side: Notes */}
            <div className="w-full md:w-1/2 flex flex-col text-right gap-2 mt-2 md:mt-0">
              <label className="text-xs font-bold text-gray-700">ملاحظات</label>
              <textarea 
                placeholder="ملاحظات" 
                value={replies[item.uuid]?.notes || ""}
                onChange={(e) => handleReplyChange(item.uuid, "notes", e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl text-sm min-h-[100px] h-full resize-none focus:outline-none focus:border-[#EB682C] text-right bg-[#fbfbfb]"
              ></textarea>
            </div>

          </div>
        ))}

      </div>

      <button 
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#c27147] transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center gap-2"
      >
        {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "ارسال"}
      </button>

    </div>
  );
}
