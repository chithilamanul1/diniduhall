import Navbar from "@/components/RoadHouseNavbar";
import Footer from "@/components/RoadHouseFooter";
export default function About() {
  return (
    <main className="min-h-screen bg-[#5e565a]">
      <Navbar />
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
         <h1 className="text-5xl md:text-7xl font-black text-[#efecca] uppercase mb-12">Our <span className="text-[#a9cbb7]">Story</span></h1>
         <p className="text-[#efecca] text-lg">Road House is the ultimate food district in Seeduwa. Part of Seeduwa Hospitality Group.</p>
      </section>
      <Footer />
    </main>
  );
}