"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight, Search, Clock, Tag, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

export default function BlogsGrid() {
  const { isEnglish } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [categoriesData, setCategoriesData] = useState({ all_count: 0, categories: [] });
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({ last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/auth/blogs/categories");
        if (res.data) {
          setCategoriesData(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch blog categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Live debounced search as user types
  useEffect(() => {
    const handler = setTimeout(() => {
      setAppliedSearch(searchQuery.trim());
      setCurrentPage(1);
    }, 350);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch blogs when category, search, or page changes
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          per_page: 9,
        };
        if (selectedCategory && selectedCategory !== "الكل" && selectedCategory !== "All") {
          params.category = selectedCategory;
        }
        if (appliedSearch) {
          params.search = appliedSearch;
        }

        const res = await api.get("/auth/blogs", { params });
        if (res.data) {
          let list = Array.isArray(res.data.data) ? res.data.data : [];

          // Smart Client Fallback: If backend returns 0 results for the search query (e.g. English keywords or slug/tag terms), search client-side
          if (list.length === 0 && appliedSearch) {
            try {
              const fallbackRes = await api.get("/auth/blogs", {
                params: {
                  page: 1,
                  per_page: 50,
                  category: selectedCategory && selectedCategory !== "الكل" && selectedCategory !== "All" ? selectedCategory : undefined,
                },
              });
              const allItems = Array.isArray(fallbackRes.data?.data) ? fallbackRes.data.data : [];
              const queryLower = appliedSearch.toLowerCase();
              const filtered = allItems.filter((item) => {
                const title = (item.title || "").toLowerCase();
                const slug = (item.slug || "").toLowerCase();
                const excerpt = (item.excerpt || "").toLowerCase();
                const author = (item.author || "").toLowerCase();
                const category = (item.category || "").toLowerCase();
                const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";
                return (
                  title.includes(queryLower) ||
                  slug.includes(queryLower) ||
                  excerpt.includes(queryLower) ||
                  author.includes(queryLower) ||
                  category.includes(queryLower) ||
                  tags.includes(queryLower)
                );
              });
              list = filtered;
            } catch (err) {
              console.warn("Fallback search error:", err);
            }
          }

          setBlogs(list);
          setPaginationInfo({
            last_page: res.data.last_page || 1,
            total: list.length,
          });
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory, appliedSearch, currentPage]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchQuery.trim());
    setCurrentPage(1);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setAppliedSearch("");
    setCurrentPage(1);
  };

  return (
    <section className="py-16 px-6 md:px-12 w-full font-tajawal" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Controls: Search Bar & Categories Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
          
          {/* Categories Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 order-2 md:order-1">
            <button
              onClick={() => handleCategorySelect("الكل")}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${
                selectedCategory === "الكل" || selectedCategory === "All"
                  ? "bg-[#2A5CBA] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{isEnglish ? "All" : "الكل"}</span>
              {categoriesData.all_count > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === "الكل" || selectedCategory === "All"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {categoriesData.all_count}
                </span>
              )}
            </button>

            {categoriesData.categories?.map((catItem, idx) => {
              const isSelected = selectedCategory === catItem.category;
              return (
                <button
                  key={idx}
                  onClick={() => handleCategorySelect(catItem.category)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#2A5CBA] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{catItem.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    {catItem.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Keyword Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80 order-1 md:order-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEnglish ? "Search articles..." : "ابحث في المقالات..."}
              className={`w-full h-11 px-4 ${isEnglish ? 'pl-10 pr-10' : 'pr-10 pl-10'} rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#EB682C] bg-white shadow-sm transition-colors`}
            />
            <button
              type="submit"
              className={`absolute ${isEnglish ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EB682C] transition-colors z-10 cursor-pointer p-1`}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className={`absolute ${isEnglish ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10 cursor-pointer p-1`}
                aria-label="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-28 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-3 border-[#EB682C] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-400 text-sm">{isEnglish ? "Loading articles..." : "جاري تحميل المقالات..."}</span>
          </div>
        ) : blogs.length > 0 ? (
          /* Blogs Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => {
              const postSlug = blog.slug || blog.uuid || blog.id;
              const imgUrl = blog.image_url || blog.image || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800";

              return (
                <article 
                  key={blog.uuid || blog.id || idx} 
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                  data-aos="fade-up" 
                  data-aos-delay={idx * 80}
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                    <img 
                      src={imgUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Category Badge */}
                    {blog.category && (
                      <div className={`absolute top-4 ${isEnglish ? 'left-4' : 'right-4'} bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#EB682C] shadow-md`}>
                        {blog.category}
                      </div>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-3">
                      {blog.formatted_date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{blog.formatted_date}</span>
                        </div>
                      )}
                      {blog.author && (
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span>{blog.author}</span>
                        </div>
                      )}
                      {blog.read_time && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#EB682C]" />
                          <span>{blog.read_time}</span>
                        </div>
                      )}
                    </div>

                    {/* Title & Excerpt */}
                    <h3 className={`text-lg font-bold text-gray-900 mb-2.5 line-clamp-2 group-hover:text-[#2A5CBA] transition-colors leading-snug ${isEnglish ? 'text-left' : 'text-right'}`}>
                      <Link href={`/blogs/${postSlug}`}>
                        {blog.title}
                      </Link>
                    </h3>
                    <p className={`text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 ${isEnglish ? 'text-left' : 'text-right'}`}>
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {blog.tags.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More Link */}
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <Link 
                        href={`/blogs/${postSlug}`}
                        className="inline-flex items-center gap-2 text-[#EB682C] font-bold text-sm hover:text-[#d65a22] transition-colors group/btn"
                      >
                        <span>{isEnglish ? "Read More" : "اقرأ المزيد"}</span>
                        {isEnglish ? (
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        ) : (
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                        )}
                      </Link>
                    </div>
                  </div>

                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-24 text-center bg-white rounded-3xl border border-gray-100 p-8">
            <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-gray-700 mb-1">
              {isEnglish ? "No articles found" : "لم يتم العثور على مقالات"}
            </h4>
            <p className="text-sm text-gray-400 mb-6">
              {isEnglish 
                ? "Try searching with different keywords or choosing another category."
                : "جرب البحث بكلمات مختلفة أو اختر تصنيفاً آخر."}
            </p>
            {(selectedCategory !== "الكل" || appliedSearch) && (
              <button
                onClick={() => {
                  setSelectedCategory("الكل");
                  clearSearch();
                }}
                className="bg-[#2A5CBA] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#204791] transition-colors"
              >
                {isEnglish ? "Reset Filters" : "إعادة ضبط الفلاتر"}
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {paginationInfo.last_page > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16" dir="ltr">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isEnglish ? "Prev" : "السابق"}
            </button>
            
            {Array.from({ length: paginationInfo.last_page }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${
                  currentPage === p
                    ? "bg-[#EB682C] text-white shadow-sm"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={currentPage >= paginationInfo.last_page}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, paginationInfo.last_page))}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isEnglish ? "Next" : "التالي"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
