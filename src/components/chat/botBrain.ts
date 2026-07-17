// ─── Bot Brain — knowledge base + response engine ────────────────────────

export interface BotMessage {
  id: string;
  from: 'bot' | 'user';
  text: string;
  quickReplies?: QuickReply[];
  link?: { label: string; path: string };
  timestamp: Date;
}

export interface QuickReply {
  label: string;
  value: string;
  path?: string;
}

// ─── Spam detection ───────────────────────────────────────────────────────
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|bitcoin|crypto|earn money|make money fast|click here|free money|win \$|prize|congratulations you won)\b/i,
  /(\b\w+\b)(\s+\1){3,}/i, // repeated words
  /http[s]?:\/\/(?!whenmen\.org)/i, // external links
  /[A-Z]{6,}/, // excessive caps
];

export function isSpam(text: string): boolean {
  return SPAM_PATTERNS.some(p => p.test(text));
}

// ─── Greeting based on timezone ───────────────────────────────────────────
export function getGreeting(): string {
  try {
    const now = new Date();
    const lagosTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
    const hour = lagosTime.getHours();
    const day = lagosTime.getDay(); // 0=Sun, 6=Sat
    const isWeekend = day === 0 || day === 6;
    const dayName = lagosTime.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Africa/Lagos' });

    let timeGreet = '';
    if (hour >= 5 && hour < 12) timeGreet = 'Good morning';
    else if (hour >= 12 && hour < 17) timeGreet = 'Good afternoon';
    else if (hour >= 17 && hour < 21) timeGreet = 'Good evening';
    else timeGreet = 'Hello';

    if (isWeekend) {
      return `${timeGreet}! 🙏 It's ${dayName} — our team is resting today, but I'm here and ready to help you. Would you like to continue?`;
    }
    return `${timeGreet}! 👋 Welcome to WHENMEN INC. I'm your brotherhood assistant. How can I help you today?`;
  } catch {
    return "Hello! 👋 Welcome to WHENMEN INC. I'm your brotherhood assistant. How can I help you today?";
  }
}

export function isWeekend(): boolean {
  try {
    const now = new Date();
    const lagosTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
    const day = lagosTime.getDay();
    return day === 0 || day === 6;
  } catch { return false; }
}

// ─── Quick start options ──────────────────────────────────────────────────
export const QUICK_STARTS: QuickReply[] = [
  { label: '🙏 Our Programs', value: 'tell me about your programs', path: '/programs' },
  { label: '📅 Upcoming Events', value: 'what events are coming up', path: '/events' },
  { label: '❤️ How to Give', value: 'how can i donate', path: '/give' },
  { label: '🤝 Join the Brotherhood', value: 'how do i join', path: '/join' },
  { label: '📖 Resources', value: 'what resources do you have', path: '/resources' },
  { label: '📞 Contact Us', value: 'i want to contact you', path: '/contact' },
];

// ─── Response engine ──────────────────────────────────────────────────────
interface BotResponse {
  text: string;
  quickReplies?: QuickReply[];
  link?: { label: string; path: string };
  action?: 'ask_human' | 'collect_contact' | 'whatsapp_confirm' | 'end_chat' | 'rating';
}

export function getBotResponse(input: string, state: ChatState): BotResponse {
  const msg = input.toLowerCase().trim();

  // Programs
  if (/program|pillar|ministry|prayer|worship|mentorship|prison|family|youth|leadership|outreach/i.test(msg)) {
    return {
      text: "We have 8 core programs designed to transform men in every area of life:\n\n🙏 **Daily Prayer Gatherings** — Mon–Fri 6 AM CST\n🎵 **WHENMEN Worship** — Monthly worship nights\n👥 **Mentorship & Discipleship** — 12-week tracks\n👨‍👩‍👦 **Marriage & Family Enrichment** — Quarterly workshops\n🌍 **Community Outreach** — Monthly food drives\n🏆 **Leadership Development** — 4-module academy\n🔑 **Prison & Reentry Support** — Weekly facility visits\n⭐ **Youth & Next Generation** — Ages 8-25\n\nWhich program interests you most?",
      quickReplies: [
        { label: 'Prayer Gatherings', value: 'tell me about prayer', path: '/programs?id=prayer' },
        { label: 'Mentorship', value: 'tell me about mentorship', path: '/programs?id=mentorship' },
        { label: 'Youth Programs', value: 'tell me about youth', path: '/programs?id=youth' },
        { label: 'View All Programs', value: 'view all programs', path: '/programs' },
      ],
      link: { label: 'Explore All Programs →', path: '/programs' },
    };
  }

  // Events
  if (/event|gathering|worship night|meeting|camp|retreat|bootcamp|schedule/i.test(msg)) {
    return {
      text: "Here are our upcoming gatherings:\n\n📅 **Jul 15** — WHENMEN Worship Night, Dallas TX & Livestream\n📅 **Jul 20** — Family Crisis Workshop (Online Webinar)\n📅 **Jul 25** — Community Food Drive, Houston\n📅 **Aug 01** — Men's Fellowship Breakfast, Dallas\n📅 **Aug 08** — Youth Leadership Bootcamp, Atlanta\n\nWe also gather weekly: Mon–Fri 6 AM for Morning Prayer, Wednesdays 9 PM for Night Prayer.",
      quickReplies: [
        { label: 'Register for an Event', value: 'register for event', path: '/events' },
        { label: 'Add to Calendar', value: 'add to calendar', path: '/events' },
      ],
      link: { label: 'See All Events →', path: '/events' },
    };
  }

  // Give / Donate
  if (/give|donat|contribut|support|fund|money|gift|tithe|sow|invest/i.test(msg)) {
    return {
      text: "Your generosity directly fuels our mission! Here's how your gift makes an impact:\n\n💛 **$25/mo** — Sponsors one man's full 12-week Discipleship Track\n💛 **$50/mo** — Funds a prison visitation event\n💛 **$100/mo** — Covers a family crisis workshop for 5 couples\n💛 **$250/mo** — Launches a new city chapter\n💛 **$500/mo** — Funds a regional worship night\n\nYou can also give a one-time gift of any amount. All donations are fully tax-deductible (501c3).",
      quickReplies: [
        { label: 'Give Now', value: 'i want to give now', path: '/give' },
        { label: 'Monthly Partner', value: 'become monthly partner', path: '/give' },
      ],
      link: { label: 'Make a Gift →', path: '/give' },
    };
  }

  // Join
  if (/join|member|sign up|register|become|brotherhood|chapter|enroll/i.test(msg)) {
    return {
      text: "We'd love to have you in the brotherhood! Here's how to get connected:\n\n1️⃣ **Find a Chapter** — We're active in Dallas, Houston, Atlanta, and Online\n2️⃣ **Fill the Membership Form** — Share your interests and city\n3️⃣ **Receive a Welcome Pack** — Prayer outlines + community access\n4️⃣ **Start Gathering** — Join your first prayer or worship gathering\n\nEvery man is welcome regardless of denomination or background.",
      quickReplies: [
        { label: 'Join Now', value: 'join now', path: '/join' },
        { label: 'Find a Chapter', value: 'find chapter', path: '/join' },
      ],
      link: { label: 'Join the Movement →', path: '/join' },
    };
  }

  // About
  if (/about|who are you|what is whenmen|history|founded|founder|pastor lani|mission|vision/i.test(msg)) {
    return {
      text: "**WHENMEN INC.** is a faith-based 501(c)(3) nonprofit founded by **Pastor Lani Akinyode**.\n\nWe started in 2024 when a small group of men gathered to pray in a living room. That prayer meeting became a nationwide movement.\n\n🎯 **Vision** — Raise a generation of men who lead their families with integrity and leave a legacy that glorifies Christ.\n\n🚀 **Mission** — Restore, equip, empower, and mobilize men through prayer, worship, discipleship, mentorship, and outreach.\n\nToday we reach across cities, prisons, and generations.",
      link: { label: 'Learn More About Us →', path: '/about' },
    };
  }

  // Resources
  if (/resource|blog|devotion|podcast|download|study|guide|pdf|audio/i.test(msg)) {
    return {
      text: "Our **Spiritual Armory** is packed with free resources for your journey:\n\n📝 **Blog & Devotionals** — Weekly articles from the WHENMEN Voice\n🎙️ **Podcast** — Weekly teaching episodes on Spotify & Apple\n📄 **Free Downloads** — Prayer guides, marriage worksheets, leadership assessments\n📰 **Newsletter Archive** — Past editions of WHENMEN Weekly\n\nAll resources are free. Some downloads require email verification.",
      link: { label: 'Access Resources →', path: '/resources' },
    };
  }

  // Contact
  if (/contact|reach|email|phone|address|office|location|talk to someone|speak/i.test(msg)) {
    return {
      text: "You can reach us through several channels:\n\n📧 **Email** — info@whenmen.org\n📞 **Phone** — (214) 555-0190\n📍 **Location** — Dallas, TX (Headquarters)\n🕐 **Office Hours** — Mon–Fri, 9 AM–5 PM CST\n\nWe respond to all inquiries within 48 business hours.",
      quickReplies: [
        { label: 'Send a Message', value: 'send message', path: '/contact' },
        { label: 'Prayer Request', value: 'prayer request', path: '/contact' },
        { label: 'Talk to a Person', value: 'talk to real person' },
      ],
      link: { label: 'Contact Page →', path: '/contact' },
    };
  }

  // Prayer request
  if (/pray|prayer request|intercession|pray for me/i.test(msg)) {
    return {
      text: "We'd be honoured to stand with you in prayer. Our intercession team prays over every single request — confidentially and with faith.\n\n'The prayer of a righteous person is powerful and effective.' — James 5:16",
      quickReplies: [
        { label: 'Submit Prayer Request', value: 'submit prayer', path: '/contact' },
        { label: 'Talk to a Pastor', value: 'talk to real person' },
      ],
      link: { label: 'Confidential Prayer Form →', path: '/contact' },
    };
  }

  // FAQ
  if (/faq|question|cost|free|women|church|denomin|counseling|teen|how much/i.test(msg)) {
    return {
      text: "Great question! Here are answers to our most common questions:\n\n✅ **Is it free to join?** — Yes! All core programs are free.\n✅ **Any denomination?** — Yes, we welcome all Christian backgrounds.\n✅ **Can women attend?** — Some events yes (couples workshops). Core programs are men-focused.\n✅ **Do you offer counseling?** — We provide peer support and refer to licensed Christian counselors.\n✅ **Teen programs?** — Yes! Ages 8-18 via WHENMEN Youth.",
      link: { label: 'Read All FAQs →', path: '/faq' },
    };
  }

  // Talk to real person
  if (/real person|human|agent|staff|someone|talk to|speak to|representative/i.test(msg)) {
    return {
      text: "Of course! I'll connect you with a real team member. Let me collect a few details first.\n\nWhat's your **full name**?",
      action: 'collect_contact',
    };
  }

  // Legal / Privacy
  if (/privacy|terms|refund|legal|policy|non.?discrimination/i.test(msg)) {
    return {
      text: "You can find all our legal documents in one place:",
      quickReplies: [
        { label: 'Privacy Policy', value: 'privacy policy', path: '/privacy' },
        { label: 'Terms of Service', value: 'terms', path: '/terms' },
        { label: 'Refund Policy', value: 'refund', path: '/refund' },
      ],
      link: { label: 'Legal & Governance →', path: '/privacy' },
    };
  }

  // Stories / testimonials
  if (/stor|testimon|transform|changed|life|brother|experience/i.test(msg)) {
    return {
      text: "God has done incredible things through this brotherhood! Men have been restored, families healed, addictions broken, and purposes discovered.\n\nYou can read real testimonies and share your own story on our Stories page.",
      link: { label: 'Read Stories →', path: '/stories' },
    };
  }

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|what's up|sup)\b/i.test(msg)) {
    return {
      text: "Great to hear from you! 😊 I'm here to help with anything about WHENMEN INC. What would you like to know?",
      quickReplies: QUICK_STARTS,
    };
  }

  // Thanks
  if (/thank|thanks|appreciate|great|awesome|perfect|helpful/i.test(msg)) {
    return {
      text: "You're welcome, brother! 🙏 Is there anything else I can help you with?",
      quickReplies: [
        { label: 'Ask another question', value: 'help' },
        { label: 'Talk to someone', value: 'talk to real person' },
        { label: 'End chat', value: 'end chat', },
      ],
    };
  }

  // End chat
  if (/bye|goodbye|end chat|close|done|finished|that's all/i.test(msg)) {
    return {
      text: "It was great chatting with you! Before you go, how would you rate this conversation?",
      action: 'rating',
    };
  }

  // Default fallback
  return {
    text: "I'm not sure I fully understood that, but I'm here to help! Here are some things I can assist you with:",
    quickReplies: QUICK_STARTS,
  };
}

// ─── State types ──────────────────────────────────────────────────────────
export type ChatStep =
  | 'idle'
  | 'weekend_confirm'
  | 'collect_name'
  | 'collect_email'
  | 'collect_phone'
  | 'collect_message'
  | 'whatsapp_confirm'
  | 'sending'
  | 'rating'
  | 'ended';

export interface ChatState {
  step: ChatStep;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactMessage: string;
  weekendConfirmed: boolean;
}

export const INITIAL_CHAT_STATE: ChatState = {
  step: 'idle',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactMessage: '',
  weekendConfirmed: false,
};

// ─── Whatsapp message builder ─────────────────────────────────────────────
export function buildWhatsAppMessage(
  history: BotMessage[],
  contact: { name: string; email: string; phone: string }
): string {
  const lines = [
    `*WHENMEN INC. — Chat Transcript*`,
    `From: ${contact.name}`,
    `Email: ${contact.email}`,
    contact.phone ? `Phone: ${contact.phone}` : '',
    ``,
    `*Conversation:*`,
    ...history.map(m => `${m.from === 'user' ? '👤' : '🤖'} ${m.text}`),
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n'));
}

// WHENMEN WhatsApp number (add country code, no spaces or dashes)
export const WHATSAPP_NUMBER = '12145550190';
