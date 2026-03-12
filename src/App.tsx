import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Shield, GraduationCap, Heart, Bookmark, MessageSquare, Trash2, Map as MapIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import ResourceCard from './components/ResourceCard';
import CampusMap from './components/CampusMap';
import { Resource } from './types/resources';
import { processChatMessage } from './services/chatService';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center p-6 text-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-600/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl relative z-10 w-full"
        >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white academic-shadow text-brand-900 px-5 py-2.5 rounded-full text-xs font-bold mb-10 border border-brand-900/5 uppercase tracking-widest"
        >
          <Sparkles size={14} className="text-accent-600" />
          <span>Atlantic Canada University Guide</span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-medium text-brand-900 mb-8 leading-[0.9] tracking-tight">
          UniGuide <span className="italic font-light text-brand-600">AI</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-xl mx-auto font-light px-4">
          A thoughtful companion for your university journey. 
          Find housing, mental health support, and campus services with ease.
        </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/chat')}
              className="group bg-brand-900 hover:bg-brand-600 text-white px-10 py-5 rounded-full text-sm font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl shadow-brand-900/10 w-full sm:w-auto justify-center"
            >
              Start Conversation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate('/chat')}
              className="px-10 py-5 rounded-full text-sm font-bold tracking-widest uppercase text-brand-900 hover:bg-brand-900/5 transition-all w-full sm:w-auto"
            >
              Learn More
            </button>
          </div>

        <div className="mt-12 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left px-4">
          <div className="glass-card p-6 sm:p-8 rounded-[2rem] academic-shadow">
            <div className="w-12 h-12 bg-brand-900/5 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="text-brand-900" size={24} />
            </div>
            <h3 className="text-xl font-serif font-semibold text-brand-900 mb-3">Private & Secure</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light">Your conversations are private. Seek support without hesitation or judgment.</p>
          </div>
          
          <div className="glass-card p-8 rounded-[2rem] academic-shadow">
            <div className="w-12 h-12 bg-brand-900/5 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap className="text-brand-900" size={24} />
            </div>
            <h3 className="text-xl font-serif font-semibold text-brand-900 mb-3">Campus Specific</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light">Tailored resources for Dalhousie, SMU, and UPEI students, updated regularly.</p>
          </div>
          
          <div className="glass-card p-8 rounded-[2rem] academic-shadow">
            <div className="w-12 h-12 bg-brand-900/5 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="text-brand-900" size={24} />
            </div>
            <h3 className="text-xl font-serif font-semibold text-brand-900 mb-3">Holistic Care</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light">Connecting you to campus, government, and community services in one place.</p>
          </div>
        </div>
        </motion.div>
      </div>
      
      <footer className="w-full py-8 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold relative z-10">
        © 2026 UniGuide AI • Built for Students
      </footer>
    </div>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; resources?: Resource[] }[]>([
    { text: "Welcome to UniGuide. I'm here to help you navigate your university life. What's on your mind today?", isUser: false }
  ]);
  const [currentClassification, setCurrentClassification] = useState<{ university: string; province: string; urgency?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'saved'>('chat');
  const [showMap, setShowMap] = useState<number | null>(null);
  const [savedResources, setSavedResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('uniguide_saved_resources');
    return saved ? JSON.parse(saved) : [];
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTab]);

  useEffect(() => {
    localStorage.setItem('uniguide_saved_resources', JSON.stringify(savedResources));
  }, [savedResources]);

  const toggleSaveResource = (resource: Resource) => {
    setSavedResources(prev => {
      const isSaved = prev.some(r => r.id === resource.id);
      if (isSaved) {
        return prev.filter(r => r.id !== resource.id);
      } else {
        return [...prev, resource];
      }
    });
  };

  const handleSendMessage = async (text: string) => {
    setMessages(prev => [...prev, { text, isUser: true }]);
    setIsLoading(true);

    try {
      const history = [...messages, { text, isUser: true }].map(m => ({
        role: m.isUser ? 'user' : 'assistant',
        content: m.text
      }));

      if (currentClassification && currentClassification.university !== 'unknown') {
        history.unshift({
          role: 'assistant',
          content: `[System Context: Student is at ${currentClassification.university} in ${currentClassification.province}]`
        });
      }

      const data = await processChatMessage(text, history);

      if (data.classification && !data.needs_clarification) {
        setCurrentClassification({
          university: data.classification.university,
          province: data.classification.province,
          urgency: data.classification.urgency
        });
      }

      setMessages(prev => [...prev, { 
        text: data.reply, 
        isUser: false, 
        resources: data.resources 
      }]);
    } catch (error: any) {
      console.error(error);
      let errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
      
      if (error.message === 'GROQ_API_KEY_MISSING' || (error.status === 401)) {
        errorMessage = "⚠️ **API Configuration Required**: It looks like the Groq API key is missing or invalid. To fix this, please go to the **Settings > Secrets** menu in AI Studio and add a secret named `GROQ_API_KEY`.";
      }

      setMessages(prev => [...prev, { 
        text: errorMessage, 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-paper">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-brand-900/5 p-2 px-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-900 rounded-xl flex items-center justify-center text-white font-serif text-lg font-bold shadow-lg shadow-brand-900/20">U</div>
          <div className="hidden sm:block">
            <h1 className="font-serif font-bold text-brand-900 leading-none text-sm">UniGuide</h1>
            <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">AI Companion</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeTab === 'chat' ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MessageSquare size={12} />
            Chat
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeTab === 'saved' ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Bookmark size={12} />
            Saved
            {savedResources.length > 0 && (
              <span className="bg-brand-900 text-white px-1.5 py-0.5 rounded-full text-[8px]">
                {savedResources.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-2 md:p-4">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence>
            {currentClassification?.urgency === 'high' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 sm:mb-8"
              >
                <div className="bg-red-50 border border-red-100 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 academic-shadow">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shrink-0">
                    <Heart size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-red-900 font-serif font-bold text-base sm:text-lg mb-1">Immediate Support Available</h3>
                    <p className="text-red-700 text-xs sm:text-sm leading-relaxed font-light mb-4">
                      It sounds like you're going through a difficult time. Please know that you're not alone and help is available right now.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <a 
                        href="tel:18332923698" 
                        className="bg-red-500 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-colors text-center"
                      >
                        Call Good2Talk (NS)
                      </a>
                      <a 
                        href="tel:18002182222" 
                        className="bg-red-500 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-colors text-center"
                      >
                        Island Helpline (PEI)
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeTab === 'chat' ? (
              <motion.div
                key="chat-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {messages.map((msg, idx) => (
                  <div key={idx}>
                    <ChatMessage message={msg.text} isUser={msg.isUser} />
                    {msg.resources && msg.resources.length > 0 && (
                      <div className="ml-0 sm:ml-11 mb-8 sm:mb-12 space-y-4 sm:space-y-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Curated Resources</h4>
                          <button 
                            onClick={() => setShowMap(showMap === idx ? null : idx)}
                            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all w-full sm:w-auto justify-center ${
                              showMap === idx 
                                ? 'bg-brand-900 text-white' 
                                : 'bg-white text-brand-900 border border-brand-900/10 hover:bg-brand-900/5'
                            }`}
                          >
                            <MapIcon size={12} />
                            {showMap === idx ? 'Close Map' : 'View Map'}
                          </button>
                        </div>

                        <AnimatePresence>
                          {showMap === idx && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="rounded-[2rem] overflow-hidden academic-shadow border border-brand-900/5">
                                <CampusMap 
                                  resources={msg.resources} 
                                  university={currentClassification?.university} 
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                          {msg.resources.map(res => (
                            <ResourceCard 
                              key={res.id} 
                              resource={res} 
                              isSaved={savedResources.some(r => r.id === res.id)}
                              onToggleSave={toggleSaveResource}
                            />
                          ))}
                        </motion.div>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 mb-8">
                    <div className="w-10 h-10 rounded-2xl bg-brand-900/5 text-brand-900 flex items-center justify-center shrink-0">
                      <Sparkles size={20} className="animate-pulse" />
                    </div>
                    <div className="bg-white border border-brand-900/5 px-6 py-4 rounded-[2rem] rounded-tl-none academic-shadow">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-brand-900/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-brand-900/20 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-brand-900/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </motion.div>
            ) : (
              <motion.div
                key="saved-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-serif font-bold text-brand-900">Saved Resources</h2>
                  {savedResources.length > 0 && (
                    <button 
                      onClick={() => setSavedResources([])}
                      className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Clear Collection
                    </button>
                  )}
                </div>

                {savedResources.length === 0 ? (
                  <div className="text-center py-32 glass-card rounded-[3rem] border-dashed border-slate-200">
                    <Bookmark size={64} className="mx-auto text-slate-200 mb-6" />
                    <h3 className="text-2xl font-serif font-semibold text-brand-900 mb-3">Your collection is empty</h3>
                    <p className="text-slate-500 max-w-xs mx-auto font-light">
                      Resources you save during your chat will appear here for quick access later.
                    </p>
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="mt-10 text-brand-600 font-bold uppercase tracking-widest text-xs hover:underline"
                    >
                      Return to Conversation
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {savedResources.map(res => (
                      <ResourceCard 
                        key={res.id} 
                        resource={res} 
                        isSaved={true}
                        onToggleSave={toggleSaveResource}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Input Area (Only in Chat Tab) */}
      {activeTab === 'chat' && (
        <footer className="p-4 bg-gradient-to-t from-paper to-transparent">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            <p className="text-[8px] text-center text-slate-400 mt-3 uppercase tracking-[0.2em] font-bold">
              UniGuide AI provides guidance but is not a substitute for professional advice.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}
