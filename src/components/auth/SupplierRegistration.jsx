import { useState } from "react";
import { UploadCloud, Check, Trash2, ChevronDown, GripVertical, Plus } from "lucide-react";

export default function SupplierRegistration({ onFinish }) {
  const [step, setStep] = useState(1);
  const [brands, setBrands] = useState(["Brand Name", "Brand Name", "Brand Name", "Lorem ipsum", "Gtf"]);
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  const [products, setProducts] = useState([{ id: 1 }]);
  const [services, setServices] = useState([{ id: 1 }]);

  const addBrand = (e) => {
    if (e.key === "Enter" && newBrand.trim()) {
      e.preventDefault();
      setBrands([...brands, newBrand.trim()]);
      setNewBrand("");
      setIsAddingBrand(false);
    }
  };

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
    <div className="w-full relative">
      <div className="absolute top-0 left-0 md:-left-8 text-[#2A5CBA] font-bold cursor-pointer hover:underline text-lg">
        تخطي
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">أنشئ ملفك التعريفي</h1>
      </div>

      {renderStepper()}

      {step === 1 && (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">اسم الشركة</label>
            <input type="text" placeholder="الاسم" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">مجال عمل الشركة</label>
            <input type="text" placeholder="الاسم" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">نبذة تعريفية عن الشركة</label>
            <textarea placeholder="الاسم" className="w-full p-4 border border-gray-200 rounded-2xl text-sm min-h-[120px] resize-none focus:outline-none focus:border-[#EB682C] text-right"></textarea>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">موقع الشركة</label>
            <input type="text" placeholder="الاسم" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">رقم السجل التجارى</label>
            <input type="text" placeholder="رقم السجل التجارى" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">رقم الترخيص</label>
            <input type="text" placeholder="رقم الترخيص" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
          </div>

          <div className="flex flex-row gap-4 mt-2">
            {/* Right Uploader */}
            <div className="flex flex-col gap-2 text-right w-1/2">
              <label className="text-sm font-bold text-gray-700">رقم ترخيص</label>
              <div className="border border-dashed border-[#de6d3a] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors h-32">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <UploadCloud className="w-5 h-5 text-[#de6d3a]" />
                </div>
                <p className="text-[10px] font-bold text-gray-600 mb-1">اسحب ملفاتك هنا او <span className="text-[#de6d3a]">اضغط لرفع الملفات</span></p>
                <p className="text-[8px] text-gray-400">SPNG, JPG or PDF (max. 800x400px)</p>
              </div>
            </div>

            {/* Left Uploader */}
            <div className="flex flex-col gap-2 text-right w-1/2">
              <label className="text-sm font-bold text-gray-700">السجل التجاري</label>
              <div className="border border-dashed border-[#de6d3a] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors h-32">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <UploadCloud className="w-5 h-5 text-[#de6d3a]" />
                </div>
                <p className="text-[10px] font-bold text-gray-600 mb-1">اسحب ملفاتك هنا او <span className="text-[#de6d3a]">اضغط لرفع الملفات</span></p>
                <p className="text-[8px] text-gray-400">SPNG, JPG or PDF (max. 800x400px)</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">رابط خريطة الموقع</label>
            <input type="text" placeholder="الرابط" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
          </div>

          <div className="flex flex-col gap-4 text-right">
            <label className="text-sm font-bold text-gray-700">لينكات التواصل الاجتماعي</label>
            <div className="flex flex-row gap-4">
              <input type="text" placeholder="فيسبوك" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
              <input type="text" placeholder="انستجرام" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
            </div>
            <div className="flex flex-row gap-4">
              <input type="text" placeholder="سناب شات" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
              <input type="text" placeholder="تيك توك" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">العلامات التجارية</label>
            <div className="flex flex-wrap items-center gap-3 p-3 border border-gray-200 rounded-2xl min-h-[56px]">
              
              <button 
                type="button"
                onClick={() => setIsAddingBrand(true)}
                className="flex items-center justify-center gap-1 px-4 py-2 border border-dashed border-[#de6d3a] rounded-full text-[#de6d3a] text-xs font-bold hover:bg-orange-50 transition-colors"
              >
                <Plus className="w-3 h-3" /> اضافة علامة تجارية
              </button>

              {isAddingBrand && (
                <input 
                  type="text" 
                  autoFocus
                  placeholder="اكتب واضغط Enter" 
                  className="px-3 py-2 border border-gray-300 rounded-full text-xs outline-none focus:border-[#EB682C]"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  onKeyDown={addBrand}
                  onBlur={() => setIsAddingBrand(false)}
                />
              )}

              {brands.map((brand, idx) => (
                <div key={idx} className="bg-[#fff1e6] text-gray-800 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2">
                  {brand}
                </div>
              ))}
              
            </div>
          </div>

        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
          
          {products.map((product, idx) => (
            <div key={product.id} className="flex flex-col gap-4 mb-4">
              <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <ChevronDown className="w-5 h-5 text-gray-400 cursor-pointer" />
                  <Trash2 
                    className="w-5 h-5 text-red-500 cursor-pointer" 
                    onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">المنتج {idx === 0 ? "الاول" : idx + 1}</span>
                  <GripVertical className="w-4 h-4 text-orange-400" />
                </div>
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">اسم المنتج</label>
                <input type="text" placeholder="الاسم" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">اسم الموديل</label>
                <input type="text" placeholder="Xt-5000" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">السعر</label>
                <input type="text" placeholder="Xt-5000" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">وصف المنتج</label>
                <textarea placeholder="وصف المنتج ......." className="w-full p-4 border border-gray-200 rounded-2xl text-sm min-h-[120px] resize-none focus:outline-none focus:border-[#EB682C] text-right"></textarea>
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">صور المنتج</label>
                <div className="border border-dashed border-[#de6d3a] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors h-40">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                    <UploadCloud className="w-6 h-6 text-[#de6d3a]" />
                  </div>
                  <p className="text-xs font-bold text-gray-600 mb-1">اسحب ملفاتك هنا او <span className="text-[#de6d3a]">اضغط لرفع الملفات</span></p>
                  <p className="text-[10px] text-gray-400">SPNG, JPG or PDF (max. 800x400px)</p>
                </div>
              </div>
            </div>
          ))}

          <button 
            type="button"
            onClick={() => setProducts([...products, { id: Date.now() }])}
            className="w-full border-2 border-[#2A5CBA] text-[#2A5CBA] py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors text-lg flex items-center justify-center gap-2 mt-2"
          >
            <Plus className="w-5 h-5" /> اضافة منتج اخري
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
          
          {services.map((service, idx) => (
            <div key={service.id} className="flex flex-col gap-4 mb-4">
              <div className="flex flex-row-reverse items-center justify-between border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <ChevronDown className="w-5 h-5 text-gray-400 cursor-pointer" />
                  <Trash2 
                    className="w-5 h-5 text-red-500 cursor-pointer" 
                    onClick={() => setServices(services.filter(s => s.id !== service.id))}
                  />
                </div>
                <div className="flex flex-row-reverse items-center gap-2">
                  <span className="font-bold text-sm">الخدمة {idx === 0 ? "الاولي" : idx + 1}</span>
                  <GripVertical className="w-4 h-4 text-orange-400" />
                </div>
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">اسم الخدمة</label>
                <input type="text" placeholder="الاسم" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">وصف الخدمة</label>
                <textarea placeholder="وصف الخدمة ......." className="w-full p-4 border border-gray-200 rounded-2xl text-sm min-h-[120px] resize-none focus:outline-none focus:border-[#EB682C] text-right"></textarea>
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">صور الخدمة</label>
                <div className="border border-dashed border-[#de6d3a] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors h-40">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                    <UploadCloud className="w-6 h-6 text-[#de6d3a]" />
                  </div>
                  <p className="text-xs font-bold text-gray-600 mb-1">اسحب ملفاتك هنا او <span className="text-[#de6d3a]">اضغط لرفع الملفات</span></p>
                  <p className="text-[10px] text-gray-400">SPNG, JPG or PDF (max. 800x400px)</p>
                </div>
              </div>
            </div>
          ))}

          <button 
            type="button"
            onClick={() => setServices([...services, { id: Date.now() }])}
            className="w-full border-2 border-[#2A5CBA] text-[#2A5CBA] py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors text-lg flex items-center justify-center gap-2 mt-2"
          >
            <Plus className="w-5 h-5" /> اضافة خدمة اخري
          </button>
        </div>
      )}

      <div className="flex gap-4 mt-12">
        <button 
          onClick={() => {
            if (step < 4) setStep(step + 1);
            else onFinish();
          }}
          className="flex-1 bg-[#de6d3a] text-white py-4 rounded-2xl font-bold hover:bg-[#d65a22] transition-colors text-lg"
        >
          {step === 4 ? "إنهاء" : "التالي"}
        </button>
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="flex-1 bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors text-lg"
          >
            السابق
          </button>
        )}
      </div>
    </div>
  );
}
