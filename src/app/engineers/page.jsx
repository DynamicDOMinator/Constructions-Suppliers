"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import api from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";

export default function EngineersPage() {
  const { isEnglish } = useLanguage();
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [links, setLinks] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchEngineers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/auth/engineers?page=${page}`);
      if (res.data && Array.isArray(res.data.data)) {
        setEngineers(res.data.data);
        setLinks(res.data.links || []);
        setTotal(res.data.total || 0);
        setCurrentPage(res.data.current_page || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngineers(1);
  }, []);

  const handlePageChange = (page) => {
    if (page) {
      fetchEngineers(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] flex flex-col font-tajawal">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-[#F9FAFC] border-b border-gray-100 py-20 text-center" data-aos="fade-down" dir={isEnglish ? "ltr" : "rtl"}>
        <h1 className="text-3xl md:text-5xl font-bold text-[#2A5CBA] mb-6">
          {isEnglish ? "Specialized " : "المهندسون "}<span className="text-[#EB682C]">{isEnglish ? "Engineers" : "المتخصصون"}</span>
        </h1>
        <p className="text-md text-gray-500 max-w-2xl mx-auto px-4 leading-relaxed">
          {isEnglish ? "A selection of the best specialized engineers in construction, finishing, and decoration to meet all your project needs. Browse their profiles and start a conversation now." : "نخبة من أفضل المهندسين المتخصصين في مجالات البناء والتشطيبات والديكور لتلبية كافة احتياجات مشروعك. تصفح ملفاتهم وابدأ المحادثة الآن."}
        </p>
       
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full" dir={isEnglish ? "ltr" : "rtl"}>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#EB682C] border-t-transparent shadow-md"></div>
          </div>
        ) : engineers.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xl font-bold">{isEnglish ? "No engineers currently available." : "لا يوجد مهندسين حالياً."}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {engineers.map((person, i) => (
                <div key={person.uuid || i} className="flex flex-col items-center group cursor-pointer h-full justify-between bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f0f4f8] to-transparent opacity-50"></div>
                  
                  <Link href={`/engineer/${person.uuid}`} className="flex flex-col items-center flex-grow w-full z-10">
                    <div className="w-[140px] h-[140px] mb-6 relative bg-white rounded-full flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110 shadow-md ring-4 ring-white">
                      {person.avatar ? (
                        <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-5xl text-gray-400 font-light uppercase">{person.name?.[0] || 'U'}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 text-xl mb-1 text-center">{person.name}</h3>
                    <p className="text-sm text-[#EB682C] font-bold mb-4 text-center bg-orange-50 px-4 py-1 rounded-full">{person.specialization || (isEnglish ? "Specialized Engineer" : "مهندس متخصص")}</p>
                    <p className="text-sm text-gray-500 mb-6 text-center line-clamp-3 leading-relaxed">
                      {person.bio || (isEnglish ? "Experience in supervising finishing and decoration works to ensure quality" : "خبرة في الاشراف علي اعمال التشطيبات والديكور لضمان الجودة")}
                    </p>
                  </Link>
                  <div className="mt-auto w-full z-10">
                    <Link href={`/dashboard/chat?user=${person.uuid}`} className="w-full block">
                      <button className="bg-[#EB682C] text-center text-white text-sm px-6 py-3 rounded-2xl w-full font-bold shadow-md shadow-orange-500/20 hover:bg-[#d65a22] transition-all active:scale-95 duration-200">
                        {isEnglish ? "Start Conversation" : "ابدء المحادثة"}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {links.length > 3 && (
              <div className="flex justify-center items-center gap-2 mt-16 flex-wrap">
                {links.map((link, idx) => {
                  let label = link.label;
                  if (label.includes('Previous') || label.includes('&laquo;')) label = isEnglish ? 'Previous' : 'السابق';
                  if (label.includes('Next') || label.includes('&raquo;')) label = isEnglish ? 'Next' : 'التالي';

                  const pageNum = link.url ? link.url.split('page=')[1] : null;

                  return (
                    <button
                      key={idx}
                      onClick={() => pageNum && handlePageChange(pageNum)}
                      disabled={!link.url}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm ${
                        link.active 
                          ? 'bg-[#EB682C] text-white border-transparent scale-105' 
                          : link.url 
                            ? 'bg-white text-gray-700 border border-gray-200 hover:bg-orange-50 hover:text-[#EB682C] hover:border-[#EB682C]/30' 
                            : 'bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed hidden md:inline-block'
                      }`}
                      dangerouslySetInnerHTML={{ __html: label }}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
