import { useState, useEffect, useRef } from "react";
import { Sparkles, Bot, Send, Loader2, X, MessageSquare, User } from "lucide-react";
import { apiChat } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export function FloatingAssistant() {
  const { name } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: `Hi ${name?.split(' ')[0] || 'there'}! I'm your TrustHire AI assistant. How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || typing) return;

    const text = input.trim();
    setMsgs(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const history = msgs.map(m => ({ role: m.role, text: m.text }));
      const res = await apiChat(text, history);
      setMsgs(prev => [...prev, { role: "assistant", text: res.response }]);
    } catch (err: any) {
      toast.error("AI Assistant is offline");
      setMsgs(prev => [...prev, { role: "assistant", text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-[380px] h-[500px] bg-card rounded-2xl border border-border shadow-elevated flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-gradient-brand text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-white/20 grid place-items-center"><Sparkles className="size-4" /></div>
              <div>
                <div className="text-sm font-semibold">TrustHire Assistant</div>
                <div className="text-[10px] opacity-80 uppercase tracking-tighter">Powered by Gemini AI</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 rounded p-1 transition-colors"><X className="size-4" /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && <div className="size-8 rounded-md bg-primary/10 text-primary grid place-items-center shrink-0 shadow-sm border border-primary/10"><Bot className="size-4" /></div>}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line shadow-sm border ${m.role === "user" ? "bg-primary text-primary-foreground border-primary/20 rounded-br-sm" : "bg-card border-border rounded-bl-sm"}`}>
                  {m.text}
                </div>
                {m.role === "user" && <div className="size-8 rounded-md bg-secondary border border-border grid place-items-center shrink-0 shadow-sm"><User className="size-4" /></div>}
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="size-8 rounded-md bg-primary/10 text-primary grid place-items-center shrink-0 shadow-sm border border-primary/10"><Bot className="size-4" /></div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-2.5 flex gap-1 items-center">
                  <span className="size-1.5 rounded-full bg-primary/40 animate-bounce" />
                  <span className="size-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
                  <span className="size-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-border bg-card">
            <div className="relative">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-secondary border-none focus:ring-1 focus:ring-primary text-sm transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-lg bg-primary text-primary-foreground grid place-items-center hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {typing ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`size-14 rounded-full bg-gradient-brand text-primary-foreground shadow-elevated grid place-items-center transition-all hover:scale-110 active:scale-95 ${isOpen ? 'rotate-90' : ''}`}
      >
        {isOpen ? <X className="size-6" /> : <MessageSquare className="size-6" />}
      </button>
    </div>
  );
}
