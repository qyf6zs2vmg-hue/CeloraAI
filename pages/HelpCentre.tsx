
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
    <div className={`flex-1 overflow-y-auto p-6 md:p-10 space-y-12 max-w-4xl mx-auto w-full pb-24 md:pb-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950/20' : 'bg-slate-50/20'}`}>
      <div className="text-center space-y-4">
        <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.helpTitle}</h1>
        <p className="text-slate-500 text-lg font-medium">{t.helpSubtitle}</p>
      </div>

      <section className="space-y-6">
        <h2 className={`text-2xl font-bold border-l-4 border-indigo-500 pl-4 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{t.gettingStarted}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`glass p-6 rounded-[2rem] border transition-all ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 text-indigo-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.writeCreate}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.writeCreateDesc}</p>
          </div>
          <div className={`glass p-6 rounded-[2rem] border transition-all ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4 text-purple-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.devTitle}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.devDesc}</p>
          </div>
          <div className={`glass p-6 rounded-[2rem] border transition-all ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-4 text-pink-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.innovationTitle}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.innovationDesc}</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className={`text-2xl font-bold border-l-4 border-indigo-500 pl-4 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{t.faqTitle}</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className={`group glass rounded-2xl border transition-all overflow-hidden ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <summary className={`p-5 font-bold cursor-pointer list-none flex justify-between items-center group-open:bg-indigo-500/5 transition-colors ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                {faq.q}
                <svg className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className={`p-5 text-slate-500 text-sm font-medium leading-relaxed border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="p-10 rounded-[2.5rem] bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white text-center space-y-6 shadow-2xl shadow-indigo-500/20">
        <h3 className="text-3xl font-black">{t.visionTitle}</h3>
        <p className="font-medium text-white/90">{t.visionSubtitle}</p>
        <button className="px-8 py-3 bg-white text-indigo-600 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-black/10">
          {t.visionButton}
        </button>
      </div>
      <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-10">
        Element Intelligent Systems • London • 2025
      </p>
    </div>
  );
};

export default HelpCentre;
