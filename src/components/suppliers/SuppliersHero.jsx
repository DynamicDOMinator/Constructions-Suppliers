export default function SuppliersHero() {
  return (
    <section className="relative w-[1500px] mx-auto h-[350px] md:h-[400px] bg-slate-900 rounded-[2rem] overflow-hidden shadow-lg mt-6" dir="rtl" data-aos="fade-up">
      {/* Background Image (Placeholder) */}
      <img 
        src="suppliers.png" 
        alt="Suppliers Hero" 
        className="absolute inset-0 w-full h-full "
      />
  
    
      
      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <h1 className="text-white text-4xl md:text-5xl font-bold font-tajawal drop-shadow-md">
          الموردين
        </h1>
      </div>
    </section>
  );
}
