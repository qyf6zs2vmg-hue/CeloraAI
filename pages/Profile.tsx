
import React from 'react';
import { User, Theme, Language } from '../types';
import { translations } from '../translations';
import { ElementLogo } from '../App';

interface ProfileProps {
  user: User | null;
  onLogout: () => void;
  theme: Theme;
  lang: Language;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, theme, lang }) => {
  const t = translations[lang];
  if (!user) return null;

  return (
    <div className={`flex-1 p-4 md:p-20 flex flex-col items-center overflow-y-auto pb-24 md:pb-10 transition-colors ${theme === 'dark' ? 'bg-[#050505]/20' : 'bg-slate-50/20'}`}>
      <div className="mb-10 text-center"><ElementLogo theme={theme} size="text-2xl" /></div>
      
      <div className={`max-w-md w-full glass p-8 md:p-10 rounded-[3rem] border shadow-2xl relative overflow-hidden ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200 bg-white/60'}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -z-10 rounded-full translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 blur-3xl -z-10 rounded-full -translate-x-10 translate-y-10"></div>

        <div className="flex flex-col items-center space-y-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#6366F1] via-[#A855F7] to-[#EC4899] p-1.5 shadow-2xl">
            <div className={`w-full h-full rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-[#6366F1] to-[#EC4899]">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="text-center w-full">
            <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.name}</h1>
            <p className="text-slate-500 font-bold mt-1">{user.email}</p>
            {user.provider && (
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-500/10 text-slate-500 border border-slate-500/20">
                via {user.provider}
              </span>
            )}
          </div>

          <div className="w-full space-y-4 pt-6 border-t border-slate-800/20">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">{t.personalInfo}</h3>
            
            <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/80 border-slate-100'}`}>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-widest">{t.status}</span>
                <span className="text-indigo-500 flex items-center font-black uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full mr-2 shadow-lg shadow-indigo-500/50"></span>
                  {t.active}
                </span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/80 border-slate-100'}`}>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-widest">{t.accountType}</span>
                <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent font-black uppercase tracking-widest">
                  {t.premium}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full space-y-3 pt-4">
            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98]">
              {t.editProfile}
            </button>
            <button onClick={onLogout} className={`w-full py-4 rounded-2xl border font-black transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-900/30' : 'bg-white border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500'}`}>
              {t.signOut}
            </button>
          </div>
        </div>
      </div>
      <p className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 opacity-60">Element Intelligent Systems • 2025</p>
    </div>
  );
};

export default Profile;
