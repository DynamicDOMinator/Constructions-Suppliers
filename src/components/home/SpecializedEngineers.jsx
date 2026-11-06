"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useLanguage } from "@/context/LanguageContext";

export default function SpecializedEngineers() {
  const [engineers, setEngineers] = useState([]);
  const { isEnglish } = useLanguage();

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await api.get("/auth/engineers");
        if (res.data && Array.isArray(res.data.data)) {
          setEngineers(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchEngineers();
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 bg-[#F9FAFC]" data-aos="fade-up">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#EB682C]">
          {isEnglish ? <>Specialized <span className="text-black">Engineers</span></> : <>مهندسون <span className="text-black">متخصصون</span></>}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto" dir={isEnglish ? "ltr" : "rtl"} data-aos="zoom-in" data-aos-delay="150">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          centerInsufficientSlides={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="px-4 engineers-swiper"
        >
          {engineers.map((person, i) => (
            <SwiperSlide key={person.uuid || i} className="!h-auto">
              <div className="flex flex-col items-center group cursor-pointer h-full justify-between">
                <Link href={`/engineer/${person.uuid}`} className="flex flex-col items-center flex-grow">
                  <div className="w-[200px] h-[200px] mb-4 relative bg-gray-100 rounded-full flex items-center justify-center overflow-hidden ring-4 ring-orange-200/50 group-hover:ring-[#EB682C] group-hover:scale-105 transition-all duration-300 shadow-md">
                    {person.avatar ? (
                      <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl text-gray-700 font-extrabold uppercase">{person.name?.[0] || 'U'}</span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-gray-950 text-lg mb-1 group-hover:text-[#EB682C] transition-colors">{person.name}</h3>
                  <p className="text-xs font-extrabold text-[#EB682C] bg-orange-50 px-3.5 py-1 rounded-full mb-2">{person.specialization || (isEnglish ? "Specialized Engineer" : "مهندس متخصص")}</p>
                  <p className="text-xs text-gray-800 font-bold mb-3 text-center max-w-[190px] line-clamp-2 leading-relaxed">{person.bio || (isEnglish ? "Expert in supervision of finishing and decoration works" : "خبرة في الاشراف علي اعمال التشطيبات والديكور")}</p>
                </Link>
                <div className="mt-auto w-[200px]">
                  <Link href={`/chat?user=${person.uuid}`} className="w-full block">
                    <button className="bg-[#EB682C] text-center text-white text-xs px-6 py-2.5 rounded-full w-full font-bold shadow-md shadow-orange-500/20 hover:bg-[#d65a22] hover:scale-105 active:scale-95 transition-all">
                      {isEnglish ? "Start Chat" : "ابدء المحادثة"}
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="200">
        <Link href="/engineers">
          <button className="px-8 py-3 bg-white border border-[#EB682C] text-[#EB682C] rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-sm inline-flex items-center gap-2">
            {isEnglish ? "View All Engineers" : "عرض كل المهندسين"}
          </button>
        </Link>
      </div>
    </section>
  );
}
