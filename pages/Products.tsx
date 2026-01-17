
import React from 'react';
import { Theme, Language } from '../types';
import { translations } from '../translations';
import { ElementLogo } from '../App';

const Products: React.FC<{ theme: Theme; lang: Language }> = ({ theme, lang }) => {
  const t = translations[lang];

  const products = [
    { title: 'Celora Vision', desc: 'Real-time object detection and neural image enhancement.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', color: 'from-blue-500 to-indigo-600' },
    { title: 'Nexus Data', desc: 'Predictive analytics for enterprise decision systems.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'from-purple-500 to-pink-600' },
    { title: 'Element Forge', desc: 'Low-code AI integration platform for developers.', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', color: 'from-indigo-500 to-purple-600' }
  ];

  return (
    <div className={`flex-1 p-6 md:p-20 overflow-y-auto pb-24 md:pb-10 transition-colors ${theme === 'dark' ? 'bg-[#050505]' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center">
          <ElementLogo theme={theme} size="text-4xl justify-center" />
          <h1 className="text-5xl font-black mt-6 leading-tight">{t.products}</h1>
          <p className="text-slate-500 mt-4 text-xl font-medium max-w-lg mx-auto">{t.productDesc}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.title} className={`p-8 rounded-[2.5rem] border transition-all hover:scale-105 duration-300 ${theme === 'dark' ? 'bg-[#111] border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${p.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/20`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p.icon} /></svg>
              </div>
              <h3 className="text-2xl font-black mb-3">{p.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{p.desc}</p>
              <button className="mt-8 text-indigo-500 font-black uppercase text-xs tracking-widest hover:underline flex items-center">
                Learn More <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          ))}
        </div>

        <div className={`p-12 rounded-[3rem] bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white text-center shadow-2xl`}>
          <h2 className="text-4xl font-black mb-4">Element Intelligent Systems</h2>
          <p className="text-white/80 font-bold mb-8 text-lg">Designing the infrastructure for the next century of artificial thought.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:scale-105 transition-all">Careers</button>
            <button className="px-10 py-4 bg-black/20 text-white border border-white/20 rounded-2xl font-black hover:bg-black/40 transition-all">Investor Relations</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
