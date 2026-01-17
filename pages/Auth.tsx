import React, { useState } from 'react';
import { User, Theme, Language } from '../types';
import { translations } from '../translations';
import { ElementLogo } from '../App';

interface AuthProps {
  onLogin: (user: User) => void;
  theme: Theme;
  lang: Language;
}

const Auth: React.FC<AuthProps> = ({ onLogin, theme, lang }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ 
      id: Date.now().toString(), 
      name: isRegistering ? name : email.split('@')[0], 
      email,
      provider: 'email'
    });
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    onLogin({
      id: provider + "_" + Date.now(),
      name: provider === 'google' ? "Google User" : "Apple User",
      email: `${provider}@example.com`,
      provider: provider
    });
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 overflow-y-auto ${theme === 'dark' ? 'bg-[#050505]' : 'bg-slate-50'}`}>
      {/* Уменьшен отступ логотипа */}
      <div className="mb-6 mt-4 animate-fade-in">
        <ElementLogo theme={theme} size="text-3xl" />
      </div>
      
      {/* Уменьшены паддинги контейнера p-6 вместо p-8/10 */}
      <div className={`max-w-md w-full glass p-6 rounded-[2.5rem] border shadow-2xl relative transition-all duration-300 ${theme === 'dark' ? 'border-slate-800 bg-[#0a0a0a]/60' : 'border-slate-200 bg-white/60'}`}>
        <div className="text-center mb-5">
          <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            {isRegistering ? t.loginWelcome : t.signIn}
          </h2>
          <p className="mt-1 text-[11px] text-slate-500 font-bold uppercase tracking-wider">{t.loginSubtitle}</p>
        </div>

        {/* Компактные кнопки социальных сетей */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button 
            onClick={() => handleSocialLogin('google')}
            className={`flex items-center justify-center space-x-2 py-3 rounded-2xl border text-[11px] font-black uppercase tracking-tight transition-all active:scale-95 ${theme === 'dark' ? 'bg-white text-black border-transparent' : 'bg-white border-slate-200 text-slate-800 shadow-sm'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </button>

          <button 
            onClick={() => handleSocialLogin('apple')}
            className={`flex items-center justify-center space-x-2 py-3 rounded-2xl border text-[11px] font-black uppercase tracking-tight transition-all active:scale-95 ${theme === 'dark' ? 'bg-[#151515] text-white border-slate-800' : 'bg-black text-white border-transparent'}`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4-6.7-6.86-1.9-15.82 4.43-15.82 1.44 0 2.22.62 3.24.62 1.02 0 2.1-.73 3.66-.6 1.43.1 2.53.64 3.22 1.5-2.92 1.76-2.44 5.9.65 7.22-.6 1.52-1.37 3.02-2.3 4.45-.5.73-1 1.48-1.5 2.22l-.02.03zM12.03 5.4c-.16-2.4 1.83-4.53 4.14-4.4.26 2.62-2.52 4.88-4.14 4.4z"/>
            </svg>
            <span>Apple</span>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}></div>
          </div>
          <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.2em]">
            <span className={`px-4 ${theme === 'dark' ? 'bg-[#0a0a0a] text-slate-600' : 'bg-white text-slate-400'}`}>{t.or}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegistering && (
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.1em] pl-2">{t.fullName}</label>
              <input 
                type="text" 
                required
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`} 
                placeholder="John Doe" 
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.1em] pl-2">{t.email}</label>
            <input 
              type="email" 
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`} 
              placeholder="john@example.com" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.1em] pl-2">{t.password}</label>
            <input 
              type="password" 
              required
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`} 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            {isRegistering ? t.getStarted : t.signIn}
          </button>
        </form>

        <div className="text-center mt-5">
          <button 
            onClick={() => setIsRegistering(!isRegistering)} 
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors"
          >
            {isRegistering ? t.hasAccount : t.noAccount}
          </button>
        </div>
      </div>
      <p className="mt-6 text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 opacity-40 mb-4">Element Intelligent Systems</p>
    </div>
  );
};

export default Auth;