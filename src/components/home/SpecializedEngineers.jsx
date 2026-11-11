"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { UserPlus, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import AuthRequiredModal from "@/components/common/AuthRequiredModal";

const DEFAULT_ENGINEERS = [
  {
    uuid: "eng-1",
    name: "م. خالد منصور الشمري",
    nameEn: "Eng. Khalid Mansour Al-Shammari",
    specialization: "هندسة كهروميكانيك (MEP)",
    specializationEn: "Electromechanical Engineering (MEP)",
    bio: "مهندس كهروميكانيك خبير في تصميم وحساب الأحمال الحرارية...",
    bioEn: "Expert MEP engineer in thermal load calculation and electromechanical design...",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    uuid: "eng-2",
    name: "م. عمر طارق الدوسري",
    nameEn: "Eng. Omar Tariq Al-Dawsari",
    specialization: "إدارة مشاريع هندسية (PMP)",
    specializationEn: "Project Management (PMP)",
    bio: "مهندس محترف معتمد PMP بخبرة 15 عاماً في قيادة مشاريع البنية...",
    bioEn: "Certified PMP professional engineer with 15 years experience leading infrastructure projects...",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  },
  {
    uuid: "eng-3",
    name: "م. ريم سلطان المطيري",
    nameEn: "Eng. Reem Sultan Al-Mutairi",
    specialization: "هندسة مساحة وفحص تربة (Geomatics)",
    specializationEn: "Geomatics & Soil Testing",
    bio: "مهندسة مساحة وجيوماتكس متخصصة في أعمال الرفع...",
    bioEn: "Surveying and geomatics engineer specialized in survey works and topography...",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  },
  {
    uuid: "eng-4",
    name: "م. يوسف إبراهيم العتيبي",
    nameEn: "Eng. Youssef Ibrahim Al-Otaibi",
    specialization: "أمن صناعي وسلامة مهنية (HSE)",
    specializationEn: "Industrial Safety & Health (HSE)",
    bio: "استشاري سلامة وصحة مهنية معتمد OSHA و NEBOSH بخبرة 9...",
    bioEn: "Certified OSHA and NEBOSH occupational health and safety consultant with 9+ years experience...",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
  },
];

export default function SpecializedEngineers() {
  const [engineers, setEngineers] = useState(DEFAULT_ENGINEERS);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isEnglish } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await api.get("/auth/engineers");
        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setEngineers(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching engineers:", err);
      }
    };
    fetchEngineers();
  }, []);

  const handleChatClick = (e, personUuid) => {
    e.preventDefault();
    if (!user && !isAuthenticated) {
      setShowAuthModal(true);
    } else {
      router.push(`/chat?user=${personUuid}`);
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-[#F9FAFC]" data-aos="fade-up" dir={isEnglish ? "ltr" : "rtl"}>
      {/* Top Header Section with Badges and CTA Button */}
      <div className="max-w-6xl mx-auto mb-14">
        {/* Top Row: Register Button (Left in RTL) and Opportunity Badge (Right in RTL) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Register Engineer CTA Button */}
          <Link
            href="/register?role=engineer"
            className="order-2 sm:order-1 inline-flex items-center gap-2.5 bg-gradient-to-r from-[#FF7A38] via-[#EB682C] to-[#d6551b] hover:from-[#EB682C] hover:to-[#c24b12] text-white px-6 py-2.5 rounded-xl font-black text-sm md:text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-orange-400/30"
          >
            <UserPlus className="w-4 h-4 shrink-0" />
            <span>{isEnglish ? "Register Engineer Account" : "قم بتسجيل حساب مهندسين"}</span>
          </Link>

          {/* Opportunity Badge */}
          <div className="order-1 sm:order-2 inline-flex items-center bg-[#0B1B3D] text-white px-5 py-2.5 rounded-xl font-extrabold text-xs md:text-sm shadow-md border border-blue-900/50">
            <span>{isEnglish ? "Your opportunity is here.. and the choice is yours!" : "فرصتك هنا.. واختيارك بإيدك!"}</span>
          </div>
        </div>

        {/* Center Main Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#EB682C] font-tajawal mb-4 tracking-tight">
            {isEnglish ? (
              <>Specialized <span className="text-[#010101]">Engineers</span></>
            ) : (
              <>مهندسون <span className="text-[#010101]">متخصصون</span></>
            )}
          </h2>

          {/* Center Marketplace Description Badge */}
          <div className="inline-block bg-[#0B1B3D] text-white px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-md border border-blue-900/50 max-w-2xl">
            {isEnglish 
              ? "A platform bringing together engineers, suppliers, manufacturers, and contractors in one marketplace."
              : "منصة تجمع المهندسين والموردين والمصنعين والمقاولين في سوق واحد."
            }
          </div>
        </div>
      </div>

      {/* Engineers Swiper Grid */}
      <div className="max-w-6xl mx-auto" data-aos="zoom-in" data-aos-delay="150">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          centerInsufficientSlides={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="px-4 engineers-swiper pb-12"
        >
          {engineers.map((person, i) => {
            const displayName = isEnglish ? (person.nameEn || person.name) : person.name;
            const displaySpec = isEnglish ? (person.specializationEn || person.specialization) : person.specialization;
            const displayBio = isEnglish ? (person.bioEn || person.bio) : person.bio;

            return (
              <SwiperSlide key={person.uuid || i} className="!h-auto">
                <div className="flex flex-col items-center group h-full justify-between p-2">
                  <Link href={`/engineer/${person.uuid || i}`} className="flex flex-col items-center flex-grow text-center w-full">
                    {/* Rounded Avatar with Warm Ring */}
                    <div className="w-[170px] h-[170px] md:w-[190px] md:h-[190px] mb-4 relative bg-gray-100 rounded-full flex items-center justify-center overflow-hidden ring-4 ring-orange-200/60 group-hover:ring-[#EB682C] group-hover:scale-105 transition-all duration-300 shadow-md">
                      {person.avatar ? (
                        <img 
                          src={person.avatar} 
                          alt={displayName} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <span className="text-5xl text-gray-700 font-extrabold uppercase">
                          {displayName?.[0] || 'E'}
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="font-extrabold text-gray-950 text-lg md:text-xl mb-1 group-hover:text-[#EB682C] transition-colors font-tajawal">
                      {displayName}
                    </h3>

                    {/* Specialization */}
                    <p className="text-xs md:text-sm font-bold text-[#EB682C] mb-2">
                      {displaySpec || (isEnglish ? "Specialized Engineer" : "مهندس متخصص")}
                    </p>

                    {/* Bio */}
                    <p className="text-xs md:text-sm text-gray-700 font-medium mb-4 max-w-[210px] line-clamp-2 leading-relaxed">
                      {displayBio || (isEnglish ? "Experienced engineer in structural and finishing works" : "مهندس خبير في الإشراف والتنفيذ")}
                    </p>
                  </Link>

                  {/* Start Chat Button */}
                  <div className="mt-auto w-[180px]">
                    <button
                      type="button"
                      onClick={(e) => handleChatClick(e, person.uuid || i)}
                      className="bg-[#EB682C] hover:bg-[#d65a22] text-center text-white text-xs md:text-sm px-6 py-2.5 rounded-full w-full font-bold shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isEnglish ? "Start Chat" : "ابدء المحادثة"}</span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* View All Engineers CTA */}
      <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="200">
        <Link href="/engineers">
          <button className="px-8 py-3 bg-white border-2 border-[#EB682C] text-[#EB682C] hover:bg-[#EB682C] hover:text-white rounded-2xl font-black text-sm md:text-base transition-all shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer">
            <span>{isEnglish ? "View All Engineers" : "عرض كل المهندسين"}</span>
            {isEnglish ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
        </Link>
      </div>

      {/* Authentication Required Modal Alert */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        messageAr="يرجى تسجيل الدخول أو إنشاء حساب جديد لبدء المحادثة والتواصل مع المهندسين المتخصصين."
        messageEn="Please sign in or create an account to start chatting with specialized engineers."
      />
    </section>
  );
}
