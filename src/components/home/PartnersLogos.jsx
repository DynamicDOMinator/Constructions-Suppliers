import Image from "next/image";

export default function PartnersLogos() {
  return (
    <section className="py-10  bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-between items-center opacity-60 grayscale gap-8 md:gap-4">
        {/* Placeholders for logos */}
        <Image src="/partner.png" alt="" width={80} height={80} />
        <Image src="/partner.png" alt="" width={80} height={80} />
        <Image src="/partner.png" alt="" width={80} height={80} />
        <Image src="/partner.png" alt="" width={80} height={80} />
        <Image src="/partner.png" alt="" width={80} height={80} />
        <Image src="/partner.png" alt="" width={80} height={80} />
 
      </div>
    </section>
  );
}
