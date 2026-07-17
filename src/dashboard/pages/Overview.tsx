import React from 'react';
import { motion } from 'motion/react';
import { Users, Heart, Mail, Calendar, TrendingUp, MessageSquare, ArrowUpRight, ArrowRight, Shield } from 'lucide-react';
import {
  SEEDED_SUBSCRIBERS, SEEDED_DONATIONS, SEEDED_CONTACTS, SEEDED_PRAYERS,
  SEEDED_REGISTRATIONS, SEEDED_MEMBERSHIPS, SEEDED_CAMPAIGNS,
  UPCOMING_EVENTS, IMPACT_STATS
} from '../data/dashboardData';

const totalDonations = SEEDED_DONATIONS.filter(d => d.status === 'completed').reduce((s, d) => s + d.amount, 0);
const unreadContacts = SEEDED_CONTACTS.filter(c => !c.read).length;
const newMembers = SEEDED_MEMBERSHIPS.filter(m => m.status === 'new').length;

const STAT_CARDS = [
  { label: 'Total Subscribers', value: SEEDED_SUBSCRIBERS.length.toString(), sub: '+3 this week', icon: <Mail className="w-5 h-5" />, color: 'from-blue-500/20 to-blue-600/10', accent: '#3b82f6' },
  { label: 'Donations (July)', value: `$${totalDonations.toLocaleString()}`, sub: `${SEEDED_DONATIONS.length} transactions`, icon: <Heart className="w-5 h-5" />, color: 'from-emerald-500/20 to-emerald-600/10', accent: '#10b981' },
  { label: 'New Members', value: newMembers.toString(), sub: 'Pending review', icon: <Users className="w-5 h-5" />, color: 'from-brand-gold-500/20 to-brand-gold-600/10', accent: '#eb8e09' },
  { label: 'Unread Messages', value: unreadContacts.toString(), sub: `${SEEDED_PRAYERS.length} prayer requests`, icon: <MessageSquare className="w-5 h-5" />, color: 'from-purple-500/20 to-purple-600/10', accent: '#a855f7' },
];

interface OverviewProps { onNavigate: (p: string) => void; }

export default function Overview({ onNavigate }: OverviewProps) {
  return (
    <div className="p-6 space-y-8 text-white">

      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-extrabold text-2xl text-white"
        >
          Good morning, Pastor Lani 👋
        </motion.h1>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with WHENMEN INC. today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`rounded-2xl p-5 bg-gradient-to-br ${card.color} border border-white/6 relative overflow-hidden group hover:border-white/10 transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${card.accent}20`, color: card.accent }}>
                {card.icon}
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <p className="font-display font-black text-2xl text-white">{card.value}</p>
            <p className="text-xs text-gray-400 mt-1">{card.label}</p>
            <p className="text-[10px] mt-1" style={{ color: card.accent }}>{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl border border-white/6 overflow-hidden"
          style={{ background: '#111111' }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-gold-500" />
              <h3 className="font-display font-bold text-sm text-white">Upcoming Events</h3>
            </div>
            <button onClick={() => onNavigate('events')} className="text-[11px] text-brand-gold-500 hover:text-brand-gold-400 flex items-center gap-1 cursor-pointer transition-colors">
              Manage <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-white/4">
            {UPCOMING_EVENTS.slice(0, 4).map((event, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-gold-500/15 border border-brand-gold-500/20 text-center flex flex-col items-center justify-center shrink-0">
                  <span className="font-display font-black text-brand-gold-500 text-xs leading-none">{event.date.split(' ')[1]}</span>
                  <span className="text-[8px] text-brand-gold-500/60 uppercase">{event.date.split(' ')[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{event.time} · {event.location}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${event.registrationRequired ? 'bg-brand-gold-500/15 text-brand-gold-500' : 'bg-emerald-500/15 text-emerald-400'}`}>
                  {event.registrationRequired ? 'Reg. Req.' : 'Open'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-white/6 overflow-hidden"
          style={{ background: '#111111' }}
        >
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-gold-500" />
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-white/4">
            {[
              { dot: 'bg-emerald-400', text: 'New membership — Emmanuel O.', time: '2m ago' },
              { dot: 'bg-amber-400', text: 'Prayer request received', time: '15m ago' },
              { dot: 'bg-blue-400', text: 'Donation $250 — Anonymous', time: '1h ago' },
              { dot: 'bg-purple-400', text: 'Contact message — James A.', time: '2h ago' },
              { dot: 'bg-emerald-400', text: 'New subscriber — Carlos M.', time: '3h ago' },
              { dot: 'bg-amber-400', text: 'Event registration — Worship Night', time: '4h ago' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-white/2 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.dot}`} />
                <div>
                  <p className="text-xs text-gray-300">{a.text}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Donations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-white/6 overflow-hidden"
          style={{ background: '#111111' }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-brand-gold-500" />
              Recent Donations
            </h3>
            <button onClick={() => onNavigate('donations')} className="text-[11px] text-brand-gold-500 hover:text-brand-gold-400 flex items-center gap-1 cursor-pointer">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-white/4">
            {SEEDED_DONATIONS.slice(0, 5).map(d => (
              <div key={d.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/2 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-400">
                    {d.name === 'Anonymous' ? '?' : d.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{d.name}</p>
                    <p className="text-[10px] text-gray-500">{d.type === 'monthly' ? 'Monthly' : 'One-time'} · {d.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-brand-gold-500">${d.amount}</p>
                  <p className={`text-[10px] ${d.status === 'completed' ? 'text-emerald-400' : 'text-red-400'}`}>{d.status}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl border border-white/6 overflow-hidden"
          style={{ background: '#111111' }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-gold-500" />
              Impact Stats (Live Site)
            </h3>
            <button onClick={() => onNavigate('stats')} className="text-[11px] text-brand-gold-500 hover:text-brand-gold-400 flex items-center gap-1 cursor-pointer">
              Edit <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-white/4">
            {IMPACT_STATS.map((s, i) => (
              <div key={i} className="px-5 py-5 hover:bg-white/2 transition-colors">
                <p className="font-display font-black text-2xl text-brand-gold-500">{s.value}</p>
                <p className="text-xs font-bold text-white mt-1">{s.label}</p>
                <p className="text-[10px] text-gray-600 mt-0.5 leading-snug">{s.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
