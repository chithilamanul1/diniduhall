const fs = require('fs');
const path = 'd:\\dev\\Airport Taxi tours\\src\\components\\views\\Prices.jsx';

let content = fs.readFileSync(path, 'utf8');

// Replace dark mode and black brutalist classes
content = content.replace(/dark:bg-emerald-900/g, '');
content = content.replace(/dark:text-white/g, '');
content = content.replace(/dark:bg-slate-800/g, '');
content = content.replace(/dark:hover:bg-white\/5/g, '');
content = content.replace(/dark:border-white\/10/g, '');
content = content.replace(/dark:border-white\/5/g, '');
content = content.replace(/dark:text-slate-500/g, '');
content = content.replace(/dark:text-slate-400/g, '');
content = content.replace(/dark:text-emerald-400/g, '');

// Luxury design replacements
// Header
content = content.replace(/text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-tighter/g, 'text-4xl md:text-5xl font-black text-emerald-950 mb-4 tracking-tight');
content = content.replace(/text-black\/60 max-w-2xl mx-auto font-bold uppercase text-xs tracking-widest/g, 'text-gray-500 max-w-2xl mx-auto font-medium text-sm');
content = content.replace(/outline-black/g, '');

// Panels
content = content.replace(/bg-white p-8 md:p-12 rounded-none border-4 border-black/g, 'bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-2xl');
content = content.replace(/bg-slate-50 p-1\.5 rounded-none border-4 border-black/g, 'bg-slate-50/50 p-1.5 rounded-2xl border border-gray-100 shadow-inner');
content = content.replace(/bg-slate-50 px-4 py-3 rounded-none border-4 border-black/g, 'bg-slate-50/50 px-4 py-3 rounded-2xl border border-gray-100 shadow-inner');

// Inputs
content = content.replace(/bg-slate-50 border-4 border-black px-6 py-4 rounded-none focus:ring-0 outline-none text-black placeholder:text-gray-400 font-bold/g, 'bg-slate-50/50 border border-gray-200 px-6 py-4 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#FACC15]/30 focus:border-[#FACC15] outline-none text-emerald-950 placeholder:text-gray-400 font-medium transition-all shadow-sm');
content = content.replace(/bg-slate-50 border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-emerald-900\/20 outline-none/g, 'bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#FACC15]/30 focus:border-[#FACC15] outline-none shadow-sm transition-all');

// Selects
content = content.replace(/bg-slate-50 border-4 border-black px-6 py-4 rounded-none focus:ring-0 outline-none cursor-pointer text-black font-bold/g, 'bg-slate-50/50 border border-gray-200 px-6 py-4 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#FACC15]/30 focus:border-[#FACC15] outline-none cursor-pointer text-emerald-950 font-medium transition-all shadow-sm');

// Checkbox
content = content.replace(/bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full/g, 'bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full');

// Buttons / Controls
content = content.replace(/bg-white border-2 border-black rounded-none text-black font-black hover:bg-\[#FACC15\]/g, 'bg-white border border-gray-200 rounded-xl text-emerald-950 font-bold hover:bg-[#FACC15]/10 hover:border-[#FACC15]');
content = content.replace(/bg-black text-\[#FACC15\]/g, 'bg-[#FACC15] text-emerald-950 shadow-md');
content = content.replace(/text-black\/40 hover:text-black/g, 'text-gray-400 hover:text-emerald-950');

// Labels
content = content.replace(/text-sm font-bold text-gray-400/g, 'text-xs font-bold text-gray-400');

// Vehicle Cards
content = content.replace(/rounded-none border-4/g, 'rounded-3xl border');
content = content.replace(/border-black hover:border-black/g, 'border-gray-100 hover:border-[#FACC15] hover:shadow-xl');
content = content.replace(/bg-\[#FACC15\]\/10 scale-\[1\.02\]/g, 'bg-white shadow-2xl border-[#FACC15] scale-[1.02] ring-4 ring-[#FACC15]/10');
content = content.replace(/border-gray-100 opacity-60/g, 'border-gray-100 opacity-50');
content = content.replace(/bg-[#FACC15] text-black text-\[10px\] font-black px-3 py-1 rounded-none w-fit mb-2 border-2 border-black/g, 'bg-[#FACC15] text-emerald-950 text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2 shadow-sm');

// Vehicle name styling
content = content.replace(/font-black text-black/g, 'font-black text-emerald-950');

// Quote Block (Right)
content = content.replace(/bg-black rounded-none p-8 md:p-14 text-white lg:sticky lg:top-28 flex flex-col h-fit border-4 border-black/g, 'bg-emerald-950 rounded-[2.5rem] p-8 md:p-12 text-white lg:sticky lg:top-28 flex flex-col h-fit shadow-2xl relative overflow-hidden');
content = content.replace(/border-2 border-black/g, 'border border-emerald-800/30');

// Inside Quote Block
content = content.replace(/text-\[#FACC15\] text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter/g, 'text-[#FACC15] text-2xl font-bold mb-8 flex items-center gap-3 tracking-tight');
content = content.replace(/border-4 border-\[#FACC15\]/g, 'border border-[#FACC15]/30');
content = content.replace(/border-4/g, 'border-2');
content = content.replace(/border-white\/5 hover:border-white\/20 hover:bg-white\/10/g, 'border-emerald-800/30 hover:border-[#FACC15]/50 hover:bg-white/5');
content = content.replace(/rounded-none/g, 'rounded-2xl');

// Final CTA Button
content = content.replace(/w-full bg-\[#FACC15\] text-black font-black py-6 rounded-none text-xl hover:bg-white transition-all border-4 border-black/g, 'w-full bg-[#FACC15] text-emerald-950 font-bold py-5 rounded-2xl text-lg hover:bg-[#FACC15]/90 transition-all shadow-xl hover:shadow-[#FACC15]/20 hover:-translate-y-1');

fs.writeFileSync(path, content, 'utf8');
console.log('Prices.jsx updated successfully.');
