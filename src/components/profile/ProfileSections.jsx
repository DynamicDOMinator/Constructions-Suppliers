import { MapPin } from "lucide-react";

export default function ProfileSections() {
  return (
    <div className="w-full bg-[#F8FAFC] pb-24 px-6 md:px-24" dir="rtl" data-aos="fade-up">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
        
        {/* Section 1: Company Information */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#2A5CBA] mb-4 font-tajawal">معلومات عن الشركة</h2>
          <p className="text-gray-600 text-sm leading-loose">
            شركة AS للمقاولات (الدوسري للإنشاءات) هي إحدى الشركات التابعة لمجموعة M. وتعد جزءاً من مجموعة أم بي القابضة. تتخصص الشركة في مجال الديكور
            والتشطيبات الدقيقة للعلامات التجارية ذات الأسماء المميزة. حيث يمثل هذا التخصص المسار الذي تتبعه لتقديم أعلى مستويات الجودة بما يضمن تحقيق رضا
            عملائها. تعد الشركة المقاول الرئيسي للعديد من العلامات التجارية العالمية المشهورة، مثل برجر كنج، ماكدونالدز، وكويز. ونلتزم بتنفيذ مشاريعنا وفق معايير دقيقة
            تجمع بين الجودة والاحترافية في التنفيذ. بدأ هذا القسم المتخصص عمله في عام 2011، وخلال هذه الفترة تم تطوير أكثر من 200 موقع. وتعود جذور مجموعة أم دي إلى عام 1920.
          </p>
        </section>

        {/* Section 2: Location and Socials */}
        <section className="flex md:flex-row-reverse flex-col  gap-6">
          {/* Socials */}
          <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col items-start justify-center">
            <h2 className="text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal">التواصل الاجتماعي</h2>
            <div className="flex items-center  gap-4">
              <a href="#" className="w-10 h-10 bg-[#EB682C] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-[#EB682C] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-[#EB682C] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              
            </div>
          </div>
          
          {/* Location */}
          <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
             <h2 className="text-xl font-bold text-[#2A5CBA] mb-4 font-tajawal relative z-10 w-full text-right">موقع الشركة</h2>
             <div className="flex items-center justify-between gap-2 mb-4 relative z-10 w-full text-sm text-gray-600">
               <div className="flex items-center gap-1">
  <MapPin className="w-5 h-5 text-green-600" />
                <span>السعودية الرياض مدينة الرياض</span>

               </div>
              

  <div className="w-[40%] h-[80px] bg-gray-200 rounded-xl overflow-hidden relative border border-gray-300">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map" className="w-full h-full object-cover opacity-50" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <button className="bg-[#EB682C] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">الموقع على الخريطة</button>
               </div>
             </div>

                
             </div>
             {/* Map Placeholder */}
           
          </div>
        </section>

        {/* Section 3: Brands */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal">العلامات التجارية</h2>
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-60">
            {/* Using text as placeholder for logos */}
            <div className="font-bold text-xl text-gray-800 flex items-center gap-2"><span className="text-2xl">GF+</span></div>
            <div className="font-bold text-xl text-gray-800">BTT</div>
            <div className="font-bold text-xl text-gray-800">Brand 3</div>
            <div className="font-bold text-xl text-gray-800">Brand 4</div>
            <div className="font-bold text-xl text-gray-800">Brand 5</div>
            <div className="font-bold text-xl text-gray-800 flex items-center gap-2"><span className="text-2xl">GF+</span></div>
          </div>
        </section>

        {/* Section 4: Contractors */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal">المقاولون</h2>
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-60">
            {/* Using text as placeholder for logos */}
            <div className="font-bold text-xl text-gray-800 flex items-center gap-2"><span className="text-2xl">GF+</span></div>
            <div className="font-bold text-xl text-gray-800">BTT</div>
            <div className="font-bold text-xl text-gray-800">Contr 3</div>
            <div className="font-bold text-xl text-gray-800">Contr 4</div>
            <div className="font-bold text-xl text-gray-800">Contr 5</div>
            <div className="font-bold text-xl text-gray-800 flex items-center gap-2"><span className="text-2xl">GF+</span></div>
          </div>
        </section>

        {/* Section 5: Products */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal">المنتجات</h2>
          <div className="grid md:grid-cols-2 grid-cols-1  gap-6">
            
            {/* Product 1 */}
            <div className="flex flex-col md:flex-row items-start gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="w-full md:w-48 h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                 <img src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=400" alt="Product" className="w-full h-full object-contain p-2 mix-blend-multiply" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-gray-900 text-lg mb-1 font-tajawal">مركز قطع غيار السعودية</h3>
                <p className="text-gray-500 text-sm mb-2">موديل: XT-9080</p>
                <p className="text-gray-500 text-xs mb-4">شركة مواد صناعية عالية الأداء مخصصة للعمل في البيئات التشغيلية القاسية وتلبية احتياجات المحطات الصناعية</p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">خصم 10% ريال</span>
                    <span className="text-gray-400 text-sm">/ للوحدة</span>
                  </div>
                  <button className="bg-[#EB682C] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#d65a22] transition-colors">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="flex flex-col md:flex-row items-start gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="w-full md:w-48 h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                 <img src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=400" alt="Product" className="w-full h-full object-contain p-2 mix-blend-multiply" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-gray-900 text-lg mb-1 font-tajawal">مركز قطع غيار السعودية</h3>
                <p className="text-gray-500 text-sm mb-2">موديل: XT-9080</p>
                <p className="text-gray-500 text-xs mb-4">شركة مواد صناعية عالية الأداء مخصصة للعمل في البيئات التشغيلية القاسية وتلبية احتياجات المحطات الصناعية</p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">خصم 10% ريال</span>
                    <span className="text-gray-400 text-sm">/ للوحدة</span>
                  </div>
                  <button className="bg-[#EB682C] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#d65a22] transition-colors">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 6: Services */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal">الخدمات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Service 1 */}
            <div className="flex flex-row-reverse items-start gap-4 p-4">
              <div className="flex-1 text-right">
                <h3 className="font-bold text-gray-900 text-base mb-2 font-tajawal">صيانة - توريد - تنفيذ برك السباحة</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">شركة مواد صناعية عالية الأداء مخصصة للعمل في البيئات التشغيلية القاسية وتلبية احتياجات المحطات الصناعية</p>
                <button className="w-full bg-[#EB682C] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#d65a22] transition-colors">
                  طلب عرض تسعير
                </button>
              </div>
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img src="/service.png" alt="Service" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex flex-row-reverse items-start gap-4 p-4">
              <div className="flex-1 text-right">
                <h3 className="font-bold text-gray-900 text-base mb-2 font-tajawal">صيانة - توريد - تنفيذ برك السباحة</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">شركة مواد صناعية عالية الأداء مخصصة للعمل في البيئات التشغيلية القاسية وتلبية احتياجات المحطات الصناعية</p>
                <button className="w-full bg-[#EB682C] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#d65a22] transition-colors">
                  طلب عرض تسعير
                </button>
              </div>
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img src="/service.png" alt="Service" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex flex-row-reverse items-start gap-4 p-4">
              <div className="flex-1 text-right">
                <h3 className="font-bold text-gray-900 text-base mb-2 font-tajawal">صيانة - توريد - تنفيذ برك السباحة</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">شركة مواد صناعية عالية الأداء مخصصة للعمل في البيئات التشغيلية القاسية وتلبية احتياجات المحطات الصناعية</p>
                <button className="w-full bg-[#EB682C] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#d65a22] transition-colors">
                  طلب عرض تسعير
                </button>
              </div>
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img src="/service.png" alt="Service" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex flex-row-reverse items-start gap-4 p-4">
              <div className="flex-1 text-right">
                <h3 className="font-bold text-gray-900 text-base mb-2 font-tajawal">صيانة - توريد - تنفيذ برك السباحة</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">شركة مواد صناعية عالية الأداء مخصصة للعمل في البيئات التشغيلية القاسية وتلبية احتياجات المحطات الصناعية</p>
                <button className="w-full bg-[#EB682C] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#d65a22] transition-colors">
                  طلب عرض تسعير
                </button>
              </div>
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img src="/service.png" alt="Service" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
