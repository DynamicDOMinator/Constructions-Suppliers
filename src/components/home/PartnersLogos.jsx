"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";

const DEFAULT_PARTNERS = [
  {
    id: 1,
    uuid: "01a063ce-3d28-73d4-b465-35899f07028b",
    name: "الرابط الجديد New Link",
    image_url: "https://eng.prosental.online/storage/partners/new_link.png",
    url: "https://newlink.com",
  },
  {
    id: 2,
    uuid: "01a063ce-3d31-7242-894e-3aa98063987a",
    name: "شركة الرابط الجديد للمقاولات 2",
    image_url: "https://eng.prosental.online/storage/partners/partner_1.png",
    url: "https://newlink.com",
  },
  {
    id: 3,
    uuid: "01a063ce-3d33-72c7-b5fe-34ce25915a91",
    name: "مجموعة الرابط الجديد الهندسية 3",
    image_url: "https://eng.prosental.online/storage/partners/partner_2.png",
    url: "https://newlink.com",
  },
  {
    id: 4,
    uuid: "01a063ce-3d35-70ab-9b7f-d1548ecb6f42",
    name: "شريك الرابط الجديد للإنشاءات 4",
    image_url: "https://eng.prosental.online/storage/partners/partner_3.png",
    url: "https://newlink.com",
  },
  {
    id: 5,
    uuid: "01a063ce-3d37-72fe-92ca-e51f036e15dc",
    name: "شركة الرابط الجديد للتطوير 5",
    image_url: "https://eng.prosental.online/storage/partners/partner_4.png",
    url: "https://newlink.com",
  },
  {
    id: 6,
    uuid: "01a063ce-3d3a-70d9-a30b-4802ae980e4f",
    name: "الرابط الجديد للاستشارات 6",
    image_url: "https://eng.prosental.online/storage/partners/partner_5.png",
    url: "https://newlink.com",
  },
];

export default function PartnersLogos() {
  const [partners, setPartners] = useState(DEFAULT_PARTNERS);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await api.get("/auth/partners");
        const list = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

        if (list.length > 0) {
          const activePartners = list
            .filter((p) => p.is_active !== false && (p.image_url || p.image))
            .sort((a, b) => (a.order || 0) - (b.order || 0));

          if (activePartners.length > 0) {
            setPartners(activePartners);
          }
        }
      } catch (err) {
        console.error("Failed to load partners:", err);
      }
    };

    fetchPartners();
  }, []);

  const displayPartners = partners.length > 0 ? partners : DEFAULT_PARTNERS;
  // Duplicate array so marquee wraps infinitely and seamlessly
  const repeatedPartners = [...displayPartners, ...displayPartners, ...displayPartners, ...displayPartners];

  return (
    <section className="py-8 md:py-10 bg-white border-b border-gray-100 overflow-hidden relative" data-aos="fade-up" dir="ltr">
      {/* Left and Right Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Continuous Running Track */}
      <div className="w-full flex items-center overflow-hidden">
        <div className="animate-running-logos flex items-center gap-10 sm:gap-14">
          {repeatedPartners.map((partner, idx) => {
            const imgUrl = partner.image_url || partner.image;
            const logoNode = (
              <div className="h-16 flex items-center justify-center px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gray-50/80 group shrink-0">
                <img
                  src={imgUrl}
                  alt={partner.name || "Partner Logo"}
                  className="h-9 sm:h-11 md:h-12 w-auto max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            );

            return partner.url ? (
              <a
                key={idx}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                title={partner.name}
                className="shrink-0"
              >
                {logoNode}
              </a>
            ) : (
              <div key={idx} title={partner.name} className="shrink-0">
                {logoNode}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
