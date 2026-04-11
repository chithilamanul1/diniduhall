'use client';
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#5e565a] border-b border-[#f7ff58]/20 shadow-xl">
      <div className="bg-[#4a4448] text-[10px] font-bold tracking-[0.2em] px-6 py-2 flex justify-between items-center text-[#efecca] uppercase">
        <span className="hidden md:block opacity-70">The Food District</span>
        <a href="https://dinidugardens.lk" target="_blank" className="flex items-center gap-2 hover:text-[#f7ff58] transition-colors cursor-pointer group ml-auto">
            <span>Visit Dinidu Banquet Hall</span>
            <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"/>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
           <div className="w-12 h-12 bg-[#ff934f] -skew-x-12 flex items-center justify-center border-2 border-[#efecca] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-1 group-hover:shadow-none transition-all">
             <span className="font-black text-[#5e565a] text-xl skew-x-12">RH</span>
           </div>
           <div className="flex flex-col">
             <span className="font-bold text-2xl text-[#efecca] tracking-widest leading-none">ROAD<span className="text-[#f7ff58]">HOUSE</span></span>
             <span className="text-[9px] text-[#a9cbb7] tracking-[0.4em] uppercase font-bold mt-1">Seeduwa</span>
           </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#zones" className="text-xs font-bold text-[#efecca]/80 hover:text-[#f7ff58] transition-colors uppercase tracking-widest">Zones</Link>
          <Link href="/#menu" className="text-xs font-bold text-[#efecca]/80 hover:text-[#f7ff58] transition-colors uppercase tracking-widest">Menu</Link>
          <Link href="/events" className="text-xs font-bold text-[#efecca]/80 hover:text-[#f7ff58] transition-colors uppercase tracking-widest">Events</Link>
          <Link href="/gallery" className="text-xs font-bold text-[#efecca]/80 hover:text-[#f7ff58] transition-colors uppercase tracking-widest">Gallery</Link>
          <Link href="/contact" className="px-6 py-3 bg-[#f7ff58] text-[#5e565a] font-black uppercase text-xs tracking-widest hover:bg-white transition-colors skew-x-[-10deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
            Book Table
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#efecca]">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-28 left-0 w-full h-screen bg-[#5e565a] p-8 flex flex-col gap-8 z-40 border-t border-[#f7ff58]/20">
          <Link href="/#zones" className="text-2xl font-bold text-[#efecca] uppercase">Zones</Link>
          <Link href="/#menu" className="text-2xl font-bold text-[#efecca] uppercase">Menu</Link>
          <Link href="/events" className="text-2xl font-bold text-[#efecca] uppercase">Events</Link>
          <Link href="/gallery" className="text-2xl font-bold text-[#efecca] uppercase">Gallery</Link>
          <Link href="/admin" className="text-sm text-[#a9cbb7] uppercase">Admin</Link>
        </div>
      )}
    </nav>
  );
}