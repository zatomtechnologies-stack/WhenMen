import React, { useState } from 'react';
import { Download, DollarSign, TrendingUp, Users } from 'lucide-react';

type DonationType = 'One-time' | 'Monthly';
type DonationStatus = 'Completed' | 'Pending' | 'Failed';
type DonationFilter = 'All' | DonationType;

interface Donation {
  id: string;
  donor: string;
  amount: number;
  type: DonationType;
  method: string;
  date: string;
  refId: string;
  status: DonationStatus;
}

const SEEDED: Donation[] = [
  { id: 'd1', donor: 'Michael T.', amount: 150, type: 'One-time', method: 'Stripe', date: 'Jun 28, 2026', refId: 'WM-9821', status: 'Completed' },
  { id: 'd2', donor: 'Angela K.', amount: 50, type: 'Monthly', method: 'PayPal', date: 'Jun 27, 2026', refId: 'WM-9820', status: 'Completed' },
  { id: 'd3', donor: 'Robert S.', amount: 250, type: 'One-time', method: 'Stripe', date: 'Jun 25, 2026', refId: 'WM-9819', status: 'Completed' },
  { id: 'd4', donor: 'David R.', amount: 100, type: 'Monthly', method: 'Stripe', date: 'Jun 24, 2026', refId: 'WM-9818', status: 'Completed' },
  { id: 'd5', donor: 'Anonymous', amount: 500, type: 'One-time', method: 'PayPal', date: 'Jun 22, 2026', refId: 'WM-9817', status: 'Completed' },
  { id: 'd6', donor: 'Emmanuel A.', amount: 25, type: 'Monthly', method: 'Stripe', date: 'Jun 20, 2026', refId: 'WM-9816', status: 'Completed' },
  { id: 'd7', donor: 'Marcus T.', amount: 75, type: 'One-time', method: 'Stripe', date: 'Jun 18, 2026', refId: 'WM-9815', status: 'Completed' },
  { id: 'd8', donor: 'Jerome B.', amount: 100, type: 'One-time', method: 'PayPal', date: 'Jun 17, 2026', refId: 'WM-9814', status: 'Completed' },
  { id: 'd9', donor: 'Samuel O.', amount: 50, type: 'Monthly', method: 'Stripe', date: 'Jun 15, 2026', refId: 'WM-9813', status: 'Completed' },
  { id: 'd10', donor: 'Kwame A.', amount: 200, type: 'One-time', method: 'Stripe', date: 'Jun 14, 2026', refId: 'WM-9812', status: 'Completed' },
  { id: 'd11', donor: 'Calvin M.', amount: 30, type: 'One-time', method: 'PayPal', date: 'Jun 12, 2026', refId: 'WM-9811', status: 'Pending' },
  { id: 'd12', donor: 'Anthony J.', amount: 0, type: 'One-time', method: 'Stripe', date: 'Jun 10, 2026', refId: 'WM-9810', status: 'Failed' },
];

export default function Donations() {
  const [filter, setFilter] = useState<DonationFilter>('All');

  const filtered = SEEDED.filter(d => filter === 'All' || d.type === filter);
  const total = SEEDED.filter(d => d.status === 'Completed').reduce((sum, d) => sum + d.amount, 0);
  const monthly = SEEDED.filter(d => d.type === 'Monthly' && d.status === 'Completed').reduce((sum, d) => sum + d.amount, 0);
  const donorCount = new Set(SEEDED.filter(d => d.donor !== 'Anonymous').map(d => d.donor)).size;

  const STATUS_CONFIG: Record<DonationStatus, { color: string; bg: string }> = {
    Completed: { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    Failed: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  };

  return (
    <div>
      {/* Sticky summary header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#0a0a0f', paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 20, paddingTop: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div>
            <h2 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Donations Log</h2>
            <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '3px 0 0' }}>{SEEDED.length} transactions</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '8px 14px', color: '#d1d5db', fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer' }}>
            <Download size={14} /> Export CSV
          </button>
        </div>

        {/* Summary stat mini cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 14 }}>
          {[
            { label: 'Total Donations', value: `$${total.toLocaleString()}`, icon: DollarSign, color: '#eb8e09' },
            { label: 'Monthly Recurring', value: `$${monthly}/mo`, icon: TrendingUp, color: '#10b981' },
            { label: 'Unique Donors', value: String(donorCount), icon: Users, color: '#6366f1' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: `${s.color}1a`, borderRadius: 8, padding: 8 }}><Icon size={16} color={s.color} /></div>
                <div>
                  <p style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>{s.value}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.73rem', margin: 0 }}>{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(['All', 'Monthly', 'One-time'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '0.83rem', fontWeight: 600, background: filter === f ? 'rgba(235,142,9,0.15)' : 'rgba(255,255,255,0.05)', color: filter === f ? '#eb8e09' : '#9ca3af' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#1a1a2e' }}>
                {['Donor', 'Amount', 'Type', 'Method', 'Date', 'Ref ID', 'Status'].map(h => (
                  <th key={h} style={{ padding: '13px 16px', color: '#6b7280', fontWeight: 600, textAlign: 'left', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => {
                const cfg = STATUS_CONFIG[d.status];
                return (
                  <tr key={d.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', color: '#f1f1f1', fontWeight: 600, fontSize: '0.88rem' }}>{d.donor}</td>
                    <td style={{ padding: '12px 16px', color: '#eb8e09', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.97rem' }}>
                      {d.status === 'Failed' ? <span style={{ color: '#374151' }}>—</span> : `$${d.amount}`}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: d.type === 'Monthly' ? 'rgba(99,102,241,0.12)' : 'rgba(235,142,9,0.10)', color: d.type === 'Monthly' ? '#6366f1' : '#eb8e09', borderRadius: 100, padding: '3px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {d.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#9ca3af', fontSize: '0.83rem' }}>{d.method}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: '0.82rem' }}>{d.date}</td>
                    <td style={{ padding: '12px 16px', color: '#374151', fontFamily: 'monospace', fontSize: '0.8rem' }}>{d.refId}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 100, padding: '3px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
