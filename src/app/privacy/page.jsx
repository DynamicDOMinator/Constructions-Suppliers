import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "سياسة الخصوصية | Constructions Suppliers",
  description: "اطلع على سياسة الخصوصية الخاصة بمنصة Constructions Suppliers وكيفية حماية بياناتك الشخصية.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal">
      <Navbar />

      <section className="bg-gradient-to-br from-[#0E2954] to-[#1a3d7a] text-white py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center" dir="rtl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-4 text-white">
            سياسة الخصوصية
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">سياسة الخصوصية</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            نحن في <span className="text-white font-bold">Constructions Suppliers</span> نلتزم بحماية خصوصيتك وأمان بياناتك الشخصية.
          </p>
          <p className="text-white/60 text-sm mt-3">آخر تحديث: سبتمبر 2026</p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-8" dir="rtl">

          {[
            {
              num: "1",
              title: "المعلومات التي نجمعها",
              content: (
                <>
                  <p>نقوم بجمع المعلومات التي تقدمها لنا مباشرةً عند التسجيل في المنصة أو استخدام خدماتنا، وتشمل:</p>
                  <ul className="list-disc list-inside space-y-1.5 pr-4 mt-2">
                    <li>الاسم الكامل وبيانات الاتصال (البريد الإلكتروني، رقم الهاتف)</li>
                    <li>معلومات الشركة أو المنشأة التجارية</li>
                    <li>بيانات الفواتير والمدفوعات</li>
                    <li>المحادثات وطلبات عروض الأسعار</li>
                    <li>بيانات الاستخدام والتفاعل مع المنصة</li>
                  </ul>
                  <p className="mt-2">كما نجمع تلقائياً بعض البيانات التقنية مثل عنوان IP ونوع المتصفح وبيانات ملفات تعريف الارتباط.</p>
                </>
              ),
            },
            {
              num: "2",
              title: "كيف نستخدم معلوماتك",
              content: (
                <ul className="list-disc list-inside space-y-1.5 pr-4">
                  <li>تقديم خدمات المنصة وإدارة حسابك</li>
                  <li>معالجة طلبات عروض الأسعار والتواصل بين الموردين والمقاولين</li>
                  <li>تحسين تجربة الاستخدام وتطوير المنصة</li>
                  <li>إرسال الإشعارات والتحديثات المتعلقة بالخدمة</li>
                  <li>ضمان أمان المنصة ومنع الاحتيال</li>
                  <li>الامتثال للمتطلبات القانونية والتنظيمية</li>
                </ul>
              ),
            },
            {
              num: "3",
              title: "مشاركة المعلومات مع الأطراف الثالثة",
              content: (
                <>
                  <p>لا نبيع أو نؤجر بياناتك الشخصية لأي طرف ثالث. قد نشارك معلوماتك في الحالات التالية فقط:</p>
                  <ul className="list-disc list-inside space-y-1.5 pr-4 mt-2">
                    <li><strong className="text-gray-800">مزودو الخدمات:</strong> شركاء موثوقون يساعدوننا في تشغيل المنصة</li>
                    <li><strong className="text-gray-800">المتطلبات القانونية:</strong> عند الضرورة القانونية أو أمر قضائي</li>
                    <li><strong className="text-gray-800">حماية الحقوق:</strong> لحماية حقوق المنصة أو مستخدميها</li>
                  </ul>
                </>
              ),
            },
            {
              num: "4",
              title: "أمان البيانات",
              content: (
                <ul className="list-disc list-inside space-y-1.5 pr-4">
                  <li>تشفير البيانات أثناء النقل والتخزين (SSL/TLS)</li>
                  <li>قيود صارمة على الوصول الداخلي للبيانات</li>
                  <li>مراقبة مستمرة للأنظمة وتدقيقات أمنية دورية</li>
                  <li>نسخ احتياطية منتظمة للبيانات</li>
                </ul>
              ),
            },
            {
              num: "5",
              title: "حقوقك",
              content: (
                <>
                  <ul className="list-disc list-inside space-y-1.5 pr-4">
                    <li>الوصول إلى بياناتك الشخصية المخزنة لدينا</li>
                    <li>تصحيح أي بيانات غير دقيقة</li>
                    <li>طلب حذف بياناتك (الحق في النسيان)</li>
                    <li>الاعتراض على معالجة بياناتك في حالات معينة</li>
                    <li>سحب موافقتك في أي وقت</li>
                  </ul>
                  <p className="mt-3">للمطالبة بأي من هذه الحقوق، يرجى التواصل معنا عبر: <a href="mailto:privacy@eng.prosental.online" className="text-[#EB682C] hover:underline font-bold">privacy@eng.prosental.online</a></p>
                </>
              ),
            },
          ].map(({ num, title, content }) => (
            <div key={num} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-extrabold text-[#0E2954] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#EB682C]/10 text-[#EB682C] rounded-lg flex items-center justify-center text-sm font-black shrink-0">{num}</span>
                {title}
              </h2>
              <div className="text-gray-700 leading-relaxed text-sm md:text-base space-y-2">{content}</div>
            </div>
          ))}

        </div>
      </section>

      <Footer />
    </main>
  );
}
