import React from 'react';
import { Theme, Language } from '../types';
import { translations } from '../translations';

const HelpCentre: React.FC<{ theme: Theme; lang: Language }> = ({ theme, lang }) => {
  const t = translations[lang];
  
  const faqs = [
    { q: t.faq1_q, a: t.faq1_a },
    { q: t.faq2_q, a: t.faq2_a },
    { q: t.faq3_q, a: t.faq3_a },
    { q: t.faq4_q, a: t.faq4_a }
  ];

  return (
    <div className={`flex-1 overflow-y-auto px-5 py-8 space-y-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950/20' : 'bg-slate-50/20'}`}>
      <header className="text-center space-y-2 animate-fade-in">
        <h1 className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.helpTitle}</h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest opacity-60">{t.helpSubtitle}</p>
      </header>

      <section className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className={`text-xs font-black uppercase tracking-[0.2em] border-l-4 border-indigo-500 pl-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.gettingStarted}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div className={`p-6 rounded-[2rem] border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'}`}>
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 text-indigo-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h3 className={`font-black text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.writeCreate}</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{t.writeCreateDesc}</p>
          </div>
          
          <div className={`p-6 rounded-[2rem] border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'}`}>
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 text-purple-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <h3 className={`font-black text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.devTitle}</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{t.devDesc}</p>
          </div>

          <div className={`p-6 rounded-[2rem] border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'}`}>
            <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4 text-pink-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 className={`font-black text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.innovationTitle}</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{t.innovationDesc}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className={`text-xs font-black uppercase tracking-[0.2em] border-l-4 border-indigo-500 pl-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.faqTitle}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details key={idx} className={`group rounded-2xl border transition-all overflow-hidden ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'}`}>
              <summary className={`p-4 text-xs font-black cursor-pointer list-none flex justify-between items-center active:bg-indigo-500/5 transition-colors ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                <span className="max-w-[85%]">{faq.q}</span>
                <svg className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className={`px-4 pb-4 text-slate-500 text-[11px] font-medium leading-relaxed border-t border-transparent group-open:border-white/5`}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="p-8 rounded-[2.5rem] bg-gradient-to-tr from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white text-center space-y-4 shadow-xl shadow-indigo-500/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-xl font-black">{t.visionTitle}</h3>
        <p className="text-xs font-bold text-white/80">{t.visionSubtitle}</p>
        <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-lg">
          {t.visionButton}
        </button>
      </div>

      <footer className="text-center py-6 opacity-40">
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">
          Element Intelligent Cloud • London • 2025
        </p>
      </footer>
    </div>
  );
};

export default HelpCentre;