"use client";

import { useState, useRef, useEffect } from "react";
// REMOVED: import { useChat } from "ai/react";  <-- This was causing the error
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

/* --- Internal UI Components --- */
const Button = ({ children, onClick, className = "", disabled }) => (
  <button onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${className}`}>
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, className = "", onKeyDown }) => (
  <input
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    className={`flex h-10 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-950 ${className}`}
  />
);

/* --- Main Component --- */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Manual State Management
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleManualSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message immediately
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Send to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, userMessage] // Send history
        }),
      });

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();

      // 3. Add Bot Message
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);

    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I am having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 h-14 w-14 flex items-center justify-center rounded-full shadow-xl transition-all duration-300 z-50 text-white ${
          isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-violet-600 hover:bg-violet-700"
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl z-50 flex flex-col border border-violet-100 dark:border-violet-900 overflow-hidden font-sans animate-in slide-in-from-bottom-5 fade-in">
          
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4 shrink-0">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="h-5 w-5" />
              CampusBuddy AI
            </div>
            <p className="text-xs text-violet-100 opacity-90 mt-1">
              Ask about events, notices, or schedules!
            </p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 mt-20 text-sm">
                <div className="bg-violet-100 dark:bg-violet-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                </div>
                <p>👋 Hi! I'm your AI assistant.</p>
                <p className="mt-2">Try asking:</p>
                <p className="font-medium text-violet-600">"When is the next event?"</p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-slate-200 text-slate-700" : "bg-violet-100 text-violet-700"}`}>
                  {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`rounded-2xl px-4 py-2 text-sm max-w-[80%] shadow-sm leading-relaxed ${m.role === "user" ? "bg-violet-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-800 rounded-bl-none dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                 <div className="h-8 w-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center"><Bot size={16} /></div>
                 <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm"><Loader2 className="h-4 w-4 animate-spin text-slate-400" /></div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
              />
              <Button type="submit" className="h-10 w-10 bg-violet-600 hover:bg-violet-700 text-white rounded-full" disabled={isLoading}>
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}