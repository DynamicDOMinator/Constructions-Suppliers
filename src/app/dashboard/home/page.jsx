"use client";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Package,
  FileText,
  XCircle,
  Tag,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";

export default function DashboardHome() {
  const { isEnglish } = useLanguage();
  const { user } = useAuth();
  const isRental = user?.type === "rental";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/auth/company/dashboard/stats");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-[#EB682C]" />
      </div>
    );
  }

  // Fallback structures if API fails or lacks data
  const stats = data?.stats || {};
  const charts = data?.charts || {};
  const subscription = data?.subscription || {};

  // Transform Service Demand Data
  const serviceDemandData =
    charts?.service_demand?.labels?.map((label, index) => {
      const dataObj = { name: label };
      charts.service_demand.series?.forEach((seriesItem, sIdx) => {
        dataObj[`v${sIdx + 1}`] = seriesItem.data[index];
      });
      return dataObj;
    }) || [];
  const serviceDemandColors = ["#1e1b4b", "#3b82f6", "#93c5fd", "#dbeafe"];

  // Transform Top Products Data
  const pieData = charts?.top_products || [];

  // Transform Product Report Data
  const productsReportData =
    charts?.product_report?.categories?.map((cat, index) => ({
      name: cat,
      current: charts.product_report.series?.[0]?.data[index] || 0,
      last: charts.product_report.series?.[1]?.data[index] || 0,
    })) || [];

  return (
    <div
      className={`font-tajawal max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 ${isEnglish ? "ltr" : "rtl"}`}
    >
      {/* Header section */}
      <div
        className={`flex ${isEnglish ? "flex-row" : "flex-row"} justify-between items-start mb-8`}
      >
        <div className={isEnglish ? "text-left" : "text-right"}>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isEnglish ? "Home" : "الصفحة الرئيسية"}
          </h1>
          <p className="text-sm text-gray-500">
            {isEnglish
              ? "View all financial analytics and compare with last month"
              : "اطلع على جميع تحليلات الشؤون المالية وقارنها بالشهر الماضي"}
          </p>
        </div>
      </div>

      {/* Upgrade Banner */}
      {!subscription.has_active_subscription && (
        <div
          className={`bg-white border border-gray-100 rounded-2xl p-6 flex ${isEnglish ? "flex-row" : "flex-row"} justify-between items-center shadow-sm`}
        >
          <div className={`${isEnglish ? "text-left" : "text-right"} flex-1`}>
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {subscription.message ||
                (isEnglish ? "No subscriptions" : "لا توجد اشتراكات")}
            </h2>
            <p className="text-sm text-gray-500">
              {subscription.description ||
                (isEnglish
                  ? "Upgrade your account to access a higher level with features"
                  : "ارتق بحسابك للوصول الى مستوى أعلى مع الميزات")}
            </p>
          </div>
          <button className="bg-[#EB682C] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap">
            {isEnglish ? "Upgrade Plan" : "ترقية الاشتراك"}
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}
        dir={isEnglish ? "ltr" : "rtl"}
      >
        {/* Stat 1 */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 shadow-sm">
          <div
            className={`flex ${isEnglish ? "flex-row" : "flex-row"} justify-between items-start mb-4`}
          >
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-sm font-bold text-gray-700">
              {isEnglish
                ? "Accepted Pricing Requests"
                : "طلبات التسعير المقبولة"}
            </span>
          </div>
          <div
            className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-end justify-between`}
          >
            {stats.accepted_quotes && (
              <div
                className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-center gap-1 text-sm font-bold px-2 py-1 rounded-md ${stats.accepted_quotes.trend === "up" ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"}`}
              >
                {stats.accepted_quotes.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {stats.accepted_quotes.trend === "up" ? "+" : "-"}
                  {Math.abs(stats.accepted_quotes.percentage_change)}%
                </span>
              </div>
            )}
            <div className={isEnglish ? "text-left" : "text-right"}>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.accepted_quotes?.total || 0}{" "}
                {isEnglish ? "requests" : "طلب"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.accepted_quotes?.difference >= 0 ? "+" : ""}{" "}
                {stats.accepted_quotes?.difference || 0}{" "}
                {isEnglish
                  ? "requests vs last month"
                  : "طلب تسعير عن الشهر الماضي"}
              </p>
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 shadow-sm">
          <div
            className={`flex ${isEnglish ? "flex-row" : "flex-row"} justify-between items-start mb-4`}
          >
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <XCircle className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-sm font-bold text-gray-700">
              {isEnglish
                ? "Rejected Pricing Requests"
                : "طلبات التسعير المرفوضة"}
            </span>
          </div>
          <div
            className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-end justify-between`}
          >
            {stats.rejected_quotes && (
              <div
                className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-center gap-1 text-sm font-bold px-2 py-1 rounded-md ${stats.rejected_quotes.trend === "up" ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"}`}
              >
                {stats.rejected_quotes.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {stats.rejected_quotes.trend === "up" ? "+" : "-"}
                  {Math.abs(stats.rejected_quotes.percentage_change)}%
                </span>
              </div>
            )}
            <div className={isEnglish ? "text-left" : "text-right"}>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.rejected_quotes?.total || 0}{" "}
                {isEnglish ? "requests" : "طلب"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.rejected_quotes?.difference >= 0 ? "+" : ""}{" "}
                {stats.rejected_quotes?.difference || 0}{" "}
                {isEnglish
                  ? "requests vs last month"
                  : "طلب تسعير عن الشهر الماضي"}
              </p>
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-5 shadow-sm">
          <div
            className={`flex ${isEnglish ? "flex-row" : "flex-row"} justify-between items-start mb-4`}
          >
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Package className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-sm font-bold text-gray-700">
              {isEnglish ? (isRental ? "Equipment Activity" : "Products Activity") : (isRental ? "حركة المعدات" : "حركة المنتجات")}
            </span>
          </div>
          <div
            className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-end justify-between`}
          >
            {stats.products && (
              <div
                className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-center gap-1 text-sm font-bold px-2 py-1 rounded-md ${stats.products.trend === "up" ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"}`}
              >
                {stats.products.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {stats.products.trend === "up" ? "+" : "-"}
                  {Math.abs(stats.products.percentage_change)}%
                </span>
              </div>
            )}
            <div className={isEnglish ? "text-left" : "text-right"}>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.products?.total || 0} {isEnglish ? (isRental ? "equipment" : "products") : (isRental ? "معدة" : "منتج")}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.products?.difference >= 0 ? "+" : ""}{" "}
                {stats.products?.difference || 0}{" "}
                {isEnglish ? (isRental ? "equipment vs last month" : "products vs last month") : (isRental ? "معدة عن الشهر الماضي" : "منتج عن الشهر الماضي")}
              </p>
            </div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-orange-50/30 border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div
            className={`flex ${isEnglish ? "flex-row" : "flex-row"} justify-between items-start mb-4`}
          >
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Tag className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-sm font-bold text-gray-700">
              {isEnglish ? "Services Activity" : "حركة الخدمات"}
            </span>
          </div>
          <div
            className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-end justify-between`}
          >
            {stats.services && (
              <div
                className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-center gap-1 text-sm font-bold px-2 py-1 rounded-md ${stats.services.trend === "up" ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"}`}
              >
                {stats.services.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {stats.services.trend === "up" ? "+" : "-"}
                  {Math.abs(stats.services.percentage_change)}%
                </span>
              </div>
            )}
            <div className={isEnglish ? "text-left" : "text-right"}>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.services?.total || 0} {isEnglish ? "services" : "خدمة"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.services?.difference >= 0 ? "+" : ""}{" "}
                {stats.services?.difference || 0}{" "}
                {isEnglish ? "services vs last month" : "خدمة عن الشهر الماضي"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-3 gap-4`}
        dir={isEnglish ? "ltr" : "rtl"}
      >
        {/* Chart 1: Services (Stacked Bar) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3
            className={`text-sm font-bold text-gray-900 mb-6 ${isEnglish ? "text-left" : "text-right"}`}
          >
            {isEnglish
              ? "Service demand over the last 6 months"
              : "حركة الطلب على الخدمات آخر 6 أشهر"}
          </h3>
          {serviceDemandData.length > 0 ? (
            <div className="h-64" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceDemandData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#eee"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#888" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#888" }}
                  />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  {charts.service_demand?.series?.map((s, idx) => (
                    <Bar
                      key={idx}
                      dataKey={`v${idx + 1}`}
                      name={s.name}
                      stackId="a"
                      fill={
                        serviceDemandColors[idx % serviceDemandColors.length]
                      }
                      radius={
                        idx === charts.service_demand.series.length - 1
                          ? [4, 4, 0, 0]
                          : [0, 0, 0, 0]
                      }
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex justify-center items-center text-gray-400 text-sm">
              {isEnglish ? "No data available" : "لا توجد بيانات متاحة"}
            </div>
          )}
        </div>

        {/* Chart 2: Products Donut */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div
            className={`flex ${isEnglish ? "flex-row" : "flex-row-reverse"} justify-between items-center mb-6`}
          >
            <div
              className={`flex ${isEnglish ? "flex-row" : "flex-row-reverse"} gap-2 text-xs`}
            >
              <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md font-bold">
                {isEnglish ? "Last Month" : "الشهر الماضي"}
              </button>
              <button className="bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-md font-bold">
                {isEnglish ? "Current Month" : "الشهر الحالي"}
              </button>
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              {isEnglish ? (isRental ? "Top Requested Equipment" : "Top Requested Products") : (isRental ? "أفضل المعدات طلباً" : "أفضل المنتجات طلباً")}
            </h3>
          </div>

          {pieData.length > 0 ? (
            <div
              className="flex-1 h-64 relative flex justify-center items-center"
              dir="ltr"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex-1 h-64 flex justify-center items-center text-gray-400 text-sm">
              {isEnglish ? "No data available" : "لا توجد بيانات متاحة"}
            </div>
          )}
        </div>

        {/* Chart 3: Common Products (Grouped Bar) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3
            className={`text-sm font-bold text-gray-900 mb-6 ${isEnglish ? "text-left" : "text-right"}`}
          >
            {isEnglish ? (isRental ? "Popular Equipment Report" : "Popular Products Report") : (isRental ? "تقرير المعدات الشائعة" : "تقرير المنتجات الشائعة")}
          </h3>
          {productsReportData.length > 0 ? (
            <>
              <div
                className={`flex ${isEnglish ? "flex-row" : "flex-row"} ${isEnglish ? "justify-start" : "justify-end"} gap-4 mb-4 text-xs`}
              >
                <div
                  className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-center gap-1 text-gray-500`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#EB682C]"></span>
                  {isEnglish ? "Current Month" : "الشهر الحالي"}
                </div>
                <div
                  className={`flex ${isEnglish ? "flex-row" : "flex-row"} items-center gap-1 text-gray-500`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#5C6BC0]"></span>
                  {isEnglish ? "Last Month" : "الشهر الماضي"}
                </div>
              </div>
              <div className="h-56" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productsReportData} barGap={4}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#eee"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#888" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#888" }}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Bar
                      dataKey="last"
                      name={isEnglish ? "Last Month" : "الشهر الماضي"}
                      fill="#5C6BC0"
                      radius={[4, 4, 0, 0]}
                      barSize={12}
                    />
                    <Bar
                      dataKey="current"
                      name={isEnglish ? "Current Month" : "الشهر الحالي"}
                      fill="#EB682C"
                      radius={[4, 4, 0, 0]}
                      barSize={12}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="h-56 flex justify-center items-center text-gray-400 text-sm">
              {isEnglish ? "No data available" : "لا توجد بيانات متاحة"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
