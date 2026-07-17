// ── Bot knowledge base & quick-start topics ──────────────────────────────

export const SITE_EMAIL = 'info@whenmen.org';
export const WHATSAPP_NUMBER = '12145550190'; // E.164 without +

export interface QuickStart {
  id: string;
  label: string;
  icon: string;
  response: string;
}

export const QUICK_STARTS: QuickStart[] = [
  {
    id: 'about',
    label: 'What is WHENMEN?',
    icon: '🛡️',
    response: `WHENMEN INC. is a faith-based 501(c)(3) nonprofit brotherhood committed to the spiritual, emotional, and social development of men. Founded in 2024, we bring men from all backgrounds together to pray, worship, and transform families, communities, and generations for the glory of God. 

Our tagline says it all: *"Every Man Needs a Brotherhood."* 

Would you like to know about our programs, how to join, or how to support us?`,
  },
  {
    id: 'programs',
    label: 'Our Programs',
    icon: '🔥',
    response: `We run 8 core ministry pillars:

1. **Daily Prayer Gatherings** — Mon–Fri 6AM CST, Zoom + In-Person
2. **WHENMEN Worship** — Monthly worship nights, live & immersive
3. **Mentorship & Discipleship** — 12-week structured discipleship track
4. **Marriage & Family Enrichment** — Workshops, couples retreats & father-son events
5. **Community Outreach** — Monthly food drives, back-to-school, Thanksgiving
6. **Leadership Development** — 4-module leadership academy
7. **Prison & Reentry Support** — Prison visits, job readiness & reentry mentorship
8. **Youth & Next Generation** — Ages 8–25, adventure camps & leadership circles

Which program would you like to learn more about?`,
  },
  {
    id: 'join',
    label: 'How to Join',
    icon: '🤝',
    response: `Joining WHENMEN is completely free! Here's how:

**Online:** Visit our Join page and complete the Covenant Application — it takes 2 minutes. You'll receive a welcome email with prayer outlines.

**Find a Chapter:** We have active chapters in Dallas TX, Houston TX, Atlanta GA, and fully online via Zoom.

**Virtual:** Join our 6AM Morning Prayer on Zoom — no registration needed, just show up!

Ready to join? Head to our **/join** page or I can walk you through it here. What city are you in?`,
  },
  {
    id: 'give',
    label: 'Support the Mission',
    icon: '💛',
    response: `Your generosity directly funds transformed lives. Here's where every dollar goes:

- **$25/mo** — Sponsors one man's full 12-week Discipleship Track
- **$50/mo** — Funds a full prison visitation outreach event
- **$100/mo** — Supports a family crisis workshop for 5 couples
- **$250/mo** — Launches a new city chapter
- **$500/mo** — Funds a regional worship night

**Monthly partners** join our *Brotherhood Builder Club* — with exclusive updates from Pastor Lani, early retreat access, and a custom prayer journal.

Visit our **/give** page to make your gift securely. Every donation is 100% tax-deductible (501(c)(3) EIN: XX-XXXXXXX).`,
  },
  {
    id: 'events',
    label: 'Upcoming Events',
    icon: '📅',
    response: `Here are our next gatherings:

- **Jul 15** — WHENMEN Worship Night · Dallas TX & Livestream · 7:00 PM CST
- **Jul 20** — Family Crisis Workshop · Online Webinar · 9:00 AM CST  
- **Jul 25** — Community Food Drive · Houston Distribution Center · 8:00 AM CST
- **Aug 01** — Men's Fellowship Breakfast · Dallas HQ · 8:00 AM CST
- **Aug 08** — Youth Leadership Bootcamp · Atlanta Youth Complex · 10:00 AM CST

**Recurring every week:**
- Mon–Fri 6AM CST — Morning Prayer (Zoom)
- Wednesdays 9PM CST — Night Prayer (Zoom)
- Saturdays 8AM CST — Intercession (In-Person)

Would you like to register for any of these?`,
  },
  {
    id: 'contact',
    label: 'Contact Us',
    icon: '📬',
    response: `You can reach us through several ways:

📧 **Email:** info@whenmen.org
📞 **Phone:** (214) 555-0190
📍 **HQ:** Dallas, TX, United States
🕐 **Hours:** Monday–Friday, 9:00 AM – 5:00 PM CST

We respond to all inquiries within **48 business hours**. Confidential prayer requests are covered within 24 hours.

Would you like me to help you send a message directly, or connect you with a real person on our team?`,
  },
  {
    id: 'prayer',
    label: 'Prayer Request',
    icon: '🙏',
    response: `We believe in the power of prayer. Our intercessors pray over every single request — your information is kept strictly confidential.

You can submit a prayer request on our **/contact** page under "Confidential Prayer Request."

Or if you'd like, share your request with me here and I'll make sure it gets to the right team. Your privacy is protected — just know that real men are standing in agreement for you. 

*"The prayer of a righteous person is powerful and effective."* — James 5:16`,
  },
];

// ── Bot response engine ───────────────────────────────────────────────────
export function getBotResponse(input: string): string | null {
  const msg = input.toLowerCase().trim();

  if (/pray|prayer|intercession|request/.test(msg))
    return QUICK_STARTS.find(q => q.id === 'prayer')!.response;
  if (/program|pillar|ministry|discipleship|mentor|outreach|prison|youth|worship|family|marriage|leadership/.test(msg))
    return QUICK_STARTS.find(q => q.id === 'programs')!.response;
  if (/join|member|sign.?up|chapter|covenant|register|enroll/.test(msg))
    return QUICK_STARTS.find(q => q.id === 'join')!.response;
  if (/give|donat|support|fund|partner|money|financ|tithe/.test(msg))
    return QUICK_STARTS.find(q => q.id === 'give')!.response;
  if (/event|gathering|worship.?night|breakfast|bootcamp|calendar/.test(msg))
    return QUICK_STARTS.find(q => q.id === 'events')!.response;
  if (/contact|email|phone|address|reach|hours/.test(msg))
    return QUICK_STARTS.find(q => q.id === 'contact')!.response;
  if (/what.?is|who.?are|about|whenmen|brotherhood|mission|vision|nonprofit/.test(msg))
    return QUICK_STARTS.find(q => q.id === 'about')!.response;
  if (/hello|hi|hey|good\s?(morning|afternoon|evening)|greet/.test(msg))
    return null; // greeting handled separately
  if (/human|person|agent|staff|real|someone|talk.?to/.test(msg))
    return '__HANDOFF__';
  if (/thank|thanks|appreciate|great|awesome|helpful/.test(msg))
    return `You're welcome, brother! 🙏 We're always here to serve. Is there anything else I can help you with?`;
  if (/bye|goodbye|end|close|done|finish/.test(msg))
    return '__END__';

  return `I'm not sure I have a specific answer for that, but I'd love to help! Here are a few things I can help with — or feel free to reach a real person on our team.`;
}

// ── Spam detection ────────────────────────────────────────────────────────
const SPAM_PATTERNS = [
  /\b(buy|sell|cheap|discount|click here|free money|earn \$|make money fast|crypto|bitcoin|nft|casino|bet|poker|pills|viagra|cialis|xxx|porn|adult|hack|crack|phishing|scam|lottery|winner|prize|congratulation)\b/i,
  /(.)\1{6,}/,                  // repeated chars: "aaaaaaa"
  /https?:\/\/[^\s]+/,           // raw URLs
  /\b\d{10,}\b/,                 // phone number spam
];

export function isSpam(text: string): boolean {
  return SPAM_PATTERNS.some(p => p.test(text));
}

// ── Greeting by time ─────────────────────────────────────────────────────
export function getGreeting(): { greeting: string; isWeekend: boolean; isOutOfHours: boolean } {
  const now = new Date();
  // Lagos timezone offset: UTC+1 (no DST)
  const lagosOffset = 1 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const lagos = new Date(utc + lagosOffset * 60000);

  const hour = lagos.getHours();
  const day = lagos.getDay(); // 0=Sun, 6=Sat
  const isWeekend = day === 0 || day === 6;
  const isOutOfHours = hour < 9 || hour >= 17;

  let greeting = '';
  if (hour >= 5 && hour < 12) greeting = 'Good morning';
  else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  return { greeting, isWeekend, isOutOfHours };
}
