
import React from 'react';
import { Theme, Language } from '../types';
import { translations } from '../translations';
import { ElementLogo } from '../App';

interface SettingsProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  lang: Language;
  setLang: (l: Language) => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, setTheme, lang, setLang }) => {
  const t = translations[lang];

  return (
    <div className={`flex-1 p-6 md:p-20 overflow-y-auto pb-24 md:pb-10 transition-colors ${theme === 'dark' ? 'bg-[#050505]/40' : 'bg-slate-50/40'}`}>
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="text-center">
          <ElementLogo theme={theme} size="text-3xl justify-center" />
          <h1 className="text-4xl font-black mt-4">{t.settings}</h1>
        </header>

        <div className={`glass p-8 rounded-[2.5rem] border ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} space-y-8 shadow-2xl`}>
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 px-2">{t.language}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['en', 'ru', 'uz'] as Language[]).map(l => (
                <button 
                  key={l} 
                  onClick={() => setLang(l)} 
                  className={`py-3 px-4 rounded-2xl border font-black transition-all ${lang === l ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' : `${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-500/50 shadow-sm'}`}`}
                >
                  {l === 'en' ? 'English' : l === 'ru' ? 'Русский' : 'O\'zbekcha'}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 px-2">{t.appearance}</h2>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white hover:border-indigo-500/30' : 'bg-white border-slate-200 text-slate-900 shadow-sm hover:border-indigo-500/30'}`}>
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-100 text-indigo-600'}`}>
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  )}
                </div>
                <span className="font-black uppercase tracking-widest text-xs">{theme === 'dark' ? t.darkMode : t.lightMode}</span>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </button>
          </section>

          <section className="pt-6 border-t border-slate-800/20">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Element Intelligent Cloud v2.5</p>
              <p className="text-[9px] mt-1 opacity-60">Build ID: ELEM-{Math.random().toString(36).substring(7).toUpperCase()}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
