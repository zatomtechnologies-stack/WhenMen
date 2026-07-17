import {
  PROGRAMS, TESTIMONIALS, UPCOMING_EVENTS, RECURRING_EVENTS,
  BLOG_POSTS, FAQS, TEAM_MEMBERS, VOLUNTEER_ROLES, DONATION_TIERS,
  CORE_VALUES, IMPACT_STATS, BY_THE_NUMBERS_STATS
} from '../../data';

// ─── Seeded Subscribers ───────────────────────────────────────────────────
export const SEEDED_SUBSCRIBERS = [
  { id: 's1', name: 'Michael Thompson', email: 'michael.t@example.com', joined: 'Jun 28, 2026', status: 'active', tags: ['weekly', 'dallas'] },
  { id: 's2', name: 'David Reynolds', email: 'david.r@example.com', joined: 'Jun 15, 2026', status: 'active', tags: ['weekly', 'houston'] },
  { id: 's3', name: 'James Kingsley', email: 'james.k@example.com', joined: 'Jun 10, 2026', status: 'active', tags: ['monthly', 'atlanta'] },
  { id: 's4', name: 'Marcus Turner', email: 'marcus.t@example.com', joined: 'May 30, 2026', status: 'unsubscribed', tags: ['weekly'] },
  { id: 's5', name: 'Robert Stone', email: 'robert.s@example.com', joined: 'May 20, 2026', status: 'active', tags: ['weekly', 'dallas'] },
  { id: 's6', name: 'Anthony Brooks', email: 'a.brooks@example.com', joined: 'May 10, 2026', status: 'active', tags: ['monthly'] },
  { id: 's7', name: 'Emmanuel Okafor', email: 'e.okafor@example.com', joined: 'Apr 28, 2026', status: 'active', tags: ['weekly', 'online'] },
  { id: 's8', name: 'Carlos Mendez', email: 'c.mendez@example.com', joined: 'Apr 15, 2026', status: 'active', tags: ['weekly'] },
];

// ─── Seeded Contact Messages ──────────────────────────────────────────────
export const SEEDED_CONTACTS = [
  { id: 'c1', name: 'James Adeyemi', email: 'j.adeyemi@example.com', subject: 'Partnership / Collaboration', message: 'We would love to host a WHENMEN night at our church in Atlanta. Could we discuss a partnership?', date: 'Jul 15, 2026', read: false },
  { id: 'c2', name: 'Terrence Wills', email: 't.wills@example.com', subject: 'General Inquiry', message: 'How do I find a chapter in Houston? I tried the website locator but need more details.', date: 'Jul 14, 2026', read: false },
  { id: 'c3', name: 'Pastor Samuel Obi', email: 'p.obi@example.com', subject: 'Media Inquiry', message: 'I run a Christian podcast and would love to interview Pastor Lani about the movement.', date: 'Jul 13, 2026', read: true },
  { id: 'c4', name: 'David Park', email: 'd.park@example.com', subject: 'Volunteering', message: 'I am a counselor and would love to volunteer for the prison ministry team.', date: 'Jul 12, 2026', read: true },
  { id: 'c5', name: 'Anonymous', email: 'anon@example.com', subject: 'Prayer Request (Confidential)', message: 'Please pray for my marriage. We are at breaking point.', date: 'Jul 11, 2026', read: false },
];

// ─── Seeded Prayer Requests ───────────────────────────────────────────────
export const SEEDED_PRAYERS = [
  { id: 'p1', name: 'Brother D.', email: '', category: 'Marriage', details: 'My wife and I have been separated for 3 months. I need prayer for restoration and God\'s guidance.', date: 'Jul 15, 2026', assigned: 'Prayer Team A', wantsContact: true },
  { id: 'p2', name: 'Anonymous', email: '', category: 'Health', details: 'I was diagnosed with stage 2 cancer. I am trusting God but need the brotherhood standing with me.', date: 'Jul 14, 2026', assigned: 'Unassigned', wantsContact: false },
  { id: 'p3', name: 'Marcus', email: 'm.p@example.com', category: 'Finances', details: 'Lost my job 2 months ago. Struggling to provide for my family. Need financial breakthrough prayer.', date: 'Jul 13, 2026', assigned: 'Prayer Team B', wantsContact: true },
  { id: 'p4', name: 'Robert A.', email: '', category: 'Spiritual', details: 'Struggling with addiction. I keep falling back. Need accountability and prayer covering.', date: 'Jul 12, 2026', assigned: 'Prayer Team A', wantsContact: false },
  { id: 'p5', name: 'Emmanuel', email: 'e@example.com', category: 'Family', details: 'My teenage son has walked away from faith. Praying for his return and our relationship.', date: 'Jul 10, 2026', assigned: 'Unassigned', wantsContact: true },
];

// ─── Seeded Event Registrations ───────────────────────────────────────────
export const SEEDED_REGISTRATIONS = [
  { id: 'r1', eventId: 'e1', eventTitle: 'WHENMEN Worship Night', name: 'Michael Thompson', email: 'michael.t@example.com', phone: '214-555-0101', date: 'Jul 12, 2026' },
  { id: 'r2', eventId: 'e1', eventTitle: 'WHENMEN Worship Night', name: 'David Reynolds', email: 'david.r@example.com', phone: '713-555-0202', date: 'Jul 13, 2026' },
  { id: 'r3', eventId: 'e2', eventTitle: 'Family Crisis Workshop', name: 'James Kingsley', email: 'james.k@example.com', phone: '404-555-0303', date: 'Jul 14, 2026' },
  { id: 'r4', eventId: 'e4', eventTitle: "Men's Fellowship Breakfast", name: 'Marcus Turner', email: 'marcus.t@example.com', phone: '214-555-0404', date: 'Jul 15, 2026' },
  { id: 'r5', eventId: 'e5', eventTitle: 'Youth Leadership Bootcamp', name: 'Robert Stone', email: 'robert.s@example.com', phone: '214-555-0505', date: 'Jul 15, 2026' },
];

// ─── Seeded Memberships ───────────────────────────────────────────────────
export const SEEDED_MEMBERSHIPS = [
  { id: 'm1', name: 'Emmanuel Okafor', email: 'e.okafor@example.com', phone: '469-555-0101', cityState: 'Dallas, TX', ageRange: '26-35', interests: ['Daily Prayer Gatherings', 'Mentorship & Discipleship'], source: 'Social Media', date: 'Jul 15, 2026', status: 'new' },
  { id: 'm2', name: 'Carlos Mendez', email: 'c.mendez@example.com', phone: '713-555-0202', cityState: 'Houston, TX', ageRange: '36-45', interests: ['Prison & Reentry Support', 'Community Outreach'], source: 'Church Partner', date: 'Jul 14, 2026', status: 'reviewed' },
  { id: 'm3', name: 'Darius Williams', email: 'd.williams@example.com', phone: '404-555-0303', cityState: 'Atlanta, GA', ageRange: '18-25', interests: ['Youth & Next Generation', 'WHENMEN Worship'], source: 'Friend / Word of Mouth', date: 'Jul 13, 2026', status: 'new' },
  { id: 'm4', name: 'Kevin Johnson', email: 'k.johnson@example.com', phone: '312-555-0404', cityState: 'Chicago, IL', ageRange: '46-55', interests: ['Marriage & Family Enrichment', 'Leadership Development'], source: 'Web Search', date: 'Jul 12, 2026', status: 'approved' },
];

// ─── Seeded Donations ─────────────────────────────────────────────────────
export const SEEDED_DONATIONS = [
  { id: 'd1', name: 'Michael Thompson', email: 'michael.t@example.com', amount: 100, type: 'monthly', method: 'card', date: 'Jul 15, 2026', status: 'completed', note: '' },
  { id: 'd2', name: 'Anonymous', email: '', amount: 250, type: 'one-time', method: 'paypal', date: 'Jul 14, 2026', status: 'completed', note: 'In memory of my father' },
  { id: 'd3', name: 'David Reynolds', email: 'david.r@example.com', amount: 50, type: 'monthly', method: 'card', date: 'Jul 13, 2026', status: 'completed', note: '' },
  { id: 'd4', name: 'Robert Stone', email: 'robert.s@example.com', amount: 500, type: 'one-time', method: 'bank', date: 'Jul 12, 2026', status: 'completed', note: 'For prison ministry fund' },
  { id: 'd5', name: 'James Kingsley', email: 'james.k@example.com', amount: 25, type: 'monthly', method: 'card', date: 'Jul 10, 2026', status: 'completed', note: '' },
  { id: 'd6', name: 'Anthony Brooks', email: 'a.brooks@example.com', amount: 100, type: 'monthly', method: 'card', date: 'Jul 8, 2026', status: 'failed', note: '' },
];

// ─── Seeded Newsletter Campaigns ─────────────────────────────────────────
export const SEEDED_CAMPAIGNS = [
  { id: 'n1', subject: 'WHENMEN Weekly — July 13, 2026', sent: 'Jul 13, 2026', recipients: 847, opens: 512, clicks: 203, status: 'sent' },
  { id: 'n2', subject: 'WHENMEN Weekly — June 28, 2026', sent: 'Jun 28, 2026', recipients: 821, opens: 498, clicks: 187, status: 'sent' },
  { id: 'n3', subject: 'Worship Night Registration Open — Jul 15', sent: 'Jul 10, 2026', recipients: 847, opens: 634, clicks: 412, status: 'sent' },
  { id: 'n4', subject: 'WHENMEN Weekly — July 20, 2026', sent: null, recipients: 0, opens: 0, clicks: 0, status: 'draft' },
];

// ─── Gallery items ────────────────────────────────────────────────────────
export const GALLERY_ITEMS = [
  { id: 'g1', title: 'Morning Prayer Gathering', category: 'prayer', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop', date: 'Jul 2026' },
  { id: 'g2', title: 'Worship Night Altar', category: 'worship', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', date: 'Jun 2026' },
  { id: 'g3', title: 'Community Service Team', category: 'outreach', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400&auto=format&fit=crop', date: 'Jun 2026' },
  { id: 'g4', title: 'Marriage Enrichment Circle', category: 'family', url: 'https://images.unsplash.com/photo-1543269608-bc15324c1029?q=80&w=400&auto=format&fit=crop', date: 'May 2026' },
  { id: 'g5', title: 'Father-Son Trekking', category: 'youth', url: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=400&auto=format&fit=crop', date: 'May 2026' },
  { id: 'g6', title: 'Daily Devotion Circle', category: 'prayer', url: 'https://images.unsplash.com/photo-1521791136368-1a46827d0adf?q=80&w=400&auto=format&fit=crop', date: 'Apr 2026' },
];

// ─── Re-export website data for convenience ───────────────────────────────
export {
  PROGRAMS, TESTIMONIALS, UPCOMING_EVENTS, RECURRING_EVENTS,
  BLOG_POSTS, FAQS, TEAM_MEMBERS, VOLUNTEER_ROLES, DONATION_TIERS,
  CORE_VALUES, IMPACT_STATS, BY_THE_NUMBERS_STATS
};
