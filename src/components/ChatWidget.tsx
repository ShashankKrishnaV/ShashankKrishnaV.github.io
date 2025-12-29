import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { PORTFOLIO_OWNER } from '../constants';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  // Get first name for the UI
  const firstName = PORTFOLIO_OWNER.split(' ')[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hi! I'm ${firstName}'s AI assistant. Ask me anything about their work, skills, or experience.`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await sendMessageToGemini(userMsg.text);
      
      const botMsgId = (Date.now() + 1).toString();
      
      // Initialize bot message
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      let fullText = '';
      
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMsgId ? { ...msg, text: fullText } : msg
          )
        );
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I'm sorry, I'm having trouble connecting to the AI service right now. Please verify your API key configuration.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 group">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0, opacity: 0 }}
            >
              {/* Tooltip hint */}
              <div className="absolute bottom-full right-0 mb-4 bg-white text-slate-900 text-sm font-bold px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none origin-bottom-right transform scale-95 group-hover:scale-100 duration-200">
                Ask AI about me!
                <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white transform rotate-45"></div>
              </div>
              
              <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center transition-all hover:scale-110 hover:shadow-2xl hover:shadow-primary/40 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
                <MessageSquare size={28} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[380px] h-[600px] max-h-[80vh] bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-white/5 to-white/0 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[1px]">
                   <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center text-white">
                      <Sparkles size={18} />
                   </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{firstName}'s Assistant</h3>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                    Gemini Powered
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm relative overflow-hidden ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-primary to-indigo-600 text-white rounded-br-none'
                          : 'bg-white/5 border border-white/5 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {/* Subtle shine effect for user messages */}
                      {msg.role === 'user' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] animate-[shimmer_3s_infinite]" />
                      )}
                      <span className="relative z-10">{msg.text}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">
                      {msg.role === 'model' ? 'AI Assistant' : 'You'}
                    </span>
                  </div>
                </div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                   <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-bl-none flex gap-1.5 items-center relative overflow-hidden">
                     {/* Shimmer loading background */}
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
                          style={{ backgroundSize: '200% 100%' }} />
                     
                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms'}}></span>
                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms'}}></span>
                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms'}}></span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-slate-900/50">
              <div className="relative flex items-center gap-2 bg-slate-800/50 border border-slate-700 focus-within:border-primary/50 focus-within:bg-slate-800 transition-all rounded-xl px-2 py-1.5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about my projects..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder-slate-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-primary hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
              <div className="text-center mt-2">
                 <p className="text-[10px] text-slate-600">Powered by Google Gemini</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;