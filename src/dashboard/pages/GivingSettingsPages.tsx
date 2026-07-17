import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Edit2, Check, Eye, EyeOff, Plus, Trash2, Save, Lock } from 'lucide-react';
import { SEEDED_DONATIONS, DONATION_TIERS } from '../data/dashboardData';

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

const Field = ({ label, value, type = 'text', masked }: { label: string; value: string; type?: string; masked?: boolean }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
      <div className="relative">
        <input
          type={masked && !show ? 'password' : type}
          defaultValue={value}
          className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none border border-white/6 focus:border-brand-gold-500/40 transition-colors pr-10"
          style={{ background: '#111' }}
        />
        {masked && (
          <button
            type="button"
            onClick={() => setShow(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 cursor-pointer transition-colors"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

const SaveBtn = () => (
  <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-brand-gold-500/15">
    <Save className="w-3.5 h-3.5" /> Save Changes
  </button>
);

const totalRev = SEEDED_DONATIONS.filter(d => d.status === 'completed').reduce((s, d) => s + d.amount, 0);

// ── Donations Log ─────────────────────────────────────────────────────────
export function DonationsPage() {
  return wrap(<>
    <PageHeader title="Donations Log" sub={`$${totalRev.toLocaleString()} collected · ${SEEDED_DONATIONS.length} transactions`} />
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { label: 'Total Collected', value: `$${totalRev.toLocaleString()}`, color: 'text-emerald-400' },
        { label: 'Monthly Recurring', value: `$${SEEDED_DONATIONS.filter(d => d.type === 'monthly' && d.status === 'completed').reduce((s, d) => s + d.amount, 0)}/mo`, color: 'text-brand-gold-500' },
        { label: 'Failed Transactions', value: SEEDED_DONATIONS.filter(d => d.status === 'failed').length.toString(), color: 'text-red-400' },
      ].map((s, i) => (
        <div key={i} className="rounded-2xl border border-white/6 p-5" style={{ background: '#111' }}>
          <p className={`font-display font-black text-2xl ${s.color}`}>{s.value}</p>
          <p className="text-xs text-gray-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: '#111' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {['Donor', 'Email', 'Amount', 'Type', 'Method', 'Date', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[10px] text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/4">
            {SEEDED_DONATIONS.map(d => (
              <tr key={d.id} className="hover:bg-white/2 transition-colors">
                <td className="px-4 py-3 font-semibold text-white">{d.name}</td>
                <td className="px-4 py-3 text-gray-500">{d.email || '—'}</td>
                <td className="px-4 py-3 font-bold text-brand-gold-500">${d.amount}</td>
                <td className="px-4 py-3 text-gray-400 capitalize">{d.type}</td>
                <td className="px-4 py-3 text-gray-400 capitalize">{d.method}</td>
                <td className="px-4 py-3 text-gray-500">{d.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${d.status === 'completed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>);
}

// ── Donation Tiers ────────────────────────────────────────────────────────
export function TiersPage() {
  return wrap(<>
    <PageHeader title="Donation Tiers" sub="Impact descriptions shown on the Give page" />
    <div className="space-y-3 max-w-2xl">
      {DONATION_TIERS.map((t, i) => (
        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-white/6 hover:border-brand-gold-500/20 transition-all group" style={{ background: '#111' }}>
          <div className="w-16 shrink-0">
            <span className="font-display font-black text-2xl text-brand-gold-500">${t.amount}</span>
            <span className="block text-[9px] text-gray-600 uppercase tracking-wider">/month</span>
          </div>
          <div className="flex-1">
            <input
              type="text"
              defaultValue={t.impact}
              className="w-full bg-transparent text-sm text-gray-300 focus:outline-none focus:text-white border-b border-transparent focus:border-brand-gold-500/30 transition-colors py-0.5"
            />
          </div>
          <button className="text-gray-600 hover:text-brand-gold-500 cursor-pointer transition-colors opacity-0 group-hover:opacity-100">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
    <div className="mt-6"><SaveBtn /></div>
  </>);
}

// ── Payment Config ────────────────────────────────────────────────────────
export function PaymentConfigPage() {
  return wrap(<>
    <PageHeader title="Payment Configuration" sub="Stripe, PayPal, and processing settings" />
    <div className="max-w-xl space-y-8">
      <div className="rounded-2xl border border-white/6 p-6 space-y-5" style={{ background: '#111' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-brand-gold-500/15 flex items-center justify-center"><Lock className="w-3.5 h-3.5 text-brand-gold-500" /></div>
          <h3 className="font-display font-bold text-sm text-white">Stripe</h3>
          <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-bold ml-auto">Active</span>
        </div>
        <Field label="Publishable Key" value="pk_live_••••••••••••••••••••••••" masked />
        <Field label="Secret Key" value="sk_live_••••••••••••••••••••••••" masked />
        <Field label="Webhook Secret" value="whsec_••••••••••••••••••" masked />
      </div>
      <div className="rounded-2xl border border-white/6 p-6 space-y-5" style={{ background: '#111' }}>
        <h3 className="font-display font-bold text-sm text-white mb-2">PayPal</h3>
        <Field label="Client ID" value="AQv••••••••••••••••••••••••••••" masked />
        <Field label="Client Secret" value="ELl••••••••••••••••••••••••••••" masked />
      </div>
      <div className="rounded-2xl border border-white/6 p-6 space-y-5" style={{ background: '#111' }}>
        <h3 className="font-display font-bold text-sm text-white mb-2">Processing</h3>
        <Field label="Processing Fee (%)" value="3" type="number" />
        <div className="flex items-center gap-3">
          <input type="checkbox" id="fees-on" defaultChecked className="accent-brand-gold-500" />
          <label htmlFor="fees-on" className="text-xs text-gray-400 cursor-pointer">Enable fee coverage option for donors by default</label>
        </div>
      </div>
      <SaveBtn />
      <p className="text-xs text-gray-600 italic">Keys are masked for display. Changes are applied on save and require server restart.</p>
    </div>
  </>);
}

// ── Site Settings ─────────────────────────────────────────────────────────
export function SiteSettingsPage() {
  return wrap(<>
    <PageHeader title="Site Settings" sub="Organisation details displayed across the website" />
    <div className="max-w-xl space-y-5">
      <div className="rounded-2xl border border-white/6 p-6 space-y-5" style={{ background: '#111' }}>
        <h3 className="font-display font-bold text-sm text-white">Organisation Info</h3>
        <Field label="Organisation Name" value="WHENMEN INC." />
        <Field label="Tagline" value="Every Man Needs a Brotherhood" />
        <Field label="EIN" value="XX-XXXXXXX" />
        <Field label="Mailing Address" value="Dallas, TX, United States" />
        <Field label="Phone" value="(214) 555-0190" />
        <Field label="Email" value="info@whenmen.org" />
        <Field label="Office Hours" value="Monday–Friday, 9:00 AM – 5:00 PM CST" />
      </div>
      <div className="rounded-2xl border border-white/6 p-6 space-y-5" style={{ background: '#111' }}>
        <h3 className="font-display font-bold text-sm text-white">Social Links</h3>
        <Field label="Instagram" value="https://instagram.com/whenmen" />
        <Field label="Facebook" value="https://facebook.com/whenmen" />
        <Field label="YouTube" value="https://youtube.com/@whenmen" />
      </div>
      <SaveBtn />
    </div>
  </>);
}

// ── Email Config ──────────────────────────────────────────────────────────
export function EmailConfigPage() {
  const [provider, setProvider] = useState<'resend' | 'smtp'>('resend');
  return wrap(<>
    <PageHeader title="Email Configuration" sub="Resend API (primary) + SMTP fallback" />
    <div className="max-w-xl space-y-6">
      {/* Provider toggle */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
        {(['resend', 'smtp'] as const).map(p => (
          <button
            key={p}
            onClick={() => setProvider(p)}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${provider === p ? 'bg-brand-gold-500 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            {p === 'resend' ? 'Resend (Primary)' : 'SMTP Fallback'}
          </button>
        ))}
      </div>

      {provider === 'resend' ? (
        <div className="rounded-2xl border border-white/6 p-6 space-y-5" style={{ background: '#111' }}>
          <Field label="Resend API Key" value="re_••••••••••••••••••••••••" masked />
          <Field label="From Name" value="WHENMEN INC." />
          <Field label="From Email" value="noreply@whenmen.org" />
          <Field label="Reply-To" value="info@whenmen.org" />
        </div>
      ) : (
        <div className="rounded-2xl border border-white/6 p-6 space-y-5" style={{ background: '#111' }}>
          <Field label="SMTP Host" value="smtp.mailgun.org" />
          <Field label="SMTP Port" value="587" type="number" />
          <Field label="SMTP Username" value="postmaster@whenmen.org" />
          <Field label="SMTP Password" value="••••••••••••••" masked />
          <div className="flex items-center gap-3">
            <input type="checkbox" id="tls" defaultChecked className="accent-brand-gold-500" />
            <label htmlFor="tls" className="text-xs text-gray-400 cursor-pointer">Use TLS/STARTTLS</label>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-white/6 p-6 space-y-4" style={{ background: '#111' }}>
        <h3 className="font-display font-bold text-sm text-white">Contact Notifications</h3>
        {[
          { label: 'Email on new contact form submission', id: 'n1', checked: true },
          { label: 'Email on new prayer request', id: 'n2', checked: true },
          { label: 'Email on new membership application', id: 'n3', checked: true },
          { label: 'Email on new donation received', id: 'n4', checked: false },
        ].map(n => (
          <div key={n.id} className="flex items-center gap-3">
            <input type="checkbox" id={n.id} defaultChecked={n.checked} className="accent-brand-gold-500" />
            <label htmlFor={n.id} className="text-xs text-gray-400 cursor-pointer">{n.label}</label>
          </div>
        ))}
        <Field label="Notification Recipient Email" value="admin@whenmen.org" />
      </div>
      <SaveBtn />
    </div>
  </>);
}

// ── Admin Users ───────────────────────────────────────────────────────────
export function AdminUsersPage() {
  return wrap(<>
    <PageHeader title="Admin Users" sub="Manage who has access to this dashboard" />
    <div className="space-y-3 max-w-2xl">
      {[
        { name: 'Pastor Lani Akinyode', email: 'lani@whenmen.org', role: 'Super Admin', initials: 'LA', active: true },
        { name: 'David R.', email: 'david@whenmen.org', role: 'Content Editor', initials: 'DR', active: true },
        { name: 'Marcus T.', email: 'marcus@whenmen.org', role: 'Treasurer', initials: 'MT', active: false },
      ].map((u, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-white/6 hover:border-brand-gold-500/15 transition-all" style={{ background: '#111' }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold-500/20 to-brand-gold-500/5 border border-brand-gold-500/20 flex items-center justify-center font-display font-black text-brand-gold-500 text-sm shrink-0">
            {u.initials}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">{u.name}</p>
            <p className="text-xs text-gray-500">{u.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/8 text-gray-400">{u.role}</span>
            <span className={`w-2 h-2 rounded-full ${u.active ? 'bg-emerald-400' : 'bg-gray-600'}`} />
          </div>
        </div>
      ))}
      <button className="flex items-center gap-2 px-4 py-2 mt-2 bg-brand-gold-500/10 hover:bg-brand-gold-500/20 text-brand-gold-500 font-bold text-xs rounded-xl transition-all cursor-pointer border border-brand-gold-500/20">
        <Plus className="w-3.5 h-3.5" /> Invite Admin User
      </button>
    </div>
  </>);
}

// Admin Users page above uses Plus — already imported at top of file
