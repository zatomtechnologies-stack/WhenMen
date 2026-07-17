import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus, Edit2, Trash2, Eye, EyeOff, Search, Mail, Check,
  X, Download, Send, ChevronDown, Lock, Unlock, CheckCircle,
  AlertCircle, Clock, ArrowRight, Filter, ExternalLink
} from 'lucide-react';
import {
  SEEDED_SUBSCRIBERS, SEEDED_DONATIONS, SEEDED_CONTACTS, SEEDED_PRAYERS,
  SEEDED_REGISTRATIONS, SEEDED_MEMBERSHIPS, SEEDED_CAMPAIGNS,
  UPCOMING_EVENTS, RECURRING_EVENTS, BLOG_POSTS, TEAM_MEMBERS,
  TESTIMONIALS, FAQS, DONATION_TIERS, CORE_VALUES,
  IMPACT_STATS, BY_THE_NUMBERS_STATS, PROGRAMS, GALLERY_ITEMS,
  VOLUNTEER_ROLES
} from '../data/dashboardData';

// ── Shared UI primitives ──────────────────────────────────────────────────

const PageHeader = ({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h2 className="font-display font-extrabold text-xl text-white">{title}</h2>
      {sub && <p className="text-gray-500 text-sm mt-0.5">{sub}</p>}
    </div>
    {action}
  </div>
);

const Table = ({ headers, children }: { headers: string[]; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {headers.map(h => (
              <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/4">{children}</tbody>
      </table>
    </div>
  </div>
);

const Tr = ({ children }: { children: React.ReactNode }) => (
  <tr className="hover:bg-white/2 transition-colors">{children}</tr>
);

const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 text-gray-300 text-xs ${className}`}>{children}</td>
);

const Badge = ({ label, color }: { label: string; color: string }) => (
  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${color}`}>{label}</span>
);

const AddBtn = ({ label }: { label: string }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer">
    <Plus className="w-3.5 h-3.5" /> {label}
  </button>
);

const SearchBar = ({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) => (
  <div className="relative mb-5">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none border border-white/6 focus:border-brand-gold-500/40 transition-colors"
      style={{ background: '#111' }}
    />
  </div>
);

const ComingSoonNote = () => (
  <p className="text-xs text-gray-600 italic mt-3">
    * Edit functionality will be wired to the backend API when live. All data is currently seeded.
  </p>
);

const wrap = (content: React.ReactNode) => (
  <div className="p-6 text-white">
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {content}
    </motion.div>
  </div>
);

// ── PAGE COMPONENTS ───────────────────────────────────────────────────────

export function EventsPage() {
  const [q, setQ] = useState('');
  const filtered = UPCOMING_EVENTS.filter(e => e.title.toLowerCase().includes(q.toLowerCase()));
  return wrap(<>
    <PageHeader title="Events" sub="Manage upcoming and recurring gatherings" action={<AddBtn label="New Event" />} />
    <SearchBar value={q} onChange={setQ} placeholder="Search events…" />
    <Table headers={['Date', 'Title', 'Time', 'Location', 'Category', 'Reg. Required', '']}>
      {filtered.map(e => (
        <Tr key={e.id}>
          <Td><span className="font-bold text-brand-gold-500">{e.date}</span></Td>
          <Td className="font-semibold text-white">{e.title}</Td>
          <Td>{e.time}</Td>
          <Td>{e.location}</Td>
          <Td><Badge label={e.category} color="bg-white/8 text-gray-300" /></Td>
          <Td>{e.registrationRequired ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-gray-600" />}</Td>
          <Td><div className="flex gap-2"><button className="text-gray-500 hover:text-brand-gold-500 cursor-pointer transition-colors"><Edit2 className="w-3.5 h-3.5" /></button><button className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></div></Td>
        </Tr>
      ))}
    </Table>
    <div className="mt-6">
      <h3 className="font-display font-bold text-sm text-white mb-3">Recurring Gatherings</h3>
      <Table headers={['Title', 'Schedule', 'Platform', '']}>
        {RECURRING_EVENTS.map((r, i) => (
          <Tr key={i}><Td className="font-semibold text-white">{r.title}</Td><Td>{r.schedule}</Td><Td>{r.channel}</Td><Td><button className="text-gray-500 hover:text-brand-gold-500 cursor-pointer transition-colors"><Edit2 className="w-3.5 h-3.5" /></button></Td></Tr>
        ))}
      </Table>
    </div>
    <ComingSoonNote />
  </>);
}

export function ProgramsPage() {
  return wrap(<>
    <PageHeader title="Programs" sub="Manage the 8 core ministry pillars" action={<AddBtn label="New Program" />} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PROGRAMS.map(p => (
        <div key={p.id} className="rounded-2xl border border-white/6 p-5 hover:border-brand-gold-500/20 transition-all group cursor-pointer" style={{ background: '#111' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold-500/60 mb-1">{p.id}</p>
              <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-gold-500 transition-colors">{p.title}</h4>
              <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{p.teaser}</p>
            </div>
            <button className="text-gray-600 hover:text-brand-gold-500 cursor-pointer transition-colors shrink-0 ml-4"><Edit2 className="w-3.5 h-3.5" /></button>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-[10px] text-gray-600">{p.schedule.length} schedule entries · {p.howItWorks.length} steps</p>
          </div>
        </div>
      ))}
    </div>
    <ComingSoonNote />
  </>);
}

export function BlogPage() {
  const [q, setQ] = useState('');
  const filtered = BLOG_POSTS.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
  return wrap(<>
    <PageHeader title="Blog & Devotionals" sub="WHENMEN Voice content management" action={<AddBtn label="New Post" />} />
    <SearchBar value={q} onChange={setQ} placeholder="Search posts…" />
    <Table headers={['', 'Title', 'Category', 'Author', 'Date', 'Read Time', '']}>
      {filtered.map(p => (
        <Tr key={p.id}>
          <Td><img src={p.imageUrl} alt="" referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover" /></Td>
          <Td className="font-semibold text-white max-w-[200px] truncate">{p.title}</Td>
          <Td><Badge label={p.category} color="bg-brand-gold-500/10 text-brand-gold-500" /></Td>
          <Td>{p.author}</Td>
          <Td>{p.date}</Td>
          <Td>{p.readTime}</Td>
          <Td><div className="flex gap-2"><button className="text-gray-500 hover:text-brand-gold-500 cursor-pointer transition-colors"><Edit2 className="w-3.5 h-3.5" /></button><button className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button></div></Td>
        </Tr>
      ))}
    </Table>
    <ComingSoonNote />
  </>);
}

export function TeamPage() {
  return wrap(<>
    <PageHeader title="Team Members" sub="Leadership board and admin roster" action={<AddBtn label="Add Member" />} />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {TEAM_MEMBERS.map(m => (
        <div key={m.id} className="rounded-2xl border border-white/6 p-5 text-center hover:border-brand-gold-500/20 transition-all group" style={{ background: '#111' }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-gold-500/20 to-brand-gold-500/5 border border-brand-gold-500/20 flex items-center justify-center mx-auto mb-3 text-brand-gold-500 font-display font-black text-xl">
            {m.name.split(' ').map(n => n[0]).join('')}
          </div>
          <p className="font-display font-bold text-sm text-white">{m.name}</p>
          <p className="text-[10px] text-brand-gold-500 font-bold uppercase tracking-wider mt-1">{m.title}</p>
          <p className="text-xs text-gray-500 mt-2 line-clamp-2 text-left">{m.bio}</p>
          <div className="flex gap-2 justify-center mt-4 pt-4 border-t border-white/5">
            <button className="flex-1 py-1.5 rounded-lg text-[11px] font-bold text-gray-400 hover:text-brand-gold-500 hover:bg-brand-gold-500/8 transition-all cursor-pointer border border-white/6">Edit</button>
            <button className="py-1.5 px-3 rounded-lg text-[11px] font-bold text-gray-600 hover:text-red-400 hover:bg-red-400/8 transition-all cursor-pointer border border-white/6"><Trash2 className="w-3 h-3" /></button>
          </div>
        </div>
      ))}
    </div>
    <ComingSoonNote />
  </>);
}

export function TestimonialsPage() {
  const [q, setQ] = useState('');
  const filtered = TESTIMONIALS.filter(t => t.name.toLowerCase().includes(q.toLowerCase()) || t.text.toLowerCase().includes(q.toLowerCase()));
  return wrap(<>
    <PageHeader title="Testimonials" sub="Manage transformation stories shown on the site" action={<AddBtn label="Add Testimonial" />} />
    <SearchBar value={q} onChange={setQ} placeholder="Search testimonials…" />
    <div className="space-y-3">
      {filtered.map(t => (
        <div key={t.id} className="rounded-2xl border border-white/6 p-5 hover:border-brand-gold-500/15 transition-all" style={{ background: '#111' }}>
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <p className="text-sm text-gray-300 italic leading-relaxed line-clamp-2">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold-500/20 flex items-center justify-center text-[10px] font-bold text-brand-gold-500">{t.name.charAt(0)}</div>
                <span className="text-xs font-bold text-white">{t.name}</span>
                <span className="text-xs text-gray-600">·</span>
                <span className="text-xs text-gray-500">{t.location}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="text-gray-500 hover:text-brand-gold-500 cursor-pointer transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
              <button className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <ComingSoonNote />
  </>);
}

export function FAQsPage() {
  return wrap(<>
    <PageHeader title="FAQs" sub="Frequently asked questions shown on the site" action={<AddBtn label="Add FAQ" />} />
    <div className="space-y-2">
      {FAQS.map((f, i) => (
        <div key={f.id} className="rounded-xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-start gap-3 flex-1 pr-4">
              <span className="text-brand-gold-500 font-display font-black text-sm shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="text-sm font-semibold text-white">{f.question}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{f.answer}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="text-gray-500 hover:text-brand-gold-500 cursor-pointer transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
              <button className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <ComingSoonNote />
  </>);
}

export function StatsPage() {
  return wrap(<>
    <PageHeader title="Impact Stats" sub="Numbers displayed on homepage and stories page" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-display font-bold text-sm text-white mb-3">Homepage Stats (4 cards)</h3>
        <div className="space-y-2">
          {IMPACT_STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/6 hover:border-brand-gold-500/20 transition-all group" style={{ background: '#111' }}>
              <span className="font-display font-black text-xl text-brand-gold-500 w-20 shrink-0">{s.value}</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">{s.label}</p>
                <p className="text-[10px] text-gray-600 mt-0.5">{s.description}</p>
              </div>
              <button className="text-gray-600 hover:text-brand-gold-500 cursor-pointer transition-colors opacity-0 group-hover:opacity-100"><Edit2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display font-bold text-sm text-white mb-3">Stories Page Stats (6 cards)</h3>
        <div className="space-y-2">
          {BY_THE_NUMBERS_STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/6 hover:border-brand-gold-500/20 transition-all group" style={{ background: '#111' }}>
              <span className="font-display font-black text-xl text-brand-gold-500 w-20 shrink-0">{s.value}</span>
              <p className="text-xs font-bold text-white flex-1">{s.label}</p>
              <button className="text-gray-600 hover:text-brand-gold-500 cursor-pointer transition-colors opacity-0 group-hover:opacity-100"><Edit2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <ComingSoonNote />
  </>);
}

export function GalleryPage() {
  return wrap(<>
    <PageHeader title="Photo Gallery" sub="Brotherhood gallery shown on Stories page" action={<AddBtn label="Upload Photo" />} />
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {GALLERY_ITEMS.map(g => (
        <div key={g.id} className="group relative rounded-xl overflow-hidden aspect-square border border-white/6 hover:border-brand-gold-500/30 transition-all cursor-pointer">
          <img src={g.url} alt={g.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
            <div className="w-full">
              <p className="text-[9px] text-brand-gold-500 uppercase font-bold">{g.category}</p>
              <p className="text-[10px] text-white font-semibold truncate">{g.title}</p>
            </div>
          </div>
          <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
    <ComingSoonNote />
  </>);
}
