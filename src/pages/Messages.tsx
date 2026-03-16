import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ChevronLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Conversation {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  item: string;
  messages: { id: string; text: string; from: "me" | "other"; time: string }[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Marie L.",
    initials: "ML",
    lastMessage: "Super, je peux passer demain à 14h ?",
    time: "12:34",
    unread: 2,
    item: "Perceuse Bosch",
    messages: [
      { id: "m1", text: "Bonjour, la perceuse est toujours dispo ?", from: "other", time: "11:20" },
      { id: "m2", text: "Oui bien sûr ! Elle est en très bon état.", from: "me", time: "11:45" },
      { id: "m3", text: "Super, je peux passer demain à 14h ?", from: "other", time: "12:34" },
    ],
  },
  {
    id: "2",
    name: "Thomas R.",
    initials: "TR",
    lastMessage: "Merci pour la location, tout était parfait !",
    time: "Hier",
    unread: 0,
    item: "Vélo électrique",
    messages: [
      { id: "m1", text: "Salut, je ramène le vélo ce soir.", from: "other", time: "17:00" },
      { id: "m2", text: "Pas de souci, à ce soir !", from: "me", time: "17:05" },
      { id: "m3", text: "Merci pour la location, tout était parfait !", from: "other", time: "20:12" },
    ],
  },
  {
    id: "3",
    name: "Sophie M.",
    initials: "SM",
    lastMessage: "D'accord, je réserve pour samedi alors.",
    time: "Lun",
    unread: 0,
    item: "Appareil photo Canon",
    messages: [
      { id: "m1", text: "Est-ce que l'appareil photo est disponible ce week-end ?", from: "other", time: "09:00" },
      { id: "m2", text: "Oui, samedi et dimanche sont libres.", from: "me", time: "09:30" },
      { id: "m3", text: "D'accord, je réserve pour samedi alors.", from: "other", time: "09:45" },
    ],
  },
];

const Messages = () => {
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");

  if (activeConvo) {
    return (
      <div className="min-h-screen bg-background pb-24 flex flex-col">
        {/* Chat header */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-5 py-3 flex items-center gap-3">
            <button onClick={() => setActiveConvo(null)} className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-semibold text-foreground">
              {activeConvo.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{activeConvo.name}</p>
              <p className="text-[10px] text-muted-foreground">{activeConvo.item}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 container mx-auto px-5 py-4 space-y-3 overflow-y-auto">
          {activeConvo.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.from === "me"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card shadow-card text-foreground rounded-bl-md"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="sticky bottom-20 bg-background/80 backdrop-blur-xl border-t border-border/50">
          <div className="container mx-auto px-5 py-3 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 h-11 px-4 rounded-xl bg-card shadow-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:opacity-90 active:scale-95 transition-all">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-5 py-4">
          <h1 className="text-xl font-bold text-foreground tracking-tight">Messages</h1>
          <p className="text-xs text-muted-foreground">{mockConversations.length} conversations</p>
        </div>
      </div>

      <div className="container mx-auto px-5 pt-2">
        {mockConversations.map((convo) => (
          <motion.button
            key={convo.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveConvo(convo)}
            className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-card transition-colors text-left"
          >
            <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-semibold text-foreground shrink-0">
              {convo.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{convo.name}</p>
                <span className="text-[10px] text-muted-foreground">{convo.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{convo.item}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{convo.lastMessage}</p>
            </div>
            {convo.unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                {convo.unread}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Messages;
