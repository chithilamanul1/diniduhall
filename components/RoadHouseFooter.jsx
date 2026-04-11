import { MapPin, Phone, Clock, Facebook, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#18181b] border-t-4 border-[#ff934f] pt-16 pb-8 text-[#efecca]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
           <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#f7ff58] text-[#5e565a] font-black text-xl flex items-center justify-center -skew-x-12">RH</div>
              <span className="text-3xl font-black italic uppercase">ROAD HOUSE</span>
           </div>
           <p className="text-[#a9cbb7] max-w-sm mb-6">
             The ultimate food district in Seeduwa. 8 Zones, Live Music, and the best Street Food in town.
           </p>
           <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#4a4448] flex items-center justify-center hover:bg-[#ff934f] hover:text-[#5e565a] transition-colors"><Facebook size={20}/></a>
              <a href="#" className="w-10 h-10 bg-[#4a4448] flex items-center justify-center hover:bg-[#ff934f] hover:text-[#5e565a] transition-colors"><Instagram size={20}/></a>
           </div>
        </div>

        {/* Contact Info */}
        <div>
           <h4 className="text-[#ff934f] font-bold uppercase tracking-widest mb-6 text-sm">Location & Contact</h4>
           <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                 <MapPin className="text-[#f7ff58] shrink-0" size={18} />
                 <span>24, Kotugoda Rd,<br/>Seeduwa, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                 <Phone className="text-[#f7ff58] shrink-0" size={18} />
                 <a href="tel:0777328155" className="hover:text-[#ff934f] font-bold text-lg">077 732 8155</a>
              </li>
              <li className="flex items-center gap-3">
                 <Mail className="text-[#f7ff58] shrink-0" size={18} />
                 <a href="mailto:roadhouseseeduwa@gmail.com" className="hover:text-[#ff934f]">roadhouseseeduwa@gmail.com</a>
              </li>
           </ul>
        </div>

        {/* Hours */}
        <div>
           <h4 className="text-[#ff934f] font-bold uppercase tracking-widest mb-6 text-sm">Opening Hours</h4>
           <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                 <Clock className="text-[#f7ff58] shrink-0" size={18} />
                 <div>
                    <span className="block font-bold text-white">Daily Open</span>
                    <span className="text-[#a9cbb7]">10:00 AM - 11:00 PM</span>
                 </div>
              </li>
              <li className="mt-4 pt-4 border-t border-[#4a4448]">
                 <span className="block font-bold text-white">Happy Hour</span>
                 <span className="text-[#a9cbb7]">5:00 PM - 7:00 PM</span>
              </li>
           </ul>
        </div>
      </div>

      <div className="border-t border-[#4a4448] pt-8 text-center text-xs text-[#a9cbb7] font-mono uppercase tracking-widest">
         &copy; {new Date().getFullYear()} Road House Seeduwa. All Rights Reserved.
      </div>
    </footer>
  );
}