export default function ContactHero() {
  return (
    <section className="px-6 md:px-12 pt-6" dir="rtl" data-aos="fade-up">
      <div className="relative w-full h-[250px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-lg bg-slate-900">
        {/* Background Image (Placeholder) */}
        <img
          src="/callus-2.png"
          alt="Contact Us Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

     

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold font-tajawal drop-shadow-md">
            تواصل معنا
          </h1>
        </div>
      </div>
    </section>
  );
}
