"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, Building2, Package, Wrench, Newspaper, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { HiOutlineArrowSmallUp } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

export default function HeroSection() {
  const { isEnglish } = useLanguage();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    companies: [],
    products: [],
    services: [],
    blogs: [],
  });

  const searchContainerRef = useRef(null);

  // Close popup on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live debounced search across Products, Services, Companies, Blogs
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setResults({ companies: [], products: [], services: [], blogs: [] });
      setIsOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    const timer = setTimeout(async () => {
      try {
        const [productsRes, servicesRes, companiesRes, blogsRes] = await Promise.allSettled([
          api.get("/auth/products", { params: { search: q, per_page: 3 } }),
          api.get("/auth/services", { params: { search: q, per_page: 3 } }),
          api.get("/auth/companies", { params: { search: q, per_page: 3 } }),
          api.get("/auth/blogs", { params: { search: q, per_page: 2 } }),
        ]);

        const extract = (res) => {
          if (res.status === "fulfilled" && res.value?.data) {
            const d = res.value.data;
            return Array.isArray(d.data) ? d.data : Array.isArray(d) ? d : [];
          }
          return [];
        };

        setResults({
          products: extract(productsRes),
          services: extract(servicesRes),
          companies: extract(companiesRes),
          blogs: extract(blogsRes),
        });
      } catch (err) {
        console.error("Hero search error:", err);
      } finally {
        setLoading(false);
      }
    }, 320);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setIsOpen(false);
    // Navigate to products search by default or relevant page
    router.push(`/products?search=${encodeURIComponent(q)}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
    setResults({ companies: [], products: [], services: [], blogs: [] });
  };

  const totalCount =
    results.companies.length +
    results.products.length +
    results.services.length +
    results.blogs.length;

  return (
    <section
      style={{
        backgroundImage: "url('/bg-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full pt-10 pb-20 px-6 md:px-12 flex flex-col items-center"
      data-aos="fade-up"
    >
      {/* Live Search Bar with Dropdown Popup */}
      <div
        ref={searchContainerRef}
        className="w-full max-w-3xl mx-auto mb-12 relative z-50 font-tajawal"
        dir={isEnglish ? "ltr" : "rtl"}
      >
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-full p-2 flex items-center shadow-xl border border-gray-100 hover:border-[#EB682C]/50 transition-colors"
        >
          <button
            type="submit"
            className={`px-3 text-gray-400 hover:text-[#EB682C] transition-colors cursor-pointer`}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            value={searchQuery}
            onFocus={() => {
              if (searchQuery.trim()) setIsOpen(true);
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isEnglish
                ? "Search for products, suppliers, services, articles..."
                : "ابحث هنا عن منتجات، موردين، خدمات، مقالات..."
            }
            className="w-full px-2 py-2 bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-400 font-medium"
          />

          {loading ? (
            <div className="px-3">
              <Loader2 className="w-4 h-4 text-[#EB682C] animate-spin" />
            </div>
          ) : searchQuery ? (
            <button
              type="button"
              onClick={clearSearch}
              className="px-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </form>

        {/* Search Results Dropdown Popup */}
        {isOpen && searchQuery.trim() && (
          <div
            className={`absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[500px] overflow-y-auto z-50 p-4 divide-y divide-gray-100 animate-in fade-in slide-in-from-top-2 duration-200 ${
              isEnglish ? "text-left" : "text-right"
            }`}
          >
            {loading && totalCount === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center gap-2 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin text-[#EB682C]" />
                <p className="text-xs">
                  {isEnglish
                    ? "Searching suppliers, products & services..."
                    : "جاري البحث في الموردين والمنتجات والخدمات..."}
                </p>
              </div>
            ) : totalCount === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p className="font-bold text-sm">
                  {isEnglish ? "No results found for " : "لم يتم العثور على نتائج تطابق "}
                  <span className="text-[#EB682C]">"{searchQuery}"</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {isEnglish
                    ? "Try checking spelling or searching for another keyword"
                    : "جرب كتابة كلمة أخرى أو تصفح الأقسام الرئيسية"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 1. Companies / Suppliers */}
                {results.companies.length > 0 && (
                  <div className="pt-2 first:pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#EB682C]" />
                        {isEnglish ? "Companies & Suppliers" : "الشركات والموردين"}
                      </span>
                      <Link
                        href={`/suppliers?category=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] text-[#EB682C] hover:underline font-bold"
                      >
                        {isEnglish ? "View all" : "عرض الكل"}
                      </Link>
                    </div>
                    <div className="space-y-1.5">
                      {results.companies.map((comp) => {
                        const profile = comp.company_profile || {};
                        const name = profile.company_name || comp.name || "شركة";
                        const field = profile.work_field || comp.type || "";
                        return (
                          <Link
                            key={comp.uuid || comp.id}
                            href={`/suppliers?search=${encodeURIComponent(name)}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-orange-50/50 transition-colors group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-orange-100/60 text-[#EB682C] flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                              {comp.avatar || comp.avatar_url ? (
                                <img
                                  src={comp.avatar || comp.avatar_url}
                                  alt={name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Building2 className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-800 group-hover:text-[#EB682C] transition-colors truncate">
                                {name}
                              </p>
                              {field && (
                                <p className="text-xs text-gray-400 truncate">{field}</p>
                              )}
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#EB682C] transition-colors shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Products */}
                {results.products.length > 0 && (
                  <div className="pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-[#2A5CBA]" />
                        {isEnglish ? "Products" : "المنتجات"}
                      </span>
                      <Link
                        href={`/products?search=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] text-[#2A5CBA] hover:underline font-bold"
                      >
                        {isEnglish ? "View all" : "عرض الكل"}
                      </Link>
                    </div>
                    <div className="space-y-1.5">
                      {results.products.map((prod) => {
                        const img = prod.images && prod.images.length > 0 ? prod.images[0] : null;
                        return (
                          <Link
                            key={prod.uuid || prod.id}
                            href={`/products?search=${encodeURIComponent(prod.name)}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50/50 transition-colors group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
                              {img ? (
                                <img src={img} alt={prod.name} className="w-full h-full object-cover" />
                              ) : (
                                <Package className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-800 group-hover:text-[#2A5CBA] transition-colors truncate">
                                {prod.name}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                {prod.category && <span>{prod.category}</span>}
                                {prod.price && (
                                  <span className="text-[#EB682C] font-bold">
                                    {prod.price} {isEnglish ? "SAR" : "ريال"}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#2A5CBA] transition-colors shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Services */}
                {results.services.length > 0 && (
                  <div className="pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                        {isEnglish ? "Services" : "الخدمات الإنشائية"}
                      </span>
                      <Link
                        href={`/services?search=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] text-emerald-600 hover:underline font-bold"
                      >
                        {isEnglish ? "View all" : "عرض الكل"}
                      </Link>
                    </div>
                    <div className="space-y-1.5">
                      {results.services.map((srv) => {
                        const img = srv.images && srv.images.length > 0 ? srv.images[0] : null;
                        return (
                          <Link
                            key={srv.uuid || srv.id}
                            href={`/services?search=${encodeURIComponent(srv.name)}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50/50 transition-colors group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
                              {img ? (
                                <img src={img} alt={srv.name} className="w-full h-full object-cover" />
                              ) : (
                                <Wrench className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors truncate">
                                {srv.name}
                              </p>
                              {srv.category && (
                                <p className="text-xs text-gray-400 truncate">{srv.category}</p>
                              )}
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 transition-colors shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. Blogs & Articles */}
                {results.blogs.length > 0 && (
                  <div className="pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Newspaper className="w-3.5 h-3.5 text-purple-600" />
                        {isEnglish ? "Articles & Blogs" : "المقالات والمدونات"}
                      </span>
                      <Link
                        href={`/blogs?search=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setIsOpen(false)}
                        className="text-[11px] text-purple-600 hover:underline font-bold"
                      >
                        {isEnglish ? "View all" : "عرض الكل"}
                      </Link>
                    </div>
                    <div className="space-y-1.5">
                      {results.blogs.map((b) => (
                        <Link
                          key={b.uuid || b.id}
                          href={`/blogs/${b.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-purple-50/50 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
                            {b.image_url || b.image ? (
                              <img
                                src={b.image_url || b.image}
                                alt={b.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Newspaper className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-800 group-hover:text-purple-600 transition-colors truncate">
                              {b.title}
                            </p>
                            {b.category && (
                              <p className="text-xs text-gray-400 truncate">{b.category}</p>
                            )}
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-purple-600 transition-colors shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Global Action */}
            <div className="pt-3 mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-full py-2.5 px-4 bg-gray-50 hover:bg-[#EB682C] hover:text-white rounded-xl text-xs font-bold text-gray-700 transition-all text-center flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{isEnglish ? "Explore all results for" : "عرض جميع النتائج لـ"} "{searchQuery}"</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hero Headline */}
      <div className="relative">
        <div className="absolute -left-35 -top-2 bg-white/50 backdrop-blur-2xl p-2 rounded-3xl hidden lg:block">
          <p className="font-medium">{isEnglish ? "Over 2,400 reviews" : "أكثر من 2.4 ألف تقييم"}</p>
        </div>

        <div className="absolute -right-30 top-12 bg-white/50 backdrop-blur-2xl p-2 rounded-3xl hidden lg:block">
          <p className="font-medium">{isEnglish ? "Over 1,000 users" : "أكثر من 1000 مستخدم"}</p>
        </div>

        <div className="absolute top-35 left-1/3 -translate-x-1/2 bg-white/50 backdrop-blur-2xl p-2 rounded-3xl hidden lg:block">
          <p className="font-medium">{isEnglish ? "Over 1,500 suppliers" : "أكثر من 1500 مورد"}</p>
        </div>

        <h1 className="text-4xl font-tajawal md:text-5xl lg:text-6xl font-extrabold text-[#010101] mb-4 text-center leading-tight">
          {isEnglish ? (
            <>The <span className="text-[#2A5CBA]">First</span> Digital Platform<br />for the <span className="text-[#EB682C]">Construction</span> Sector</>
          ) : (
            <>المنصة الرقمية <span className="text-[#2A5CBA]">الأولى</span> لربط<br />قطاع <span className="text-[#EB682C]">المقاولات</span></>
          )}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-[1296px] h-auto min-h-[300px] md:h-[550px] relative flex flex-col items-center justify-center">
        <Image
          className="w-full"
          src="/Home-page-Hero.png"
          alt="Construction Hero"
          width={1000}
          height={1000}
          priority
        />

        {/* Badges on Hero (Desktop) */}
        <div className="hidden md:flex items-center gap-3 absolute bottom-6 right-10">
          <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm w-[120px] h-[120px] rounded-full">
            <p className="text-white font-bold">4.8</p>
            <div className="flex items-center justify-center">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-gray-400" />
            </div>
            <p className="text-white text-sm text-center">
              {isEnglish ? <>Average<br />Rating</> : <>متوسط <br />التقييمات</>}
            </p>
          </div>

          <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm w-[120px] h-[120px] rounded-full">
            <HiOutlineArrowSmallUp className="text-5xl text-white -rotate-30" />
          </div>
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex absolute bottom-2 left-2 lg:left-4 z-20 items-center gap-2 md:gap-2.5">
          <div className="flex items-center gap-2 md:gap-2.5 justify-center">
            <Link
              href="/services"
              className="font-bold text-gray-800 hover:text-[#EB682C] transition-colors cursor-pointer text-sm whitespace-nowrap px-1"
            >
              {isEnglish ? "Explore Now" : "استكشف الآن"}
            </Link>

            <Link
              href="/suppliers"
              className="bg-[#EB682C] px-4 py-2.5 rounded-full text-white font-bold text-sm hover:bg-[#d9571e] transition-all transform hover:scale-105 shadow-md flex items-center justify-center cursor-pointer whitespace-nowrap"
            >
              {isEnglish ? "Send a Quote Request" : "أرسل طلب عرض أسعار"}
            </Link>

            <Link
              href="/suppliers"
              className="bg-[#EB682C] p-2.5 rounded-full text-white hover:bg-[#d9571e] transition-all transform hover:scale-105 shadow-md flex items-center justify-center cursor-pointer"
              aria-label={isEnglish ? "Send a Quote Request" : "أرسل طلب عرض أسعار"}
            >
              <HiOutlineArrowSmallUp className="text-xl text-white -rotate-30" />
            </Link>
          </div>
        </div>

        {/* Mobile Action Bar */}
        <div className="flex md:hidden w-full mt-4 px-2 pb-2">
          <div
            className="w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 px-3 py-3 flex items-center gap-2 overflow-hidden"
            dir="ltr"
          >
            {/* CTA Button */}
            <Link
              href="/suppliers"
              className="flex items-center gap-1 bg-[#EB682C] text-white rounded-full px-3 py-2.5 font-extrabold text-xs hover:bg-[#d9571e] transition-all shadow-md shrink-0"
            >
              <HiOutlineArrowSmallUp className="text-sm rotate-45 shrink-0" />
              <span className="whitespace-nowrap">
                {isEnglish ? "Get a Quote" : "طلب أسعار"}
              </span>
            </Link>

            {/* Rating badge */}
            <div className="flex flex-col items-center shrink-0 mx-auto">
              <span className="text-gray-800 text-sm font-extrabold leading-none">4.8</span>
              <div className="flex items-center gap-0.5 my-0.5">
                <FaStar className="text-yellow-400 w-2.5 h-2.5" />
                <FaStar className="text-yellow-400 w-2.5 h-2.5" />
                <FaStar className="text-yellow-400 w-2.5 h-2.5" />
                <FaStar className="text-yellow-400 w-2.5 h-2.5" />
                <FaStar className="text-gray-300 w-2.5 h-2.5" />
              </div>
              <span className="text-[9px] text-gray-500 leading-none whitespace-nowrap">
                {isEnglish ? "Avg. Rating" : "متوسط التقييمات"}
              </span>
            </div>

            {/* Explore Now */}
            <Link
              href="/services"
              className="text-gray-800 font-extrabold text-xs whitespace-nowrap hover:text-[#EB682C] transition-colors shrink-0"
            >
              {isEnglish ? "Explore Now" : "استكشف الآن"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
