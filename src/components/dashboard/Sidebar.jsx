"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  Star 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "الصفحة الرئيسية", icon: Home, href: "/dashboard/home" },
    { name: "لوحة التحكم", icon: LayoutDashboard, href: "/dashboard" },
    { name: "طلبات التسعير", icon: Folder, href: "/dashboard/pricing" },
    { name: "طلبات المقايسة", icon: FileText, href: "/dashboard/quotas" },
    { name: "إدارة الفريق", icon: Users, href: "/dashboard/team" },
    { name: "المنتجات", icon: Package, href: "/dashboard/products" },
    { name: "الخدمات", icon: Wrench, href: "/dashboard/services" },
    { name: "الاعلانات", icon: Megaphone, href: "/dashboard/ads" },
    { name: "تواصل معنا", icon: HeadphonesIcon, href: "/dashboard/contact" },
    { name: "الخطط", icon: Star, href: "/dashboard/plans" },
  ];

  return (
    <aside className="w-64 bg-white border-l border-gray-100 h-screen sticky top-0 flex flex-col font-tajawal shadow-sm">
      <div className="p-6 mb-4 flex items-center justify-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="text-[#004b87] font-bold text-sm text-right leading-tight">
              <div>CONSTRUCTIONS</div>
              <div className="text-[#EB682C] text-center">SUPPLIERS</div>
            </div>
            <Image src="/logo.png" alt="Constructions Suppliers" width={40} height={40} className="w-10 object-contain" />
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-1 scrollbar-hide">
        {navItems.map((item) => {
          // Strict equality for the root /dashboard, startsWith for others
          const isActive = item.href === "/dashboard" 
            ? pathname === "/dashboard" 
            : pathname.startsWith(item.href);
            
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                isActive 
                  ? "text-[#EB682C] font-bold border-r-4 border-[#EB682C] bg-orange-50/50" 
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
