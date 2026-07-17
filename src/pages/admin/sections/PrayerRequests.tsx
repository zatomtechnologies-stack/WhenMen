import React, { useState } from 'react';
import { CheckCircle, Clock, ShieldAlert } from 'lucide-react';

type PrayerStatus = 'Prayed' | 'Pending';
type PrayerCategory = 'Personal' | 'Family' | 'Health' | 'Marriage';

interface PrayerRequest {
  id: string;
  name: string;
  category: PrayerCategory;
  date: string;
  wantsContact: boolean;
  status: PrayerStatus;
  request: string;
}

const SEEDED: PrayerRequest[] = [
  { id: 'pr1', name: 'Marcus T.', category: 'Personal', date: 'Jun 28, 2026', wantsContact: false, status: 'Pending', request: 'Please pray for direction in my career. I feel God is calling me to leave my current job but I\'m not sure yet.' },
  { id: 'pr2', name: 'Anonymous', category: 'Marriage', date: 'Jun 27, 2026', wantsContact: false, status: 'Pending', request: 'My marriage is on the verge of collapse. Please pray for reconciliation and God\'s intervention.' },
  { id: 'pr3', name: 'David R.', category: 'Family', date: 'Jun 27, 2026', wantsContact: true, status: 'Pending', request: 'Praying for my estranged son to return home. We have been separated for 3 years.' },
  { id: 'pr4', name: 'Anonymous', category: 'Health', date: 'Jun 26, 2026', wantsContact: false, status: 'Prayed', request: 'Cancer diagnosis — praying for complete healing and strength for family during this season.' },
  { id: 'pr5', name: 'Robert S.', category: 'Personal', date: 'Jun 25, 2026', wantsContact: true, status: 'Prayed', request: 'Dealing with addiction relapse. Need prayer for strength and accountability.' },
  { id: 'pr6', name: 'Anonymous', category: 'Family', date: 'Jun 24, 2026', wantsContact: false, status: 'Pending', request: 'Praying for a prodigal son who has walked away from faith and family.' },
  { id: 'pr7', name: 'Emmanuel A.', category: 'Marriage', date: 'Jun 23, 2026', wantsContact: true, status: 'Prayed', request: 'Wife and I are in counseling. Please pray for the process and softening of hearts on both sides.' },
  { id: 'pr8', name: 'Anonymous', category: 'Health', date: 'Jun 22, 2026', wantsContact: false, status: 'Pending', request: 'Mental health struggles — anxiety and depression have been overwhelming. Please intercede.' },
  { id: 'pr9', name: 'Jerome B.', category: 'Personal', date: 'Jun 21, 2026', wantsContact: true, status: 'Pending', request: 'Financial crisis — facing possible eviction. Praying for provision and wisdom.' },
  { id: 'pr10', name: 'Kwame A.', category: 'Family', date: 'Jun 20, 2026', wantsContact: false, status: 'Prayed', request: 'My father passed away unexpectedly. Please pray for peace and comfort for our entire family.' },
];

const CAT_COLORS: Record<PrayerCategory, string> = {
  Personal: '#6366f1', Family: '#ec4899', Health: '#ef4444', Marriage: '#f59e0b',
};

export default function PrayerRequests() {
  const [requests, setRequests] = useState<PrayerRequest[]>(SEEDED);
  const [expanded, setExpanded] = useState<string | null>(null);

  const markPrayed = (id: string) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Prayed' } : r));

  const pending = requests.filter(r => r.status === 'Pending').length;

  return (
    <div>
      {/* Confidential banner */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
        <ShieldAlert size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ color: '#f59e0b', fontSize: '0.84rem', margin: 0, lineHeight: 1.5 }}>
          <strong>Confidential:</strong> All prayer requests are to be handled with strict pastoral confidentiality. Do not share outside the ministry leadership team.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <h2 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Prayer Requests</h2>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '3px 0 0' }}>
            <span style={{ color: '#f59e0b', fontWeight: 700 }}>{pending} pending</span> · {requests.filter(r => r.status === 'Prayed').length} prayed
          </p>
        </div>
      </div>

      <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#1a1a2e' }}>
                {['Name', 'Category', 'Date', 'Wants Contact', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '13px 16px', color: '#6b7280', fontWeight: 600, textAlign: 'left', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => {
                const catColor = CAT_COLORS[r.category];
                const isExpanded = expanded === r.id;
                return (
                  <React.Fragment key={r.id}>
                    <tr
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}
                      onClick={() => setExpanded(isExpanded ? null : r.id)}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '12px 16px', color: '#f1f1f1', fontWeight: 600, fontSize: '0.88rem' }}>{r.name}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: `${catColor}1a`, color: catColor, border: `1px solid ${catColor}33`, borderRadius: 100, padding: '3px 10px', fontSize: '0.75rem', fontWeight: 700 }}>{r.category}</span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: '0.82rem' }}>{r.date}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ color: r.wantsContact ? '#10b981' : '#374151', fontWeight: 700, fontSize: '0.85rem' }}>{r.wantsContact ? 'Yes' : 'No'}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: r.status === 'Prayed' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: r.status === 'Prayed' ? '#10b981' : '#f59e0b', borderRadius: 100, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
                          {r.status === 'Prayed' ? <CheckCircle size={12} /> : <Clock size={12} />} {r.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {r.status === 'Pending' && (
                          <button
                            onClick={e => { e.stopPropagation(); markPrayed(r.id); }}
                            style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 7, padding: '6px 12px', cursor: 'pointer', color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}
                          >
                            <CheckCircle size={12} /> Mark Prayed
                          </button>
                        )}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={6} style={{ padding: '0 16px 16px', background: 'rgba(255,255,255,0.015)' }}>
                          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 16px' }}>
                            <p style={{ color: '#6b7280', fontSize: '0.73rem', fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Prayer Request</p>
                            <p style={{ color: '#d1d5db', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{r.request}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
