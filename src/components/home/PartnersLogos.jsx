"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";

const DEFAULT_PARTNERS = [
  {
    id: 1,
    uuid: "01a063db-ec50-70cf-994b-85f77214e36e",
    name: "الرابط الجديد New Link",
    image_url: "/partners/new_link.png",
    url: "https://newlink.com.sa",
  },
  {
    id: 2,
    uuid: "01a063db-ec5a-7100-8d64-8e80e94b3f42",
    name: "سابك للصناعات الهندسية SABIC",
    image_url: "/partners/sabic.png",
    url: "https://www.sabic.com",
  },
  {
    id: 3,
    uuid: "01a063db-ec5d-703e-88d6-eea2ef05cc67",
    name: "الفنار للأنظمة الكهربائية alfanar",
    image_url: "/partners/alfanar.png",
    url: "https://www.alfanar.com",
  },
  {
    id: 4,
    uuid: "01a063db-ec5e-73b6-9212-e830b5f35f03",
    name: "شنايدر إلكتريك Schneider Electric",
    image_url: "/partners/schneider.png",
    url: "https://www.se.com",
  },
  {
    id: 5,
    uuid: "01a063db-ec61-72d0-ac51-f8cc3762ec5b",
    name: "الخزف السعودي Saudi Ceramics",
    image_url: "/partners/saudi_ceramics.png",
    url: "https://www.saudiceramics.com",
  },
  {
    id: 6,
    uuid: "01a063db-ec62-72be-8d0f-a5a592bf9515",
    name: "دهانات الجزيرة Jazeera Paints",
    image_url: "/partners/jazeera_paints.png",
    url: "https://jazeerapaints.com",
  },
  {
    id: 7,
    uuid: "01a063db-ec63-71b6-8d88-3c16011aae64",
    name: "الزامل للصناعات الهندسية Zamil Industrial",
    image_url: "/partners/zamil.png",
    url: "https://www.zamilindustrial.com",
  },
  {
    id: 8,
    uuid: "01a063db-ec63-71b6-8d88-3c1601d78a45",
    name: "بوش للمعدات والأنظمة الهندسية BOSCH",
    image_url: "/partners/bosch.png",
    url: "https://www.bosch-pt.com",
  },
  {
    id: 9,
    uuid: "01a063db-ec66-73ae-bd49-ab91f4672ee9",
    name: "هيلتي للمعدات الإنشائية HILTI",
    image_url: "/partners/hilti.png",
    url: "https://www.hilti.sa",
  },
];

function PartnerLogoImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (src.includes("sabic")) setImgSrc("/partners/sabic.png");
        else if (src.includes("alfanar")) setImgSrc("/partners/alfanar.png");
        else if (src.includes("schneider")) setImgSrc("/partners/schneider.png");
        else if (src.includes("ceramics")) setImgSrc("/partners/saudi_ceramics.png");
        else if (src.includes("jazeera")) setImgSrc("/partners/jazeera_paints.png");
        else if (src.includes("zamil")) setImgSrc("/partners/zamil.png");
        else if (src.includes("bosch")) setImgSrc("/partners/bosch.png");
        else if (src.includes("hilti")) setImgSrc("/partners/hilti.png");
        else setImgSrc("/partners/new_link.png");
      }}
    />
  );
}

export default function PartnersLogos() {
  const [partners, setPartners] = useState(DEFAULT_PARTNERS);

  useEffect(() => {
    let isMounted = true;
    const fetchPartners = async () => {
      try {
        const res = await api.get("/auth/partners");
        const list = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

        if (list.length > 0 && isMounted) {
          const activePartners = list
            .filter((p) => p.is_active !== false && (p.image_url || p.image))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((p) => {
              const rawImg = p.image_url || p.image || "";
              const filename = rawImg.split("/").pop();
              const localCandidates = [
                "new_link.png",
                "sabic.png",
                "alfanar.png",
                "schneider.png",
                "saudi_ceramics.png",
                "jazeera_paints.png",
                "zamil.png",
                "bosch.png",
                "hilti.png",
              ];
              const localMatch = localCandidates.find((f) => f === filename);
              return {
                ...p,
                image_url: localMatch ? `/partners/${localMatch}` : rawImg,
              };
            });

          if (activePartners.length > 0) {
            setPartners(activePartners);
          }
        }
      } catch (err) {
        console.error("Failed to load partners:", err);
      }
    };

    fetchPartners();
    return () => {
      isMounted = false;
    };
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
    <section className="py-8 md:py-12 bg-white border-b border-gray-100 overflow-hidden relative" dir="ltr">
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
          animation: scrollPartnersMarquee 28s linear infinite !important;
          will-change: transform !important;
        }
        .partners-marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}} />

      {/* Left and Right Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Continuous Running Track */}
      <div className="w-full flex items-center overflow-hidden">
        <div className="partners-marquee-track flex items-center gap-10 sm:gap-14 md:gap-16">
          {repeatedPartners.map((partner, idx) => {
            const imgUrl = partner.image_url || partner.image;
            const logoNode = (
              <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center px-4 sm:px-6 py-2 rounded-2xl transition-all duration-300 hover:bg-gray-50/80 group shrink-0">
                <PartnerLogoImage
                  src={imgUrl}
                  alt={partner.name || "Partner Logo"}
                  className="h-9 sm:h-11 md:h-14 lg:h-16 w-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
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
