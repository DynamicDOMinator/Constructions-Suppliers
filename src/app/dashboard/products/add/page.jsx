"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UploadCloud, X } from "lucide-react";
import api from "@/lib/axios";
import Popup from "@/components/Popup";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupState, setPopupState] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
    onConfirm: null,
  });
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files) => {
    setImages((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!name) {
      setPopupState({
        isOpen: true,
        type: "alert",
        title: "تنبيه",
        message: "الرجاء إدخال اسم المنتج",
        onConfirm: () => setPopupState({ ...popupState, isOpen: false }),
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (price) formData.append("price", price);
      if (description) formData.append("description", description);

      images.forEach((img) => {
        formData.append("images[]", img);
      });

      await api.post("/auth/company/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPopupState({
        isOpen: true,
        type: "success",
        title: "نجاح",
        message: "تم إضافة المنتج بنجاح",
        onConfirm: () => {
          setPopupState({ ...popupState, isOpen: false });
          router.push("/dashboard/products");
        },
      });
    } catch (err) {
      console.error("Failed to add product:", err);
      setPopupState({
        isOpen: true,
        type: "danger",
        title: "خطأ",
        message: err.response?.data?.message || "حدث خطأ أثناء إضافة المنتج",
        onConfirm: () => setPopupState({ ...popupState, isOpen: false }),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="font-tajawal max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-900">اضافة منتج جديد</h1>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">اسم المنتج</label>
          <input
            type="text"
            placeholder="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right"
          />
        </div>

        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">السعر</label>
          <input
            type="number"
            placeholder="120"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-14 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-right"
          />
        </div>

        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">وصف المنتج</label>
          <textarea
            placeholder="وصف المنتج ......."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl text-sm min-h-[150px] resize-none focus:outline-none focus:border-[#EB682C] text-right"
          ></textarea>
        </div>

        <div className="flex flex-col text-right gap-2">
          <label className="text-sm font-bold text-gray-700">صورة المنتج</label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-[#EB682C]/30 bg-[#EB682C]/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-[#EB682C]/10 cursor-pointer transition-colors"
          >
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/jpg, application/pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-6 h-6 text-[#EB682C]" />
            </div>
            <p className="text-sm font-bold text-gray-700 mb-1">
              اسحب ملفاتك هنا او{" "}
              <span className="text-[#EB682C]">اضغط لرفع الملفات</span>
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG or PDF (max. 800x400px)
            </p>
          </div>

          {/* Image Previews */}
          {previewUrls.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4 justify-end">
              {previewUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border border-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-4" dir="ltr">
          <Link href="/dashboard/products" className="flex-1">
            <button className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              إلغاء
            </button>
          </Link>
          <div className="flex-1">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#EB682C] text-white py-4 rounded-xl font-bold hover:bg-[#d65a22] transition-colors disabled:opacity-50"
            >
              {loading ? "جاري الحفظ..." : "حفظ"}
            </button>
          </div>
        </div>
      </div>

      <Popup
        isOpen={popupState.isOpen}
        type={popupState.type}
        title={popupState.title}
        message={popupState.message}
        onConfirm={popupState.onConfirm}
        onCancel={() => setPopupState({ ...popupState, isOpen: false })}
      />
    </div>
  );
}
