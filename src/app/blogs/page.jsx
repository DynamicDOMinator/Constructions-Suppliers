import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsHero from "@/components/blogs/BlogsHero";
import BlogsGrid from "@/components/blogs/BlogsGrid";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] flex flex-col font-tajawal text-right">
      <Navbar />
      
      <BlogsHero />
      <BlogsGrid />

      <Footer />
    </main>
  );
}
