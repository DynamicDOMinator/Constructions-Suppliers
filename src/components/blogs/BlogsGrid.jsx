import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";

export default function BlogsGrid() {
  // Mock blog data
  const blogs = [
    {
      id: 1,
      title: "كيف تختار المورد المناسب لمشروعك الإنشائي؟",
      excerpt: "تعرف على أهم المعايير والخطوات الأساسية لاختيار أفضل الموردين لضمان جودة مواد البناء ونجاح مشروعك.",
      date: "15 مايو 2026",
      author: "أحمد محمد",
      image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
      category: "نصائح وإرشادات"
    },
    {
      id: 2,
      title: "أحدث التقنيات في عالم المقاولات والبناء",
      excerpt: "نظرة شاملة على التكنولوجيا الحديثة التي تُحدث ثورة في قطاع التشييد والبناء حول العالم.",
      date: "10 مايو 2026",
      author: "سارة خالد",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
      category: "تكنولوجيا"
    },
    {
      id: 3,
      title: "تأثير رؤية 2030 على قطاع المقاولات السعودي",
      excerpt: "تحليل مفصل للفرص الاستثمارية والنمو المتوقع في قطاع المقاولات تماشياً مع رؤية المملكة 2030.",
      date: "05 مايو 2026",
      author: "د. عمر عبدالله",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      category: "تحليلات السوق"
    },
    {
      id: 4,
      title: "أهمية الاستدامة في المشاريع العقارية الحديثة",
      excerpt: "لماذا أصبح البناء الأخضر والاستدامة ضرورة وليس خياراً في المشاريع الإنشائية المعاصرة؟",
      date: "01 مايو 2026",
      author: "م. نورة سعد",
      image: "https://images.unsplash.com/photo-1518481612222-68bab828fd1b?auto=format&fit=crop&q=80&w=800",
      category: "استدامة"
    },
    {
      id: 5,
      title: "إدارة المخاطر في المشاريع الهندسية الكبرى",
      excerpt: "أفضل الممارسات العملية لتحديد وتقليل المخاطر المحتملة أثناء تنفيذ المشاريع الضخمة.",
      date: "25 أبريل 2026",
      author: "فهد العتيبي",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      category: "إدارة مشاريع"
    },
    {
      id: 6,
      title: "تطور أسعار مواد البناء وتوقعات السوق",
      excerpt: "قراءة في منحنيات أسعار الحديد والأسمنت ومواد البناء الأساسية خلال الربع الأول من العام.",
      date: "20 أبريل 2026",
      author: "قسم الأبحاث",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
      category: "تقارير اقتصادية"
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 w-full font-tajawal" dir="rtl" data-aos="fade-up">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Categories / Filter Bar (Optional) */}
        <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-gray-100 pb-6">
          <button className="bg-[#2A5CBA] text-white px-6 py-2 rounded-full text-sm font-bold shadow-sm">الكل</button>
          <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">نصائح وإرشادات</button>
          <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">تكنولوجيا</button>
          <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">تحليلات السوق</button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <div key={blog.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col" data-aos="fade-up" data-aos-delay={idx * 100}>
              
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-[#EB682C] shadow-md">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#2A5CBA] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Read More Button (Pushed to bottom) */}
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <Link href={`/blogs/${blog.id}`}>
                    <button className="flex items-center gap-2 text-[#EB682C] font-bold text-sm hover:text-[#d65a22] transition-colors group/btn">
                      اقرأ المزيد
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
