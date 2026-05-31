import { Search, User, Star, Award } from "lucide-react";
import Image from "next/image";
import { HiOutlineArrowSmallUp } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section
      style={{
        backgroundImage: "url('/bg-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full pt-10 pb-20 px-6 md:px-12 flex flex-col items-center"
      data-aos="fade-up"
    >
      {/* Search Bar */}
      <div className="w-full max-w-3xl  mx-auto mb-12 relative z-10">
        <div className="bg-white rounded-full p-2 flex items-center shadow-lg border border-gray-100">
          <div className="pr-4 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="ابحث هنا..."
            className="w-full px-4 py-2 bg-transparent focus:outline-none text-sm text-gray-700"
          />
        </div>
      </div>
      <div className="relative">
        <div className="absolute -left-35 -top-2 bg-white/50 backdrop-blur-2xl p-2 rounded-3xl hidden lg:block">
          <p className="font-medium"> أكثر من 2.4 ألف تقييم </p>
        </div>

        <div className="absolute -right-30 top-12 bg-white/50 backdrop-blur-2xl p-2 rounded-3xl hidden lg:block">
          <p className="font-medium"> أكثر من 1000 مستخدم </p>
        </div>

        <div className="absolute top-35 left-1/3 -translate-x-1/2 bg-white/50 backdrop-blur-2xl p-2 rounded-3xl hidden lg:block">
          <p className="font-medium"> أكثر من 1500 مورد </p>
        </div>

        <h1 className="text-4xl font-tajawal md:text-5xl lg:text-6xl font-extrabold text-[#010101] mb-4 text-center leading-tight">
          المنصة الرقمية <span className="text-[#2A5CBA]">الأولى</span> لربط
          <br />
          قطاع <span className="text-[#EB682C]">المقاولات</span>
        </h1>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-[1296px] h-auto min-h-[300px] md:h-[550px] relative flex flex-col items-center justify-center">
        {/* Fallback image placeholder */}

        <Image
          className="w-full"
          src="/Home-page-Hero.png"
          alt="Construction Hero"
          width={1000}
          height={1000}
        />

        {/* Badges on Hero (Desktop Only) */}
        <div className="hidden md:flex items-center gap-3 absolute bottom-6 right-10">
          <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm w-[120px] h-[120px] rounded-full">
            <p className="text-white">4.8</p>

            <div className="flex items-center justify-center">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-gray-400" />
            </div>
            <p className="text-white text-sm text-center">
              متوسط <br />
              التقييمات
            </p>
          </div>

          <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm w-[120px] h-[120px] rounded-full">
            <HiOutlineArrowSmallUp className="text-5xl text-white -rotate-30" />
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-1 left-6 z-20 px-6 py-3 items-center gap-3">
          <div className="flex items-center gap-3 justify-center">
            <p className="font-bold">استكشف الآن</p>

            <p className="bg-[#EB682C] p-3 rounded-full text-white">
              أرسل طلب عرض أسعار
            </p>

            <p className="bg-[#EB682C] p-3 rounded-full text-white">
              <HiOutlineArrowSmallUp className="text-2xl text-white -rotate-30" />
            </p>
          </div>
        </div>

        {/* Mobile Badges (Mobile Only) */}
        <div className="flex md:hidden absolute -bottom-10 left-0 right-0 justify-center items-center z-30 pointer-events-none">
          <div className="flex items-center justify-center translate-x-4">
            {/* Text */}
            <div className="text-black font-bold text-sm leading-tight text-right ml-2 z-10 drop-shadow-md bg-white/30 backdrop-blur-sm rounded-lg p-1">
              استكشف<br/>الآن
            </div>
            
            {/* Dark Circle */}
            <div className="w-[100px] h-[100px] rounded-full bg-black/50 backdrop-blur-md flex flex-col items-center justify-center -ml-4 z-20 shadow-lg border border-white/10 pointer-events-auto">
              <p className="text-white text-sm font-bold">4.8</p>
              <div className="flex items-center justify-center text-[10px] my-1">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-gray-400" />
              </div>
              <p className="text-white text-[10px] text-center leading-tight">
                متوسط<br/>التقييمات
              </p>
            </div>

            {/* Large Orange Circle */}
            <div className="w-[100px] h-[100px] rounded-full bg-[#EB682C] flex flex-col items-center justify-center -ml-6 z-30 shadow-xl border-2 border-white/20 text-center leading-tight pointer-events-auto cursor-pointer hover:bg-[#d65a22] transition-colors">
              <p className="text-white text-xs font-bold px-2">أرسل طلب<br/>عرض أسعار</p>
            </div>

            {/* Small Orange Circle */}
            <div className="w-[50px] h-[50px] rounded-full bg-[#EB682C] flex items-center justify-center -ml-4 z-40 shadow-xl border-2 border-white/20 pointer-events-auto cursor-pointer hover:bg-[#d65a22] transition-colors">
              <HiOutlineArrowSmallUp className="text-2xl text-white rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
