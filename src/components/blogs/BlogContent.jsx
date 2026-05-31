import { Calendar, User, Tag, Share2, ArrowLeft } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function BlogContent() {
  return (
    <article className="w-full bg-white pt-10 pb-24 px-6 md:px-12 font-tajawal" dir="rtl" data-aos="fade-up">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#EB682C] transition-colors">الرئيسية</Link>
          <ArrowLeft className="w-3 h-3" />
          <Link href="/blogs" className="hover:text-[#EB682C] transition-colors">المدونات</Link>
          <ArrowLeft className="w-3 h-3" />
          <span className="text-gray-900 font-bold">كيف تختار المورد المناسب لمشروعك الإنشائي؟</span>
        </div>

        {/* Title and Meta */}
        <div className="mb-10 text-right">
          <div className="bg-[#EB682C]/10 text-[#EB682C] px-4 py-1.5 rounded-full text-xs font-bold inline-block mb-6">
            نصائح وإرشادات
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            كيف تختار المورد المناسب لمشروعك الإنشائي؟
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#2A5CBA]" />
              <span className="font-bold text-gray-700">أحمد محمد</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>15 مايو 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-gray-400" />
              <span>مقاولات، توريد، إدارة مشاريع</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-lg mb-12">
          <img 
            src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" 
            alt="Blog Cover" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="prose prose-lg prose-blue max-w-none text-gray-600 text-right leading-loose mb-16">
          <p className="text-xl text-gray-800 font-medium mb-8">
            يعتبر اختيار المورد المناسب أحد أهم القرارات التي تحدد نجاح أي مشروع إنشائي. فالمورد لا يقدم فقط مواد البناء، بل هو شريك أساسي في ضمان تسليم المشروع في الوقت المحدد وبالمواصفات المطلوبة.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">1. الجودة والموثوقية</h2>
          <p className="mb-6">
            أول عامل يجب النظر إليه هو جودة المواد التي يقدمها المورد. تأكد من أن المورد يحمل الشهادات اللازمة وأن مواده مطابقة للمواصفات والمعايير المحلية والدولية. يمكنك دائماً طلب عينات قبل توقيع عقود التوريد الضخمة.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">2. القدرة على التوريد والالتزام بالمواعيد</h2>
          <p className="mb-6">
            تأخير تسليم المواد قد يتسبب في توقف كامل للمشروع مما يؤدي إلى خسائر مالية ضخمة. ابحث عن مورد يمتلك أسطول نقل موثوق وقدرة تخزينية جيدة، وتاريخ حافل بالالتزام بالمواعيد.
          </p>

          <div className="bg-[#F8FAFC] border-r-4 border-[#EB682C] p-6 rounded-l-xl my-10">
            <p className="text-lg text-gray-800 font-bold italic">
              "المورد الجيد ليس من يقدم أقل سعر، بل من يقدم أفضل قيمة متكاملة من جودة والتزام ودعم مستمر طوال دورة حياة المشروع."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">3. القوة المالية والأسعار التنافسية</h2>
          <p className="mb-6">
            المورد ذو الملاءة المالية القوية قادر على استيعاب تقلبات السوق وتقديم تسهيلات في الدفع. قارن أسعار عدة موردين من خلال منصات مثل "مقايستي" للحصول على أفضل العروض الشفافة دون التنازل عن الجودة.
          </p>
        </div>

        {/* Share and Tags Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 border-t border-b border-gray-100 mb-16">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <span className="font-bold text-gray-900">مشاركة المقال:</span>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-[#2A5CBA] transition-colors">
                <FaFacebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-sky-50 hover:text-sky-500 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 ml-2">الوسوم:</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs">#مقاولات</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs">#توريد</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs">#بناء</span>
          </div>
        </div>

      </div>
    </article>
  );
}
