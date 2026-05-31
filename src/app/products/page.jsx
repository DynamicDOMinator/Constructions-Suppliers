import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsSidebar from "@/components/products/ProductsSidebar";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/products/Pagination";

export default function ProductsPage() {
  // Mock products data matching the screenshot
  const mockProduct = {
    title: "مركز قطع غيار السعودية",
    model: "XT-5000",
    description: "شركة مواد صناعية عالية الأداء مخصصة للعمل في البيئات التشغيلية القاسية وتلبية احتياجات",
    discount: "100",
    unit: "للوحدة",
  };

  // Generate 14 placeholder items for the grid
  const products = Array(14).fill(mockProduct);

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-tajawal text-right">
      <Navbar />
      
      <ProductsHeader />

      <section className="py-8 px-6 md:px-12 w-full" dir="rtl">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar (Right in RTL) */}
          <ProductsSidebar />

          {/* Main Grid (Left in RTL) */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              {products.map((product, idx) => (
                <ProductCard key={idx} {...product} />
              ))}
            </div>

            {/* Pagination controls at the bottom of the grid */}
            <Pagination />
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
