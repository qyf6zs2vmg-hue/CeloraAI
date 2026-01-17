import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { User, ChatSession, AuthState, Theme, Language } from './types';
import { translations } from './translations';
import Home from './pages/Home';
import Chats from './pages/Chats';
import HelpCentre from './pages/HelpCentre';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import Products from './pages/Products';

export const ElementLogo: React.FC<{ theme: Theme; size?: string }> = ({ theme, size = "text-xl" }) => (
  <h1 className={`${size} font-bold flex items-center space-x-1.5`}>
    <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Element</span>
    <span className="bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">Intelligent</span>
  </h1>
);

const Sidebar: React.FC<{ onLogout: () => void; theme: Theme; lang: Language }> = ({ onLogout, theme, lang }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const t = translations[lang];

  const navItems = [
    { path: '/', label: t.home, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/chats', label: t.history, icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { path: '/products', label: t.products, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { path: '/settings', label: t.settings, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <>
      <aside className={`hidden md:flex w-64 glass border-r ${theme === 'dark' ? 'border-slate-800 bg-black/20' : 'border-slate-200 bg-white/40'} flex-col z-20`}>
        <div className="p-6">
          <ElementLogo theme={theme} />
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">CeloraAI Ecosystem</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path ? 'bg-indigo-500/10 text-indigo-500' : 'text-slate-400 hover:bg-slate-500/5 hover:text-indigo-500'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <Link to="/profile" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${location.pathname === '/profile' ? 'bg-indigo-500/10 text-indigo-500' : 'text-slate-400 hover:bg-slate-500/5 hover:text-indigo-500'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="font-medium">{t.profile}</span>
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <button onClick={() => { onLogout(); navigate('/'); }} className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all">
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      <nav className={`md:hidden fixed bottom-0 left-0 right-0 h-16 glass border-t ${theme === 'dark' ? 'border-slate-800 bg-[#050505]/95' : 'border-slate-200 bg-white/95'} z-50 flex items-center justify-around`}>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === item.path ? 'text-indigo-500' : 'text-slate-500'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
          </Link>
        ))}
      </nav>
    </>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth_state');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('chat_sessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('auth_state', JSON.stringify(authState));
    localStorage.setItem('chat_sessions', JSON.stringify(chatSessions));
    localStorage.setItem('theme', theme);
    localStorage.setItem('lang', lang);
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [authState, chatSessions, theme, lang]);

  if (!authState.isAuthenticated) {
    return <Auth onLogin={(user) => setAuthState({ user, isAuthenticated: true })} theme={theme} lang={lang} />;
  }

  return (
    <HashRouter>
      <div className={`flex h-screen w-full transition-colors ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-900'}`}>
        <Sidebar onLogout={() => setAuthState({ user: null, isAuthenticated: false })} theme={theme} lang={lang} />
        <main className="flex-1 flex flex-col relative overflow-hidden">
          <Routes>
            <Route path="/" element={<Home sessions={chatSessions} setSessions={setChatSessions} activeChatId={activeChatId} setActiveChatId={setActiveChatId} theme={theme} lang={lang} />} />
            <Route path="/chats" element={<Chats sessions={chatSessions} setSessions={setChatSessions} onSelectChat={(id: string) => setActiveChatId(id)} theme={theme} lang={lang} />} />
            <Route path="/profile" element={<Profile user={authState.user} onLogout={() => setAuthState({ user: null, isAuthenticated: false })} theme={theme} lang={lang} />} />
            <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />} />
            <Route path="/products" element={<Products theme={theme} lang={lang} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;