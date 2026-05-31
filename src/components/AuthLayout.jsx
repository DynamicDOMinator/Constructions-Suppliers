import Image from "next/image";
import Link from "next/link";
import { Hammer } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col relative order-2 md:order-1">
          {/* Logo */}
          <div className="flex justify-end w-full mb-8">
            <div className="flex items-center gap-2">
              <div className="text-[#004b87] font-bold text-sm text-right leading-tight">
                <div>CONSTRUCTIONS</div>
                <div className="text-[#EB682C]">SUPPLIERS</div>
              </div>
              <div className="w-10 h-10 bg-[#e6f0fa] rounded-full flex items-center justify-center border-2 border-[#004b87] overflow-hidden relative">
                <Hammer className="text-[#EB682C] w-5 h-5 absolute z-10" />
                <div className="absolute -bottom-2 -left-2 text-[#004b87] opacity-20">
                  <Hammer className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-grow flex flex-col justify-center">
            {children}
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-amber-100 to-orange-200 hidden md:block order-1 md:order-2">
          <Image
            src="/bg.png"
            alt="Construction Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
