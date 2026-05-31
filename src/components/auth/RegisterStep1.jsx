export default function RegisterStep1({ onNext }) {
  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">إنشاء حساب جديد</h1>
        <p className="text-gray-500 text-sm">أهلاً بك! أنشئ حسابك الآن لتبدأ رحلتك معنا، واستمتع بالعروض والخدمات</p>
      </div>

      <form className="flex flex-col gap-5">
        
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 text-right w-1/2">
            <label className="text-sm font-bold text-gray-700">الاسم الأول</label>
            <input type="text" placeholder="أحمد" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C]" />
          </div>
          <div className="flex flex-col gap-2 text-right w-1/2">
            <label className="text-sm font-bold text-gray-700">الاسم الأخير</label>
            <input type="text" placeholder="محمد" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C]" />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">رقم الهاتف</label>
          <div className="flex flex-row-reverse h-12 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#EB682C]">
            <input type="tel" className="flex-1 h-full px-4 text-sm focus:outline-none text-left" dir="ltr" />
            <div className="h-full px-4 bg-gray-50 border-r border-gray-200 flex items-center justify-center gap-2 shrink-0">
              <span className="text-sm font-bold text-gray-600" dir="ltr">+966</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">البريد الإلكتروني</label>
          <input type="email" placeholder="example@gmail.com" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left" dir="ltr" />
        </div>

        <div className="flex flex-col gap-2 text-right">
          <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
          <input type="password" placeholder="********" className="w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left" dir="ltr" />
        </div>

        <button 
          type="button" 
          onClick={onNext}
          className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors mt-4"
        >
          إنشاء الحساب
        </button>

      </form>
    </div>
  );
}
