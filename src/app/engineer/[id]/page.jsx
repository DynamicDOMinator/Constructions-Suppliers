"use client";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { Bookmark, X, ChevronLeft } from 'lucide-react';

export default function EngineerProfilePage({ params }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  // In a real app, you would fetch data using params.id
  
  const experiences = [
    {
      company: 'ديكوما (DecoMa)',
      location: 'السعودية جدة',
      role: 'مهندس ديكور',
      date: 'مارس 2022 - أبريل 2024 الخبرة سنتين وشهر',
      logo: '/company-logo-1.jpg' // We can use random colored divs or actual image if available. I'll use a styled div with a letter if no image
    },
    {
      company: 'ديكوما (DecoMa)',
      location: 'السعودية جدة',
      role: 'مهندس ديكور',
      date: 'مارس 2022 - أبريل 2024 الخبرة سنتين وشهر',
      logo: '/company-logo-2.jpg'
    },
    {
      company: 'ديكوما (DecoMa)',
      location: 'السعودية جدة',
      role: 'مهندس ديكور',
      date: 'مارس 2022 - أبريل 2024 الخبرة سنتين وشهر',
      logo: '/company-logo-3.jpg'
    }
  ];

  const skills = [
    'النمذجة ثلاثية الأبعاد (3D)',
    'التصميم الداخلي',
    'أوتوكاد (AutoCAD)',
    'متابعة الميزانية والتكاليف'
  ];

  const portfolioImages = [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-aac4c156628c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFC] flex flex-col font-tajawal">
      <Navbar />

      <div className="flex-grow pb-16">
        {/* Cover Image */}
        <div className="w-full h-[250px] relative bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1541888086225-eb1d46c8eb58?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative">
          
          {/* Profile Header (Avatar + Info + Buttons) */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 -mt-16" dir="rtl">
            
            {/* Right side: Avatar and Name */}
            <div className="flex flex-col" data-aos="fade-up">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-[#D6E4FF] flex items-center justify-center shadow-sm z-10" data-aos="zoom-in" data-aos-delay="100">
                <span className="text-5xl text-gray-800 font-light font-sans">U</span>
              </div>
              <div className="mt-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">محمد عادل</h1>
                <p className="text-sm text-gray-500 max-w-lg">
                  مهندس تشطيبات و ديكورات في شقق و الفيلات والفنادق على أعلى مستوى
                </p>
              </div>
            </div>

            {/* Left side: Buttons */}
            <div className="flex gap-3 mt-8 md:mt-24 md:mr-auto" data-aos="fade-right" data-aos-delay="200">
              <button className="flex items-center justify-center gap-2 px-6 py-2 border border-[#2A5CBA] text-[#2A5CBA] rounded-lg font-bold hover:bg-blue-50 transition-colors bg-white hover:scale-105 active:scale-95 duration-300">
                <Bookmark className="w-4 h-4" />
                حفظ المهندس
              </button>
              <Link href="/chat">
                <button className="flex items-center justify-center px-8 py-2 bg-[#EB682C] text-white rounded-lg font-bold hover:bg-[#d65a22] transition-colors hover:scale-105 active:scale-95 duration-300 shadow-md hover:shadow-lg">
                  بدء المحادثة
                </button>
              </Link>
            </div>
            
          </div>

          {/* Content Sections */}
          <div className="space-y-6" dir="rtl">
            
            {/* Personal Overview */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm" data-aos="fade-up" data-aos-delay="300">
              <h2 className="text-[#2A5CBA] font-bold text-lg mb-4">لمحة شخصية</h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
                خبرة في الاشراف على اعمال التشطيبات والديكور تشمل التخطيط، اختيار الخامات، ومتابعة التنفيذ وفق معايير الجودة والالتزام الفني، بما يضمن تحقيق نتائج تلبي تطلعات العملاء.
              </p>
            </section>

            {/* Experience */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm" data-aos="fade-up" data-aos-delay="400">
              <h2 className="text-[#2A5CBA] font-bold text-lg mb-6">الخبرات</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="flex gap-4 items-start hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {/* Using fallback styled divs for company logos to match screenshot vibe */}
                      {idx === 0 && <div className="w-full h-full bg-[#1e293b] flex items-center justify-center"><span className="text-[#e2e8f0] text-xs font-bold font-serif text-center">BUILDINGS<br/><span className="text-[8px]">PORTFOLIO</span></span></div>}
                      {idx === 1 && <div className="w-full h-full bg-[#fde68a] flex items-center justify-center"><span className="text-gray-800 text-xs font-bold font-serif">LAN LAY</span></div>}
                      {idx === 2 && <div className="w-full h-full bg-[#1e293b] flex items-center justify-center"><span className="text-[#38bdf8] text-xs font-bold font-serif">DECO</span></div>}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{exp.company}</h3>
                      <p className="text-xs text-gray-500 mb-1">{exp.location}</p>
                      <p className="text-xs text-gray-500 mb-1">{exp.role}</p>
                      <p className="text-xs text-gray-400">{exp.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm" data-aos="fade-up" data-aos-delay="500">
              <h2 className="text-[#2A5CBA] font-bold text-lg mb-6">المهارات</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="bg-[#fcf5f1] text-[#7c6962] px-6 py-2 rounded-lg text-sm font-bold border border-[#faebe4] hover:bg-[#EB682C] hover:text-white hover:border-[#EB682C] transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Portfolio */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm" data-aos="fade-up" data-aos-delay="600">
              <h2 className="text-[#2A5CBA] font-bold text-lg mb-6">سابقة الاعمال</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer relative border border-gray-100"
                    onClick={() => {
                      setSelectedProjectIndex(idx);
                      setIsProjectModalOpen(true);
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Portfolio item ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex justify-center backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
          <div className="w-full max-w-5xl bg-transparent min-h-screen pb-20 relative font-tajawal animate-in slide-in-from-bottom-8 duration-500">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 md:p-8 sticky top-0 z-10 w-full" dir="rtl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#D6E4FF] flex items-center justify-center shadow-sm">
                  <span className="text-xl text-gray-800 font-light font-sans">U</span>
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-sm">محمد عادل</h3>
                  <p className="text-xs text-gray-300">مهندس تشطيبات و ديكور</p>
                </div>
              </div>
              <button 
                onClick={() => setIsProjectModalOpen(false)}
                className="text-white hover:text-gray-300 transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Images Stack */}
            <div className="px-4 md:px-8 space-y-2 relative">
              <div className="w-full h-[300px] md:h-[500px] rounded-t-3xl overflow-hidden bg-gray-900 relative">
                 <img src={portfolioImages[selectedProjectIndex]} className="w-full h-full object-cover opacity-90" alt="Project 1" />
              </div>
              <div className="w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-900">
                 {/* Dummy blueprint image */}
                 <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-90" alt="Project 2" />
              </div>
              <div className="w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-900 relative group">
                 {/* Dummy interior image */}
                 <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-90" alt="Project 3" />
                 <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2A5CBA] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <ChevronLeft className="w-5 h-5" />
                 </button>
              </div>
              <div className="w-full h-[300px] md:h-[500px] rounded-b-3xl overflow-hidden bg-gray-900">
                 {/* Dummy interior image */}
                 <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-90" alt="Project 4" />
              </div>

              {/* Call to Action Bar */}
              <div className="bg-[#de7c54] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center mt-6 shadow-lg">
                <h2 className="text-white text-xl md:text-2xl font-bold mb-1">اسم المشروع</h2>
                <p className="text-white/80 text-xs mb-6">تم نشره 5 ابريل 2024</p>
                <Link href="/chat">
                  <button className="bg-white text-[#de7c54] px-12 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-md">
                    بدء المحادثة
                  </button>
                </Link>
              </div>

              {/* Other Projects Section */}
              <div className="bg-[#3e68b8] rounded-3xl p-6 md:p-8 mt-6">
                <div className="flex justify-end mb-6">
                  <h3 className="text-white font-bold text-lg">سابقة الاعمال</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[0, 1, 2].map((i) => {
                    const idx = (selectedProjectIndex + i + 1) % portfolioImages.length;
                    return (
                      <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 cursor-pointer" onClick={() => setSelectedProjectIndex(idx)}>
                        <img 
                          src={portfolioImages[idx]} 
                          alt="Other Project" 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
