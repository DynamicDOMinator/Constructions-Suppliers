"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { 
  Home, 
  LayoutDashboard, 
  Folder, 
  FileText, 
  Users, 
  Package, 
  Wrench, 
  Megaphone, 
  HeadphonesIcon,
  Star,
  X
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const { isEnglish } = useLanguage();
  const { user } = useAuth();

  const navItems = [
    { name: isEnglish ? "Home" : "الصفحة الرئيسية", icon: Home, href: "/dashboard/home", always: true },
    { name: isEnglish ? "Dashboard" : "لوحة التحكم", icon: LayoutDashboard, href: "/dashboard", perm: "dashboard" },
    { name: isEnglish ? "Pricing Requests" : "طلبات التسعير", icon: Folder, href: "/dashboard/pricing", perm: "quote_requests" },
    { name: isEnglish ? "BOQ Requests" : "طلبات المقايسة", icon: FileText, href: "/dashboard/quotas", perm: "boq_requests" },
    { name: isEnglish ? "Team Management" : "إدارة الفريق", icon: Users, href: "/dashboard/team", perm: "team" },
    { name: isEnglish ? (user?.type === "rental" ? "Equipment" : "Products") : (user?.type === "rental" ? "المعدات" : "المنتجات"), icon: Package, href: "/dashboard/products", perm: "products" },
    { name: isEnglish ? "Services" : "الخدمات", icon: Wrench, href: "/dashboard/services", perm: "services" },
    { name: isEnglish ? "Ads" : "الاعلانات", icon: Megaphone, href: "/dashboard/ads", perm: "ads" },
    { name: isEnglish ? "Contact Us" : "تواصل معنا", icon: HeadphonesIcon, href: "/dashboard/contact", always: true },
    { name: isEnglish ? "Plans" : "الخطط", icon: Star, href: "/dashboard/plans", perm: "subscriptions" },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.always) return true;
    if (item.perm) {
      // If user has a permissions object, check the specific permission
      if (user?.permissions) {
        return user.permissions[item.perm] === true;
      }
      // If no permissions object, assume it's the account owner and grant access
      return true;
    }
    return true;
  });

  return (
    <aside className={`w-64 bg-white border-${isEnglish ? 'r' : 'l'} border-gray-100 h-screen fixed lg:sticky top-0 ${isEnglish ? 'left-0' : 'right-0'} flex flex-col font-tajawal shadow-sm z-40 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : (isEnglish ? '-translate-x-full lg:translate-x-0' : 'translate-x-full lg:translate-x-0')}`}>
      <div className="p-6 mb-4 flex items-center justify-between lg:justify-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className={`text-[#004b87] font-bold text-sm ${isEnglish ? 'text-left' : 'text-right'} leading-tight`}>
              <div>CONSTRUCTIONS</div>
              <div className="text-[#EB682C] text-center">SUPPLIERS</div>
            </div>
            <Image src="/logo.png" alt="Constructions Suppliers" width={40} height={40} className="w-10 object-contain" />
          </div>
        </Link>
        <button 
          className="lg:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-1 scrollbar-hide">
        {filteredNavItems.map((item) => {
          const isActive = item.href === "/dashboard" 
            ? pathname === "/dashboard" 
            : pathname.startsWith(item.href);
            
          return (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={() => setIsOpen && setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                isActive 
                  ? `text-[#EB682C] font-bold ${isEnglish ? 'border-l-4' : 'border-r-4'} border-[#EB682C] bg-orange-50/50` 
                  : "text-gray-500 font-medium hover:text-[#EB682C] hover:bg-gray-50"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#EB682C]" : "text-gray-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
