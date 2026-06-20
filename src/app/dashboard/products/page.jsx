"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import Popup from "@/components/Popup";
import {
  Search,
  ChevronDown,
  MoreVertical,
  Trash2,
  Edit2,
  Grid,
  List,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function ProductsPage() {
  const { isEnglish } = useLanguage();
  const { user } = useAuth();
  const isRental = user?.type === "rental";
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupState, setPopupState] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
    onConfirm: null,
  });

  // View & Sort States
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest', 'oldest', 'name-asc', 'name-desc', 'price-high', 'price-low'
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter States
  const [searchType, setSearchType] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [searchName, setSearchName] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  const filteredProducts = products
    .filter((product) => {
      const matchName =
        product.name?.toLowerCase().includes(searchName.toLowerCase()) || false;
      const matchType =
        product.model?.toLowerCase().includes(searchType.toLowerCase()) ||
        false;
      const matchPrice = searchPrice
        ? String(product.price).includes(searchPrice)
        : true;

      const isNameMatch = searchName ? matchName : true;
      const isTypeMatch = searchType ? matchType : true;

      return isNameMatch && isTypeMatch && matchPrice;
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
      if (sortOrder === "price-high") {
        return (Number(b.price) || 0) - (Number(a.price) || 0);
      }
      if (sortOrder === "price-low") {
        return (Number(a.price) || 0) - (Number(b.price) || 0);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search/sort
  }, [searchName, searchType, searchPrice, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/auth/company/products");
      const fetchedData = res.data;
      const dataArray = Array.isArray(fetchedData)
        ? fetchedData
        : fetchedData?.data || [];
      setProducts(dataArray);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (uuid) => {
    setPopupState({
      isOpen: true,
      type: "danger",
      title: isEnglish
        ? isRental
          ? "Confirm Delete"
          : "Confirm Delete"
        : "تأكيد الحذف",
      message: isEnglish
        ? isRental
          ? "Are you sure you want to delete this equipment? This action cannot be undone."
          : "Are you sure you want to delete this product? This action cannot be undone."
        : isRental
          ? "هل أنت متأكد من حذف هذه المعدة؟ لا يمكن التراجع عن هذا الإجراء."
          : "هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.",
      onConfirm: async () => {
        setPopupState({ ...popupState, isOpen: false });
        try {
          await api.delete(`/auth/company/products/${uuid}`);
          setProducts(products.filter((p) => p.uuid !== uuid));
          setActiveDropdown(null);
          setTimeout(() => {
            setPopupState({
              isOpen: true,
              type: "success",
              title: isEnglish ? "Deleted" : "تم الحذف",
              message: isEnglish
                ? isRental
                  ? "Equipment deleted successfully."
                  : "Product deleted successfully."
                : isRental
                  ? "تم حذف المعدة بنجاح."
                  : "تم حذف المنتج بنجاح.",
              onConfirm: () => setPopupState({ ...popupState, isOpen: false }),
            });
          }, 300);
        } catch (err) {
          console.error("Failed to delete product:", err);
          setTimeout(() => {
            setPopupState({
              isOpen: true,
              type: "danger",
              title: isEnglish ? "Error" : "خطأ",
              message: isEnglish
                ? isRental
                  ? "Failed to delete equipment"
                  : "Failed to delete product"
                : isRental
                  ? "فشل حذف المعدة"
                  : "فشل حذف المنتج",
              onConfirm: () => setPopupState({ ...popupState, isOpen: false }),
            });
          }, 300);
        }
      },
    });
  };

  return (
    <div
      className="font-tajawal max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4 mb-8">
        <Link href="/dashboard/products/add" className="w-full md:w-auto">
          <button className="w-full bg-[#EB682C] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap">
            {isEnglish
              ? isRental
                ? "Add New Equipment +"
                : "Add New Product +"
              : isRental
                ? "اضافة معدة جديدة +"
                : "اضافة منتج جديد +"}
          </button>
        </Link>
        <div className={`${isEnglish ? "text-left" : "text-right"} flex-1`}>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEnglish
              ? isRental
                ? "Equipment"
                : "Products"
              : isRental
                ? "المعدات"
                : "المنتجات"}
          </h1>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className={`flex flex-col ${isEnglish ? "text-left" : "text-right"} gap-2`}
        >
          <label className="text-sm font-bold text-gray-700">
            {isEnglish ? "Type" : "النوع"}
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              placeholder={isEnglish ? "Search by type" : "ابحث عن النوع"}
              className={`w-full h-12 ${isEnglish ? "pl-10 pr-4" : "pr-10 pl-4"} border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? "text-left" : "text-right"}`}
            />
            <Search
              className={`w-4 h-4 text-gray-400 absolute ${isEnglish ? "left-4" : "right-4"} top-1/2 -translate-y-1/2`}
            />
          </div>
        </div>

        <div
          className={`flex flex-col ${isEnglish ? "text-left" : "text-right"} gap-2`}
        >
          <label className="text-sm font-bold text-gray-700">
            {isEnglish ? "Price" : "السعر"}
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchPrice}
              onChange={(e) => setSearchPrice(e.target.value)}
              placeholder={isEnglish ? "Search by price" : "ابحث عن السعر"}
              className={`w-full h-12 ${isEnglish ? "pl-10 pr-4" : "pr-10 pl-4"} border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? "text-left" : "text-right"}`}
            />
            <Search
              className={`w-4 h-4 text-gray-400 absolute ${isEnglish ? "left-4" : "right-4"} top-1/2 -translate-y-1/2`}
            />
          </div>
        </div>

        <div
          className={`flex flex-col ${isEnglish ? "text-left" : "text-right"} gap-2`}
        >
          <label className="text-sm font-bold text-gray-700">
            {isEnglish ? "Search" : "البحث"}
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder={
                isEnglish
                  ? isRental
                    ? "Search for equipment"
                    : "Search for a product"
                  : isRental
                    ? "ابحث عن معدة"
                    : "ابحث عن منتج"
              }
              className={`w-full h-12 ${isEnglish ? "pl-10 pr-4" : "pr-10 pl-4"} border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? "text-left" : "text-right"}`}
            />
            <Search
              className={`w-4 h-4 text-gray-400 absolute ${isEnglish ? "left-4" : "right-4"} top-1/2 -translate-y-1/2`}
            />
          </div>
        </div>
      </div>

      {/* List Header and Controls */}
      <div
        className={`flex ${isEnglish ? "flex-row" : "flex-row-reverse"} justify-between items-center mb-4`}
      >
        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50"
            >
              <ChevronDown className="w-4 h-4" />
              {isEnglish ? "Sort" : "ترتيب"}
            </button>
            {isSortOpen && (
              <div className="absolute top-12 right-0 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden text-right">
                <button
                  onClick={() => {
                    setSortOrder("newest");
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-right hover:bg-orange-50 transition-colors ${sortOrder === "newest" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}
                >
                  {isEnglish ? "Newest" : "الأحدث"}
                </button>
                <button
                  onClick={() => {
                    setSortOrder("oldest");
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-right hover:bg-orange-50 transition-colors ${sortOrder === "oldest" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}
                >
                  {isEnglish ? "Oldest" : "الأقدم"}
                </button>
                <button
                  onClick={() => {
                    setSortOrder("name-asc");
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-right hover:bg-orange-50 transition-colors ${sortOrder === "name-asc" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}
                >
                  {isEnglish ? "Name (A-Z)" : "الاسم (أ - ي)"}
                </button>
                <button
                  onClick={() => {
                    setSortOrder("name-desc");
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-right hover:bg-orange-50 transition-colors ${sortOrder === "name-desc" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}
                >
                  {isEnglish ? "Name (Z-A)" : "الاسم (ي - أ)"}
                </button>
                <button
                  onClick={() => {
                    setSortOrder("price-high");
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-right hover:bg-orange-50 transition-colors ${sortOrder === "price-high" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}
                >
                  {isEnglish ? "Price (Highest)" : "السعر (الأعلى)"}
                </button>
                <button
                  onClick={() => {
                    setSortOrder("price-low");
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-right hover:bg-orange-50 transition-colors ${sortOrder === "price-low" ? "bg-orange-50 text-[#EB682C] font-bold" : "text-gray-700"}`}
                >
                  {isEnglish ? "Price (Lowest)" : "السعر (الأقل)"}
                </button>
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-orange-50 text-[#EB682C]" : "text-gray-500 hover:bg-gray-50 border-r border-gray-200"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-orange-50 text-[#EB682C]" : "text-gray-500 hover:bg-gray-50"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-900">
          {isEnglish
            ? isRental
              ? "All Equipment"
              : "All Products"
            : isRental
              ? "جميع المعدات"
              : "جميع المنتجات"}
        </h2>
      </div>

      {/* Products Content */}
      {viewMode === "list" ? (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm mb-6 pb-2">
          <div className="overflow-x-auto">
            <table
              className={`w-full ${isEnglish ? "text-left" : "text-right"} text-sm`}
            >
              <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6 font-bold">
                    {isEnglish
                      ? isRental
                        ? "Equipment"
                        : "Products"
                      : isRental
                        ? "المعدات"
                        : "المنتجات"}
                  </th>
                  <th className="py-4 px-6 font-bold">
                    {isEnglish ? "Type" : "النوع"}
                  </th>
                  <th className="py-4 px-6 font-bold">
                    {isEnglish ? "Qty" : "الكمية"}
                  </th>
                  <th className="py-4 px-6 font-bold">
                    {isEnglish ? "Price" : "السعر"}
                  </th>
                  <th className="py-4 px-6 font-bold">
                    {isEnglish ? "Date" : "التاريخ"}
                  </th>
                  <th className="py-4 px-6 font-bold w-20 text-center">
                    {isEnglish ? "Actions" : "التحكم"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      {isEnglish ? "Loading..." : "جاري التحميل..."}
                    </td>
                  </tr>
                ) : paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      {isEnglish
                        ? isRental
                          ? "No equipment found"
                          : "No products found"
                        : isRental
                          ? "لا توجد معدات"
                          : "لا توجد منتجات"}
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((product) => (
                    <tr
                      key={product.uuid || product.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6 text-gray-900 font-bold flex items-center justify-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-lg shrink-0 overflow-hidden">
                          {product.images &&
                          product.images.length > 0 &&
                          product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            "📦"
                          )}
                        </div>
                        <span>{product.name}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {product.model || "-"}
                      </td>
                      <td className="py-4 px-6 text-gray-500">-</td>
                      <td className="py-4 px-6 text-gray-500">
                        {product.price
                          ? `${product.price} ${isEnglish ? "SAR" : "ريال"}`
                          : "-"}
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {product.created_at
                          ? new Date(product.created_at).toLocaleDateString(
                              isEnglish ? "en-US" : "ar-EG",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "-"}
                      </td>
                      <td className="py-4 px-6 text-center text-[#EB682C] relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === (product.uuid || product.id)
                                ? null
                                : product.uuid || product.id,
                            )
                          }
                          className="hover:bg-orange-50 p-1 rounded-md transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {/* Action Dropdown */}
                        {activeDropdown === (product.uuid || product.id) && (
                          <div className="absolute top-12 left-4 w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden text-right">
                            <button
                              onClick={() => handleDelete(product.uuid)}
                              className="w-full flex items-center justify-end gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-bold transition-colors"
                            >
                              {isEnglish ? "Delete" : "حذف"}
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <Link
                              href={`/dashboard/products/edit/${product.uuid || ""}`}
                            >
                              <button className="w-full flex items-center justify-end gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors border-t border-gray-50">
                                {isEnglish ? "Edit" : "تعديل"}
                                <Edit2 className="w-4 h-4" />
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
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 ${isEnglish ? "text-left" : "text-right"}`}
        >
          {loading ? (
            <div className="col-span-full py-8 text-center text-gray-500">
              {isEnglish ? "Loading..." : "جاري التحميل..."}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="col-span-full py-8 text-center text-gray-500">
              {isEnglish
                ? isRental
                  ? "No equipment found"
                  : "No products found"
                : isRental
                  ? "لا توجد معدات"
                  : "لا توجد منتجات"}
            </div>
          ) : (
            paginatedProducts.map((product) => (
              <div
                key={product.uuid || product.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col"
              >
                <div className="aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                  {product.images &&
                  product.images.length > 0 &&
                  product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-4xl">📦</span>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 mb-1 text-lg truncate">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2 truncate">
                  {product.model || (isEnglish ? "No type" : "بدون نوع")}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                  <span className="font-bold text-[#EB682C]">
                    {product.price
                      ? `${product.price} ${isEnglish ? "SAR" : "ريال"}`
                      : "-"}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === (product.uuid || product.id)
                            ? null
                            : product.uuid || product.id,
                        )
                      }
                      className="text-gray-400 hover:text-[#EB682C] p-1 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {activeDropdown === (product.uuid || product.id) && (
                      <div
                        className={`absolute bottom-8 ${isEnglish ? "right-0" : "left-0"} w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden ${isEnglish ? "text-left" : "text-right"}`}
                      >
                        <button
                          onClick={() => handleDelete(product.uuid)}
                          className={`w-full flex items-center justify-${isEnglish ? "start" : "end"} gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-bold transition-colors`}
                        >
                          {isEnglish && <Trash2 className="w-4 h-4" />}
                          {isEnglish ? "Delete" : "حذف"}
                          {!isEnglish && <Trash2 className="w-4 h-4" />}
                        </button>
                        <Link
                          href={`/dashboard/products/edit/${product.uuid || ""}`}
                        >
                          <button
                            className={`w-full flex items-center justify-${isEnglish ? "start" : "end"} gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-bold transition-colors border-t border-gray-50`}
                          >
                            {isEnglish && <Edit2 className="w-4 h-4" />}
                            {isEnglish ? "Edit" : "تعديل"}
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
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />{" "}
              {/* RTL, Right is Previous */}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> {/* RTL, Left is Next */}
            </button>
          </div>
          <span className="text-sm font-bold text-gray-900">
            {isEnglish
              ? `Page ${currentPage} of ${totalPages}`
              : `الصفحة ${currentPage} من ${totalPages}`}
          </span>
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
