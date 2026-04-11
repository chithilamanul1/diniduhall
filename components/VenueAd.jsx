import { ArrowRight, PartyPopper } from "lucide-react";
export default function VenueAd() {
  return (
    <section className="bg-[#4a4448] border-y-4 border-[#ff934f] py-16 px-6">
      <div className="max-w-6xl mx-auto bg-[#5e565a] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        <div className="p-10 md:p-16 flex-1 flex flex-col justify-center relative z-10">
           <div className="inline-flex items-center gap-2 text-[#ff934f] font-bold tracking-widest text-xs uppercase mb-4"><PartyPopper size={16} /> Partner Venue</div>
           <h2 className="text-3xl md:text-5xl font-black text-[#efecca] uppercase mb-6 leading-tight">Planning a <span className="text-[#f7ff58]">Wedding?</span></h2>
           <p className="text-[#a9cbb7] text-lg mb-8 max-w-md">Experience luxury at Dinidu Banquet Hall.</p>
           <a href="https://dinidugardens.lk" target="_blank" className="inline-flex items-center gap-3 text-[#efecca] font-bold uppercase tracking-widest border-b-2 border-[#ff934f] pb-1 hover:text-[#ff934f] transition-colors w-fit">Visit Dinidu Gardens <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}