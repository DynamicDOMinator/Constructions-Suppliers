export default function ConsultantBanner() {
  return (
        <section className="py-10 px-6 md:px-12 bg-[#F9FAFC]" data-aos="fade-up">
          <div className="max-w-6xl mx-auto h-[250px] md:h-[300px] bg-[#0B0C0F] rounded-2xl relative overflow-hidden flex items-center shadow-2xl">
            {/* Background texture/image */}
            <div className="absolute inset-0 opacity-40">
               <img src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover" />
            </div>
            {/* Diagonal overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 bg-gradient-to-l from-[#0B0C0F] to-transparent z-10"></div>
            
            <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between px-10 md:px-20 h-full">
              {/* Left Logo */}
              <div className="flex items-center gap-2 mb-6 md:mb-0 opacity-80">
                <div className="text-white font-bold text-2xl text-right leading-none">
                  <div>CONSTRUCTIONS</div>
                  <div className="text-gray-400">SUPPLIERS</div>
                </div>
              </div>

              {/* Right content */}
              <div className="text-white text-center md:text-right flex flex-col items-center md:items-end">
                <h2 className="text-4xl md:text-6xl font-bold mb-2">Daniel Gallego</h2>
                <p className="text-xl md:text-2xl text-gray-300 font-light mb-4">Consultant</p>
                <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400 bg-white/10 px-6 py-3 rounded-full backdrop-blur-md border border-white/20">
                  <span>123-456-7890</span>
                  <span className="hidden md:inline">|</span>
                  <span>hello@reallygreatsite.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}
