import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, MapPin, Mail } from "lucide-react";

export const metadata = {
  title: "Book a Table | Road House",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#5e565a]">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* LEFT: INFO CARD */}
            <div className="bg-[#4a4448] p-10 border-l-8 border-[#f7ff58] shadow-2xl h-fit">
                <h2 className="text-3xl font-black text-[#efecca] uppercase mb-8">Contact Info</h2>
                
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#5e565a] flex items-center justify-center text-[#ff934f]">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h4 className="text-[#f7ff58] font-bold uppercase tracking-widest text-xs mb-1">Address</h4>
                            <p className="text-[#efecca] font-medium">24, Kotugoda Rd,<br/>Seeduwa, Sri Lanka</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#5e565a] flex items-center justify-center text-[#ff934f]">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h4 className="text-[#f7ff58] font-bold uppercase tracking-widest text-xs mb-1">Hotline</h4>
                            <p className="text-[#efecca] font-bold text-lg">077 732 8155</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#5e565a] flex items-center justify-center text-[#ff934f]">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="text-[#f7ff58] font-bold uppercase tracking-widest text-xs mb-1">Email</h4>
                            <p className="text-[#efecca]">roadhouseseeduwa@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="bg-[#4a4448] p-10 border-t-8 border-[#ff934f] shadow-2xl relative">
                <div className="absolute top-4 right-4 bg-[#f7ff58] text-[#5e565a] text-xs font-bold px-3 py-1 uppercase -rotate-6">
                   Table / Events
                </div>

                <h1 className="text-4xl font-black uppercase mb-8 text-center text-white">Reservation</h1>
                <form className="space-y-6">
                   <input type="text" placeholder="YOUR NAME" className="w-full bg-[#5e565a] border-b-2 border-[#a9cbb7] p-4 outline-none text-white font-bold uppercase focus:border-[#ff934f] transition-colors" />
                   <input type="tel" placeholder="PHONE NUMBER" className="w-full bg-[#5e565a] border-b-2 border-[#a9cbb7] p-4 outline-none text-white font-bold uppercase focus:border-[#ff934f] transition-colors" />
                   
                   <div className="grid grid-cols-2 gap-4">
                      <input type="date" className="w-full bg-[#5e565a] border-b-2 border-[#a9cbb7] p-4 outline-none text-white font-bold uppercase focus:border-[#ff934f]" />
                      <input type="time" className="w-full bg-[#5e565a] border-b-2 border-[#a9cbb7] p-4 outline-none text-white font-bold uppercase focus:border-[#ff934f]" />
                   </div>

                   <button className="w-full py-4 bg-[#ff934f] text-[#5e565a] font-black uppercase tracking-[0.2em] text-lg hover:bg-[#f7ff58] transition-colors mt-4 shadow-lg">
                      Confirm Booking
                   </button>
                </form>
            </div>

         </div>
      </section>

      <Footer />
    </main>
  );
}