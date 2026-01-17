
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatSession, Theme, Language } from '../types';
import { translations } from '../translations';

interface ChatsProps {
  sessions: ChatSession[];
  setSessions: (sessions: ChatSession[]) => void;
  onSelectChat: (id: string) => void;
  theme: Theme;
  lang: Language;
}

const Chats: React.FC<ChatsProps> = ({ sessions, setSessions, onSelectChat, theme, lang }) => {
  const navigate = useNavigate();
  const t = translations[lang];

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(t.deleteHistory)) setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <div className={`flex-1 overflow-y-auto p-6 md:p-10 space-y-10 ${theme === 'dark' ? 'bg-[#0a0a0a]/20' : 'bg-slate-50/20'}`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black">{t.history}</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">CeloraAI Archive</p>
        </div>
        <button onClick={() => { onSelectChat(''); navigate('/'); }} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">+ {t.newChat}</button>
      </div>
      {sessions.length === 0 ? (
        <div className={`py-20 text-center glass rounded-[2.5rem] border-2 border-dashed ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">No entries found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {sessions.map(session => (
            <div key={session.id} onClick={() => { onSelectChat(session.id); navigate('/'); }} className={`group glass p-6 rounded-[2.5rem] border transition-all cursor-pointer relative ${theme === 'dark' ? 'border-slate-800 bg-[#111] hover:border-indigo-500/40' : 'border-slate-200 bg-white shadow-xl hover:border-indigo-500/40'}`}>
              <button onClick={(e) => handleDelete(session.id, e)} className="absolute top-6 right-6 p-2 opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-500 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
              <h3 className="font-black text-lg truncate pr-10">{session.title}</h3>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2 font-medium">{session.messages[session.messages.length - 1]?.content}</p>
              <div className="mt-6 pt-4 border-t border-slate-800/20 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>{new Date(session.updatedAt).toLocaleDateString()}</span>
                <span className="bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded-lg">{session.messages.length} msg</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chats;
