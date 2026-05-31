"use client";
import Link from "next/link";
import { FileText, FileCheck, Mountain, Handshake, Megaphone, Users, ChevronLeft } from "lucide-react";

export default function ControlPanelPage() {
  const cards = [
    {
      title: "طلبات عرض الاسعار المرسلة",
      desc: "طلبات التسعير المرسلة الخاصة بشركتك مع رسوم احصائية توضيحية",
      count: "0 طلبات التسعير",
      icon: FileText,
      link: "/dashboard/pricing",
      linkText: "تسيير",
    },
    {
      title: "طلبات التسعير المستلمة",
      desc: "طلبات التسعير المستقبلة الخاصة بشركتك مع رسوم احصائية توضيحية",
      count: "0 طلبات التسعير",
      icon: FileCheck,
      link: "/dashboard/pricing",
      linkText: "تسيير",
    },
    {
      title: "المنتجات",
      desc: "عرض وتعديل المنتجات التي تقدمها شركتك",
      count: "5 منتجات",
      icon: Mountain,
      link: "/dashboard/products",
      linkText: "تسيير",
    },
    {
      title: "الخدمات",
      desc: "لوائح المقارنة تساعد الاعضاء المسؤولين عن مراجعة طلبات التسعير على اتخاذ قرارات مدروسة",
      count: "لائحة",
      icon: Handshake,
      link: "/dashboard/services",
      linkText: "تسيير",
    },
    {
      title: "الاعلانات",
      desc: "تتبع اعلانات شركتك ، وقم بمراجعتها وتحريرها",
      count: "2 اعلان",
      icon: Megaphone,
      link: "/dashboard/ads", // Mock link
      linkText: "تسيير",
      actionButton: "اشترك الان",
    },
    {
      title: "الاعضاء",
      desc: "قم بأدراة الاعضاء ، تعديل صلاحيتهم ، اضف و احذف الاعضاء",
      count: "5 عضو",
      icon: Users,
      link: "/dashboard/team",
      linkText: "تسيير",
      actionButton: "اشترك الان",
    },
  ];

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header section */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">لوحة التحكم</h1>
      </div>

      {/* Upgrade Banner */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
        <div className="text-right flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-1">لاتوجد اشتراكات</h2>
          <p className="text-sm text-gray-500">ارتق بحسابك للوصول الي مستوى أعلى مع الميزات</p>
        </div>
        <button className="bg-[#EB682C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap">
          ترقية الاشتراك
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-[280px]">
            
            <div className="flex justify-between items-start mb-4">
              {/* Optional Action Button (e.g. Subscribe) */}
              <div>
                {card.actionButton ? (
                  <button className="bg-[#EB682C] text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-[#d65a22] transition-colors">
                    {card.actionButton}
                  </button>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Icon */}
              <div className="text-[#2A5CBA]">
                <card.icon className="w-8 h-8" />
              </div>
            </div>

            <div className="text-right flex-1 mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {card.desc}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
              <Link href={card.link}>
                <button className="flex items-center gap-1 text-[#EB682C] font-bold text-sm hover:text-[#d65a22] transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                  {card.linkText}
                </button>
              </Link>
              <span className="text-gray-400 text-sm font-medium">{card.count}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
