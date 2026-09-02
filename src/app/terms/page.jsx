import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "شروط الاستخدام | Constructions Suppliers",
  description: "تعرّف على شروط استخدام منصة Constructions Suppliers والقواعد التي تحكم علاقتنا مع المستخدمين.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal">
      <Navbar />

      <section className="bg-gradient-to-br from-[#0E2954] via-[#1a3d7a] to-[#0E2954] text-white py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center" dir="rtl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-4 text-white">
            شروط الاستخدام
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">شروط الاستخدام</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            تُحدد هذه الوثيقة القواعد والضوابط التي تحكم استخدامك لخدمات <span className="text-white font-bold">Constructions Suppliers</span>.
          </p>
          <p className="text-white/60 text-sm mt-3">آخر تحديث: سبتمبر 2026</p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-8" dir="rtl">

          {[
            {
              num: "1",
              title: "طبيعة المنصة ودورها",
              body: "منصة Constructions Suppliers هي منصة رقمية تُتيح التواصل بين المقاولين والموردين وشركات البناء في المنطقة العربية. المنصة تعمل كوسيط تقني فحسب، وليست طرفاً في أي عقد أو صفقة تجارية تُبرم بين المستخدمين.",
              list: null,
            },
            {
              num: "2",
              title: "أهلية الاستخدام",
              body: "يُسمح باستخدام المنصة للفئات التالية:",
              list: [
                "شركات المقاولات والإنشاءات المسجلة رسمياً",
                "موردو مواد البناء والخدمات الهندسية",
                "المهندسون والاستشاريون الهندسيون",
                "أصحاب المشاريع والمطورون العقاريون",
                "أي جهة ذات صلة بقطاع البناء والتشييد",
              ],
            },
            {
              num: "3",
              title: "قواعد نشر المنتجات والخدمات",
              body: "يلتزم الموردون عند إدراج منتجاتهم وخدماتهم بما يلي:",
              list: [
                "تقديم معلومات دقيقة وصحيحة عن المنتجات والخدمات",
                "عدم نشر أسعار مضللة أو عروض وهمية",
                "الحرص على تحديث المعلومات والأسعار بشكل منتظم",
                "عدم نشر منتجات مقلدة أو منتهكة لحقوق الملكية الفكرية",
                "الالتزام بمعايير الجودة المعلنة في إدراجات المنتجات",
              ],
            },
            {
              num: "4",
              title: "ضوابط التواصل وطلبات الأسعار",
              body: null,
              list: [
                "يجب أن تكون طلبات عروض الأسعار جدية وذات نية حقيقية للشراء",
                "يُحظر استخدام نظام الرسائل لأغراض الترويج أو الإعلان غير المصرح به",
                "يجب الرد على طلبات الأسعار في غضون وقت معقول",
                "يُحظر مشاركة معلومات اتصال بديلة بهدف التحايل على المنصة",
                "الالتزام بالاحترام والمهنية في جميع التواصلات",
              ],
            },
            {
              num: "5",
              title: "نظام التقييمات والمراجعات",
              body: "يخضع نظام التقييم للقواعد التالية:",
              list: [
                "لا يحق تقديم تقييمات إلا بعد إتمام صفقة فعلية",
                "يجب أن تعكس التقييمات التجربة الحقيقية للمستخدم بدقة وأمانة",
                "يُحظر التلاعب بالتقييمات أو تبادلها بشكل مصطنع",
                "تحتفظ المنصة بحق إزالة أي تقييم مخالف لهذه القواعد",
              ],
            },
            {
              num: "6",
              title: "الملكية الفكرية",
              body: null,
              list: [
                "جميع محتويات المنصة (التصميم، الكود، الشعار) هي ملكية خاصة لـ Constructions Suppliers",
                "يمنح المستخدمون المنصة ترخيصاً غير حصري لعرض محتواهم المُدرج",
                "يُحظر نسخ أو تعديل أو إعادة توزيع محتوى المنصة دون إذن كتابي مسبق",
                "يتحمل المستخدم كامل المسؤولية عن أي محتوى يرفعه على المنصة",
              ],
            },
            {
              num: "7",
              title: "القانون الحاكم وتسوية النزاعات",
              body: "تخضع هذه الشروط للقوانين المعمول بها في المملكة العربية السعودية. في حال نشوء أي نزاع:",
              list: [
                "يُشجع الطرفان أولاً على التوصل إلى حل ودّي",
                "في حال تعذّر الحل الودّي، يُحال النزاع إلى الجهات القضائية المختصة في المملكة العربية السعودية",
                "يحق للمنصة اللجوء إلى أي إجراء قانوني لحماية حقوقها وحقوق مستخدميها",
              ],
            },
          ].map(({ num, title, body, list }) => (
            <div key={num} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-extrabold text-[#0E2954] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#EB682C]/10 text-[#EB682C] rounded-lg flex items-center justify-center text-sm font-black shrink-0">{num}</span>
                {title}
              </h2>
              <div className="text-gray-700 leading-relaxed text-sm md:text-base space-y-2">
                {body && <p>{body}</p>}
                {list && (
                  <ul className="list-disc list-inside space-y-1.5 pr-4 mt-2">
                    {list.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                )}
              </div>
            </div>
          ))}

          <div className="bg-[#0E2954] rounded-3xl p-8 text-white text-center">
            <h2 className="text-xl font-extrabold mb-3 text-white">هل لديك استفسار؟</h2>
            <p className="text-white/70 text-sm mb-4">فريقنا القانوني مستعد للإجابة على جميع استفساراتك</p>
            <a
              href="mailto:legal@eng.prosental.online"
              className="inline-flex items-center gap-2 bg-[#EB682C] text-white px-6 py-3 rounded-full font-extrabold text-sm hover:bg-[#d9571e] transition-colors shadow-lg"
            >
              legal@eng.prosental.online
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
