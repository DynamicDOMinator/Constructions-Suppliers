"use client";
import { useState, useEffect } from "react";
import { Trash2, UploadCloud, ChevronDown, Plus, X, Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function BoqRequestForm({ onBack, supplier }) {
  const { isEnglish } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [suppliersList, setSuppliersList] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [showSuppliersDropdown, setShowSuppliersDropdown] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("خدمي");
  const [projectLocation, setProjectLocation] = useState("");
  const [description, setDescription] = useState("");

  // Start with 1 clean empty row, with zero default mock data
  const [boqItems, setBoqItems] = useState([
    { id: 1, name: "", spec: "", qty: 1, unit: isEnglish ? "Piece" : "قطعة" },
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
      <h4 className={`text-sm font-extrabold text-gray-900 mb-2.5 ${isEnglish ? 'text-left' : 'text-right'}`}>{label}</h4>
      <label className="border-2 border-dashed border-[#EB682C]/50 hover:border-[#EB682C] rounded-2xl py-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-orange-50/20 hover:bg-orange-50/50 transition-all w-full h-full min-h-[130px] shadow-xs group">
        <input type="file" className="hidden" onChange={(e) => handleFileChange(e, setter)} />
        {file ? (
          <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-300 px-4 py-2 rounded-xl text-center line-clamp-1 break-all shadow-xs" dir="ltr">
            ✓ {file.name}
          </span>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6 text-[#EB682C]" />
            </div>
            <span className="text-sm font-bold text-[#2A5CBA] group-hover:underline">{isEnglish ? "Choose files from your device to upload" : "اختر الملفات من جهازك للرفع"}</span>
          </>
        )}
      </label>
    </div>
  );

  const handleSubmit = async () => {
    if (!user && !isAuthenticated) {
      alert(isEnglish ? "You must be logged in to send a BOQ request. Please log in or register." : "يجب تسجيل الدخول لإرسال طلب المقايسة. يرجى تسجيل الدخول أو إنشاء حساب جديد.");
      router.push('/login');
      return;
    }

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
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-extrabold text-gray-900 mb-2.5 text-sm`}>
              {isEnglish ? "Company Name" : "اسم الشركة"}
            </label>
            <div 
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 flex items-center justify-between min-h-[48px] cursor-pointer shadow-xs hover:border-[#EB682C] transition-colors"
              onClick={() => setShowSuppliersDropdown(!showSuppliersDropdown)}
            >
              <div className="flex gap-2 flex-wrap">
                {selectedSuppliers.length === 0 ? (
                  <span className="text-gray-400 font-normal">{isEnglish ? "Select Companies..." : "اختر الشركات..."}</span>
                ) : selectedSuppliers.map(sup => (
                  <span key={sup.uuid} className="bg-orange-50 border border-orange-200 text-[#EB682C] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-xs text-xs" onClick={(e) => { e.stopPropagation(); toggleSupplier(sup); }}>
                    <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-600" /> {sup.company_profile?.company_name || sup.name}
                  </span>
                ))}
              </div>
              {loadingSuppliers ? <Loader2 className="w-4 h-4 text-gray-400 animate-spin" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
            </div>
            
            {showSuppliersDropdown && (
              <div className="absolute top-[85px] left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                {suppliersList.map(sup => {
                  const isSelected = selectedSuppliers.find(s => s.uuid === sup.uuid);
                  return (
                    <div 
                      key={sup.uuid} 
                      className={`px-4 py-3 text-sm cursor-pointer border-b border-gray-100 last:border-0 hover:bg-orange-50 transition-colors ${isSelected ? 'bg-orange-50 text-[#EB682C] font-extrabold' : 'text-gray-900 font-bold'}`}
                      onClick={() => toggleSupplier(sup)}
                    >
                      {sup.company_profile?.company_name || sup.name}
                    </div>
                  );
                })}
                {suppliersList.length === 0 && !loadingSuppliers && (
                  <div className="px-4 py-3 text-sm text-gray-500 font-bold text-center">{isEnglish ? "No companies left" : "لا يوجد شركات متبقية"}</div>
                )}
              </div>
            )}
          </div>
          
          <div className="w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-extrabold text-gray-900 mb-2.5 text-sm`}>
              {isEnglish ? "Company Specialization" : "تخصص الشركة"}
            </label>
            <div className="relative">
              <select className={`w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 appearance-none outline-none focus:border-[#EB682C] shadow-xs cursor-pointer transition-colors ${isEnglish ? 'text-left' : 'text-right'}`}>
                <option>{isEnglish ? "Supplies" : "توريدات"}</option>
                <option>{isEnglish ? "Contracting" : "مقاولات"}</option>
                <option>{isEnglish ? "Design & Consulting" : "تصميم واستشارات"}</option>
              </select>
              <ChevronDown className={`w-4 h-4 text-gray-500 absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 pointer-events-none`} />
            </div>
          </div>

          <div className="w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-extrabold text-gray-900 mb-2.5 text-sm`}>
              {isEnglish ? "Project Name" : "اسم المشروع"}
            </label>
            <input 
              type="text" 
              placeholder={isEnglish ? "Project Name" : "اسم المشروع"} 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={`w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 outline-none focus:border-[#EB682C] placeholder:text-gray-400 placeholder:font-normal shadow-xs transition-colors ${isEnglish ? 'text-left' : 'text-right'}`} 
            />
          </div>

          <div className="w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-extrabold text-gray-900 mb-2.5 text-sm`}>
              {isEnglish ? "Project Type" : "نوع المشروع"}
            </label>
            <div className="relative">
              <select 
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className={`w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 appearance-none outline-none focus:border-[#EB682C] shadow-xs cursor-pointer transition-colors ${isEnglish ? 'text-left' : 'text-right'}`}
              >
                <option value="خدمي">{isEnglish ? "Service" : "خدمي"}</option>
                <option value="تجاري">{isEnglish ? "Commercial" : "تجاري"}</option>
                <option value="سكني">{isEnglish ? "Residential" : "سكني"}</option>
                <option value="صناعي">{isEnglish ? "Industrial" : "صناعي"}</option>
              </select>
              <ChevronDown className={`w-4 h-4 text-gray-500 absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 pointer-events-none`} />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
          <div className="flex-1 w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-extrabold text-gray-900 mb-2.5 text-sm`}>
              {isEnglish ? "Project Location" : "موقع المشروع"}
            </label>
            <input 
              type="text" 
              placeholder={isEnglish ? "Governorate / Region" : "المحافظة / المنطقة"} 
              value={projectLocation}
              onChange={(e) => setProjectLocation(e.target.value)}
              className={`w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 outline-none focus:border-[#EB682C] placeholder:text-gray-400 placeholder:font-normal shadow-xs transition-colors ${isEnglish ? 'text-left' : 'text-right'}`} 
            />
          </div>
          <div className="flex-[2] w-full">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-extrabold text-gray-900 mb-2.5 text-sm`}>
              {isEnglish ? "Project Description / Specifications" : "وصف/مواصفات المشروع"}
            </label>
            <input 
              type="text" 
              placeholder={isEnglish ? "Enter an accurate description of the project and general specs..." : "ادخل وصفا دقيقا للمشروع والمواصفات العامة..."} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 outline-none focus:border-[#EB682C] placeholder:text-gray-400 placeholder:font-normal shadow-xs transition-colors ${isEnglish ? 'text-left' : 'text-right'}`} 
            />
          </div>
        </div>

        {/* BOQ Table Section */}
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <h3 className={`font-extrabold text-[#EB682C] text-xl mb-1.5 ${isEnglish ? 'text-left' : 'text-right'}`}>
            {isEnglish ? "Electronic BOQ Table and Attachments" : "جدول المقايسة الإلكتروني (BOQ) والمرفقات"}
          </h3>
          <p className={`text-sm font-bold text-gray-700 mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
            {isEnglish ? "Add items freely - The system will automatically compare offers" : "أضف البنود بحرية - سيقوم النظام بمقارنة العروض تلقائياً"}
          </p>

          <div className="overflow-x-auto">
            <table className={`w-full ${isEnglish ? 'text-left' : 'text-right'} border-separate border-spacing-y-3`}>
              <thead className="text-sm font-extrabold text-gray-900 bg-gray-100/90 border border-gray-200">
                <tr>
                  <th className={`py-3.5 px-4 font-extrabold text-gray-900 text-sm md:text-base ${isEnglish ? 'rounded-l-xl' : 'rounded-r-xl'} w-[30%]`}>
                    {isEnglish ? "Item Name" : "اسم البند"} ↕
                  </th>
                  <th className="py-3.5 px-4 font-extrabold text-gray-900 text-sm md:text-base w-[40%]">
                    {isEnglish ? "Technical Description / Specs" : "الوصف الفني/ المواصفات"} ↕
                  </th>
                  <th className="py-3.5 px-4 font-extrabold text-gray-900 text-sm md:text-base w-[10%] text-center">
                    {isEnglish ? "Quantity" : "الكمية"} ↕
                  </th>
                  <th className={`py-3.5 px-4 font-extrabold text-gray-900 text-sm md:text-base ${isEnglish ? 'rounded-r-xl' : 'rounded-l-xl'} w-[20%]`}>
                    {isEnglish ? "Unit" : "الوحدة"} ↕
                  </th>
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
                        className={`w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-[#EB682C] focus:bg-orange-50/10 placeholder:text-gray-400 placeholder:font-normal bg-white shadow-xs transition-colors ${isEnglish ? 'text-left' : 'text-right'}`} 
                      />
                    </td>
                    <td className="px-2">
                      <input 
                        type="text" 
                        placeholder={isEnglish ? "Technical Description" : "الوصف الفني"} 
                        value={item.spec} 
                        onChange={(e) => handleItemChange(item.id, 'spec', e.target.value)} 
                        className={`w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-[#EB682C] focus:bg-orange-50/10 placeholder:text-gray-400 placeholder:font-normal bg-white shadow-xs transition-colors ${isEnglish ? 'text-left' : 'text-right'}`} 
                      />
                    </td>
                    <td className="px-2">
                      <div className="relative">
                        <input 
                          type="number" 
                          value={item.qty} 
                          onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} 
                          className="w-full border-2 border-gray-200 rounded-xl px-3 py-3 text-sm font-extrabold text-gray-900 outline-none focus:border-[#EB682C] text-center bg-white shadow-xs transition-colors" 
                        />
                        <div className={`absolute ${isEnglish ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer`}>
                          <ChevronDown className="w-3.5 h-3.5 text-gray-600 hover:text-[#EB682C] rotate-180 transition-colors" onClick={() => handleItemChange(item.id, 'qty', Number(item.qty || 0) + 1)} />
                          <ChevronDown className="w-3.5 h-3.5 text-gray-600 hover:text-[#EB682C] transition-colors" onClick={() => handleItemChange(item.id, 'qty', Math.max(1, Number(item.qty || 0) - 1))} />
                        </div>
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                          <select 
                            value={item.unit} 
                            onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)} 
                            className={`w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-[#EB682C] shadow-xs cursor-pointer transition-colors ${isEnglish ? 'text-left' : 'text-right'}`}
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
                          <ChevronDown className={`w-4 h-4 text-gray-500 absolute ${isEnglish ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 pointer-events-none`} />
                        </div>
                        <button 
                          type="button"
                          onClick={() => handleRemoveItem(item.id)} 
                          className="text-red-500 hover:text-white hover:bg-red-500 transition-all bg-red-50 border-2 border-red-200 p-3 rounded-xl shadow-xs cursor-pointer flex items-center justify-center shrink-0"
                          title={isEnglish ? "Delete Row" : "حذف البند"}
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

          <div className={`flex ${isEnglish ? 'justify-end' : 'justify-start'} mt-5`}>
            <button 
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-orange-100 text-[#EB682C] border-2 border-[#EB682C] px-6 py-3 rounded-xl text-sm font-extrabold hover:bg-[#EB682C] hover:text-white transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> {isEnglish ? "Add New Item" : "اضافة بند جديد"}
            </button>
          </div>
        </div>

        {/* Technical Files Section */}
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <h3 className={`font-extrabold text-[#EB682C] text-xl mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
            {isEnglish ? "Attachments and Technical Documents" : "المرفقات والوثائق الفنية"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FileBox label={isEnglish ? "Original BOQ File" : "ملف المقايسة الأصلي"} file={originalBoqFile} setter={setOriginalBoqFile} />
            <FileBox label={isEnglish ? "Technical Specs" : "المواصفات الفنية (Specs)"} file={techSpecsFile} setter={setTechSpecsFile} />
            <FileBox label={isEnglish ? "Design Drawings (If any)" : "الرسومات الهندسية(إن وجدت)"} file={designDrawingsFile} setter={setDesignDrawingsFile} />
          </div>
        </div>

        {/* Submit and Back Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
          <button 
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 w-full flex justify-center items-center gap-2 bg-[#EB682C] hover:bg-[#d65a22] text-white py-4 rounded-2xl font-extrabold text-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isEnglish ? "Submit BOQ Request" : "ارسال طلب المقايسة"}
          </button>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-8 bg-white border-2 border-gray-300 text-gray-800 py-4 rounded-2xl font-extrabold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-xs cursor-pointer"
            >
              {isEnglish ? "Back" : "الرجوع"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
