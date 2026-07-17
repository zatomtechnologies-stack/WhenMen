import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Check, Eye, EyeOff, ChevronRight, Search, AlertCircle } from 'lucide-react';
import {
  SEEDED_CONTACTS, SEEDED_PRAYERS, SEEDED_REGISTRATIONS, SEEDED_MEMBERSHIPS
} from '../data/dashboardData';

const wrap = (content: React.ReactNode) => (
  <div className="p-6 text-white">
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {content}
    </motion.div>
  </div>
);

const PageHeader = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="mb-6">
    <h2 className="font-display font-extrabold text-xl text-white">{title}</h2>
    {sub && <p className="text-gray-500 text-sm mt-0.5">{sub}</p>}
  </div>
);

const Badge = ({ label, color }: { label: string; color: string }) => (
  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${color}`}>{label}</span>
);

// ── Contacts Page ─────────────────────────────────────────────────────────
export function ContactsPage() {
  const [selected, setSelected] = useState<typeof SEEDED_CONTACTS[0] | null>(null);
  const [readMap, setReadMap] = useState<Record<string, boolean>>({});

  const markRead = (id: string) => setReadMap(p => ({ ...p, [id]: true }));

  return wrap(
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* List */}
      <div className="lg:col-span-1 space-y-2">
        <PageHeader title="Contact Messages" sub={`${SEEDED_CONTACTS.filter(c => !c.read && !readMap[c.id]).length} unread`} />
        {SEEDED_CONTACTS.map(c => {
          const isRead = c.read || readMap[c.id];
          return (
            <button
              key={c.id}
              onClick={() => { setSelected(c); markRead(c.id); }}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                selected?.id === c.id
                  ? 'border-brand-gold-500/40 bg-brand-gold-500/8'
                  : 'border-white/6 hover:border-white/10 bg-[#111]'
              }`}
            >
              <div className="flex items-start gap-3">
                {!isRead && <div className="w-2 h-2 rounded-full bg-brand-gold-500 shrink-0 mt-1.5" />}
                <div className={!isRead ? '' : 'ml-5'}>
                  <p className={`text-xs font-bold ${!isRead ? 'text-white' : 'text-gray-400'}`}>{c.name}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{c.subject}</p>
                  <p className="text-[10px] text-gray-600">{c.date}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div className="lg:col-span-2">
        <div className="h-8 mb-6" />
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-white/6 overflow-hidden"
              style={{ background: '#111' }}
            >
              <div className="px-6 py-5 border-b border-white/5">
                <p className="text-[10px] text-brand-gold-500 uppercase tracking-widest font-bold">{selected.subject}</p>
                <h3 className="font-display font-bold text-base text-white mt-1">{selected.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{selected.email} · {selected.date}</p>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-gray-300 leading-relaxed">{selected.message}</p>
              </div>
              <div className="px-6 py-4 border-t border-white/5 flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold-500/15 hover:bg-brand-gold-500/25 text-brand-gold-500 font-bold text-xs rounded-xl transition-all cursor-pointer border border-brand-gold-500/25">
                  <Mail className="w-3.5 h-3.5" /> Reply
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/8 text-gray-400 font-bold text-xs rounded-xl transition-all cursor-pointer border border-white/6"
                >
                  <Check className="w-3.5 h-3.5" /> Mark Resolved
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="flex items-center justify-center h-64 rounded-2xl border border-dashed border-white/10">
              <p className="text-gray-600 text-sm">Select a message to read</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Prayer Requests Page ──────────────────────────────────────────────────
export function PrayersPage() {
  const [selected, setSelected] = useState<typeof SEEDED_PRAYERS[0] | null>(null);
  const catColors: Record<string, string> = {
    Marriage: 'bg-rose-500/15 text-rose-400',
    Health: 'bg-blue-500/15 text-blue-400',
    Finances: 'bg-emerald-500/15 text-emerald-400',
    Spiritual: 'bg-purple-500/15 text-purple-400',
    Family: 'bg-amber-500/15 text-amber-400',
    Personal: 'bg-gray-500/15 text-gray-400',
  };

  return wrap(
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-2">
        <PageHeader title="Prayer Requests" sub="Confidential · Handle with care" />
        {SEEDED_PRAYERS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
              selected?.id === p.id ? 'border-brand-gold-500/40 bg-brand-gold-500/8' : 'border-white/6 hover:border-white/10 bg-[#111]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-white">{p.name}</p>
                <p className="text-[10px] text-gray-600 mt-0.5">{p.date}</p>
              </div>
              <Badge label={p.category} color={catColors[p.category] || 'bg-white/8 text-gray-400'} />
            </div>
            <p className="text-[10px] text-gray-500 mt-2 line-clamp-1">{p.details}</p>
          </button>
        ))}
      </div>

      <div className="lg:col-span-2">
        <div className="h-8 mb-6" />
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border border-white/6 overflow-hidden"
              style={{ background: '#111' }}
            >
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                <div>
                  <Badge label={selected.category} color={catColors[selected.category] || 'bg-white/8 text-gray-400'} />
                  <h3 className="font-display font-bold text-base text-white mt-2">{selected.name}</h3>
                  <p className="text-xs text-gray-500">{selected.date} · Assigned: {selected.assigned}</p>
                </div>
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-gray-300 leading-relaxed">{selected.details}</p>
                {selected.wantsContact && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
                    ⚡ This brother wants a pastoral elder to contact them directly.
                  </div>
                )}
              </div>
              <div className="px-6 py-4 border-t border-white/5 flex gap-3 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold-500/15 hover:bg-brand-gold-500/25 text-brand-gold-500 font-bold text-xs rounded-xl transition-all cursor-pointer border border-brand-gold-500/25">
                  Assign to Team
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 font-bold text-xs rounded-xl transition-all cursor-pointer border border-emerald-500/25">
                  <Check className="w-3.5 h-3.5" /> Mark Prayed Over
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="flex items-center justify-center h-64 rounded-2xl border border-dashed border-white/10">
              <p className="text-gray-600 text-sm">Select a request to review</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Registrations Page ────────────────────────────────────────────────────
export function RegistrationsPage() {
  return wrap(<>
    <PageHeader title="Event Registrations" sub={`${SEEDED_REGISTRATIONS.length} total registrations`} />
    <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <p className="text-xs text-gray-500">All Registrations</p>
        <button className="flex items-center gap-1.5 text-xs text-brand-gold-500 hover:text-brand-gold-400 cursor-pointer transition-colors">
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {['Name', 'Email', 'Phone', 'Event', 'Date'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[10px] text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/4">
            {SEEDED_REGISTRATIONS.map(r => (
              <tr key={r.id} className="hover:bg-white/2 transition-colors">
                <td className="px-4 py-3 font-semibold text-white">{r.name}</td>
                <td className="px-4 py-3 text-gray-400">{r.email}</td>
                <td className="px-4 py-3 text-gray-400">{r.phone}</td>
                <td className="px-4 py-3"><Badge label={r.eventTitle} color="bg-brand-gold-500/10 text-brand-gold-500" /></td>
                <td className="px-4 py-3 text-gray-500">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>);
}

// ── Memberships Page ──────────────────────────────────────────────────────
export function MembershipsPage() {
  const statusColor: Record<string, string> = {
    new: 'bg-amber-500/15 text-amber-400',
    reviewed: 'bg-blue-500/15 text-blue-400',
    approved: 'bg-emerald-500/15 text-emerald-400',
  };
  return wrap(<>
    <PageHeader title="Membership Applications" sub={`${SEEDED_MEMBERSHIPS.filter(m => m.status === 'new').length} new pending review`} />
    <div className="space-y-3">
      {SEEDED_MEMBERSHIPS.map(m => (
        <div key={m.id} className="rounded-2xl border border-white/6 p-5 hover:border-brand-gold-500/15 transition-all" style={{ background: '#111' }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 border border-brand-gold-500/20 flex items-center justify-center font-display font-black text-brand-gold-500">
                {m.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{m.name}</p>
                <p className="text-xs text-gray-500">{m.email} · {m.cityState}</p>
                <p className="text-xs text-gray-600">{m.ageRange} yrs · via {m.source}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge label={m.status} color={statusColor[m.status]} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {m.interests.map((int, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/6">{int}</span>
            ))}
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-all cursor-pointer border border-emerald-500/20 flex items-center gap-1.5">
              <Check className="w-3 h-3" /> Approve
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-gray-400 hover:bg-white/8 transition-all cursor-pointer border border-white/6">
              Review
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer border border-red-500/15 flex items-center gap-1.5 ml-auto">
              <X className="w-3 h-3" /> Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  </>);
}
