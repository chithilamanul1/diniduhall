'use client';
import { useState } from 'react';
import { Utensils, Coffee, Beer } from 'lucide-react';

const categories = [
  { id: 'street', name: 'Street Food', icon: <Utensils size={18} />, items: [
      { name: 'Dolphin Kottu', price: '1,200', desc: 'Cheesy, spicy, heavy.' },
      { name: 'Egg Hoppers (3)', price: '450', desc: 'With Lunu Miris.' },
      { name: 'BBQ Chicken Leg', price: '950', desc: 'Charcoal grilled.' },
      { name: 'Seafood Rice', price: '1,500', desc: 'Wok fried street style.' }
  ]},
  { id: 'bites', name: 'Bites & BYOB', icon: <Beer size={18} />, items: [
      { name: 'Hot Butter Cuttlefish', price: '1,800', desc: 'The classic.' },
      { name: 'Devilled Cashew', price: '1,200', desc: 'Spicy roast.' },
      { name: 'Pepper Pork', price: '1,600', desc: 'Black pepper dry fry.' },
      { name: 'French Fries', price: '800', desc: 'Thick cut.' }
  ]},
  { id: 'cafe', name: 'Cafe & Juice', icon: <Coffee size={18} />, items: [
      { name: 'Iced Milo', price: '400', desc: 'Extra chocolatey.' },
      { name: 'Cappuccino', price: '600', desc: 'Fresh brew.' },
      { name: 'Passion Mojito', price: '750', desc: 'Mint & lime refresher.' },
      { name: 'Chocolate Waffle', price: '900', desc: 'With ice cream.' }
  ]}
];

export default function Menu() {
  const [active, setActive] = useState('street');

  return (
    <section id="menu" className="py-24 px-6 bg-road-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
           <h2 className="text-4xl md:text-6xl font-black text-road-text uppercase italic">
             Fuel <span className="text-road-yellow">Station</span>
           </h2>
           <div className="w-24 h-2 bg-road-orange mx-auto mt-4 skew-x-[-20deg]"></div>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest text-xs border-2 transition-all skew-x-[-10deg] ${active === cat.id ? 'bg-road-orange border-road-orange text-road-base' : 'border-road-sage text-road-sage hover:border-road-yellow hover:text-road-yellow'}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* MENU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {categories.find(c => c.id === active).items.map((item, i) => (
             <div key={i} className="bg-road-base p-6 border-l-4 border-road-yellow flex justify-between items-start group hover:bg-[#6b6367] transition-colors shadow-md">
                <div>
                   <h4 className="text-lg font-bold text-road-text uppercase group-hover:text-road-yellow transition-colors">{item.name}</h4>
                   <p className="text-xs text-road-sage mt-1 font-mono uppercase">{item.desc}</p>
                </div>
                <span className="text-lg font-black text-road-orange">{item.price}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}