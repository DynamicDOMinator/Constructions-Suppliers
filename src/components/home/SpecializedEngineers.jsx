"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function SpecializedEngineers() {
  const [engineers, setEngineers] = useState([]);

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
          مهندسون <span className="text-black">متخصصون</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto" dir="rtl">
        <style jsx global>{`
          .swiper-pagination-bullet-active {
            background-color: #EB682C !important;
          }
          .engineers-swiper {
            padding-bottom: 50px !important;
          }
          .engineers-swiper .swiper-pagination {
            bottom: 0px !important;
          }
        `}</style>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          centerInsufficientSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="px-4 engineers-swiper"
        >
          {engineers.map((person, i) => (
            <SwiperSlide key={person.uuid || i} className="!h-auto">
              <div className="flex flex-col items-center group cursor-pointer h-full justify-between">
                <Link href={`/engineer/${person.uuid}`} className="flex flex-col items-center flex-grow">
                  <div className="w-[224px] h-[224px] mb-4 relative bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {person.avatar ? (
                      <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl text-gray-500 font-bold uppercase">{person.name?.[0] || 'U'}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-black text-lg mb-1">{person.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{person.specialization || "مهندس متخصص"}</p>
                  <p className="text-xs text-gray-500 mb-3 text-center max-w-[160px]">{person.bio || "خبرة في الاشراف علي اعمال التشطيبات والديكور"}</p>
                </Link>
                <div className="mt-auto w-[224px]">
                  <Link href={`/chat?user=${person.uuid}`} className="w-full block">
                    <button className="bg-[#EB682C] text-center text-white text-xs px-6 py-2 rounded-full w-full font-bold shadow-sm">
                      ابدء المحادثة
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
            عرض كل المهندسين
          </button>
        </Link>
      </div>
    </section>
  );
}
