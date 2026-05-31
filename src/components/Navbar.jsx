"use client";
import { useState } from "react";
import Link from "next/link";
import { Globe, User, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "مقايستي", href: "/quotes" },
    { name: "المنتجات", href: "/products" },
    { name: "الموردون", href: "/suppliers" },
    { name: "الخطط", href: "/plans" },
    { name: "المدونات", href: "/blogs" },
    { name: "معلومات عنا", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
  ];
  return (
    <nav className="w-full bg-white py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      {/* Actions (Left side in RTL) */}
      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-1 text-gray-600 hover:text-[#EB682C]">
          <span className="text-sm font-bold">Ar</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm">En</span>
          <Globe className="w-5 h-5 mr-1" />
        </button>
        <Link href="/register" className="hidden sm:inline-block bg-[#EB682C] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#d65a22] transition-colors">
          حساب جديد
        </Link>
        <Link href="/login" className="inline-block bg-[#2A5CBA] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#20499b] transition-colors">
          تسجيل الدخول
        </Link>
      </div>

      {/* Nav Links (Center) */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`transition-colors ${isActive ? "text-[#010101] font-bold" : "text-[#666666] hover:text-[#010101]"}`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Logo (Right side in RTL) and Mobile Toggle */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="text-[#004b87] font-bold text-lg md:text-xl text-right leading-tight hidden sm:block">
              <div>CONSTRUCTIONS</div>
              <div className="text-[#EB682C] text-center">SUPPLIERS</div>
            </div>
            {/* Simple logo shape */}
            <Image src="/logo.png" alt="logo" width={80} height={80} className="w-12 md:w-20" />
          </div>
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg lg:hidden flex flex-col p-4 z-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`py-3 px-4 border-b border-gray-50 text-right transition-colors ${isActive ? "text-[#010101] font-bold bg-gray-50" : "text-[#666666]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-2 mt-4 md:hidden">
            <Link href="/register" className="w-full text-center bg-[#EB682C] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#d65a22] transition-colors block" onClick={() => setIsMenuOpen(false)}>
              حساب جديد
            </Link>
            <Link href="/login" className="w-full text-center bg-[#2A5CBA] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#20499b] transition-colors block" onClick={() => setIsMenuOpen(false)}>
              تسجيل الدخول
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
