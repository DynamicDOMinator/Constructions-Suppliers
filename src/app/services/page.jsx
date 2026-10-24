"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHeader from "@/components/services/ServicesHeader";
import ServicesSidebar from "@/components/services/ServicesSidebar";
import ServiceCard from "@/components/services/ServiceCard";
import Pagination from "@/components/products/Pagination";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";
import { Wrench } from "lucide-react";

export default function ServicesPage() {
  const { isEnglish } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPaginationData] = useState(null);
  const servicesSectionRef = useRef(null);

  // Search, filter, and sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const params = { page: currentPage };
        if (selectedCategory && selectedCategory !== "الكل") {
          params.category = selectedCategory;
        }
        if (searchQuery && searchQuery.trim()) {
          params.search = searchQuery.trim();
        }

        const response = await api.get("/auth/services", { params });
        if (response.data) {
          const rawData = response.data;
          const dataList = Array.isArray(rawData) ? rawData : rawData.data || [];
          setServices(dataList);

          if (!Array.isArray(rawData)) {
            setPaginationData({
              current_page: rawData.current_page || 1,
              last_page: rawData.last_page || 1,
              total: rawData.total || dataList.length,
              per_page: rawData.per_page || 10,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [currentPage, selectedCategory, searchQuery]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (servicesSectionRef.current) {
      const topOffset = 110;
      const elementPosition = servicesSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  // Derived filtered and sorted list
  const getFilteredAndSortedServices = () => {
    let result = [...services];

    // Additional local filter check
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(lowerQuery)) ||
          (s.description && s.description.toLowerCase().includes(lowerQuery)) ||
          (s.category && s.category.toLowerCase().includes(lowerQuery))
      );
    }

    if (selectedCategory && selectedCategory !== "الكل") {
      const lowerCat = selectedCategory.toLowerCase();
      result = result.filter(
        (s) =>
          (s.category && s.category.toLowerCase().includes(lowerCat)) ||
          (s.name && s.name.toLowerCase().includes(lowerCat))
      );
    }

    // Sort order
    if (sortOrder) {
      result.sort((a, b) => {
        if (sortOrder === "name_asc") {
          return (a.name || "").localeCompare(b.name || "", isEnglish ? "en" : "ar");
        }
        if (sortOrder === "name_desc") {
          return (b.name || "").localeCompare(a.name || "", isEnglish ? "en" : "ar");
        }
        if (sortOrder === "newest") {
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        }
        if (sortOrder === "oldest") {
          return new Date(a.created_at || 0) - new Date(b.created_at || 0);
        }
        return 0;
      });
    }

    return result;
  };

  const displayedServices = getFilteredAndSortedServices();

  return (
    <main
      className={`min-h-screen bg-[#EEF2F6] flex flex-col font-tajawal ${
        isEnglish ? "text-left" : "text-right"
      }`}
    >
      <Navbar />

      <ServicesHeader
        onSearchChange={handleSearchChange}
        onSortChange={setSortOrder}
        currentSort={sortOrder}
        totalServices={pagination?.total !== undefined ? pagination.total : displayedServices.length}
      />

      <section
        ref={servicesSectionRef}
        className="py-8 px-6 md:px-12 w-full"
        dir={isEnglish ? "ltr" : "rtl"}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar (Filters) */}
          <ServicesSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* Main Grid */}
          <div className="flex-1 w-full min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4 bg-white rounded-2xl border border-gray-200/80 p-8 shadow-xs">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB682C]"></div>
                <p className="text-gray-400 text-sm">
                  {isEnglish ? "Loading services..." : "جاري تحميل الخدمات..."}
                </p>
              </div>
            ) : displayedServices.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedServices.map((service) => {
                    const firstImage =
                      Array.isArray(service.images) && service.images.length > 0
                        ? service.images[0]
                        : typeof service.images === "string"
                        ? service.images
                        : service.image || null;

                    return (
                      <ServiceCard
                        key={service.uuid || service.id}
                        service={service}
                        title={service.name}
                        description={service.description}
                        image={firstImage}
                        companyId={service.company_uuid || service.company_id}
                      />
                    );
                  })}
                </div>

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.last_page}
                    totalItems={pagination.total}
                    perPage={pagination.per_page || 10}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-200/80 p-8 text-center shadow-xs">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-[#EB682C] mb-4">
                  <Wrench className="w-8 h-8 opacity-60" />
                </div>
                <p className="text-gray-700 font-bold text-base mb-1">
                  {isEnglish ? "No services found." : "لا توجد خدمات حالياً."}
                </p>
                <p className="text-gray-400 text-xs max-w-sm">
                  {searchQuery || selectedCategory
                    ? isEnglish
                      ? "Try changing search terms or clearing selected category filters."
                      : "جرّب تغيير كلمات البحث أو إعادة ضبط تصفية التصنيفات."
                    : isEnglish
                    ? "Services will appear here once registered."
                    : "ستظهر الخدمات هنا فور إضافتها."}
                </p>
                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}
                    className="mt-4 text-xs font-bold text-[#EB682C] hover:underline"
                  >
                    {isEnglish ? "Reset filters" : "إعادة ضبط التصفية"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
