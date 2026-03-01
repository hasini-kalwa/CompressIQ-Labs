import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, X, MessageSquare, Loader2 } from "lucide-react";
import { getAdvisorResponse } from "@/services/aiAdvisorService";
import type { AnalysisResult, RecommendationResult, SimulationResult } from "@/types";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "model";
  text: string;
}

interface AIAdvisorProps {
  context: {
    modelName: string;
    analysis: AnalysisResult;
    recommendation: RecommendationResult;
    simulation: SimulationResult;
  };
}

export function AIAdvisor({ context }: AIAdvisorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: `Hello! I'm your CompressIQ AI Advisor. I've analyzed your ${context.modelName} model. It has a sustainability score of ${context.simulation.sustainability_score}/100. How can I help you optimize it further?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    const chatHistory = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const response = await getAdvisorResponse(userMsg, context, chatHistory);
    
    setMessages((prev) => [...prev, { role: "model", text: response || "I'm sorry, I couldn't generate a response." }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-accent-green text-bg-primary shadow-lg flex items-center justify-center cursor-pointer",
          isOpen && "hidden"
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-[400px] h-[600px] bg-bg-secondary border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-bg-primary border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">CompressIQ AI Advisor</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse" />
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center",
                    msg.role === "user" ? "bg-accent-blue/20" : "bg-accent-green/20"
                  )}>
                    {msg.role === "user" ? <User className="w-4 h-4 text-accent-blue" /> : <Bot className="w-4 h-4 text-accent-green" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-accent-blue text-white rounded-tr-none" 
                      : "bg-bg-primary border border-white/5 text-text-secondary rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 mr-auto max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-green" />
                  </div>
                  <div className="p-3 rounded-2xl bg-bg-primary border border-white/5 rounded-tl-none">
                    <Loader2 className="w-4 h-4 text-accent-green animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-bg-primary border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your optimization results..."
                  className="w-full bg-bg-secondary border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-accent-green/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent-green hover:bg-accent-green/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-text-muted mt-3 text-center">
                AI Advisor can make mistakes. Verify important information.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
