import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "الشروط والأحكام | Constructions Suppliers",
  description: "اقرأ شروط وأحكام استخدام منصة Constructions Suppliers قبل التسجيل.",
};

export default function ConditionsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal">
      <Navbar />

      <section className="bg-gradient-to-br from-[#1E293B] to-[#0E2954] text-white py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center" dir="rtl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-4 text-white">
            الشروط والأحكام
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">الشروط والأحكام</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            يُرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام منصة <span className="text-white font-bold">Constructions Suppliers</span>.
          </p>
          <p className="text-white/60 text-sm mt-3">آخر تحديث: سبتمبر 2026</p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-8" dir="rtl">

          <div className="bg-[#EB682C]/5 border border-[#EB682C]/20 rounded-2xl p-5">
            <p className="text-gray-800 text-sm leading-relaxed font-medium">
              باستخدامك لمنصة Constructions Suppliers، فإنك توافق على الالتزام بجميع الشروط والأحكام الواردة في هذه الوثيقة. إذا كنت لا توافق على أي بند من هذه الشروط، يُرجى التوقف عن استخدام المنصة.
            </p>
          </div>

          {[
            {
              num: "1",
              title: "قبول الشروط",
              body: "باستخدامك لمنصة Constructions Suppliers أو التسجيل فيها، فإنك تقر بأنك قرأت هذه الشروط وفهمتها وتوافق على الالتزام بها. تحتفظ المنصة بحق تعديل هذه الشروط في أي وقت مع الإشعار المسبق للمستخدمين.",
              list: null,
            },
            {
              num: "2",
              title: "شروط التسجيل والحساب",
              body: "لاستخدام خدمات المنصة، يجب عليك:",
              list: [
                "أن تكون بالغاً من العمر 18 عاماً أو أكثر أو تمثل كياناً تجارياً مسجلاً",
                "تقديم معلومات دقيقة وصحيحة عند التسجيل",
                "الحفاظ على سرية كلمة المرور الخاصة بحسابك",
                "إبلاغنا فوراً في حال الاشتباه في أي وصول غير مصرح به لحسابك",
                "عدم مشاركة بيانات الدخول مع أي طرف آخر",
              ],
            },
            {
              num: "3",
              title: "الاستخدام المقبول",
              body: "يلتزم المستخدم باستخدام المنصة للأغراض المشروعة فقط. يُحظر تحديداً:",
              list: [
                "نشر محتوى مضلل أو احتيالي أو مسيء",
                "انتهاك حقوق الملكية الفكرية لأي طرف ثالث",
                "إرسال رسائل غير مرغوب فيها أو إساءة استخدام نظام الرسائل",
                "محاولة اختراق أمان المنصة أو التلاعب بأنظمتها",
                "إنشاء حسابات وهمية أو انتحال صفة الغير",
              ],
            },
            {
              num: "4",
              title: "الاشتراكات والمدفوعات",
              body: null,
              list: [
                "تُحتسب رسوم الاشتراك وفقاً للباقة المختارة وتُجدَّد تلقائياً ما لم يتم الإلغاء",
                "جميع المدفوعات غير قابلة للاسترداد إلا في حالات استثنائية محددة",
                "يحق للمنصة تغيير أسعار الاشتراكات مع إشعار مسبق لا يقل عن 30 يوماً",
                "في حال التأخر في السداد، يحق للمنصة تعليق الحساب أو إلغاؤه",
              ],
            },
            {
              num: "5",
              title: "حدود المسؤولية",
              body: "لا تتحمل منصة Constructions Suppliers المسؤولية عن:",
              list: [
                "أي خسائر غير مباشرة أو عرضية ناتجة عن استخدام المنصة",
                "دقة أو اكتمال المعلومات المقدمة من الموردين أو المقاولين",
                "أي نزاعات تنشأ بين المستخدمين فيما بينهم",
                "أي انقطاع مؤقت في الخدمة لأسباب خارجة عن إرادتنا",
              ],
            },
            {
              num: "6",
              title: "إنهاء الخدمة",
              body: "يحق للمنصة إنهاء أو تعليق حسابك في أي وقت في حال:",
              list: [
                "انتهاك أي من هذه الشروط والأحكام",
                "ثبوت نشاط احتيالي أو مخالف للقانون",
                "عدم سداد رسوم الاشتراك",
                "طلب المستخدم نفسه لحذف الحساب",
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

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-extrabold text-[#0E2954] mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-[#EB682C]/10 text-[#EB682C] rounded-lg flex items-center justify-center text-sm font-black shrink-0">7</span>
              التواصل معنا
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              لأي استفسار حول هذه الشروط والأحكام، تواصل معنا على:
              <br /><br />
              البريد الإلكتروني: <a href="mailto:legal@eng.prosental.online" className="text-[#EB682C] hover:underline font-bold">legal@eng.prosental.online</a>
              <br />
              الموقع الإلكتروني: <a href="https://eng.prosental.online" className="text-[#EB682C] hover:underline font-bold">eng.prosental.online</a>
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
