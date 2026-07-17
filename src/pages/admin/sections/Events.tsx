import React, { useState } from 'react';
import { UPCOMING_EVENTS } from '../../../data';
import { Plus, Pencil, Trash2, X, CalendarDays, MapPin, Clock } from 'lucide-react';
import type { UpcomingEvent } from '../../../types';

const CATEGORY_COLORS: Record<string, string> = {
  worship: '#6366f1', family: '#ec4899', outreach: '#10b981',
  prayer: '#8b5cf6', youth: '#f59e0b', all: '#06b6d4',
};

const emptyForm = { title: '', date: '', time: '', location: '', category: 'all' as UpcomingEvent['category'], registrationRequired: false };

export default function Events() {
  const [events, setEvents] = useState<UpcomingEvent[]>(UPCOMING_EVENTS);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<UpcomingEvent | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (ev: UpcomingEvent) => {
    setEditing(ev);
    setForm({ title: ev.title, date: ev.date, time: ev.time, location: ev.location, category: ev.category, registrationRequired: ev.registrationRequired });
    setShowForm(true);
  };
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));
  const saveEvent = () => {
    if (!form.title || !form.date) return;
    if (editing) {
      setEvents(prev => prev.map(e => e.id === editing.id ? { ...e, ...form } : e));
    } else {
      setEvents(prev => [...prev, { id: `e${Date.now()}`, ...form }]);
    }
    setShowForm(false);
  };

  return (
    <div>
      {/* Sticky header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, position: 'sticky', top: 0, zIndex: 10, paddingTop: 2, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0f' }}>
        <div>
          <h2 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Events</h2>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '3px 0 0' }}>{events.length} events listed</p>
        </div>
        <button
          onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#eb8e09', border: 'none', borderRadius: 9, padding: '9px 16px', color: '#fff', fontWeight: 700, fontSize: '0.87rem', cursor: 'pointer' }}
        >
          <Plus size={15} /> Add Event
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#1a1a2e' }}>
                {['Date', 'Title', 'Category', 'Location', 'Registration', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '13px 16px', color: '#6b7280', fontWeight: 600, textAlign: 'left', fontSize: '0.78rem', whiteSpace: 'nowrap', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((ev, i) => {
                const isPast = false; // All seeded events are upcoming
                const catColor = CATEGORY_COLORS[ev.category] || '#6b7280';
                return (
                  <tr
                    key={ev.id}
                    style={{ borderBottom: i < events.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'background 0.1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(235,142,9,0.10)', border: '1px solid rgba(235,142,9,0.2)', borderRadius: 8, padding: '4px 10px', color: '#eb8e09', fontWeight: 700, fontSize: '0.8rem' }}>
                        <CalendarDays size={12} /> {ev.date}
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#f1f1f1', fontWeight: 600 }}>{ev.title}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: `${catColor}1a`, color: catColor, border: `1px solid ${catColor}33`, borderRadius: 100, padding: '3px 10px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>
                        {ev.category}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', color: '#9ca3af', fontSize: '0.83rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <MapPin size={12} color="#6b7280" /> {ev.location}
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: ev.registrationRequired ? 'rgba(99,102,241,0.12)' : 'rgba(16,185,129,0.12)', color: ev.registrationRequired ? '#6366f1' : '#10b981', borderRadius: 100, padding: '3px 10px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {ev.registrationRequired ? 'Required' : 'Open'}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ background: isPast ? 'rgba(107,114,128,0.15)' : 'rgba(16,185,129,0.12)', color: isPast ? '#6b7280' : '#10b981', borderRadius: 100, padding: '3px 10px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {isPast ? 'Past' : 'Upcoming'}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => openEdit(ev)} style={{ background: 'rgba(235,142,9,0.1)', border: '1px solid rgba(235,142,9,0.2)', borderRadius: 7, padding: '6px', cursor: 'pointer', color: '#eb8e09' }}><Pencil size={13} /></button>
                        <button onClick={() => deleteEvent(ev.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 7, padding: '6px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline form */}
      {showForm && (
        <div style={{ marginTop: 20, background: '#13131f', border: '1px solid rgba(235,142,9,0.2)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, margin: 0 }}>{editing ? 'Edit Event' : 'Add New Event'}</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { key: 'title', label: 'Title', placeholder: 'Event title' },
              { key: 'date', label: 'Date', placeholder: 'e.g. AUG 15' },
              { key: 'time', label: 'Time', placeholder: 'e.g. 7:00 PM CST' },
              { key: 'location', label: 'Location', placeholder: 'City or Online' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.78rem', marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                <input
                  value={(form as any)[f.key]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.78rem', marginBottom: 6, fontWeight: 500 }}>Category</label>
              <select
                value={form.category}
                onChange={e => setForm(prev => ({ ...prev, category: e.target.value as UpcomingEvent['category'] }))}
                style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
              >
                {['worship', 'family', 'outreach', 'prayer', 'youth', 'all'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingTop: 22 }}>
              <input
                type="checkbox"
                id="regRequired"
                checked={form.registrationRequired}
                onChange={e => setForm(prev => ({ ...prev, registrationRequired: e.target.checked }))}
                style={{ accentColor: '#eb8e09', width: 16, height: 16 }}
              />
              <label htmlFor="regRequired" style={{ color: '#9ca3af', fontSize: '0.85rem', cursor: 'pointer' }}>Registration Required</label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={saveEvent} style={{ background: '#eb8e09', border: 'none', borderRadius: 9, padding: '9px 20px', color: '#fff', fontWeight: 700, fontSize: '0.87rem', cursor: 'pointer' }}>
              {editing ? 'Update Event' : 'Create Event'}
            </button>
            <button onClick={() => setShowForm(false)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '9px 20px', color: '#9ca3af', fontWeight: 600, fontSize: '0.87rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
