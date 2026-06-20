"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsSidebar from "@/components/products/ProductsSidebar";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/products/Pagination";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsPage() {
  const { isEnglish } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPaginationData] = useState(null);
  
  // States for search and sort
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // 'asc' or 'desc'

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/auth/products?page=${currentPage}`,
        );
        if (response.data) {
          setProducts(response.data.data || []);
          if (!Array.isArray(response.data)) {
            setPaginationData({
              current_page: response.data.current_page,
              last_page: response.data.last_page,
              total: response.data.total,
              per_page: response.data.per_page,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  // Derived state for filtering and sorting
  const getFilteredAndSortedProducts = () => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.name && p.name.toLowerCase().includes(lowerQuery)) ||
        (p.description && p.description.toLowerCase().includes(lowerQuery))
      );
    }

    // Sort by price or name
    if (sortOrder) {
      result.sort((a, b) => {
        if (sortOrder === "price_asc") {
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        }
        if (sortOrder === "price_desc") {
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        }
        if (sortOrder === "name_asc") {
          return (a.name || "").localeCompare(b.name || "");
        }
        if (sortOrder === "name_desc") {
          return (b.name || "").localeCompare(a.name || "");
        }
        return 0;
      });
    }

    return result;
  };

  const displayedProducts = getFilteredAndSortedProducts();

  return (
    <main className={`min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`}>
      <Navbar />

      <ProductsHeader 
        onSearchChange={setSearchQuery} 
        onSortChange={setSortOrder} 
        currentSort={sortOrder}
      />

      <section className="py-8 px-6 md:px-12 w-full" dir={isEnglish ? "ltr" : "rtl"}>
        <div className={`max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 items-start`}>
          {/* Sidebar (Right in RTL) */}
          <ProductsSidebar />

          {/* Main Grid (Left in RTL) */}
          <div className="flex-1 w-full">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB682C]"></div>
              </div>
            ) : displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.uuid || product.id}
                      title={product.name}
                      model={product.model || (isEnglish ? "Unspecified" : "غير محدد")}
                      description={product.description || (isEnglish ? "No description available" : "لا يوجد وصف")}
                      discount={product.price || "0"}
                      unit={isEnglish ? "Per Unit" : "للوحدة"}
                      image={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : null
                      }
                      companyId={product.company_uuid || product.company_id || product.user_id || product.company?.id || product.user?.id || product.company?.uuid || product.user?.uuid || product.supplier_id || product.id}
                    />
                  ))}
                </div>

                {/* Pagination controls at the bottom of the grid */}
                {pagination && pagination.last_page > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.last_page}
                    totalItems={pagination.total}
                    perPage={pagination.per_page || 10}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 font-bold">
                  {isEnglish ? "No products found." : "لا يوجد منتجات حالياً."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
