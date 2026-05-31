import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2653A6] text-white py-12 px-6 md:px-12 mt-auto">
      <p className="text-center pb-4 ">معاً نصنع مستقبل البناء</p>
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">ابن مشاريعك بثقة وجودة أعلى</h2>
        <p  className="text-blue-100 text-center text-sm max-w-2xl mb-8 leading-relaxed">
        Constructions Suppliers هي منصتك المتكاملة التي تربط الموردين بالمصانع والمهندسين والمشترين، لتسهّل الوصول إلى المواد والخدمات وتدعم نجاح مشاريع البناء والتشييد
        </p>
        
        <button className="bg-[#EB682C] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#d65a22] transition-colors mb-12">
          تواصل معنا
        </button>
        <p className="text-sm pb-10">
          © 2026 Constructions Suppliers
        </p>
        
        {/* Bottom Bar */}
        <div className="w-full pt-8 flex flex-col md:flex-row items-center justify-between gap-6" dir="ltr">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={60} height={60} className="brightness-0 invert object-contain" />
            <div className="text-white font-bold text-sm leading-tight text-left">
              <div>CONSTRUCTIONS</div>
              <div>SUPPLIERS</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-white">
            <Link href="#" className="hover:text-blue-200 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">Conditions</Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">Terms</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
