export default function ProfileHero() {
  return (
    <div className="relative w-full h-[250px] md:h-[350px] bg-slate-100" dir="rtl" data-aos="fade-up">
      {/* Banner Image */}
      <img 
        src="/suppliers.png" 
        alt="Company Banner" 
        className="w-full h-full object-cover"
      />
      
      {/* Overlapping Logo */}
      <div className="absolute -bottom-16 right-8 md:right-24 w-32 h-32 rounded-full bg-[#E5E9F2] border-4 border-white shadow-md flex items-center justify-center">
        <span className="text-4xl font-bold text-gray-800">U</span>
      </div>
    </div>
  );
}
