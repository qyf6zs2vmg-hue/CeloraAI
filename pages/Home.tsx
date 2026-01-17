
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
  const [isRecording, setIsRecording] = useState(false);
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
        title: input.length > 30 ? input.substring(0, 30) + '...' : (selectedImage ? 'Image Chat' : input),
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

  const toggleVoice = () => {
    setIsRecording(!isRecording);
    // In a real app, use webkitSpeechRecognition here.
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput("Voice recognition placeholder active...");
      }, 2000);
    }
  };

  return (
    <div className={`flex-1 flex flex-col h-full transition-colors ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50'}`}>
      <header className={`h-16 border-b flex items-center px-4 md:px-6 justify-between glass ${theme === 'dark' ? 'border-slate-800 bg-[#0a0a0a]/60' : 'border-slate-200 bg-white/60'}`}>
        <h2 className={`font-semibold truncate max-w-[200px] ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
          {activeSession ? activeSession.title : t.newChat}
        </h2>
        {activeSession && (
          <button onClick={() => setActiveChatId(null)} className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all border ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-indigo-400 border-slate-700' : 'bg-white hover:bg-slate-50 text-indigo-600 border-slate-200'}`}>
            + {t.newChat}
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {!activeSession && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#6366F1] via-[#A855F7] to-[#EC4899] flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="space-y-2">
              <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.welcome}</h3>
              <p className={`text-lg font-medium opacity-60`}>{t.poweredBy}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full px-4">
              {[t.placeholderPrompt1, t.placeholderPrompt2, t.placeholderPrompt3, t.placeholderPrompt4].map(suggest => (
                <button key={suggest} onClick={() => setInput(suggest)} className={`p-4 border rounded-2xl text-left text-sm font-medium transition-all ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 text-slate-300' : 'bg-white border-slate-200 hover:border-indigo-500/50 shadow-sm'}`}>
                  "{suggest}"
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSession?.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
            <div className={`relative max-w-[90%] md:max-w-[75%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : `${theme === 'dark' ? 'bg-[#151515] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'} border rounded-tl-none`}`}>
              {msg.image && <img src={msg.image} className="rounded-lg mb-2 max-h-60 object-contain" alt="Upload" />}
              <div className="whitespace-pre-wrap text-[15px]">{msg.content}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[9px] font-bold opacity-60 uppercase">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <button onClick={() => handleCopy(msg.content, msg.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/10 rounded transition-all">
                  <span className="text-[10px] font-bold">{copyStatus === msg.id ? t.copied : t.copy}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} animate-pulse`}>CeloraAI is thinking...</div></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-4 md:p-6 sticky bottom-0 z-10 ${theme === 'dark' ? 'bg-[#050505]/80' : 'bg-slate-50/80'} backdrop-blur-md`}>
        {selectedImage && (
          <div className="max-w-4xl mx-auto mb-2 flex items-center space-x-2">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-indigo-500">
              <img src={selectedImage} className="w-full h-full object-cover" alt="Preview" />
              <button onClick={() => setSelectedImage(null)} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center space-x-2">
          <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className={`p-3 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-indigo-400' : 'bg-white border-slate-200 text-slate-500 hover:text-indigo-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </button>
          
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.askCelora}
              className={`w-full border rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white border-slate-200 shadow-sm'}`}
            />
            <button type="button" onClick={toggleVoice} className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all ${isRecording ? 'bg-red-500 animate-pulse text-white' : 'text-slate-500 hover:text-indigo-500'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
          </div>

          <button type="submit" disabled={isLoading || (!input.trim() && !selectedImage)} className="p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-lg disabled:opacity-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
