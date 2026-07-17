import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageCircle, Star, ChevronRight, ArrowRight, RotateCcw } from 'lucide-react';
import {
  BotMessage, QuickReply, ChatState, ChatStep,
  INITIAL_CHAT_STATE, QUICK_STARTS,
  getBotResponse, getGreeting, isWeekend, isSpam,
  buildWhatsAppMessage, WHATSAPP_NUMBER
} from './botBrain';

// ─── Typing dots ─────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }}
        className="w-2 h-2 rounded-full bg-brand-gold-500"
      />
    ))}
  </div>
);

// ─── Sending animation ────────────────────────────────────────────────────
const SendingAnimation = () => (
  <div className="flex flex-col items-center gap-3 py-6">
    <motion.div
      animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 1.2, repeat: Infinity }}
      className="text-3xl"
    >✉️</motion.div>
    <p className="text-xs text-gray-500 font-medium">Sending your message…</p>
    <div className="flex gap-1">
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-brand-gold-500"
        />
      ))}
    </div>
  </div>
);

// ─── WhatsApp collect animation ───────────────────────────────────────────
const WhatsAppCollectAnimation = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <motion.div
        animate={{ scale: [1, 1.2, 0.9, 1.1, 1], rotate: [0, -10, 10, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-4xl"
      >📦</motion.div>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-xs text-gray-600 text-center font-medium px-2"
      >
        Collecting your conversation…<br />Preparing to open WhatsApp
      </motion.p>
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mt-1 mx-4">
        <motion.div
          initial={{ width: '0%' }} animate={{ width: '100%' }}
          transition={{ duration: 3 }}
          className="h-full bg-green-500 rounded-full"
        />
      </div>
    </div>
  );
};

// ─── Star rating ──────────────────────────────────────────────────────────
const StarRating = ({ onRate }: { onRate: (n: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1 justify-center py-2">
      {[1, 2, 3, 4, 5].map(n => (
        <motion.button
          key={n}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onRate(n)}
          className="cursor-pointer transition-colors"
        >
          <Star
            className={`w-7 h-7 transition-colors ${n <= hovered ? 'text-brand-gold-500 fill-brand-gold-500' : 'text-gray-300'}`}
          />
        </motion.button>
      ))}
    </div>
  );
};

// ─── Message bubble ───────────────────────────────────────────────────────
const MessageBubble = ({
  msg, onQuickReply, onNavigate
}: {
  msg: BotMessage;
  onQuickReply: (q: QuickReply) => void;
  onNavigate: (path: string) => void;
}) => {
  const isBot = msg.from === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
    >
      <div className={`max-w-[82%] ${isBot ? '' : 'order-1'}`}>
        {isBot && (
          <div className="w-6 h-6 rounded-full bg-brand-gold-500 flex items-center justify-center mb-1 ml-1">
            <span className="text-white text-[9px] font-black">W</span>
          </div>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
            isBot
              ? 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
              : 'bg-brand-gold-500 text-white rounded-tr-sm'
          }`}
        >
          {msg.text}
        </div>

        {/* Quick replies */}
        {msg.quickReplies && msg.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
            {msg.quickReplies.map((q, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => onQuickReply(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-brand-gold-500/40 text-brand-gold-600 hover:bg-brand-gold-500 hover:text-white transition-all cursor-pointer font-medium bg-white shadow-sm"
              >
                {q.label}
              </motion.button>
            ))}
          </div>
        )}

        {/* Page link button */}
        {msg.link && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onNavigate(msg.link!.path)}
            className="mt-2 ml-1 flex items-center gap-1.5 text-xs text-brand-gold-600 hover:text-brand-gold-700 font-bold cursor-pointer group"
          >
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            {msg.link.label}
          </motion.button>
        )}

        <p className="text-[9px] text-gray-400 mt-1 ml-1">
          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Notification sound (base64 tiny beep) ───────────────────────────────
function playNotifSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch { /* silently fail if audio blocked */ }
}

// ─── Main ChatWidget ──────────────────────────────────────────────────────
interface ChatWidgetProps {
  onNavigate: (path: string) => void;
}

export default function ChatWidget({ onNavigate }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [hasNotif, setHasNotif] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>(INITIAL_CHAT_STATE);
  const [showWhatsAppAnim, setShowWhatsAppAnim] = useState(false);
  const [showSendingAnim, setShowSendingAnim] = useState(false);
  const [ratingDone, setRatingDone] = useState(false);
  const [originalTitle] = useState(document.title);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notifTitleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const uid = () => `m_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, []);

  // ── Show banner on load, then notification ──
  useEffect(() => {
    bannerTimerRef.current = setTimeout(() => {
      setShowBanner(true);
      bannerTimerRef.current = setTimeout(() => {
        setShowBanner(false);
        setHasNotif(true);
        playNotifSound();
        // Blink title
        let blink = false;
        notifTitleRef.current = setInterval(() => {
          document.title = blink ? `💬 1 message — WHENMEN` : originalTitle;
          blink = !blink;
        }, 1500);
      }, 5000);
    }, 3000);
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, [originalTitle]);

  // ── Stop title blink when opened ──
  useEffect(() => {
    if (open) {
      setHasNotif(false);
      document.title = originalTitle;
      if (notifTitleRef.current) clearInterval(notifTitleRef.current);
    }
  }, [open, originalTitle]);

  // ── Init greeting on first open ──
  useEffect(() => {
    if (open && messages.length === 0) {
      const weekend = isWeekend();
      const greetText = getGreeting();
      addBotMessage(greetText, weekend
        ? [
            { label: "Yes, help me anyway", value: "yes continue" },
            { label: "I'll come back later", value: "bye" },
          ]
        : QUICK_STARTS,
        weekend ? 'weekend_confirm' : 'idle'
      );
    }
  }, [open]);

  useEffect(() => { scrollToBottom(); }, [messages, typing]);

  // ── Add bot message with typing delay ──
  const addBotMessage = useCallback((
    text: string,
    quickReplies?: QuickReply[],
    stepAfter?: ChatStep,
    link?: { label: string; path: string },
    delay = 900
  ) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const msg: BotMessage = {
        id: uid(), from: 'bot', text,
        quickReplies, link,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, msg]);
      if (stepAfter) setChatState(prev => ({ ...prev, step: stepAfter }));
      scrollToBottom();
    }, delay);
  }, [scrollToBottom]);

  const addUserMessage = (text: string) => {
    const msg: BotMessage = { id: uid(), from: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, msg]);
    scrollToBottom();
  };

  // ── Handle navigation from quick replies ──
  const handleNavigate = (path: string) => {
    onNavigate(path);
    setOpen(false);
  };

  // ── Process user input ──
  const processInput = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Spam check
    if (isSpam(trimmed)) {
      addBotMessage(
        "⚠️ I detected content that looks like spam and couldn't process your message.\n\nSpamming is not allowed on this platform. If you believe this is an error, please reach us directly at info@whenmen.org.",
        undefined, undefined, undefined, 600
      );
      return;
    }

    addUserMessage(trimmed);
    const state = chatState;

    // ── Contact collection flow ──
    if (state.step === 'collect_name') {
      setChatState(prev => ({ ...prev, contactName: trimmed, step: 'collect_email' }));
      addBotMessage(`Thanks, **${trimmed}**! 😊 What's your **email address**?`, undefined, 'collect_email');
      return;
    }

    if (state.step === 'collect_email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        addBotMessage("That doesn't look like a valid email. Please try again:", undefined, undefined, undefined, 500);
        return;
      }
      setChatState(prev => ({ ...prev, contactEmail: trimmed, step: 'collect_phone' }));
      addBotMessage("Got it! What's your **phone number**? (Type 'skip' to skip)", undefined, 'collect_phone');
      return;
    }

    if (state.step === 'collect_phone') {
      const phone = /skip/i.test(trimmed) ? '' : trimmed;
      setChatState(prev => ({ ...prev, contactPhone: phone, step: 'collect_message' }));
      addBotMessage("Almost there! What's your **message** for our team?", undefined, 'collect_message');
      return;
    }

    if (state.step === 'collect_message') {
      setChatState(prev => ({ ...prev, contactMessage: trimmed, step: 'whatsapp_confirm' }));
      addBotMessage(
        `Perfect! I have everything I need:\n\n👤 **${state.contactName}**\n📧 ${state.contactEmail}${state.contactPhone ? `\n📞 ${state.contactPhone}` : ''}\n\n💬 "${trimmed}"\n\nWould you like me to **open WhatsApp** so you can continue this conversation directly with our team?`,
        [
          { label: '✅ Yes, open WhatsApp', value: 'yes whatsapp' },
          { label: '📧 Email is fine', value: 'no just email' },
        ],
        'whatsapp_confirm'
      );
      return;
    }

    if (state.step === 'whatsapp_confirm') {
      const accepted = /yes|open|sure|okay|ok|go|whatsapp|send|continue/i.test(trimmed);
      if (accepted) {
        setShowWhatsAppAnim(true);
        return;
      } else {
        setShowSendingAnim(true);
        setTimeout(() => {
          setShowSendingAnim(false);
          addBotMessage(
            `✅ Your message has been sent to our team! We'll reach out to **${state.contactEmail}** within 48 hours.\n\nIs there anything else I can help you with?`,
            QUICK_STARTS,
            'idle'
          );
          setChatState(INITIAL_CHAT_STATE);
        }, 2800);
        return;
      }
    }

    if (state.step === 'weekend_confirm') {
      const yes = /yes|sure|continue|help|okay|ok|go ahead/i.test(trimmed);
      if (yes) {
        setChatState(prev => ({ ...prev, step: 'idle', weekendConfirmed: true }));
        addBotMessage(
          "Great! I'm happy to help. 😊 What would you like to know?",
          QUICK_STARTS, 'idle'
        );
        return;
      } else {
        addBotMessage(
          "No problem! Come back any time. God bless you, brother. 🙏",
          undefined, 'ended'
        );
        return;
      }
    }

    // ── Rating flow ──
    if (state.step === 'rating') {
      addBotMessage("Please use the stars below to rate your experience 😊", undefined, undefined, undefined, 400);
      return;
    }

    // ── Normal conversation ──
    const response = getBotResponse(trimmed, state);

    if (response.action === 'collect_contact') {
      setChatState(prev => ({ ...prev, step: 'collect_name' }));
      addBotMessage(response.text, undefined, 'collect_name');
      return;
    }

    if (response.action === 'rating') {
      setChatState(prev => ({ ...prev, step: 'rating' }));
      addBotMessage(response.text, undefined, 'rating');
      return;
    }

    addBotMessage(response.text, response.quickReplies, undefined, response.link);
  }, [chatState, addBotMessage]);

  const handleSend = () => {
    if (!input.trim()) return;
    processInput(input);
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleQuickReply = (q: QuickReply) => {
    if (q.path) {
      addUserMessage(q.label);
      setTimeout(() => {
        addBotMessage(
          `Taking you to ${q.label}! Click the link below:`,
          undefined, undefined,
          { label: `Open ${q.label} →`, path: q.path! }
        );
      }, 300);
    } else {
      processInput(q.value);
    }
  };

  const handleWhatsAppDone = () => {
    setShowWhatsAppAnim(false);
    const wa = buildWhatsAppMessage(messages, {
      name: chatState.contactName,
      email: chatState.contactEmail,
      phone: chatState.contactPhone,
    });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${wa}`, '_blank');
    addBotMessage(
      "✅ All messages have been prepared! WhatsApp should be opening now for direct continuation with our team.\n\nGod bless you, brother! 🙏",
      undefined, 'idle'
    );
    setChatState(INITIAL_CHAT_STATE);
  };

  const handleRate = (n: number) => {
    setRatingDone(true);
    addUserMessage(`${'⭐'.repeat(n)} (${n}/5)`);
    addBotMessage(
      n >= 4
        ? `Thank you so much! ${n === 5 ? '🌟 A perfect score' : '⭐ So glad I could help'}! We'll send a quick summary to your email if you shared it. God bless you! 🙏`
        : `Thank you for the feedback! We're always working to improve. If you'd like to share more, reach us at info@whenmen.org. God bless! 🙏`,
      undefined, 'ended'
    );
    setChatState(prev => ({ ...prev, step: 'ended' }));
  };

  const handleClose = () => {
    setOpen(false);
    if (messages.length > 0 && chatState.step !== 'ended' && chatState.step !== 'rating') {
      // Ask for rating on close if chat was active
      setTimeout(() => {
        setChatState(prev => ({ ...prev, step: 'rating' }));
        if (!typing) {
          addBotMessage(
            "Before you go — how would you rate your experience today?",
            undefined, 'rating', undefined, 300
          );
        }
        setOpen(true);
      }, 400);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setChatState(INITIAL_CHAT_STATE);
    setRatingDone(false);
    setShowWhatsAppAnim(false);
    setShowSendingAnim(false);
  };

  return (
    <>
      {/* ── Help banner ── */}
      <AnimatePresence>
        {showBanner && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[200] bg-white rounded-2xl shadow-2xl border border-gray-100 px-5 py-4 max-w-[220px]"
          >
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-xs font-bold text-gray-800 mb-1">👋 Need help?</p>
            <p className="text-[11px] text-gray-500 leading-relaxed">I can answer any question about WHENMEN INC.</p>
            <button
              onClick={() => { setShowBanner(false); setOpen(true); }}
              className="mt-2.5 w-full py-1.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
            >
              Chat with us
            </button>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2.5 right-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB button ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(p => !p)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-brand-gold-500 text-white shadow-2xl shadow-brand-gold-500/40 flex items-center justify-center cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Notification badge */}
        <AnimatePresence>
          {hasNotif && !open && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-black text-white border-2 border-white"
            >
              1
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[199] w-[360px] max-w-[calc(100vw-24px)] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: '540px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-brand-gold-500 px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-display font-black text-white text-sm">W</div>
              <div className="flex-1">
                <p className="font-display font-bold text-white text-sm leading-none">WHENMEN Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                  <p className="text-white/70 text-[10px]">Online · Usually replies instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={resetChat} className="text-white/60 hover:text-white transition-colors cursor-pointer" title="Reset chat">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={handleClose} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-1">
              {messages.map(msg => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  onQuickReply={handleQuickReply}
                  onNavigate={handleNavigate}
                />
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {/* WhatsApp collect animation */}
              {showWhatsAppAnim && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full mx-2">
                    <WhatsAppCollectAnimation onDone={handleWhatsAppDone} />
                  </div>
                </motion.div>
              )}

              {/* Sending animation */}
              {showSendingAnim && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full mx-2">
                    <SendingAnimation />
                  </div>
                </motion.div>
              )}

              {/* Star rating */}
              {chatState.step === 'rating' && !ratingDone && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mx-2"
                >
                  <p className="text-xs text-gray-500 text-center mb-2">Rate your experience</p>
                  <StarRating onRate={handleRate} />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            {chatState.step !== 'ended' && (
              <div className="bg-white border-t border-gray-100 px-3 py-3 flex items-center gap-2 shrink-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message…"
                  maxLength={500}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-gold-500/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 disabled:bg-gray-200 text-white flex items-center justify-center cursor-pointer transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            )}

            {chatState.step === 'ended' && (
              <div className="bg-white border-t border-gray-100 px-4 py-3 text-center shrink-0">
                <p className="text-xs text-gray-400">Chat ended</p>
                <button
                  onClick={resetChat}
                  className="mt-1.5 text-xs font-bold text-brand-gold-500 hover:text-brand-gold-600 cursor-pointer flex items-center gap-1 mx-auto"
                >
                  <RotateCcw className="w-3 h-3" /> Start a new conversation
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="bg-white px-4 py-2 text-center border-t border-gray-50 shrink-0">
              <p className="text-[9px] text-gray-300">Powered by WHENMEN INC. · <span className="cursor-pointer hover:text-gray-400">info@whenmen.org</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
