import React, { useState } from 'react';
import { Mail, MailOpen, Reply, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

type MsgStatus = 'New' | 'Read' | 'Replied';

interface ContactMsg {
  id: string;
  from: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: MsgStatus;
  reply?: string;
}

const SEEDED: ContactMsg[] = [
  { id: 'c1', from: 'Emmanuel Adeyemi', email: 'emmanuel.a@email.com', subject: 'Partnership Inquiry', message: 'Good day, I lead a men\'s group at my local church in Dallas. We\'ve been following WhenMen for a while and would love to explore a partnership. Can we schedule a call?', date: 'Jun 28, 2026', status: 'New' },
  { id: 'c2', from: 'Calvin Moore', email: 'calvin.m@email.com', subject: 'Prayer Retreat Registration', message: 'I tried to register for the July prayer retreat but the form gave me an error. Can you help? My confirmation code is WM-2026-447.', date: 'Jun 27, 2026', status: 'New' },
  { id: 'c3', from: 'Sarah Johnson', email: 'sarah.j@email.com', subject: 'Marriage Workshop', message: 'My husband and I are interested in attending the Marriage & Family Enrichment workshop. Is there scholarship availability for couples who cannot afford the full fee?', date: 'Jun 26, 2026', status: 'Read' },
  { id: 'c4', from: 'Jerome Brown', email: 'jerome.b@email.com', subject: 'Volunteer Application Follow-up', message: 'I submitted my volunteer application 2 weeks ago for the Prison Ministry team. Just following up to check on the status and next steps.', date: 'Jun 25, 2026', status: 'Read' },
  { id: 'c5', from: 'Kwame Asante', email: 'kwame.a@email.com', subject: 'Speaking Request', message: 'I would like to invite Pastor Lani Akinyode to speak at our church\'s Men\'s Conference in October. Please let me know how to formally submit an invitation.', date: 'Jun 24, 2026', status: 'Replied' },
  { id: 'c6', from: 'Phillip Harris', email: 'phillip.h@email.com', subject: 'Mentorship Program Question', message: 'I am a 24-year-old college student looking for spiritual mentorship. Does your mentorship program work for young adults still in school?', date: 'Jun 23, 2026', status: 'Replied' },
  { id: 'c7', from: 'Daniel Williams', email: 'daniel.w@email.com', subject: 'Donation Receipt', message: 'I made a donation last week but have not received a receipt for tax purposes. Could you resend it to this email address? The amount was $200.', date: 'Jun 22, 2026', status: 'New' },
  { id: 'c8', from: 'Trevor Nelson', email: 'trevor.n@email.com', subject: 'Teen Program Enrollment', message: 'I have a 15-year-old son who could really benefit from the WHENMEN Young Men program. How do I enroll him and what are the requirements?', date: 'Jun 21, 2026', status: 'Read' },
];

const STATUS_CONFIG: Record<MsgStatus, { color: string; bg: string }> = {
  New: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  Read: { color: '#6b7280', bg: 'rgba(107,114,128,0.12)' },
  Replied: { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
};

export default function ContactInbox() {
  const [messages, setMessages] = useState<ContactMsg[]>(SEEDED);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
    setMessages(prev => prev.map(m => m.id === id && m.status === 'New' ? { ...m, status: 'Read' } : m));
  };

  const deleteMsg = (id: string) => { setMessages(prev => prev.filter(m => m.id !== id)); if (expandedId === id) setExpandedId(null); };

  const sendReply = (id: string) => {
    const text = replyText[id];
    if (!text?.trim()) return;
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'Replied', reply: text } : m));
    setReplyText(prev => ({ ...prev, [id]: '' }));
  };

  const unread = messages.filter(m => m.status === 'New').length;

  return (
    <div>
      <div style={{ marginBottom: 22, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h2 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Contact Inbox</h2>
          {unread > 0 && (
            <span style={{ background: '#ef4444', color: '#fff', borderRadius: 100, fontSize: '0.72rem', fontWeight: 800, padding: '2px 9px' }}>{unread} new</span>
          )}
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '3px 0 0' }}>{messages.length} total messages</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {messages.map(msg => {
          const cfg = STATUS_CONFIG[msg.status];
          const isExpanded = expandedId === msg.id;
          return (
            <div key={msg.id} style={{ background: '#13131f', border: `1px solid ${isExpanded ? 'rgba(235,142,9,0.25)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              {/* Row */}
              <div
                onClick={() => toggleExpand(msg.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ color: msg.status === 'New' ? '#ef4444' : '#6b7280', flexShrink: 0 }}>
                  {msg.status === 'New' ? <Mail size={16} /> : <MailOpen size={16} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                    <span style={{ color: msg.status === 'New' ? '#f1f1f1' : '#9ca3af', fontWeight: msg.status === 'New' ? 700 : 500, fontSize: '0.9rem' }}>{msg.from}</span>
                    <span style={{ color: '#374151', fontSize: '0.75rem' }}>{msg.email}</span>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.subject}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <span style={{ color: '#374151', fontSize: '0.75rem' }}>{msg.date}</span>
                  <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, padding: '3px 9px' }}>{msg.status}</span>
                  <button onClick={e => { e.stopPropagation(); deleteMsg(msg.id); }} style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 7, padding: '5px', cursor: 'pointer', color: '#ef4444' }}>
                    <Trash2 size={13} />
                  </button>
                  {isExpanded ? <ChevronUp size={15} color="#6b7280" /> : <ChevronDown size={15} color="#6b7280" />}
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '18px 18px 20px' }}>
                  <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '14px 16px' }}>
                    {msg.message}
                  </p>
                  {msg.reply && (
                    <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
                      <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '0 0 6px', fontWeight: 600 }}>YOUR REPLY</p>
                      <p style={{ color: '#10b981', fontSize: '0.87rem', margin: 0, lineHeight: 1.6 }}>{msg.reply}</p>
                    </div>
                  )}
                  {msg.status !== 'Replied' && (
                    <div>
                      <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.78rem', marginBottom: 7, fontWeight: 500 }}>
                        Reply to {msg.from}
                      </label>
                      <textarea
                        value={replyText[msg.id] || ''}
                        onChange={e => setReplyText(prev => ({ ...prev, [msg.id]: e.target.value }))}
                        rows={3}
                        placeholder="Type your reply..."
                        style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.87rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                      />
                      <button
                        onClick={() => sendReply(msg.id)}
                        style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 7, background: '#eb8e09', border: 'none', borderRadius: 9, padding: '8px 16px', color: '#fff', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer' }}
                      >
                        <Reply size={14} /> Send Reply
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
