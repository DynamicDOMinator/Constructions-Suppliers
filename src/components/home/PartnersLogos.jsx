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

function PartnerLogoImage({ src, alt, className }) {
  const [cleanSrc, setCleanSrc] = useState(src);

  useEffect(() => {
    if (!src) return;
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const w = img.naturalWidth || 300;
        const h = img.naturalHeight || 100;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Clear the 4 extreme corner marks (crop marks) present in server images
        const cornerW = Math.min(22, Math.max(16, Math.round(w * 0.08)));
        const cornerH = Math.min(22, Math.max(16, Math.round(h * 0.20)));

        ctx.clearRect(0, 0, cornerW, cornerH);
        ctx.clearRect(w - cornerW, 0, cornerW, cornerH);
        ctx.clearRect(0, h - cornerH, cornerW, cornerH);
        ctx.clearRect(w - cornerW, h - cornerH, cornerW, cornerH);

        const dataUrl = canvas.toDataURL("image/png");
        if (isMounted) {
          setCleanSrc(dataUrl);
        }
      } catch (err) {
        // Fallback to original src if cross-origin or canvas not supported
      }
    };
    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <img
      src={cleanSrc}
      alt={alt}
      className={className}
      loading="lazy"
      style={{
        clipPath:
          "polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)",
      }}
    />
  );
}

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
  // Duplicate array multiple times for completely seamless infinite loop
  const repeatedPartners = [
    ...displayPartners,
    ...displayPartners,
    ...displayPartners,
    ...displayPartners,
  ];

  return (
    <section className="py-10 md:py-14 bg-white border-b border-gray-100 overflow-hidden relative" dir="ltr">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollPartnersMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .partners-marquee-track {
          display: flex !important;
          width: max-content !important;
          animation: scrollPartnersMarquee 25s linear infinite !important;
          will-change: transform !important;
        }
      `}} />

      {/* Left and Right Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Continuous Running Track */}
      <div className="w-full flex items-center overflow-hidden">
        <div className="partners-marquee-track animate-running-logos flex items-center gap-12 sm:gap-16 md:gap-20">
          {repeatedPartners.map((partner, idx) => {
            const imgUrl = partner.image_url || partner.image;
            const logoNode = (
              <div className="h-20 sm:h-24 md:h-28 flex items-center justify-center px-6 sm:px-8 py-3 rounded-2xl transition-all duration-300 hover:bg-gray-50/80 group shrink-0">
                <PartnerLogoImage
                  src={imgUrl}
                  alt={partner.name || "Partner Logo"}
                  className="h-12 sm:h-14 md:h-18 lg:h-20 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[260px] object-contain transition-transform duration-300 group-hover:scale-105"
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
