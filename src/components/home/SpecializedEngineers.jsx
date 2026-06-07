import Link from "next/link";

export default function SpecializedEngineers() {
  return (
        <section className="py-20 px-6 md:px-12 bg-[#F9FAFC]" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#EB682C]">
              مهندسون <span className="text-black">متخصصون</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { name: "أحمد علي", role: "استشاري معماري", image: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "محمد خالد", role: "مهندس مدني", image: "https://randomuser.me/api/portraits/men/44.jpg" },
              { name: "سعيد سالم", role: "مدير مشاريع", image: "https://randomuser.me/api/portraits/men/67.jpg" },
              { name: "أسامة جلال", role: "مهندس كهرباء", image: "https://randomuser.me/api/portraits/men/22.jpg" },
            
            ].map((person, i) => (
              <div key={i} className="flex flex-col items-center  group cursor-pointer">
                <div className="w-[224px] h-[224px]  mb-4    transition-colors relative">
                  <img src={person.image} alt={person.name} className="w-full rounded-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <h3 className="font-bold text-black text-lg mb-1">{person.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{person.role}</p>
                <p className="text-xs text-gray-500 mb-3 text-center max-w-[160px]">خبرة في الاشراف علي اعمال التشطيبات والديكور</p>
                <Link href="/chat" className="w-full">
                  <button className="bg-[#EB682C] text-center text-white text-xs px-6 py-2 rounded-full group-hover:bg-[#EB682C] group-hover:text-white transition-colors w-full font-bold shadow-sm">
                    ابدء المحادثة
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>
  );
}
