"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, FileCheck, Mountain, Handshake, Megaphone, Users, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";

export default function ControlPanelPage() {
  const { isEnglish } = useLanguage();
  const { user } = useAuth();
  const isRental = user?.type === "rental";
  const [counts, setCounts] = useState({
    products: 0,
    received_quotes: 0,
    sent_quotes: 0,
    members: 0,
    ads: 0,
    services: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await api.get('/auth/company/dashboard/counts');
        if (response.data) {
          setCounts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard counts:", error);
      }
    };
    fetchCounts();
  }, []);

  const cards = isEnglish ? [
    {
      title: "Sent Price Quote Requests",
      desc: "Price requests sent by your company with illustrative statistical charts",
      count: `${counts.sent_quotes} Pricing Requests`,
      icon: FileText,
      link: "/dashboard/pricing",
      linkText: "Manage",
    },
    {
      title: "Received Pricing Requests",
      desc: "Pricing requests received by your company with illustrative statistical charts",
      count: `${counts.received_quotes} Pricing Requests`,
      icon: FileCheck,
      link: "/dashboard/pricing",
      linkText: "Manage",
    },
    {
      title: isRental ? "Equipment" : "Products",
      desc: isRental ? "View and edit the equipment your company offers" : "View and edit the products your company offers",
      count: `${counts.products} ${isRental ? "Equipment" : "Products"}`,
      icon: Mountain,
      link: "/dashboard/products",
      linkText: "Manage",
    },
    {
      title: "Services",
      desc: "Comparison lists that help members responsible for reviewing pricing requests make informed decisions",
      count: `${counts.services} Services`,
      icon: Handshake,
      link: "/dashboard/services",
      linkText: "Manage",
    },
    {
      title: "Advertisements",
      desc: "Track your company's ads, review and edit them",
      count: `${counts.ads} Ads`,
      icon: Megaphone,
      link: "/dashboard/ads",
      linkText: "Manage",
      actionButton: "Subscribe Now",
    },
    {
      title: "Members",
      desc: "Manage members, edit their permissions, add and remove members",
      count: `${counts.members} Members`,
      icon: Users,
      link: "/dashboard/team",
      linkText: "Manage",
      actionButton: "Subscribe Now",
    },
  ] : [
    {
      title: "طلبات عرض الاسعار المرسلة",
      desc: "طلبات التسعير المرسلة الخاصة بشركتك مع رسوم احصائية توضيحية",
      count: `${counts.sent_quotes} طلبات التسعير`,
      icon: FileText,
      link: "/dashboard/pricing",
      linkText: "تسيير",
    },
    {
      title: "طلبات التسعير المستلمة",
      desc: "طلبات التسعير المستقبلة الخاصة بشركتك مع رسوم احصائية توضيحية",
      count: `${counts.received_quotes} طلبات التسعير`,
      icon: FileCheck,
      link: "/dashboard/pricing",
      linkText: "تسيير",
    },
    {
      title: isRental ? "المعدات" : "المنتجات",
      desc: isRental ? "عرض وتعديل المعدات التي تقدمها شركتك" : "عرض وتعديل المنتجات التي تقدمها شركتك",
      count: `${counts.products} ${isRental ? "معدات" : "منتجات"}`,
      icon: Mountain,
      link: "/dashboard/products",
      linkText: "تسيير",
    },
    {
      title: "الخدمات",
      desc: "لوائح المقارنة تساعد الاعضاء المسؤولين عن مراجعة طلبات التسعير على اتخاذ قرارات مدروسة",
      count: `${counts.services} خدمات`,
      icon: Handshake,
      link: "/dashboard/services",
      linkText: "تسيير",
    },
    {
      title: "الاعلانات",
      desc: "تتبع اعلانات شركتك ، وقم بمراجعتها وتحريرها",
      count: `${counts.ads} اعلان`,
      icon: Megaphone,
      link: "/dashboard/ads", // Mock link
      linkText: "تسيير",
      actionButton: "اشترك الان",
    },
    {
      title: "الاعضاء",
      desc: "قم بأدراة الاعضاء ، تعديل صلاحيتهم ، اضف و احذف الاعضاء",
      count: `${counts.members} عضو`,
      icon: Users,
      link: "/dashboard/team",
      linkText: "تسيير",
      actionButton: "اشترك الان",
    },
  ];

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4" dir={isEnglish ? 'ltr' : 'rtl'}>
      
      {/* Header section */}
      <div className={isEnglish ? 'text-left' : 'text-right'}>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEnglish ? 'Control Panel' : 'لوحة التحكم'}</h1>
      </div>

      {/* Upgrade Banner */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
        <div className={`${isEnglish ? 'text-left' : 'text-right'} flex-1`}>
          <h2 className="text-lg font-bold text-gray-900 mb-1">{isEnglish ? 'No subscriptions' : 'لاتوجد اشتراكات'}</h2>
          <p className="text-sm text-gray-500">{isEnglish ? 'Upgrade your account to access a higher level with features' : 'ارتق بحسابك للوصول الي مستوى أعلى مع الميزات'}</p>
        </div>
        <button className="bg-[#EB682C] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap">
          {isEnglish ? 'Upgrade Plan' : 'ترقية الاشتراك'}
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

            <div className={`${isEnglish ? 'text-left' : 'text-right'} flex-1 mb-4`}>
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
