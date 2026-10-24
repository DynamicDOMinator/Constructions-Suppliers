"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useLanguage } from "@/context/LanguageContext";

const DEFAULT_ADS = [
  {
    id: 2,
    uuid: "01a06396-bf59-721a-a13f-2179d6f12a19",
    name: "bannar",
    image: "https://eng.prosental.online/storage/ads/JMASIJ7VxC9mmsljCv7INtKqm80hJMfdxr8TLMkH.jpg",
    image_url: "https://eng.prosental.online/storage/ads/JMASIJ7VxC9mmsljCv7INtKqm80hJMfdxr8TLMkH.jpg",
    status: "approved",
  },
  {
    id: 1,
    uuid: "01a06394-2218-7136-8397-c0629894f489",
    name: "bannar",
    image: "https://eng.prosental.online/storage/ads/AbOg9qYwX1vzYEbKwW0FasHWCsIiip6qGiHP2X8b.jpg",
    image_url: "https://eng.prosental.online/storage/ads/AbOg9qYwX1vzYEbKwW0FasHWCsIiip6qGiHP2X8b.jpg",
    status: "approved",
  },
];

export default function ConsultantBanner() {
  const [ads, setAds] = useState(DEFAULT_ADS);
  const { isEnglish } = useLanguage();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await api.get("/auth/ads");
        const list = Array.isArray(res.data?.data)
          ? res.data.data
          : (Array.isArray(res.data) ? res.data : []);
        // Show approved ads with images
        const approved = list.filter(
          (ad) =>
            (ad.status === "approved" || !ad.status) &&
            (ad.image_url || ad.image)
        );
        if (approved.length > 0) {
          setAds(approved);
        }
      } catch (err) {
        console.error("Failed to load banner ads:", err);
      }
    };

    fetchAds();
  }, []);

  const displayAds = ads.length > 0 ? ads : DEFAULT_ADS;

  return (
    <section className="py-10 px-6 md:px-12 bg-[#F9FAFC]" data-aos="fade-up" dir={isEnglish ? "ltr" : "rtl"}>
      <div
        data-aos="zoom-in"
        data-aos-delay="100"
        className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl relative bg-black"
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={displayAds.length > 1}
          autoplay={displayAds.length > 1 ? { delay: 3500, disableOnInteraction: false } : false}
          pagination={displayAds.length > 1 ? { clickable: true } : false}
          className="ads-swiper"
        >
          {displayAds.map((ad, idx) => {
            const imgUrl = ad.image_url || ad.image;
            return (
              <SwiperSlide key={ad.uuid || ad.id || idx}>
                <img
                  src={imgUrl}
                  alt={ad.name || "Ad Banner"}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
