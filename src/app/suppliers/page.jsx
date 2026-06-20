"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuppliersHero from "@/components/suppliers/SuppliersHero";
import SuppliersSidebar from "@/components/suppliers/SuppliersSidebar";
import SupplierCard from "@/components/suppliers/SupplierCard";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";

function SuppliersPageContent() {
  const { isEnglish } = useLanguage();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setIsLoading(true);
      try {
        const endpoint = typeParam 
          ? `/auth/companies?page=${page}&type=${typeParam}` 
          : `/auth/companies?page=${page}`;
        const response = await api.get(endpoint);
        
        if (response.data) {
          setSuppliers(response.data.data || []);
          setPagination({
            current_page: response.data.current_page,
            last_page: response.data.last_page,
            total: response.data.total
          });
        }
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuppliers();
  }, [page, typeParam]);

  return (
    <main className={`min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`}>
      <Navbar />
      
      <SuppliersHero type={typeParam} />

      <section className="py-12 px-6 md:px-12 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-8" dir={isEnglish ? 'ltr' : 'rtl'}>
        {/* Sidebar (Right in RTL) */}
        <SuppliersSidebar />

        {/* Main Grid (Left in RTL) */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB682C]"></div>
            </div>
          ) : suppliers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {suppliers.map((supplier) => (
                  <SupplierCard 
                    key={supplier.uuid || supplier.id} 
                    id={supplier.uuid || supplier.id} 
                    title={supplier.company_profile?.company_name || supplier.name || (isEnglish ? 'Company Name' : 'اسم الشركة')}
                    category={supplier.company_profile?.work_field || (isEnglish ? 'Unspecified' : 'غير محدد')}
                    description={supplier.company_profile?.bio || (isEnglish ? 'No introduction available' : 'لا توجد نبذة تعريفية')}
                    city={supplier.company_profile?.location || (isEnglish ? 'Unspecified' : 'غير محدد')}
                    status={supplier.type === 'supplier' ? 'اساسي' : 'متميز'}
                    isSubcontractor={false}
                    logo={supplier.avatar_url || supplier.avatar}
                  />
                ))}
              </div>
              
              {/* Pagination Controls */}
              {pagination && pagination.last_page > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-12 mb-4">
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isEnglish ? 'Previous' : 'السابق'}
                  </button>
                  
                  <div className="flex flex-wrap justify-center items-center gap-1">
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors flex items-center justify-center ${
                          page === pageNum 
                            ? "bg-[#EB682C] text-white" 
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
                    disabled={page === pagination.last_page}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isEnglish ? 'Next' : 'التالي'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 font-bold">{isEnglish ? 'No companies currently.' : 'لا يوجد شركات حالياً.'}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function SuppliersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]"></div>}>
      <SuppliersPageContent />
    </Suspense>
  );
}
