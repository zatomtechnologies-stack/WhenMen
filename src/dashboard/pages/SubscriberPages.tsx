import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Search, Check, X, Download, Eye } from 'lucide-react';
import { SEEDED_SUBSCRIBERS, SEEDED_CAMPAIGNS } from '../data/dashboardData';

const wrap = (content: React.ReactNode) => (
  <div className="p-6 text-white">
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {content}
    </motion.div>
  </div>
);

const PageHeader = ({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h2 className="font-display font-extrabold text-xl text-white">{title}</h2>
      {sub && <p className="text-gray-500 text-sm mt-0.5">{sub}</p>}
    </div>
    {action}
  </div>
);

// ── Subscriber List ───────────────────────────────────────────────────────
export function SubscriberListPage() {
  const [q, setQ] = useState('');
  const filtered = SEEDED_SUBSCRIBERS.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) || s.email.toLowerCase().includes(q.toLowerCase())
  );
  return wrap(<>
    <PageHeader
      title="Subscribers"
      sub={`${SEEDED_SUBSCRIBERS.filter(s => s.status === 'active').length} active · ${SEEDED_SUBSCRIBERS.filter(s => s.status === 'unsubscribed').length} unsubscribed`}
      action={
        <button className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/8 text-gray-400 font-bold text-xs rounded-xl transition-all cursor-pointer border border-white/6">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      }
    />
    <div className="relative mb-5">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search subscribers…"
        className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none border border-white/6 focus:border-brand-gold-500/40 transition-colors"
        style={{ background: '#111' }}
      />
    </div>
    <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {['Name', 'Email', 'Joined', 'Status', 'Tags', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[10px] text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/4">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-white/2 transition-colors">
                <td className="px-4 py-3 font-semibold text-white">{s.name}</td>
                <td className="px-4 py-3 text-gray-400">{s.email}</td>
                <td className="px-4 py-3 text-gray-500">{s.joined}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${s.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-500'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {s.tags.map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 border border-white/6">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button className="text-gray-600 hover:text-red-400 cursor-pointer transition-colors"><X className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>);
}

// ── Send Campaign ─────────────────────────────────────────────────────────
export function CampaignPage() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);

  return wrap(<>
    <PageHeader title="Send Campaign" sub="Compose and send to all active subscribers" />
    {sent ? (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="font-display font-bold text-xl text-white">Campaign Queued!</h3>
        <p className="text-gray-500 text-sm">Your newsletter will be sent to all active subscribers via Resend.</p>
        <button onClick={() => setSent(false)} className="mt-4 px-6 py-2.5 bg-brand-gold-500/15 text-brand-gold-500 font-bold text-xs rounded-xl border border-brand-gold-500/25 cursor-pointer hover:bg-brand-gold-500/25 transition-all">
          Compose Another
        </button>
      </div>
    ) : (
      <div className="max-w-2xl space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject Line</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="e.g. WHENMEN Weekly — July 20, 2026"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none border border-white/6 focus:border-brand-gold-500/40 transition-colors"
            style={{ background: '#111' }}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Body</label>
          <textarea
            rows={10}
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write your newsletter content here…"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none border border-white/6 focus:border-brand-gold-500/40 transition-colors resize-none"
            style={{ background: '#111' }}
          />
        </div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-600">
            Sending to {SEEDED_SUBSCRIBERS.filter(s => s.status === 'active').length} active subscribers via Resend API
          </p>
          <button
            onClick={() => { if (subject && body) setSent(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-brand-gold-500/20"
          >
            <Send className="w-4 h-4" /> Send Campaign
          </button>
        </div>
      </div>
    )}
  </>);
}

// ── Email History ─────────────────────────────────────────────────────────
export function EmailHistoryPage() {
  return wrap(<>
    <PageHeader title="Email History" sub="Past campaigns with engagement stats" />
    <div className="space-y-3">
      {SEEDED_CAMPAIGNS.map(c => {
        const openRate = c.recipients > 0 ? Math.round((c.opens / c.recipients) * 100) : 0;
        const clickRate = c.opens > 0 ? Math.round((c.clicks / c.opens) * 100) : 0;
        return (
          <div key={c.id} className="rounded-2xl border border-white/6 p-5 hover:border-brand-gold-500/15 transition-all" style={{ background: '#111' }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${c.status === 'sent' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                    {c.status}
                  </span>
                  {c.sent && <span className="text-[10px] text-gray-600">{c.sent}</span>}
                </div>
                <p className="text-sm font-bold text-white">{c.subject}</p>
              </div>
              {c.status === 'sent' && (
                <div className="flex gap-6 shrink-0 text-center">
                  <div>
                    <p className="font-display font-black text-lg text-brand-gold-500">{openRate}%</p>
                    <p className="text-[10px] text-gray-600">Opens</p>
                  </div>
                  <div>
                    <p className="font-display font-black text-lg text-blue-400">{clickRate}%</p>
                    <p className="text-[10px] text-gray-600">Clicks</p>
                  </div>
                  <div>
                    <p className="font-display font-black text-lg text-white">{c.recipients.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-600">Sent</p>
                  </div>
                </div>
              )}
            </div>
            {c.status === 'sent' && (
              <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand-gold-500 rounded-full transition-all" style={{ width: `${openRate}%` }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  </>);
}
