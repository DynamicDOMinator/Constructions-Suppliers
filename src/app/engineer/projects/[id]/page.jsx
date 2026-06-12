"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Loader2, ArrowRight, Calendar, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/axios";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/auth/engineers/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "حدث خطأ أثناء جلب تفاصيل المشروع");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFC] flex flex-col font-tajawal">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-12 h-12 text-[#EB682C] animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#F9FAFC] flex flex-col font-tajawal">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
          <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">عذراً، لا يمكن الوصول للصفحة</h2>
          <p className="text-gray-500 mb-6">{error || "لم يتم العثور على المشروع"}</p>
          <button onClick={() => router.back()} className="bg-[#EB682C] text-white px-8 py-3 rounded-full font-bold hover:bg-[#d65a22] transition-colors">
            العودة
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFC] flex flex-col font-tajawal" dir="rtl">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-[#EB682C] transition-colors">الرئيسية</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/engineers" className="hover:text-[#EB682C] transition-colors">المهندسون</Link>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.back()} className="hover:text-[#EB682C] transition-colors">ملف المهندس</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium truncate">{project.project_name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-[#EB682C] font-bold mb-8 transition-colors group">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            العودة لمعرض الأعمال
          </button>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Image Gallery */}
            <div className="lg:w-1/2 bg-gray-50 p-6 md:p-8 flex flex-col gap-4 border-l border-gray-100">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-200 border border-gray-100 relative shadow-inner">
                {project.images && project.images.length > 0 && project.images[activeImage] ? (
                  <img 
                    src={project.images[activeImage]} 
                    alt={project.project_name} 
                    className="w-full h-full object-contain bg-black/5"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                    لا توجد صور للمشروع
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {project.images && project.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {project.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? "border-[#EB682C] shadow-md opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="lg:w-1/2 p-6 md:p-10 flex flex-col">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {project.project_name}
                </h1>
              </div>

              {project.created_at && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 bg-gray-50 w-fit px-4 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-[#EB682C]" />
                  <span>تاريخ الإضافة: {new Date(project.created_at).toLocaleDateString("ar-EG")}</span>
                </div>
              )}

              <div className="prose prose-sm md:prose-base text-gray-600 mb-8 max-w-none text-justify leading-loose">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#EB682C] rounded-full"></div>
                  وصف المشروع
                </h3>
                <p className="whitespace-pre-line">
                  {project.description || "لم يتم إضافة وصف مفصل لهذا المشروع."}
                </p>
              </div>

              {project.project_file_path && (
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <a 
                    href={project.project_file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    <Download className="w-5 h-5" />
                    تحميل ملف المشروع (PDF)
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
