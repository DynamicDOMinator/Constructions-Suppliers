export default function AboutStory() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white" dir="rtl" data-aos="fade-up">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Right Content (Text) */}
        <div className="w-full lg:w-1/2">
          {/* Top Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-[#EB682C]"></div>
            <span className="text-[#0B0C0F] text-sm font-bold">بداية الشركة</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold font-tajawal mb-2 text-[#EB682C]">
            حكايتنا
          </h2>
          
          <h3 className="text-xl md:text-2xl font-bold font-tajawal mb-8 text-[#2A5CBA]">
            Constructions Suppliers
          </h3>

          {/* Story Paragraphs */}
          <div className="space-y-6 text-gray-600 leading-loose text-base lg:text-lg">
            <p>
              بدأت رحلتنا من إدراكنا للتحديات الكبيرة التي تواجه قطاع البناء والتشييد، حيث
              يحتاج المورد إلى الوصول السريع للمصانع، ويبحث المهندس عن مواد موثوقة،
              بينما يسعى المشتري إلى أفضل جودة بأفضل سعر.
            </p>
            <p>
              من هنا جاءت فكرتنا: إنشاء منصة رقمية تكون نقطة التقاء لجميع الأطراف،
              وتفتح أبواب التعاون بينهم بشكل أكثر سهولة وشفافية.
            </p>
            <p>
              نحن نؤمن أن النجاح لا يتحقق إلا من خلال الثقة المتبادلة، لذلك جعلنا من
              الشفافية والموثوقية أساساً لكل تعاملاتنا. ومع كل خطوة، نسعى إلى تعزيز
              التواصل بين الموردين والمصانع والمهندسين والمشترين ليصبح التعاون أكثر
              قوة واستدامة.
            </p>
          </div>
        </div>

        {/* Left Content (Images) */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full max-w-lg mx-auto h-[450px] md:h-[550px]">
            {/* Top Right Image */}
            <div className="absolute top-0 right-0 w-[60%] h-[70%] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#F8FAFC] z-10">
              <img 
                src="aboutus-6.png" 
                alt="Our Story 1" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Bottom Left Image */}
            <div className="absolute bottom-0 left-0 w-[60%] h-[70%] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#F8FAFC] z-20">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Story 2" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
