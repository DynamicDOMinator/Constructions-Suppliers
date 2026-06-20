"use client";
import { useState, useEffect } from "react";
import { Search, Trash2, ChevronDown, Plus, Minus, X, Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingRequestForm({ onBack }) {
  const { isEnglish } = useLanguage();
  const router = useRouter();
  const [suppliersList, setSuppliersList] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);

  // Form states for adding product
  const [showSuppliersDropdown, setShowSuppliersDropdown] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [selectedProductsNames, setSelectedProductsNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // List of added products
  const [addedItems, setAddedItems] = useState([]);
  
  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await api.get('/auth/quotes/filter-suppliers');
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

  const availableProducts = selectedSuppliers.flatMap(sup => [
    ...(sup.products?.map(p => p.name) || []),
    ...(sup.services?.map(s => s.name) || [])
  ]);
  const uniqueProducts = [...new Set(availableProducts)];

  const toggleProduct = (prodName) => {
    if (selectedProductsNames.includes(prodName)) {
      setSelectedProductsNames(selectedProductsNames.filter(name => name !== prodName));
    } else {
      setSelectedProductsNames([...selectedProductsNames, prodName]);
    }
  };

  const handleAddProduct = () => {
    if (selectedSuppliers.length === 0) {
      alert(isEnglish ? "Please select at least one supplier" : "الرجاء اختيار مورد واحد على الأقل");
      return;
    }
    if (selectedProductsNames.length === 0) {
      alert(isEnglish ? "Please select at least one product" : "الرجاء اختيار منتج واحد على الأقل");
      return;
    }
    
    let newItems = [];
    selectedSuppliers.forEach(sup => {
      selectedProductsNames.forEach(prodName => {
        // Only add if the supplier actually has this product or service
        const hasProduct = sup.products?.some(p => p.name === prodName) || sup.services?.some(s => s.name === prodName);
        
        if (hasProduct) {
          newItems.push({
            id: Math.random().toString(),
            supplier: sup.company_profile?.company_name || sup.name || (isEnglish ? "Supplier" : "مورد"),
            supplier_id: sup.uuid,
            name: prodName,
            qty: 1,
            unit: isEnglish ? "Piece" : "قطعة",
            selected: true
          });
        }
      });
    });

    if (newItems.length === 0) {
      alert(isEnglish ? "Selected products are not available from the selected suppliers." : "المنتجات المحددة غير متوفرة لدى الموردين المحددين.");
      return;
    }
    
    setAddedItems(prev => [...prev, ...newItems]);
    
    // Reset inputs
    setSelectedProductsNames([]);
  };

  const handleDeleteSelected = () => {
    setAddedItems(addedItems.filter(item => !item.selected));
  };

  const handleSubmit = async () => {
    const itemsToSubmit = addedItems.filter(item => item.selected);
    if (itemsToSubmit.length === 0) {
      alert(isEnglish ? "Please add and select products to submit the request" : "الرجاء اضافة وتحديد منتجات لإرسال الطلب");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('notes', ""); 
      
      itemsToSubmit.forEach((item, index) => {
        formData.append(`items[${index}][supplier_id]`, item.supplier_id);
        formData.append(`items[${index}][product_name]`, item.name);
        formData.append(`items[${index}][quantity]`, item.qty);
        formData.append(`items[${index}][unit]`, item.unit);
      });

      const res = await api.post('/auth/quotes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(isEnglish ? "Pricing requests sent successfully!" : "تم إرسال طلبات التسعير بنجاح!");
      setAddedItems([]);
      router.push('/quotes'); // Redirect to sent quotes
    } catch (err) {
      console.error(err);
      alert(isEnglish ? "An error occurred during submission" : "حدث خطأ أثناء الإرسال");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = addedItems.filter(item => 
    item.name.includes(searchQuery) || item.supplier.includes(searchQuery)
  );
  const selectedCount = addedItems.filter(item => item.selected).length;

  return (
    <div className="w-full bg-[#F8FAFC] pb-20 px-6 md:px-24" dir={isEnglish ? "ltr" : "rtl"}>
      <div className="max-w-[1400px] mx-auto mt-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#EB682C] mb-6">{isEnglish ? "Send Pricing Requests" : "ارسال طلبات التسعير"}</h2>
          <h3 className={`text-2xl font-bold text-gray-900 ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Enter your request details" : "ادخل مقاسيتك"}</h3>
        </div>

        {/* Top Add Product Form */}
        <div className="flex flex-col md:flex-row items-end gap-6 mb-10">
          <div className="flex-1 w-full relative">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-bold text-gray-700 mb-3 text-sm`}>{isEnglish ? "Suppliers" : "الموردين"}</label>
            <div 
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 flex items-center justify-between min-h-[46px] cursor-pointer"
              onClick={() => setShowSuppliersDropdown(!showSuppliersDropdown)}
            >
              <div className="flex gap-2 flex-wrap">
                {selectedSuppliers.length === 0 ? (isEnglish ? "Select Suppliers..." : "اختر الموردين...") : selectedSuppliers.map(sup => (
                  <span key={sup.uuid} className="bg-gray-100 px-2 py-1 rounded-md text-xs flex items-center gap-1" onClick={(e) => { e.stopPropagation(); toggleSupplier(sup); }}>
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
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">{isEnglish ? "No suppliers found" : "لا يوجد موردين"}</div>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 w-full relative">
            <label className={`block ${isEnglish ? 'text-left' : 'text-right'} font-bold text-gray-700 mb-3 text-sm`}>{isEnglish ? "Products or Services" : "المنتجات او الخدمات"}</label>
            <div 
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 flex items-center justify-between min-h-[46px] cursor-pointer"
              onClick={() => setShowProductsDropdown(!showProductsDropdown)}
            >
              <div className="flex gap-2 flex-wrap">
                {selectedProductsNames.length === 0 ? (isEnglish ? "Select Products..." : "اختر المنتجات...") : selectedProductsNames.map(prod => (
                  <span key={prod} className="bg-gray-100 px-2 py-1 rounded-md text-xs flex items-center gap-1" onClick={(e) => { e.stopPropagation(); toggleProduct(prod); }}>
                    <X className="w-3 h-3 cursor-pointer" /> {prod}
                  </span>
                ))}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            
            {showProductsDropdown && (
              <div className="absolute top-[80px] left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {uniqueProducts.map(prod => {
                  const isSelected = selectedProductsNames.includes(prod);
                  return (
                    <div 
                      key={prod} 
                      className={`px-4 py-3 text-sm cursor-pointer border-b border-gray-100 last:border-0 hover:bg-orange-50 ${isSelected ? 'bg-orange-50 text-[#EB682C] font-bold' : 'text-gray-700'}`}
                      onClick={() => toggleProduct(prod)}
                    >
                      {prod}
                    </div>
                  );
                })}
                {uniqueProducts.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">{isEnglish ? "No products found for the selected suppliers" : "لا توجد منتجات للموردين المحددين"}</div>
                )}
              </div>
            )}
          </div>

          <button 
            onClick={handleAddProduct}
            className="bg-[#EB682C] text-white px-10 py-3 rounded-xl font-bold text-sm w-full md:w-auto min-h-[46px] hover:bg-[#d65a22] transition-colors whitespace-nowrap"
          >
            {isEnglish ? "Add Product" : "اضف المنتج"}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row-reverse gap-6">
          <div className="w-full">
            <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm h-full">
              
              <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} justify-between items-center mb-6`}>
                {selectedCount > 0 && (
                  <button onClick={handleDeleteSelected} className="flex items-center gap-1 text-red-500 text-xs font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                    {isEnglish ? `Delete ${selectedCount}` : `حذف ${selectedCount}`}
                  </button>
                )}
                {!selectedCount && <div></div>}
                <div className={isEnglish ? 'text-left' : 'text-right'}>
                  <h3 className="font-bold text-[#EB682C] text-lg mb-1">{isEnglish ? "Selected Products" : "المنتجات المختارة"}</h3>
                  <p className="text-xs text-gray-500">
                    {isEnglish ? `Products Count: ${addedItems.length} | Suppliers Count: ${new Set(addedItems.map(i => i.supplier_id)).size}` : `عدد المنتجات ${addedItems.length} | عدد الموردين ${new Set(addedItems.map(i => i.supplier_id)).size}`}
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <div className={`absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`}>
                  <Search className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEnglish ? "Search" : "بحث"} 
                  className={`w-full border border-gray-100 rounded-xl py-3 pr-10 pl-4 text-xs outline-none focus:border-orange-300 transition-colors bg-gray-50 ${isEnglish ? 'text-left' : 'text-right'}`}
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className={`w-full ${isEnglish ? 'text-left' : 'text-right'}`}>
                  <thead className="text-xs text-gray-400 border-b border-gray-100">
                    <tr>
                      <th className="pb-4 font-medium w-1/3">{isEnglish ? "Suppliers" : "الموردين"}</th>
                      <th className="pb-4 font-medium w-1/4">{isEnglish ? "Products" : "المنتجات"}</th>
                      <th className="pb-4 font-medium w-1/4">{isEnglish ? "Quantity" : "الكمية"}</th>
                      <th className="pb-4 font-medium w-1/6">{isEnglish ? "Unit" : "الوحدة"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredItems.map((item, idx) => {
                      // Find real index in addedItems
                      const realIndex = addedItems.findIndex(i => i.id === item.id);
                      
                      return (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-5 text-sm text-gray-600 font-bold">{item.supplier}</td>
                          
                          <td className="py-5 flex items-center justify-start gap-3">
                            <div 
                              className={`w-4 h-4 rounded-[4px] border flex items-center justify-center cursor-pointer ${item.selected ? 'bg-[#EB682C] border-[#EB682C]' : 'border-gray-300'}`}
                              onClick={() => {
                                const newItems = [...addedItems];
                                newItems[realIndex].selected = !newItems[realIndex].selected;
                                setAddedItems(newItems);
                              }}
                            >
                              {item.selected && <span className="text-white text-[10px]">✓</span>}
                            </div>  
                            <span className="text-sm font-bold text-gray-800">{item.name}</span>
                          </td>
                          <td className="py-5">
                            <div className={`flex items-center ${isEnglish ? 'justify-start' : 'justify-end'} gap-3 bg-gray-50 w-fit rounded-lg px-2 py-1`}>
                              <button 
                                onClick={() => {
                                  const newItems = [...addedItems];
                                  newItems[realIndex].qty += 1;
                                  setAddedItems(newItems);
                                }}
                                className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[#EB682C]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-bold text-gray-800 w-8 text-center">{item.qty}</span>
                              <button 
                                onClick={() => {
                                  const newItems = [...addedItems];
                                  if(newItems[realIndex].qty > 1) newItems[realIndex].qty -= 1;
                                  setAddedItems(newItems);
                                }}
                                className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[#EB682C]"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="py-5">
                            <div className={`relative w-fit ${isEnglish ? 'mr-auto' : 'ml-auto'}`}>
                              <select 
                                value={item.unit}
                                onChange={(e) => {
                                  const newItems = [...addedItems];
                                  newItems[realIndex].unit = e.target.value;
                                  setAddedItems(newItems);
                                }}
                                className={`appearance-none bg-white border border-gray-200 rounded-lg ${isEnglish ? 'pl-3 pr-8' : 'pl-8 pr-3'} py-1.5 text-xs text-gray-600 outline-none w-24`}
                              >
                                <option value={isEnglish ? "Piece" : "قطعة"}>{isEnglish ? "Piece" : "قطعة"}</option>
                                <option value={isEnglish ? "Meter" : "متر"}>{isEnglish ? "Meter" : "متر"}</option>
                                <option value={isEnglish ? "Square Meter" : "متر مربع"}>{isEnglish ? "Square Meter" : "متر مربع"}</option>
                                <option value={isEnglish ? "Cubic Meter" : "متر مكعب"}>{isEnglish ? "Cubic Meter" : "متر مكعب"}</option>
                                <option value={isEnglish ? "Kilo" : "كيلو"}>{isEnglish ? "Kilo" : "كيلو"}</option>
                                <option value={isEnglish ? "Liter" : "لتر"}>{isEnglish ? "Liter" : "لتر"}</option>
                                <option value={isEnglish ? "Roll" : "لفة"}>{isEnglish ? "Roll" : "لفة"}</option>
                                <option value={isEnglish ? "Set" : "طقم"}>{isEnglish ? "Set" : "طقم"}</option>
                              </select>
                              <ChevronDown className={`w-3 h-3 text-gray-400 absolute ${isEnglish ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 pointer-events-none`} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-gray-500 font-bold">
                          {isEnglish ? "No selected products" : "لا توجد منتجات مختارة"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || addedItems.length === 0}
            className="w-full flex justify-center items-center gap-2 bg-[#D97746] hover:bg-[#EB682C] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-sm disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isEnglish ? "Send Pricing Request" : "ارسال طلب التسعير"}
          </button>
        </div>

      </div>
    </div>
  );
}
