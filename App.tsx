import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { User, ChatSession, AuthState, Theme, Language } from './types';
import { translations } from './translations';
import Home from './pages/Home';
import Chats from './pages/Chats';
import HelpCentre from './pages/HelpCentre';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Settings from './pages/Settings';

export const ElementLogo: React.FC<{ theme: Theme; size?: string }> = ({ theme, size = "text-xl" }) => (
  <h1 className={`${size} font-bold flex flex-wrap items-center justify-center gap-x-2`}>
    <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Element</span>
    <span className="bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent italic">Intelligent</span>
    <span className={`text-xs px-2 py-0.5 rounded-md border font-black ${theme === 'dark' ? 'border-white/20 text-white/50' : 'border-black/10 text-black/40'}`}>AI</span>
  </h1>
);

const BottomNav: React.FC<{ theme: Theme; lang: Language }> = ({ theme, lang }) => {
  const location = useLocation();
  const t = translations[lang];

  const navItems = [
    { path: '/', label: t.home, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/chats', label: t.history, icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { path: '/help', label: t.help, icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { path: '/profile', label: t.profile, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 glass border-t safe-bottom z-50 flex items-center justify-around h-16 md:h-20 ${theme === 'dark' ? 'border-white/10 bg-black/80' : 'border-black/5 bg-white/80'}`}>
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={`flex flex-col items-center justify-center flex-1 h-full transition-all active:scale-90 ${location.pathname === item.path ? 'text-indigo-500' : 'text-slate-500'}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={location.pathname === item.path ? 2.5 : 2} d={item.icon} />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'ru');
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
      <div className={`flex flex-col h-screen w-full transition-colors overflow-hidden ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-900'}`}>
        <main className="flex-1 flex flex-col relative overflow-hidden pb-16 md:pb-20">
          <Routes>
            <Route path="/" element={<Home sessions={chatSessions} setSessions={setChatSessions} activeChatId={activeChatId} setActiveChatId={setActiveChatId} theme={theme} lang={lang} />} />
            <Route path="/chats" element={<Chats sessions={chatSessions} setSessions={setChatSessions} onSelectChat={(id: string) => setActiveChatId(id)} theme={theme} lang={lang} />} />
            <Route path="/help" element={<HelpCentre theme={theme} lang={lang} />} />
            <Route path="/profile" element={<Profile user={authState.user} onLogout={() => setAuthState({ user: null, isAuthenticated: false })} theme={theme} lang={lang} />} />
            <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav theme={theme} lang={lang} />
      </div>
    </HashRouter>
  );
};

export default App;