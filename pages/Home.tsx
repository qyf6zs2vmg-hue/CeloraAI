import React, { useState, useRef, useEffect } from 'react';
import { ChatSession, Message, Theme, Language } from '../types';
import { translations } from '../translations';
import { geminiService } from '../services/geminiService';

interface HomeProps {
  sessions: ChatSession[];
  setSessions: (sessions: ChatSession[]) => void;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  theme: Theme;
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ sessions, setSessions, activeChatId, setActiveChatId, theme, lang }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  const activeSession = sessions.find(s => s.id === activeChatId) || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isLoading]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      image: selectedImage || undefined
    };

    let currentSession: ChatSession;
    let newSessions = [...sessions];

    if (!activeSession) {
      currentSession = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        title: input.length > 20 ? input.substring(0, 20) + '...' : (selectedImage ? 'Image Chat' : input || 'New Chat'),
        messages: [userMessage],
        updatedAt: Date.now()
      };
      newSessions.unshift(currentSession);
      setActiveChatId(currentSession.id);
    } else {
      currentSession = {
        ...activeSession,
        messages: [...activeSession.messages, userMessage],
        updatedAt: Date.now()
      };
      const index = newSessions.findIndex(s => s.id === activeSession.id);
      newSessions[index] = currentSession;
    }

    setSessions(newSessions);
    const originalInput = input;
    const originalImage = selectedImage;
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const history = currentSession.messages.slice(0, -1).map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const aiResponse = await geminiService.generateResponse(originalInput || "Describe this image", history, originalImage || undefined);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: aiResponse,
        timestamp: Date.now()
      };

      const finalSessions = [...newSessions];
      const sessionIndex = finalSessions.findIndex(s => s.id === currentSession.id);
      finalSessions[sessionIndex].messages = [...finalSessions[sessionIndex].messages, botMessage];
      setSessions(finalSessions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex-1 flex flex-col h-full transition-colors ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50'}`}>
      <header className={`h-14 md:h-16 shrink-0 border-b flex items-center px-4 justify-between glass safe-top z-40 ${theme === 'dark' ? 'border-white/5 bg-[#0a0a0a]/80' : 'border-black/5 bg-white/80'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xs">EI</div>
          <div className="flex flex-col">
            <h2 className={`font-bold text-xs truncate max-w-[150px] ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
              {activeSession ? activeSession.title : "Element Intelligent"}
            </h2>
            {!activeSession && <span className="text-[8px] font-black uppercase tracking-tighter opacity-40">Conversational Engine</span>}
          </div>
        </div>
        <button onClick={() => setActiveChatId(null)} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full transition-all border ${theme === 'dark' ? 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200'}`}>
          {t.newChat}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth">
        {!activeSession && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 max-w-sm mx-auto animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6366F1] via-[#A855F7] to-[#EC4899] flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="space-y-1">
              <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.welcome}</h3>
              <p className={`text-xs font-bold uppercase tracking-widest opacity-40 italic`}>by Element Intelligent</p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full">
              {[t.placeholderPrompt1, t.placeholderPrompt2, t.placeholderPrompt3].map(suggest => (
                <button key={suggest} onClick={() => setInput(suggest)} className={`p-4 border rounded-2xl text-left text-[11px] font-bold transition-all active:scale-95 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-white border-black/5 shadow-sm text-slate-600'}`}>
                  "{suggest}"
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSession?.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`relative max-w-[88%] rounded-2xl p-4 text-[13px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : `${theme === 'dark' ? 'bg-[#151515] border-white/5 text-slate-100' : 'bg-white border-black/5 text-slate-800'} border rounded-tl-none`}`}>
              {msg.image && <img src={msg.image} className="rounded-lg mb-2 max-h-48 w-full object-cover" alt="Upload" />}
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div className="flex items-center justify-between mt-2 opacity-40">
                <span className="text-[8px] font-black uppercase">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <button onClick={() => handleCopy(msg.content, msg.id)} className="p-1">
                  <span className="text-[8px] font-black uppercase">{copyStatus === msg.id ? t.copied : t.copy}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className={`p-4 rounded-2xl border text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5 border-white/10 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
              Element is processing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className={`px-4 py-3 shrink-0 glass border-t ${theme === 'dark' ? 'border-white/5 bg-[#0a0a0a]/90' : 'border-black/5 bg-white/90'}`}>
        {selectedImage && (
          <div className="mb-2 flex items-center space-x-2 animate-fade-in">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-indigo-500">
              <img src={selectedImage} className="w-full h-full object-cover" alt="Preview" />
              <button onClick={() => setSelectedImage(null)} className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="relative flex items-center space-x-2">
          <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className={`p-3 rounded-2xl border transition-all active:scale-90 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-white border-black/5 text-slate-500 shadow-sm'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.askCelora}
            className={`flex-1 border rounded-2xl px-5 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-black/5 shadow-inner'}`}
          />

          <button type="submit" disabled={isLoading || (!input.trim() && !selectedImage)} className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/30 active:scale-90 disabled:opacity-30 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;