import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex font-tajawal bg-white" dir="rtl">
      
      {/* Right Side: Form Content (in RTL, Right is the primary reading side, but in the screenshot the form is on the right visually and image on the left. Wait, in RTL, right is usually the form. Yes, screenshot has image on left, form on right) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative px-6 md:px-12 py-10 min-h-screen">
        
        {/* Logo at Top Right */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="text-[#004b87] font-bold text-lg md:text-xl text-right leading-tight hidden sm:block">
                <div>CONSTRUCTIONS</div>
                <div className="text-[#EB682C] text-center">SUPPLIERS</div>
              </div>
              <Image src="/logo.png" alt="Constructions Suppliers" width={80} height={80} className="w-12 md:w-16 object-contain" />
            </div>
          </Link>
        </div>

        {/* The dynamic form content */}
        <div className="w-full max-w-[450px] mt-12 lg:mt-0">
          {children}
        </div>
      </div>

      {/* Left Side: Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 relative bg-slate-900 overflow-hidden">
        {/* We use a placeholder image resembling an engineer with a hard hat */}
        <img 
          src="/bg.png" 
          alt="Auth Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        {/* Dark overlay with slight orange/warm tint like in screenshot */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-[#EB682C]/20 mix-blend-multiply"></div>
      </div>

    </div>
  );
}
