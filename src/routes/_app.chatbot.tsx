import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { Send, Sparkles, Bot, User, Loader2 } from "lucide-react";
import { apiChat } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app/chatbot")({
  head: () => ({ meta: [{ title: "AI Assistant — TrustHire AI" }] }),
  component: Chat,
});

type Msg = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "Analyze this job link for fraud signals",
  "Why is my ATS score 84%?",
  "Give me 5 interview questions for a Frontend role",
  "How can I push my ATS score above 90%?",
];

function Chat() {
  const { name } = useAuth();
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: `Hi ${name.split(' ')[0]} 👋 I'm your TrustHire assistant. Paste a job link, ask about your ATS, or get interview prep.` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, typing]);

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
    
    const newMsgs: Msg[] = [...msgs, { role: "user", text }];
    setMsgs(newMsgs);
    setInput("");
    setTyping(true);

    try {
      const history = msgs.map(m => ({ role: m.role, text: m.text }));
      const res = await apiChat(text, history);
      setMsgs(prev => [...prev, { role: "assistant", text: res.response }]);
    } catch (err: any) {
      toast.error("AI Assistant is offline");
      setMsgs(prev => [...prev, { role: "assistant", text: "I'm having trouble connecting to my brain right now. Please try again in a moment." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-card flex flex-col h-[calc(100vh-180px)]">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <div className="size-9 rounded-lg bg-gradient-brand text-primary-foreground grid place-items-center"><Sparkles className="size-4" /></div>
        <div>
          <div className="font-semibold">TrustHire Assistant</div>
          <div className="text-xs text-muted-foreground">Multilingual · Context-aware · Powered by Gemini</div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5 space-y-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "assistant" && <div className="size-8 rounded-md bg-primary/10 text-primary grid place-items-center shrink-0"><Bot className="size-4" /></div>}
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${m.role === "user" ? "bg-gradient-brand text-primary-foreground rounded-br-sm" : "bg-secondary rounded-bl-sm"}`}>{m.text}</div>
            {m.user && <div className="size-8 rounded-md bg-secondary grid place-items-center shrink-0"><User className="size-4" /></div>}
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="size-8 rounded-md bg-primary/10 text-primary grid place-items-center"><Bot className="size-4" /></div>
            <div className="flex gap-1">
              <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" />
              <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:120ms]" />
              <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:240ms]" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border p-3">
        <div className="flex flex-wrap gap-2 px-2 pb-2">
          {SUGGESTIONS.map(s => (
            <button key={s} disabled={typing} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-muted disabled:opacity-50">{s}</button>
          ))}
        </div>
        <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex items-center gap-2 px-2">
          <input value={input} onChange={e=>setInput(e.target.value)} disabled={typing} placeholder="Ask anything…" className="flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm disabled:opacity-50" />
          <button disabled={typing || !input.trim()} className="size-10 rounded-md bg-gradient-brand text-primary-foreground grid place-items-center shadow-card disabled:opacity-50">
            {typing ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
