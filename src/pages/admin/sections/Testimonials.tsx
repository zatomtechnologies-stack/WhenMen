import React, { useState } from 'react';
import { TESTIMONIALS } from '../../../data';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

type Status = 'Approved' | 'Pending' | 'Rejected';

interface AdminTestimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  status: Status;
}

const SEEDED: AdminTestimonial[] = [
  ...TESTIMONIALS.map(t => ({ ...t, status: 'Approved' as Status })),
  { id: 'p1', name: 'Anthony J.', location: 'Memphis, TN', text: 'The prison ministry changed my life. I met men who really cared about my restoration and stood with me.', status: 'Pending' },
  { id: 'p2', name: 'Samuel O.', location: 'Austin, TX', text: 'My son and I attended the Father-Son Adventure Day. That weekend healed something in our relationship that years of distance had broken.', status: 'Pending' },
];

export default function Testimonials() {
  const [items, setItems] = useState<AdminTestimonial[]>(SEEDED);

  const setStatus = (id: string, status: Status) =>
    setItems(prev => prev.map(t => t.id === id ? { ...t, status } : t));

  const STATUS_CONFIG: Record<Status, { color: string; bg: string; icon: React.ReactNode }> = {
    Approved: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: <CheckCircle size={13} /> },
    Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: <Clock size={13} /> },
    Rejected: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', icon: <XCircle size={13} /> },
  };

  return (
    <div>
      <div style={{ marginBottom: 22, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Testimonials</h2>
        <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '3px 0 0' }}>
          {items.filter(t => t.status === 'Approved').length} approved · {items.filter(t => t.status === 'Pending').length} pending
        </p>
      </div>

      <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#1a1a2e' }}>
                {['Name', 'Location', 'Excerpt', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '13px 16px', color: '#6b7280', fontWeight: 600, textAlign: 'left', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((t, i) => {
                const cfg = STATUS_CONFIG[t.status];
                return (
                  <tr
                    key={t.id}
                    style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '13px 16px', color: '#f1f1f1', fontWeight: 600, whiteSpace: 'nowrap' }}>{t.name}</td>
                    <td style={{ padding: '13px 16px', color: '#9ca3af', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{t.location}</td>
                    <td style={{ padding: '13px 16px', color: '#9ca3af', fontSize: '0.83rem', maxWidth: 340 }}>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>
                        {t.text}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: cfg.bg, color: cfg.color, borderRadius: 100, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {cfg.icon} {t.status}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {t.status !== 'Approved' && (
                          <button
                            onClick={() => setStatus(t.id, 'Approved')}
                            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 7, padding: '5px 11px', cursor: 'pointer', color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}
                          >
                            Approve
                          </button>
                        )}
                        {t.status !== 'Rejected' && (
                          <button
                            onClick={() => setStatus(t.id, 'Rejected')}
                            style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 7, padding: '5px 11px', cursor: 'pointer', color: '#ef4444', fontSize: '0.75rem', fontWeight: 600 }}
                          >
                            Reject
                          </button>
                        )}
                      </div>
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
