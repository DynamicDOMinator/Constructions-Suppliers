"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import Popup from "@/components/Popup";
import { Search, ChevronDown, MoreVertical, Trash2, Edit2, Grid, List, ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const { isEnglish } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupState, setPopupState] = useState({ isOpen: false, type: "", title: "", message: "", onConfirm: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // View & Sort States
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest', 'oldest', 'name-asc', 'name-desc'
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter States
  const [searchDate, setSearchDate] = useState("");
  const [searchName, setSearchName] = useState("");

  const filteredServices = services
    .filter(service => {
      const matchName = service.name?.toLowerCase().includes(searchName.toLowerCase()) || false;
      const dateString = service.created_at ? new Date(service.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) : "";
      const matchDate = searchDate ? dateString.includes(searchDate) : true;
      
      const isNameMatch = searchName ? matchName : true;

      return isNameMatch && matchDate;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
      if (sortOrder === "oldest") {
        return new Date(a.created_at || 0) - new Date(b.created_at || 0);
      }
      if (sortOrder === "name-asc") {
        return (a.name || "").localeCompare(b.name || "", "ar");
      }
      if (sortOrder === "name-desc") {
        return (b.name || "").localeCompare(a.name || "", "ar");
      }
      return 0;
    });

  useEffect(() => {
    fetchServices();
  }, [currentPage]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/auth/company/services?page=${currentPage}`);
      const fetchedData = res.data;
      
      const dataArray = Array.isArray(fetchedData) ? fetchedData : (fetchedData?.data || []);
      setServices(dataArray);

      if (fetchedData && !Array.isArray(fetchedData)) {
        setPagination({
          current_page: fetchedData.current_page,
          last_page: fetchedData.last_page,
          total: fetchedData.total,
        });
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (uuid) => {
    setPopupState({
      isOpen: true,
      type: "danger",
      title: isEnglish ? "Confirm Delete" : "تأكيد الحذف",
      message: isEnglish ? "Are you sure you want to delete this service? This action cannot be undone." : "هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.",
      onConfirm: async () => {
        setPopupState({ ...popupState, isOpen: false });
        try {
          await api.delete(`/auth/company/services/${uuid}`);
          setServices(services.filter((s) => s.uuid !== uuid));
          setActiveDropdown(null);
          setTimeout(() => {
            setPopupState({
              isOpen: true,
              type: "success",
              title: isEnglish ? "Deleted" : "تم الحذف",
              message: isEnglish ? "Service deleted successfully." : "تم حذف الخدمة بنجاح.",
              onConfirm: () => setPopupState({ ...popupState, isOpen: false }),
            });
          }, 300);
        } catch (err) {
          console.error("Failed to delete service:", err);
          setTimeout(() => {
            setPopupState({
              isOpen: true,
              type: "danger",
              title: isEnglish ? "Error" : "خطأ",
              message: isEnglish ? "Failed to delete service" : "فشل حذف الخدمة",
              onConfirm: () => setPopupState({ ...popupState, isOpen: false }),
            });
          }, 300);
        }
      }
    });
  };

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4" dir={isEnglish ? 'ltr' : 'rtl'}>
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4 mb-8">
        <Link href="/dashboard/services/add" className="w-full md:w-auto">
          <button className="w-full bg-[#EB682C] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap">
            {isEnglish ? 'Add New Service +' : 'اضافة خدمة جديدة +'}
          </button>
        </Link>
        <div className={`${isEnglish ? 'text-left' : 'text-right'} flex-1`}>
          <h1 className="text-2xl font-bold text-gray-900">{isEnglish ? 'Services' : 'الخدمات'}</h1>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className={`flex flex-col ${isEnglish ? 'text-left' : 'text-right'} gap-2`}>
          <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Search' : 'البحث'}</label>
          <div className="relative">
            <input 
              type="text" 
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder={isEnglish ? 'Search for a service' : 'ابحث عن الخدمة'} 
              className={`w-full h-12 ${isEnglish ? 'pl-10 pr-4' : 'pr-10 pl-4'} border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'}`}
            />
            <Search className={`w-4 h-4 text-gray-400 absolute ${isEnglish ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2`} />
          </div>
        </div>

        <div className={`flex flex-col ${isEnglish ? 'text-left' : 'text-right'} gap-2`}>
          <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Date' : 'التاريخ'}</label>
          <div className="relative">
            <input 
              type="text" 
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder={isEnglish ? 'Service date' : 'تاريخ الخدمة'} 
              className={`w-full h-12 ${isEnglish ? 'pl-10 pr-4' : 'pr-10 pl-4'} border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'}`}
            />
            <Search className={`w-4 h-4 text-gray-400 absolute ${isEnglish ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2`} />
          </div>
        </div>
      </div>

      {/* List Header and Controls */}
      <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} justify-between items-center mb-4`}>
        <div className="flex items-center gap-2">
          
          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50"
            >
              <ChevronDown className="w-4 h-4" />
              {isEnglish ? 'Sort' : 'ترتيب'}
            </button>
            {isSortOpen && (
              <div className={`absolute top-12 ${isEnglish ? 'left-0' : 'right-0'} w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden ${isEnglish ? 'text-left' : 'text-right'}`}>
                <button onClick={() => { setSortOrder("newest"); setIsSortOpen(false); }} className={`w-full px-4 py-2 text-sm ${isEnglish ? 'text-left' : 'text-right'} hover:bg-orange-50 transition-colors ${sortOrder === "newest" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}>{isEnglish ? 'Newest' : 'الأحدث'}</button>
                <button onClick={() => { setSortOrder("oldest"); setIsSortOpen(false); }} className={`w-full px-4 py-2 text-sm ${isEnglish ? 'text-left' : 'text-right'} hover:bg-orange-50 transition-colors ${sortOrder === "oldest" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}>{isEnglish ? 'Oldest' : 'الأقدم'}</button>
                <button onClick={() => { setSortOrder("name-asc"); setIsSortOpen(false); }} className={`w-full px-4 py-2 text-sm ${isEnglish ? 'text-left' : 'text-right'} hover:bg-orange-50 transition-colors ${sortOrder === "name-asc" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}>{isEnglish ? 'Name (A-Z)' : 'الاسم (أ - ي)'}</button>
                <button onClick={() => { setSortOrder("name-desc"); setIsSortOpen(false); }} className={`w-full px-4 py-2 text-sm ${isEnglish ? 'text-left' : 'text-right'} hover:bg-orange-50 transition-colors ${sortOrder === "name-desc" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}>{isEnglish ? 'Name (Z-A)' : 'الاسم (ي - أ)'}</button>
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-orange-50 text-[#EB682C]' : 'text-gray-500 hover:bg-gray-50 border-r border-gray-200'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-orange-50 text-[#EB682C]' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-900">{isEnglish ? 'All Services' : 'جميع الخدمات'}</h2>
      </div>

      {/* Services Content */}
      {viewMode === "list" ? (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm mb-6 pb-2">
          <div className="overflow-x-auto">
            <table className={`w-full ${isEnglish ? 'text-left' : 'text-right'} text-sm`}>
            <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 font-bold">{isEnglish ? 'Services' : 'الخدمات'}</th>
                <th className="py-4 px-6 font-bold">{isEnglish ? 'Description' : 'وصف الخدمة'}</th>
                <th className="py-4 px-6 font-bold">{isEnglish ? 'Date' : 'التاريخ'}</th>
                <th className="py-4 px-6 font-bold w-20 text-center">{isEnglish ? 'Actions' : 'التحكم'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    {isEnglish ? 'Loading...' : 'جاري التحميل...'}
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    {isEnglish ? 'No services found' : 'لا توجد خدمات'}
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.uuid || service.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-900 font-bold flex items-center justify-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-lg shrink-0 overflow-hidden">
                        {service.images && service.images.length > 0 && service.images[0] ? (
                          <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
                        ) : (
                          "🟢"
                        )}
                      </div>
                      <span>{service.name}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-500">{service.description || service.desc || "-"}</td>
                    <td className="py-4 px-6 text-gray-500">
                      {service.created_at ? new Date(service.created_at).toLocaleDateString(isEnglish ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) : "-"}
                    </td>
                    <td className="py-4 px-6 text-center text-[#EB682C] relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === (service.uuid || service.id) ? null : (service.uuid || service.id))}
                        className="hover:bg-orange-50 p-1 rounded-md transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {/* Action Dropdown */}
                      {activeDropdown === (service.uuid || service.id) && (
                        <div className={`absolute top-12 ${isEnglish ? 'right-4' : 'left-4'} w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden ${isEnglish ? 'text-left' : 'text-right'}`}>
                          <button 
                            onClick={() => handleDelete(service.uuid)}
                            className={`w-full flex items-center justify-${isEnglish ? 'start' : 'end'} gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-bold transition-colors`}>
                            {isEnglish && <Trash2 className="w-4 h-4" />}
                            {isEnglish ? 'Delete' : 'حذف'}
                            {!isEnglish && <Trash2 className="w-4 h-4" />}
                          </button>
                          <Link href={`/dashboard/services/edit/${service.uuid || ""}`}>
                            <button className={`w-full flex items-center justify-${isEnglish ? 'start' : 'end'} gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors border-t border-gray-50`}>
                              {isEnglish && <Edit2 className="w-4 h-4" />}
                              {isEnglish ? 'Edit' : 'تعديل'}
                              {!isEnglish && <Edit2 className="w-4 h-4" />}
                            </button>
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      ) : (
        /* Grid View */
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
          {loading ? (
            <div className="col-span-full py-8 text-center text-gray-500">{isEnglish ? 'Loading...' : 'جاري التحميل...'}</div>
          ) : filteredServices.length === 0 ? (
            <div className="col-span-full py-8 text-center text-gray-500">{isEnglish ? 'No services found' : 'لا توجد خدمات'}</div>
          ) : (
            filteredServices.map((service) => (
              <div key={service.uuid || service.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col">
                <div className="aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                  {service.images && service.images.length > 0 && service.images[0] ? (
                    <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <span className="text-4xl">🟢</span>
                  )}
                </div>
                
                <h3 className="font-bold text-gray-900 mb-1 text-lg truncate">{service.name}</h3>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">{service.description || service.desc || (isEnglish ? 'No description' : 'بدون وصف')}</p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                  <span className="text-gray-400 text-xs">
                    {service.created_at ? new Date(service.created_at).toLocaleDateString('ar-EG') : "-"}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === (service.uuid || service.id) ? null : (service.uuid || service.id))}
                      className="text-gray-400 hover:text-[#EB682C] p-1 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {activeDropdown === (service.uuid || service.id) && (
                      <div className={`absolute bottom-8 ${isEnglish ? 'right-0' : 'left-0'} w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden ${isEnglish ? 'text-left' : 'text-right'}`}>
                        <button 
                          onClick={() => handleDelete(service.uuid)}
                          className={`w-full flex items-center justify-${isEnglish ? 'start' : 'end'} gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-bold transition-colors`}>
                          {isEnglish && <Trash2 className="w-4 h-4" />}
                          {isEnglish ? 'Delete' : 'حذف'}
                          {!isEnglish && <Trash2 className="w-4 h-4" />}
                        </button>
                        <Link href={`/dashboard/services/edit/${service.uuid || ""}`}>
                          <button className={`w-full flex items-center justify-${isEnglish ? 'start' : 'end'} gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors border-t border-gray-50`}>
                            {isEnglish && <Edit2 className="w-4 h-4" />}
                            {isEnglish ? 'Edit' : 'تعديل'}
                            {!isEnglish && <Edit2 className="w-4 h-4" />}
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" /> {/* RTL, Right is Previous */}
            </button>
            
            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                  currentPage === page 
                    ? "bg-orange-50 text-[#EB682C] border border-[#EB682C] font-bold" 
                    : "text-gray-500 hover:bg-gray-50 border border-transparent"
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(pagination.last_page, p + 1))}
              disabled={currentPage === pagination.last_page}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> {/* RTL, Left is Next */}
            </button>
          </div>
          <span className="text-sm font-bold text-gray-900">{isEnglish ? `Page ${currentPage} of ${pagination.last_page}` : `الصفحة ${currentPage} من ${pagination.last_page}`}</span>
        </div>
      )}

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
