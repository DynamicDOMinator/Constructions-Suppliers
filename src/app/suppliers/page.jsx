import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuppliersHero from "@/components/suppliers/SuppliersHero";
import SuppliersSidebar from "@/components/suppliers/SuppliersSidebar";
import SupplierCard from "@/components/suppliers/SupplierCard";

export default function SuppliersPage() {
  // Mock data to match the screenshot
  const suppliers = [
    { id: 1, status: "متميز", title: "شركات الحلول الصناعية", category: "تصنيع قطع غيار كهربائية", description: "شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية.", city: "الرياض", isSubcontractor: false },
    { id: 2, status: "اساسي", title: "شركات الحلول الصناعية", category: "تصنيع قطع غيار كهربائية", description: "شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية.", city: "الرياض", isSubcontractor: false },
    { id: 3, status: "متقدم", title: "شركات الحلول الصناعية", category: "تصنيع قطع غيار كهربائية", description: "شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية.", city: "الرياض", isSubcontractor: false },
    { id: 4, status: "متميز", title: "شركات الحلول الصناعية", category: "تصنيع قطع غيار كهربائية", description: "شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية.", city: "الرياض", isSubcontractor: false },
    { id: 5, status: "اساسي", title: "شركات الحلول الصناعية", category: "تصنيع قطع غيار كهربائية", description: "شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية.", city: "الرياض", isSubcontractor: false },
    { id: 6, status: "متقدم", title: "شركات الحلول الصناعية", category: "تصنيع قطع غيار كهربائية", description: "شركة SPC هي شركة موثوقة متخصصة في تصنيع قطع غيار عالية الجودة للقطاعات الصناعية والكهربائية.", city: "الرياض", isSubcontractor: false }
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal">
      <Navbar />
      
      <SuppliersHero />

      <section className="py-12 px-6 md:px-12 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-8" dir="rtl">
        {/* Sidebar (Right in RTL) */}
        <SuppliersSidebar />

        {/* Main Grid (Left in RTL) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <SupplierCard key={supplier.id} {...supplier} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
