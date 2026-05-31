export default function ProductsSidebar() {
  const categories = [
    "دهانات وكيماويات",
    "اضاءة ومفاتيح",
    "الومنيوم وزجاج",
    "صحي وسباكة",
    "انذار واطفاء حريق",
    "مواد بناء وعزل",
    "اجهزة مساحية",
    "امن صناعي",
    "كهرباء",
    "ابواب",
    "ارضيات",
    "مصاعد",
    "تكييفات",
    "رخام وجرانيت",
    "المستقل",
    "اخرى"
  ];

  return (
    <aside className="w-full lg:w-[250px] flex-shrink-0 font-tajawal" dir="rtl" data-aos="fade-up">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 mb-6 text-right">تصفية</h3>
        
        <div className="flex flex-col gap-4">
          {categories.map((cat, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded-[4px] bg-white group-hover:border-[#EB682C] transition-colors">
                <input 
                  type="checkbox" 
                  className="absolute opacity-0 cursor-pointer w-full h-full peer"
                />
                <svg className="w-3 h-3 text-white hidden peer-checked:block pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="absolute inset-0 bg-[#EB682C] rounded-[3px] hidden peer-checked:block -z-10 pointer-events-none"></div>
              </div>
              <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
