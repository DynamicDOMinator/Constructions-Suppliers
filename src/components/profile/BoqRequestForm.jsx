"use client";
import { useState, useEffect } from "react";
import { Trash2, UploadCloud, ChevronDown, Plus, X, Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function BoqRequestForm({ onBack }) {
  const { isEnglish } = useLanguage();
  const router = useRouter();
  
  const [suppliersList, setSuppliersList] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [showSuppliersDropdown, setShowSuppliersDropdown] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("خدمي");
  const [projectLocation, setProjectLocation] = useState("");
  const [description, setDescription] = useState("");

  const [boqItems, setBoqItems] = useState([
    { id: 1, name: isEnglish ? "Main Cables" : "كابلات رئيسية", spec: isEnglish ? "Copper Cable (NYA) 4x16 mm2" : "كابل نحاس (NYA) 4x16 مم2", qty: 1, unit: isEnglish ? "Linear Meter" : "متر طولي" },
    { id: 2, name: isEnglish ? "Air Ducts" : "مجاري هواء", spec: isEnglish ? "Linear Meter" : "متر طولي", qty: 1, unit: isEnglish ? "Piece" : "قطعة" },
    { id: 3, name: isEnglish ? "PPR Pipes" : "مواسير ppr", spec: isEnglish ? "Linear Meter" : "متر طولي", qty: 1, unit: isEnglish ? "Roll" : "لفة" },
    { id: 4, name: "", spec: "", qty: 1, unit: isEnglish ? "Roll" : "لفة" },
  ]);

  const [originalBoqFile, setOriginalBoqFile] = useState(null);
  const [techSpecsFile, setTechSpecsFile] = useState(null);
  const [designDrawingsFile, setDesignDrawingsFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await api.get('/auth/boqs/filter-suppliers');
        setSuppliersList(res.data || []);
      } catch (err) {
        console.error("Failed to fetch suppliers:", err);
      } finally {
        setLoadingSuppliers(false);
      }
    };
    fetchSuppliers();
  }, []);

  const toggleSupplier = (sup) => {
    if (selectedSuppliers.find(s => s.uuid === sup.uuid)) {
      setSelectedSuppliers(selectedSuppliers.filter(s => s.uuid !== sup.uuid));
    } else {
      setSelectedSuppliers([...selectedSuppliers, sup]);
    }
  };

  const handleItemChange = (id, field, value) => {
    setBoqItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleAddItem = () => {
    setBoqItems(prev => [...prev, { id: Math.random(), name: "", spec: "", qty: 1, unit: isEnglish ? "Piece" : "قطعة" }]);
  };

  const handleRemoveItem = (id) => {
    setBoqItems(prev => prev.filter(item => item.id !== id));
  };

  const handleFileChange = (e, setter) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const FileBox = ({ label, file, setter }) => (
    <div>
      <h4 className="text-right text-xs font-bold text-gray-700 mb-2">{label}</h4>
      <label className="border border-dashed border-orange-300 rounded-xl py-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-orange-50 transition-colors w-full h-full min-h-[120px]">
        <input type="file" className="hidden" onChange={(e) => handleFileChange(e, setter)} />
        {file ? (
          <span className="text-xs font-bold text-green-600 text-center px-4 line-clamp-1 break-all" dir="ltr">{file.name}</span>
        ) : (
          <>
            <UploadCloud className="w-6 h-6 text-orange-200" />
            <span className="text-xs font-medium text-[#2A5CBA]">{isEnglish ? "Choose files from your device to upload" : "اختر الملفات من جهازك للرفع"}</span>
          </>
        )}
      </label>
    </div>
  );

  const handleSubmit = async () => {
    if (selectedSuppliers.length === 0) {
      alert(isEnglish ? "Please select at least one company" : "الرجاء اختيار شركة واحدة على الأقل");
      return;
    }
    if (!projectName.trim()) {
      alert(isEnglish ? "Please enter project name" : "الرجاء إدخال اسم المشروع");
      return;
    }
    if (!projectLocation.trim()) {
      alert(isEnglish ? "Please enter project location" : "الرجاء إدخال موقع المشروع");
      return;
    }
    
    const validItems = boqItems.filter(item => item.name.trim() !== "");
    if (validItems.length === 0) {
      alert(isEnglish ? "Please enter an item name for at least one product in the table" : "الرجاء إدخال اسم البند لمنتج واحد على الأقل في الجدول");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('project_name', projectName);
      formData.append('project_type', projectType);
      formData.append('project_location', projectLocation);
      if (description) formData.append('description', description);
      
      if (originalBoqFile) formData.append('original_boq_file', originalBoqFile);
      if (techSpecsFile) formData.append('technical_specs_file', techSpecsFile);
      if (designDrawingsFile) formData.append('design_drawings_file', designDrawingsFile);

      selectedSuppliers.forEach((sup, idx) => {
        formData.append(`supplier_ids[${idx}]`, sup.uuid);
      });

      validItems.forEach((item, index) => {
        formData.append(`items[${index}][item_name]`, item.name);
        formData.append(`items[${index}][technical_description]`, item.spec);
        formData.append(`items[${index}][quantity]`, item.qty);
        formData.append(`items[${index}][unit]`, item.unit);
      });

      await api.post('/auth/boqs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(isEnglish ? "BOQ request sent successfully!" : "تم إرسال طلب المقايسة بنجاح!");
      router.push('/quotes'); // Redirect to dashboard
    } catch (err) {
      console.error(err);
      alert(isEnglish ? "An error occurred during submission" : "حدث خطأ أثناء الإرسال");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] pb-20 px-6 md:px-24" dir={isEnglish ? "ltr" : "rtl"}>
      <div className="max-w-[1400px] mx-auto mt-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#EB682C] mb-6">{isEnglish ? "Send BOQ Requests" : "ارسال طلبات المقايسة"}</h2>
          <h3 className={`text-2xl font-bold text-gray-900 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Enter Your BOQ" : "ادخل مقاسيتك"}</h3>
        </div>

        {/* Top Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="w-full relative">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-bold text-gray-700 mb-3 text-sm`}>{isEnglish ? "Company Name" : "اسم الشركة"}</label>
            <div 
              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-500 flex items-center justify-between min-h-[44px] cursor-pointer"
              onClick={() => setShowSuppliersDropdown(!showSuppliersDropdown)}
            >
              <div className="flex gap-2 flex-wrap">
                {selectedSuppliers.length === 0 ? (isEnglish ? "Select Companies..." : "اختر الشركات...") : selectedSuppliers.map(sup => (
                  <span key={sup.uuid} className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1" onClick={(e) => { e.stopPropagation(); toggleSupplier(sup); }}>
                    <X className="w-3 h-3 cursor-pointer" /> {sup.company_profile?.company_name || sup.name}
                  </span>
                ))}
              </div>
              {loadingSuppliers ? <Loader2 className="w-4 h-4 text-gray-400 animate-spin" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
            
            {showSuppliersDropdown && (
              <div className="absolute top-[80px] left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {suppliersList.map(sup => {
                  const isSelected = selectedSuppliers.find(s => s.uuid === sup.uuid);
                  return (
                    <div 
                      key={sup.uuid} 
                      className={`px-4 py-3 text-sm cursor-pointer border-b border-gray-100 last:border-0 hover:bg-orange-50 ${isSelected ? 'bg-orange-50 text-[#EB682C] font-bold' : 'text-gray-700'}`}
                      onClick={() => toggleSupplier(sup)}
                    >
                      {sup.company_profile?.company_name || sup.name}
                    </div>
                  );
                })}
                {suppliersList.length === 0 && !loadingSuppliers && (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">{isEnglish ? "No companies left" : "لا يوجد شركات متبقية"}</div>
                )}
              </div>
            )}
          </div>
          
          <div className="w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-bold text-gray-700 mb-3 text-sm`}>{isEnglish ? "Company Specialization" : "تخصص الشركة"}</label>
            <div className="relative">
              <select className={`w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-700 appearance-none outline-none ${isEnglish ? 'text-left' : 'text-right'}`}>
                <option>{isEnglish ? "Supplies" : "توريدات"}</option>
                <option>{isEnglish ? "Contracting" : "مقاولات"}</option>
                <option>{isEnglish ? "Design & Consulting" : "تصميم واستشارات"}</option>
              </select>
              <ChevronDown className={`w-4 h-4 text-gray-400 absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 pointer-events-none`} />
            </div>
          </div>

          <div className="w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-bold text-gray-700 mb-3 text-sm`}>{isEnglish ? "Project Name" : "اسم المشروع"}</label>
            <input 
              type="text" 
              placeholder={isEnglish ? "Project Name" : "اسم المشروع"} 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={`w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-700 outline-none ${isEnglish ? 'text-left' : 'text-right'}`} 
            />
          </div>

          <div className="w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-bold text-gray-700 mb-3 text-sm`}>{isEnglish ? "Project Type" : "نوع المشروع"}</label>
            <div className="relative">
              <select 
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className={`w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-700 appearance-none outline-none ${isEnglish ? 'text-left' : 'text-right'}`}
              >
                <option value="خدمي">{isEnglish ? "Service" : "خدمي"}</option>
                <option value="تجاري">{isEnglish ? "Commercial" : "تجاري"}</option>
                <option value="سكني">{isEnglish ? "Residential" : "سكني"}</option>
                <option value="صناعي">{isEnglish ? "Industrial" : "صناعي"}</option>
              </select>
              <ChevronDown className={`w-4 h-4 text-gray-400 absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 pointer-events-none`} />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
          <div className="flex-1 w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-bold text-gray-700 mb-3 text-sm`}>{isEnglish ? "Project Location" : "موقع المشروع"}</label>
            <input 
              type="text" 
              placeholder={isEnglish ? "Governorate / Region" : "المحافظة / المنطقة"} 
              value={projectLocation}
              onChange={(e) => setProjectLocation(e.target.value)}
              className={`w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-700 outline-none ${isEnglish ? 'text-left' : 'text-right'}`} 
            />
          </div>
          <div className="flex-[2] w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-bold text-gray-700 mb-3 text-sm`}>{isEnglish ? "Project Description / Specifications" : "وصف/مواصفات المشروع"}</label>
            <input 
              type="text" 
              placeholder={isEnglish ? "Enter an accurate description of the project and general specs..." : "ادخل وصفا دقيقا للمشروع والمواصفات العامة..."} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full bg-white border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-700 outline-none ${isEnglish ? 'text-left' : 'text-right'}`} 
            />
          </div>
        </div>

        {/* BOQ Table Section */}
        <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm mb-8">
          <h3 className={`font-bold text-[#EB682C] text-lg mb-1 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Electronic BOQ Table and Attachments" : "جدول المقايسة الإلكتروني (BOQ) والمرفقات"}</h3>
          <p className={`text-xs text-gray-500 mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Add items freely - The system will automatically compare offers" : "أضف البنود بحرية - سيقوم النظام بمقارنة العروض تلقائياً"}</p>

          <div className="overflow-x-auto">
            <table className={`w-full ${isEnglish ? 'text-left' : 'text-right'} border-separate border-spacing-y-3`}>
              <thead className="text-xs text-gray-500 bg-gray-50">
                <tr>
                  <th className={`py-3 px-4 font-bold ${isEnglish ? 'rounded-l-lg' : 'rounded-r-lg'} w-[30%]`}>{isEnglish ? "Item Name" : "اسم البند"} ↕</th>
                  <th className="py-3 px-4 font-bold w-[40%]">{isEnglish ? "Technical Description / Specs" : "الوصف الفني/ المواصفات"} ↕</th>
                  <th className="py-3 px-4 font-bold w-[10%]">{isEnglish ? "Quantity" : "الكمية"} ↕</th>
                  <th className={`py-3 px-4 font-bold ${isEnglish ? 'rounded-r-lg' : 'rounded-l-lg'} w-[20%]`}>{isEnglish ? "Unit" : "الوحدة"} ↕</th>
                </tr>
              </thead>
              <tbody>
                {boqItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-2">
                      <input 
                        type="text" 
                        placeholder={isEnglish ? "Item Name" : "اسم البند"} 
                        value={item.name} 
                        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} 
                        className={`w-full border border-gray-100 rounded-lg px-4 py-2.5 text-xs text-gray-700 outline-none focus:border-orange-300 bg-white ${isEnglish ? 'text-left' : 'text-right'}`} 
                      />
                    </td>
                    <td className="px-2">
                      <input 
                        type="text" 
                        placeholder={isEnglish ? "Technical Description" : "الوصف الفني"} 
                        value={item.spec} 
                        onChange={(e) => handleItemChange(item.id, 'spec', e.target.value)} 
                        className={`w-full border border-gray-100 rounded-lg px-4 py-2.5 text-xs text-gray-700 outline-none focus:border-orange-300 bg-white ${isEnglish ? 'text-left' : 'text-right'}`} 
                      />
                    </td>
                    <td className="px-2">
                      <div className="relative">
                        <input 
                          type="number" 
                          value={item.qty} 
                          onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} 
                          className={`w-full border border-gray-100 rounded-lg px-4 py-2.5 text-xs text-gray-700 outline-none focus:border-orange-300 text-center bg-white`} 
                        />
                        <div className={`absolute ${isEnglish ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer`}>
                          <ChevronDown className="w-3 h-3 text-gray-400 rotate-180" onClick={() => handleItemChange(item.id, 'qty', Number(item.qty || 0) + 1)} />
                          <ChevronDown className="w-3 h-3 text-gray-400" onClick={() => handleItemChange(item.id, 'qty', Math.max(1, Number(item.qty || 0) - 1))} />
                        </div>
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                          <select 
                            value={item.unit} 
                            onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)} 
                            className={`w-full appearance-none bg-white border border-gray-100 rounded-lg px-4 py-2.5 text-xs text-gray-700 outline-none focus:border-orange-300 ${isEnglish ? 'text-left' : 'text-right'}`}
                          >
                            <option value={isEnglish ? "Piece" : "قطعة"}>{isEnglish ? "Piece" : "قطعة"}</option>
                            <option value={isEnglish ? "Meter" : "متر"}>{isEnglish ? "Meter" : "متر"}</option>
                            <option value={isEnglish ? "Square Meter" : "متر مربع"}>{isEnglish ? "Square Meter" : "متر مربع"}</option>
                            <option value={isEnglish ? "Cubic Meter" : "متر مكعب"}>{isEnglish ? "Cubic Meter" : "متر مكعب"}</option>
                            <option value={isEnglish ? "Kilo" : "كيلو"}>{isEnglish ? "Kilo" : "كيلو"}</option>
                            <option value={isEnglish ? "Liter" : "لتر"}>{isEnglish ? "Liter" : "لتر"}</option>
                            <option value={isEnglish ? "Roll" : "لفة"}>{isEnglish ? "Roll" : "لفة"}</option>
                            <option value={isEnglish ? "Set" : "طقم"}>{isEnglish ? "Set" : "طقم"}</option>
                            <option value={isEnglish ? "Linear Meter" : "متر طولي"}>{isEnglish ? "Linear Meter" : "متر طولي"}</option>
                          </select>
                          <ChevronDown className={`w-4 h-4 text-gray-400 absolute ${isEnglish ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 pointer-events-none`} />
                        </div>
                        <button 
                          onClick={() => handleRemoveItem(item.id)} 
                          className="text-red-400 hover:text-red-600 transition-colors bg-white border border-gray-100 p-2.5 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`flex ${isEnglish ? 'justify-end' : 'justify-start'} mt-4`}>
            <button 
              onClick={handleAddItem}
              className="flex items-center gap-2 bg-orange-50 text-[#EB682C] border border-orange-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors"
            >
              <Plus className="w-4 h-4" /> {isEnglish ? "Add New Item" : "اضافة بند جديد"}
            </button>
          </div>
        </div>

        {/* Technical Files Section */}
        <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm mb-8">
          <h3 className={`font-bold text-[#EB682C] text-lg mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Attachments and Technical Documents" : "المرفقات والوثائق الفنية"}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FileBox label={isEnglish ? "Original BOQ File" : "ملف المقايسة الأصلي"} file={originalBoqFile} setter={setOriginalBoqFile} />
            <FileBox label={isEnglish ? "Technical Specs" : "المواصفات الفنية (Specs)"} file={techSpecsFile} setter={setTechSpecsFile} />
            <FileBox label={isEnglish ? "Design Drawings (If any)" : "الرسومات الهندسية(إن وجدت)"} file={designDrawingsFile} setter={setDesignDrawingsFile} />
          </div>
        </div>

        {/* Our Clients */}
        <div className={`bg-white border border-orange-200 rounded-2xl p-6 shadow-sm mb-8 ${isEnglish ? 'text-left' : 'text-right'}`}>
          <h4 className="font-bold text-[#EB682C] mb-6">{isEnglish ? "Some of our clients" : "بعض عملائنا"}</h4>
          <div className="flex flex-wrap justify-between items-center opacity-60 grayscale gap-4">
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
             <div className="w-16 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 bg-[#D97746] hover:bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-sm disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isEnglish ? "Submit BOQ Request" : "ارسال طلب المقايسة"}
          </button>
        </div>

      </div>
    </div>
  );
}
