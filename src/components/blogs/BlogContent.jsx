"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Tag, Clock, ArrowLeft, ArrowRight, Link2, Check, ArrowUpRight } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";

export default function BlogContent({ initialSlug }) {
  const params = useParams();
  const slug = initialSlug || params?.id;
  const { isEnglish } = useLanguage();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/auth/blogs/${slug}`);
        const data = res.data?.data || res.data;
        if (data) {
          setBlog(data);
        } else {
          setError(isEnglish ? "Article not found" : "المقال غير موجود");
        }
      } catch (err) {
        console.error("Failed to load blog:", err);
        setError(isEnglish ? "Failed to load article." : "تعذر تحميل المقال.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, isEnglish]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = blog?.title || "";

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-3 border-[#EB682C] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 text-sm font-tajawal">{isEnglish ? "Loading article..." : "جاري تحميل المقال..."}</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center py-24 text-center px-4 font-tajawal">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{error || (isEnglish ? "Article not found" : "المقال غير موجود")}</h2>
        <p className="text-gray-500 text-sm mb-6">{isEnglish ? "The article you are looking for may have been moved or deleted." : "المقال الذي تبحث عنه قد تم نقله أو حذفه."}</p>
        <Link href="/blogs" className="bg-[#EB682C] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#d65a22] transition-colors">
          {isEnglish ? "Back to All Articles" : "العودة لجميع المقالات"}
        </Link>
      </div>
    );
  }

  const coverImg = blog.image_url || blog.image || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2000";

  return (
    <article className="w-full bg-white pt-10 pb-24 px-6 md:px-12 font-tajawal" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#EB682C] transition-colors">{isEnglish ? "Home" : "الرئيسية"}</Link>
          {isEnglish ? <ArrowRight className="w-3.5 h-3.5 text-gray-400" /> : <ArrowLeft className="w-3.5 h-3.5 text-gray-400" />}
          <Link href="/blogs" className="hover:text-[#EB682C] transition-colors">{isEnglish ? "Blogs" : "المدونات"}</Link>
          {blog.category && (
            <>
              {isEnglish ? <ArrowRight className="w-3.5 h-3.5 text-gray-400" /> : <ArrowLeft className="w-3.5 h-3.5 text-gray-400" />}
              <span className="text-gray-600">{blog.category}</span>
            </>
          )}
          {isEnglish ? <ArrowRight className="w-3.5 h-3.5 text-gray-400" /> : <ArrowLeft className="w-3.5 h-3.5 text-gray-400" />}
          <span className="text-gray-900 font-bold truncate max-w-xs md:max-w-md">{blog.title}</span>
        </div>

        {/* Title and Meta */}
        <div className={`mb-8 ${isEnglish ? 'text-left' : 'text-right'}`}>
          {blog.category && (
            <div className="bg-[#EB682C]/10 text-[#EB682C] px-4 py-1.5 rounded-full text-xs font-bold inline-block mb-4">
              {blog.category}
            </div>
          )}
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 pb-6 border-b border-gray-100">
            {blog.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#2A5CBA]" />
                <span className="font-bold text-gray-700">{blog.author}</span>
              </div>
            )}
            {blog.formatted_date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{blog.formatted_date}</span>
              </div>
            )}
            {blog.read_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#EB682C]" />
                <span>{blog.read_time}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cover Image */}
        <div className="w-full h-[320px] sm:h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-lg mb-12 bg-gray-100 relative">
          <img 
            src={coverImg} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt Lead */}
        {blog.excerpt && (
          <div className={`bg-gradient-to-r from-orange-50/70 to-blue-50/40 p-6 md:p-8 rounded-2xl mb-10 border-r-4 ${isEnglish ? 'border-l-4 border-r-0' : 'border-r-4'} border-[#EB682C]`}>
            <p className={`text-lg md:text-xl text-gray-800 font-medium leading-relaxed ${isEnglish ? 'text-left' : 'text-right'}`}>
              {blog.excerpt}
            </p>
          </div>
        )}

        {/* Content Body (Safe HTML from API) */}
        {blog.content ? (
          <div 
            className={`prose prose-lg prose-blue max-w-none text-gray-700 ${isEnglish ? 'text-left' : 'text-right'} leading-loose mb-16 space-y-4`}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        ) : (
          <div className="text-gray-500 text-lg leading-loose mb-16">
            <p>{blog.excerpt}</p>
          </div>
        )}

        {/* Share and Tags Footer */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 py-6 border-t border-b border-gray-100 mb-16">
          
          {/* Social Share */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-gray-900 text-sm">{isEnglish ? "Share Article:" : "مشاركة المقال:"}</span>
            
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-[#2A5CBA] transition-colors border border-gray-100"
              aria-label="Share on Facebook"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-sky-50 hover:text-sky-500 transition-colors border border-gray-100"
              aria-label="Share on X"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-100"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <button 
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-[#EB682C] transition-colors text-xs font-bold border border-gray-100"
              title={isEnglish ? "Copy Link" : "نسخ الرابط"}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Link2 className="w-3.5 h-3.5" />}
              <span>{copied ? (isEnglish ? "Copied!" : "تم النسخ!") : (isEnglish ? "Copy Link" : "نسخ الرابط")}</span>
            </button>
          </div>
          
          {/* Tags */}
          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className={`font-bold text-gray-900 text-sm ${isEnglish ? 'mr-1' : 'ml-1'}`}>{isEnglish ? "Tags:" : "الوسوم:"}</span>
              {blog.tags.map((tag, tIdx) => (
                <span key={tIdx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Related Posts Section */}
        {Array.isArray(blog.related_posts) && blog.related_posts.length > 0 && (
          <div className="pt-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEnglish ? "Related Articles" : "مقالات ذات صلة"}
              </h2>
              <Link href="/blogs" className="text-[#EB682C] text-sm font-bold hover:underline flex items-center gap-1">
                <span>{isEnglish ? "View all" : "عرض الكل"}</span>
                {isEnglish ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blog.related_posts.map((relPost, rIdx) => {
                const relSlug = relPost.slug || relPost.uuid || relPost.id;
                const relImg = relPost.image_url || relPost.image || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800";

                return (
                  <Link 
                    key={relPost.uuid || relPost.id || rIdx}
                    href={`/blogs/${relSlug}`}
                    className="bg-gray-50 hover:bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col"
                  >
                    <div className="h-44 w-full relative overflow-hidden bg-gray-200">
                      <img 
                        src={relImg} 
                        alt={relPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {relPost.category && (
                        <div className={`absolute top-3 ${isEnglish ? 'left-3' : 'right-3'} bg-white/90 backdrop-blur-sm px-3 py-0.5 rounded-full text-[11px] font-bold text-[#EB682C]`}>
                          {relPost.category}
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                        {relPost.formatted_date && <span>{relPost.formatted_date}</span>}
                        {relPost.read_time && <span>• {relPost.read_time}</span>}
                      </div>
                      <h4 className={`text-base font-bold text-gray-900 group-hover:text-[#2A5CBA] transition-colors line-clamp-2 leading-snug mb-3 ${isEnglish ? 'text-left' : 'text-right'}`}>
                        {relPost.title}
                      </h4>
                      <div className="mt-auto flex items-center gap-1 text-[#EB682C] text-xs font-bold">
                        <span>{isEnglish ? "Read Article" : "قراءة المقال"}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isEnglish ? '' : '-scale-x-100'}`} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
