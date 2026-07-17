import React, { useState } from 'react';
import { UserMinus, Download, Send, ChevronLeft, ChevronRight } from 'lucide-react';

type SubStatus = 'Active' | 'Unsubscribed';

interface Subscriber {
  id: string;
  email: string;
  name: string;
  date: string;
  status: SubStatus;
}

const SEEDED: Subscriber[] = [
  { id: 's1', email: 'michael.t@email.com', name: 'Michael T.', date: 'Jun 1, 2026', status: 'Active' },
  { id: 's2', email: 'david.r@email.com', name: 'David R.', date: 'Jun 3, 2026', status: 'Active' },
  { id: 's3', email: 'james.k@email.com', name: 'James K.', date: 'Jun 5, 2026', status: 'Active' },
  { id: 's4', email: 'marcus.t@email.com', name: 'Marcus T.', date: 'Jun 7, 2026', status: 'Active' },
  { id: 's5', email: 'robert.s@email.com', name: 'Robert S.', date: 'Jun 9, 2026', status: 'Active' },
  { id: 's6', email: 'anthony.j@email.com', name: 'Anthony J.', date: 'Jun 10, 2026', status: 'Unsubscribed' },
  { id: 's7', email: 'samuel.o@email.com', name: 'Samuel O.', date: 'Jun 12, 2026', status: 'Active' },
  { id: 's8', email: 'emmanuel.a@email.com', name: 'Emmanuel A.', date: 'Jun 14, 2026', status: 'Active' },
  { id: 's9', email: 'daniel.w@email.com', name: 'Daniel W.', date: 'Jun 15, 2026', status: 'Active' },
  { id: 's10', email: 'calvin.m@email.com', name: 'Calvin M.', date: 'Jun 17, 2026', status: 'Active' },
  { id: 's11', email: 'tobenna.e@email.com', name: 'Tobenna E.', date: 'Jun 18, 2026', status: 'Unsubscribed' },
  { id: 's12', email: 'phillip.h@email.com', name: 'Phillip H.', date: 'Jun 20, 2026', status: 'Active' },
  { id: 's13', email: 'jerome.b@email.com', name: 'Jerome B.', date: 'Jun 22, 2026', status: 'Active' },
  { id: 's14', email: 'kwame.a@email.com', name: 'Kwame A.', date: 'Jun 24, 2026', status: 'Active' },
  { id: 's15', email: 'trevor.n@email.com', name: 'Trevor N.', date: 'Jun 26, 2026', status: 'Active' },
];

const PAGE_SIZE = 5;

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(SEEDED);
  const [filter, setFilter] = useState<'All' | SubStatus>('All');
  const [page, setPage] = useState(1);
  const [newsletter, setNewsletter] = useState({ subject: '', body: '' });

  const filtered = subscribers.filter(s => filter === 'All' || s.status === filter);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const unsubscribe = (id: string) => setSubscribers(prev => prev.map(s => s.id === id ? { ...s, status: 'Unsubscribed' } : s));

  return (
    <div>
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#0a0a0f', paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 20, paddingTop: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Subscribers</h2>
            <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '3px 0 0' }}>
              <span style={{ color: '#10b981', fontWeight: 700 }}>{subscribers.filter(s => s.status === 'Active').length}</span> active · {subscribers.filter(s => s.status === 'Unsubscribed').length} unsubscribed
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '8px 14px', color: '#d1d5db', fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer' }}>
              <Download size={14} /> Export CSV
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#eb8e09', border: 'none', borderRadius: 9, padding: '8px 14px', color: '#fff', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer' }}>
              <Send size={14} /> Send Newsletter
            </button>
          </div>
        </div>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
          {(['All', 'Active', 'Unsubscribed'] as const).map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(1); }}
              style={{
                padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '0.83rem', fontWeight: 600,
                background: filter === f ? 'rgba(235,142,9,0.15)' : 'rgba(255,255,255,0.05)',
                color: filter === f ? '#eb8e09' : '#9ca3af',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#1a1a2e' }}>
                {['Email', 'Name', 'Date Subscribed', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '13px 16px', color: '#6b7280', fontWeight: 600, textAlign: 'left', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < pageData.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '12px 16px', color: '#9ca3af', fontFamily: 'monospace', fontSize: '0.82rem' }}>{s.email}</td>
                  <td style={{ padding: '12px 16px', color: '#f1f1f1', fontWeight: 600, fontSize: '0.88rem' }}>{s.name}</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: '0.82rem' }}>{s.date}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: s.status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(107,114,128,0.15)', color: s.status === 'Active' ? '#10b981' : '#6b7280', borderRadius: 100, padding: '3px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {s.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {s.status === 'Active' && (
                      <button onClick={() => unsubscribe(s.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 7, padding: '5px 10px', cursor: 'pointer', color: '#ef4444', fontSize: '0.75rem', fontWeight: 600 }}>
                        <UserMinus size={12} /> Unsub
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '6px 10px', cursor: page === 1 ? 'not-allowed' : 'pointer', color: page === 1 ? '#374151' : '#9ca3af' }}>
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} style={{ background: page === i + 1 ? '#eb8e09' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '6px 11px', cursor: 'pointer', color: page === i + 1 ? '#fff' : '#9ca3af', fontWeight: 700, fontSize: '0.83rem' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '6px 10px', cursor: page === pageCount ? 'not-allowed' : 'pointer', color: page === pageCount ? '#374151' : '#9ca3af' }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Compose Newsletter */}
      <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 22 }}>
        <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, margin: '0 0 16px' }}>
          Compose Newsletter
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.78rem', marginBottom: 6, fontWeight: 500 }}>Subject</label>
            <input
              value={newsletter.subject}
              onChange={e => setNewsletter(n => ({ ...n, subject: e.target.value }))}
              placeholder="Monthly update: June 2026"
              style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.78rem', marginBottom: 6, fontWeight: 500 }}>Message</label>
            <textarea
              value={newsletter.body}
              onChange={e => setNewsletter(n => ({ ...n, body: e.target.value }))}
              rows={5}
              placeholder="Write your newsletter content here..."
              style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#eb8e09', border: 'none', borderRadius: 9, padding: '10px 20px', color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', alignSelf: 'flex-start' }}>
            <Send size={14} /> Send to {subscribers.filter(s => s.status === 'Active').length} Subscribers
          </button>
        </div>
      </div>
    </div>
  );
}
