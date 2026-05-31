import { useState } from "react";
import { UploadCloud, Check } from "lucide-react";

export default function SupplierRegistration({ onFinish }) {
  const [step, setStep] = useState(1);

  const stepsData = [
    { id: 1, title: "معلومات الشركة" },
    { id: 2, title: "وسائل التواصل" },
    { id: 3, title: "المنتجات" },
    { id: 4, title: "الخدمات" },
  ];

  const renderStepper = () => (
    <div className="mb-14 relative w-full px-2">
      <div className="absolute -top-6 right-0 text-[#2A5CBA] text-xs font-bold font-tajawal">
        {stepsData[step - 1].title} {Math.round(((step) / 4) * 100)}%
      </div>

      <div className="flex justify-between items-center relative z-10 font-tajawal">
        {/* Background Line */}
        <div className="absolute top-[14px] right-0 left-0 h-[2px] bg-gray-100 -z-10"></div>
        {/* Active Line */}
        <div className="absolute top-[14px] right-0 h-[2px] bg-[#2A5CBA] -z-10 transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        
        {stepsData.map((s) => {
          const isActive = step === s.id;
          const isCompleted = step > s.id;

          return (
            <div key={s.id} className="flex flex-col items-center relative bg-white">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                isCompleted ? "bg-[#2A5CBA] text-white border-2 border-[#2A5CBA]" : 
                isActive ? "bg-white border-[1.5px] border-[#2A5CBA] text-[#2A5CBA]" : 
                "bg-white border border-gray-200 text-gray-300"
              }`}>
                {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : s.id}
              </div>
              <span className={`absolute top-9 text-[10px] whitespace-nowrap font-bold ${
                isCompleted || isActive ? "text-gray-800" : "text-gray-400"
              }`}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">أنشئ ملفك التعريفي</h1>
      </div>

      {renderStepper()}

      {step === 1 && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">معلومات الشركة</h2>
          <input type="text" placeholder="اسم الشركة" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C]" />
          <input type="text" placeholder="رقم السجل التجاري" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C]" />
          <input type="text" placeholder="المدينة" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C]" />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">وسائل التواصل</h2>
          <input type="tel" placeholder="رقم الهاتف" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C]" />
          <input type="email" placeholder="البريد الإلكتروني للشركة" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C]" />
          <input type="text" placeholder="الموقع الإلكتروني (اختياري)" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C]" />
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">المنتجات</h2>
          <textarea placeholder="وصف المنتجات التي تقدمها..." className="w-full p-4 border border-gray-200 rounded-xl text-sm min-h-[120px] resize-none focus:outline-none focus:border-[#EB682C]"></textarea>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors">
            <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
            <p className="text-sm font-bold text-gray-700">ارفع كتالوج المنتجات</p>
            <p className="text-xs text-gray-400 mt-1">PDF (Max 10MB)</p>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">الخدمات</h2>
          <textarea placeholder="وصف الخدمات التي تقدمها..." className="w-full p-4 border border-gray-200 rounded-xl text-sm min-h-[120px] resize-none focus:outline-none focus:border-[#EB682C]"></textarea>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => {
            if (step < 4) setStep(step + 1);
            else onFinish();
          }}
          className="flex-1 bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors"
        >
          {step === 4 ? "إنهاء" : "التالي"}
        </button>
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="flex-1 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            السابق
          </button>
        )}
      </div>
    </div>
  );
}
