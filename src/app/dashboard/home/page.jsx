"use client";
import { TrendingUp, TrendingDown, Package, FileText, XCircle, Tag, CheckCircle2 } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function DashboardHome() {
  // Mock Data for Charts
  const servicesData = [
    { name: 'يناير', v1: 20, v2: 30, v3: 15, v4: 10 },
    { name: 'فبراير', v1: 25, v2: 35, v3: 20, v4: 15 },
    { name: 'مارس', v1: 30, v2: 40, v3: 25, v4: 20 },
    { name: 'أبريل', v1: 15, v2: 20, v3: 35, v4: 25 },
    { name: 'مايو', v1: 20, v2: 15, v3: 30, v4: 15 },
    { name: 'يونيو', v1: 25, v2: 25, v3: 15, v4: 10 },
  ];

  const pieData = [
    { name: 'مواسير مياه', value: 20, color: '#FF8A65' },
    { name: 'مواسير صرف', value: 10, color: '#90CAF9' },
    { name: 'أحواض الحمام', value: 30, color: '#5C6BC0' },
    { name: 'خلاطات المطابخ', value: 40, color: '#81C784' },
    { name: 'أحواض المطابخ', value: 40, color: '#CE93D8' }, // Wait, total > 100 in screenshot but it's just mock data
  ];

  const productsReportData = [
    { name: 'مواسير المياه', current: 60, last: 40 },
    { name: 'مواسير الصرف', current: 80, last: 70 },
    { name: 'أحواض الحمام', current: 40, last: 60 },
    { name: 'أحواض المطابخ', current: 30, last: 40 },
    { name: 'خلاطات المطبخ', current: 50, last: 80 },
  ];

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">الصفحة الرئيسية</h1>
          <p className="text-sm text-gray-500">اطلع على جميع تحليلات الشؤون المالية وقارنها بالشهر الماضي</p>
        </div>
      </div>

      {/* Upgrade Banner */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex justify-between items-center shadow-sm">
        <div className="text-right flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-1">لا توجد اشتراكات</h2>
          <p className="text-sm text-gray-500">ارتق بحسابك للوصول الى مستوى أعلى مع الميزات</p>
        </div>
        <button className="bg-[#EB682C] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap">
          ترقية الاشتراك
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1 */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-sm font-bold text-gray-700">طلبات التسعير المقبولة</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" />
              <span>+34%</span>
            </div>
            <div className="text-right">
              <h3 className="text-3xl font-bold text-gray-900">5000 طلب</h3>
              <p className="text-xs text-gray-500 mt-1">+ 200 طلب تسعير عن الشهر الماضي</p>
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <XCircle className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-sm font-bold text-gray-700">طلبات التسعير المرفوضة</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1 text-red-500 text-sm font-bold bg-red-50 px-2 py-1 rounded-md">
              <TrendingDown className="w-3 h-3" />
              <span>-10%</span>
            </div>
            <div className="text-right">
              <h3 className="text-3xl font-bold text-gray-900">2000 طلب</h3>
              <p className="text-xs text-gray-500 mt-1">- 200 طلب تسعير عن الشهر الماضي</p>
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Package className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-sm font-bold text-gray-700">حركة المنتجات</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" />
              <span>+34%</span>
            </div>
            <div className="text-right">
              <h3 className="text-3xl font-bold text-gray-900">2900 منتج</h3>
              <p className="text-xs text-gray-500 mt-1">+ 200 منتج عن الشهر الماضي</p>
            </div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-orange-50/30 border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Tag className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-sm font-bold text-gray-700">حركة الخدمات</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1 text-red-500 text-sm font-bold bg-red-50 px-2 py-1 rounded-md">
              <TrendingDown className="w-3 h-3" />
              <span>-10%</span>
            </div>
            <div className="text-right">
              <h3 className="text-3xl font-bold text-gray-900">2500 خدمة</h3>
              <p className="text-xs text-gray-500 mt-1">- 100 خدمة عن الشهر الماضي</p>
            </div>
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Chart 1: Services (Stacked Bar) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-6 text-right">حركة الطلب على الخدمات آخر 6 أشهر</h3>
          <div className="h-64" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={servicesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="v1" stackId="a" fill="#1e1b4b" radius={[0, 0, 4, 4]} />
                <Bar dataKey="v2" stackId="a" fill="#3b82f6" />
                <Bar dataKey="v3" stackId="a" fill="#93c5fd" />
                <Bar dataKey="v4" stackId="a" fill="#dbeafe" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Products Donut */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2 text-xs">
              <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md font-bold">الشهر الماضي</button>
              <button className="bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-md font-bold">الشهر الحالي</button>
            </div>
            <h3 className="text-sm font-bold text-gray-900">أفضل المنتجات طلباً</h3>
          </div>
          
          <div className="flex-1 h-64 relative flex justify-center items-center" dir="ltr">
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
        </div>

        {/* Chart 3: Common Products (Grouped Bar) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-6 text-right">تقرير المنتجات الشائعة</h3>
          <div className="flex justify-end gap-4 mb-4 text-xs">
            <div className="flex items-center gap-1 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#EB682C]"></span>
              الشهر الحالي
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#5C6BC0]"></span>
              الشهر الماضي
            </div>
          </div>
          <div className="h-56" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productsReportData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888'}} tickFormatter={(v) => `${v}%`} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="last" fill="#5C6BC0" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="current" fill="#EB682C" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
