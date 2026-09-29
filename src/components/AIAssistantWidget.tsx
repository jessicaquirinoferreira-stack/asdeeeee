import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  MessageCircle, 
  Bot, 
  HelpCircle, 
  RefreshCw, 
  ExternalLink,
  ChevronDown,
  User,
  Heart
} from 'lucide-react';
import { SiteContent } from '../services/firebase';

interface AIAssistantWidgetProps {
  content: SiteContent;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const DARLENE_PHOTO = "https://i.postimg.cc/2ysWzV2L/Chat-GPT-Image-23-de-jun-de-2026-18-29-04.png";

const SUGGESTED_QUESTIONS = [
  "O que é Estimulação Visual?",
  "Para quem é indicado?",
  "O que é DVC (Deficiência Visual Cortical)?",
  "Como agendar uma consulta?",
];

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Olá! Sou a Assistente Virtual da Dra. Darlene Kloster.\n\nEstou aqui para esclarecer suas dúvidas sobre Estimulação Visual, Neurovisão e DVC. Como posso te ajudar hoje?',
      timestamp: 'Agora',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const cleanPhone = content.whatsappNumber ? content.whatsappNumber.replace(/\D/g, '') : '5541996222432';
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${encodeURIComponent('Olá, Darlene! Estive no seu site e gostaria de conversar com você sobre Estimulação Visual.')}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || 'Estou à disposição! Para tirar mais dúvidas ou agendar, você pode falar diretamente com a Darlene no WhatsApp.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn("Using smart fallback reply:", err);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'A Estimulação Visual potencializa as vias neurais e a função da visão através da neuroplasticidade.\n\n👉 A Darlene está online no WhatsApp para atender seu caso com atenção individualizada!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button on the Left Side */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        
        {/* Unopened Tooltip on desktop */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-slate-800 text-xs font-semibold cursor-pointer hover:border-[#8052ff] hover:scale-105 transition-all animate-fadeIn"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8052ff] animate-pulse" />
            <span>Dúvidas? Fale com a <strong>Assistente IA</strong></span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir Assistente Virtual de IA"
          className={`relative p-1.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-108 active:scale-95 group ${
            isOpen
              ? 'bg-slate-900 text-white rotate-90'
              : 'bg-gradient-to-tr from-[#8052ff] via-[#6e3df0] to-[#15846e] text-white ring-4 ring-white/80'
          }`}
        >
          {/* Pulsing Aura */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8052ff] to-[#ffb829] opacity-40 blur-sm animate-pulse"></span>
          )}

          {isOpen ? (
            <div className="w-13 h-13 rounded-full flex items-center justify-center bg-slate-900 text-white">
              <X className="w-6 h-6" />
            </div>
          ) : (
            <div className="relative w-13 h-13 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-white shadow-inner">
              <img
                src={DARLENE_PHOTO}
                alt="Assistente Virtual Dra. Darlene Kloster"
                className="w-full h-full object-cover object-top"
              />
              
              {/* Official AI Sparkle Badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#8052ff] text-white flex items-center justify-center border-1.5 border-white shadow-sm">
                <Sparkles className="w-3 h-3 fill-white" />
              </div>

              {/* Online Green Status Dot */}
              <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#22c55e] border-2 border-white"></div>
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 left-4 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[580px] max-h-[82vh] bg-white rounded-[28px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-[#1a1033] to-slate-900 text-white flex items-center justify-between relative overflow-hidden">
            
            {/* Ambient Header Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8052ff]/20 rounded-full blur-xl pointer-events-none"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#ffb829] bg-white shrink-0">
                <img
                  src={DARLENE_PHOTO}
                  alt="Dra. Darlene Kloster"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold truncate">Assistente Darlene Kloster</h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#8052ff]/40 text-[#ffb829] text-[9.5px] font-bold uppercase tracking-wider border border-[#ffb829]/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>IA Oficial</span>
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Estimulação Visual & Neurovisão</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors relative z-10"
              aria-label="Fechar chat"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Direct Sticky Alert */}
          <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium truncate">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 fill-emerald-600/20" />
              <span className="truncate">Prefere falar direto com a Darlene?</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold uppercase tracking-wider shrink-0 shadow-sm transition-transform hover:scale-105"
            >
              <span>WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-white border border-slate-200 shrink-0 mt-0.5 shadow-sm">
                    <img src={DARLENE_PHOTO} alt="Darlene" className="w-full h-full object-cover object-top" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#8052ff] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 px-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-white border border-slate-200 shrink-0 shadow-sm">
                  <img src={DARLENE_PHOTO} alt="Darlene" className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#8052ff] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#ffb829] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#15846e] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10.5px] font-bold uppercase text-slate-400 px-1 shrink-0">
              Sugestões:
            </span>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isTyping}
                className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#8052ff]/10 hover:text-[#8052ff] hover:border-[#8052ff]/30 text-slate-700 text-xs font-medium border border-slate-200/80 transition-all active:scale-95"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Digite sua dúvida sobre estimulação visual..."
              className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 border border-slate-200 focus:border-[#8052ff] focus:bg-white focus:ring-2 focus:ring-[#8052ff]/20 outline-none text-slate-900 text-xs sm:text-sm placeholder-slate-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              aria-label="Enviar mensagem"
              className="w-10 h-10 rounded-full bg-[#8052ff] hover:bg-[#6e3df0] disabled:opacity-40 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
