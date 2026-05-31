import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogContent from "@/components/blogs/BlogContent";

export default function SingleBlogPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFC] flex flex-col font-tajawal text-right">
      <Navbar />
      
      <BlogContent />

      <Footer />
    </main>
  );
}
