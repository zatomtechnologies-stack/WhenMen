import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../../../data';
import type { TeamMember } from '../../../types';
import { Plus, Pencil, Linkedin, Twitter, Facebook, X } from 'lucide-react';

const emptyForm: Partial<TeamMember> = { name: '', title: '', bio: '', socials: {} };

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

export default function TeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<Partial<TeamMember>>(emptyForm);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (m: TeamMember) => { setEditing(m); setForm({ ...m }); setShowForm(true); };
  const save = () => {
    if (!form.name) return;
    if (editing) {
      setMembers(prev => prev.map(m => m.id === editing.id ? { ...m, ...form } as TeamMember : m));
    } else {
      setMembers(prev => [...prev, { id: `tm${Date.now()}`, name: form.name!, title: form.title || '', bio: form.bio || '', socials: form.socials }]);
    }
    setShowForm(false);
  };

  return (
    <div>
      {/* Sticky header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, position: 'sticky', top: 0, zIndex: 10, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0f', paddingTop: 2 }}>
        <div>
          <h2 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Team Members</h2>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '3px 0 0' }}>{members.length} team members</p>
        </div>
        <button
          onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#eb8e09', border: 'none', borderRadius: 9, padding: '9px 16px', color: '#fff', fontWeight: 700, fontSize: '0.87rem', cursor: 'pointer' }}
        >
          <Plus size={15} /> Add Member
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {members.map(m => (
          <div key={m.id} style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#eb8e09', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>{getInitials(m.name)}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', margin: 0 }}>{m.name}</h3>
                <p style={{ color: '#eb8e09', fontSize: '0.8rem', fontWeight: 600, margin: '3px 0 0' }}>{m.title}</p>
              </div>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.83rem', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>
              {m.bio}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {m.socials?.linkedin && (
                  <a href={m.socials.linkedin} style={{ color: '#6b7280', transition: 'color 0.15s' }} onMouseEnter={e => (e.currentTarget.style.color = '#0077b5')} onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                    <Linkedin size={15} />
                  </a>
                )}
                {m.socials?.twitter && (
                  <a href={m.socials.twitter} style={{ color: '#6b7280', transition: 'color 0.15s' }} onMouseEnter={e => (e.currentTarget.style.color = '#1da1f2')} onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                    <Twitter size={15} />
                  </a>
                )}
                {m.socials?.facebook && (
                  <a href={m.socials.facebook} style={{ color: '#6b7280', transition: 'color 0.15s' }} onMouseEnter={e => (e.currentTarget.style.color = '#1877f2')} onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                    <Facebook size={15} />
                  </a>
                )}
              </div>
              <button
                onClick={() => openEdit(m)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(235,142,9,0.10)', border: '1px solid rgba(235,142,9,0.2)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', color: '#eb8e09', fontSize: '0.78rem', fontWeight: 600 }}
              >
                <Pencil size={12} /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-in form panel */}
      {showForm && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
            onClick={() => setShowForm(false)}
          />
          <div style={{
            position: 'fixed', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 420,
            background: '#13131f', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 50,
            padding: 28, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {editing ? 'Edit Member' : 'Add Team Member'}
              </h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            {[
              { key: 'name', label: 'Full Name', placeholder: 'Pastor John Doe' },
              { key: 'title', label: 'Title / Role', placeholder: 'Founder & President' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.8rem', marginBottom: 7, fontWeight: 500 }}>{f.label}</label>
                <input
                  value={(form as any)[f.key] || ''}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.8rem', marginBottom: 7, fontWeight: 500 }}>Bio</label>
              <textarea
                value={form.bio || ''}
                onChange={e => setForm(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                placeholder="Short biography..."
                style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>
            {[
              { key: 'linkedin', label: 'LinkedIn URL' },
              { key: 'twitter', label: 'Twitter URL' },
              { key: 'facebook', label: 'Facebook URL' },
            ].map(s => (
              <div key={s.key}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.8rem', marginBottom: 7, fontWeight: 500 }}>{s.label}</label>
                <input
                  value={(form.socials as any)?.[s.key] || ''}
                  onChange={e => setForm(prev => ({ ...prev, socials: { ...prev.socials, [s.key]: e.target.value } }))}
                  placeholder="https://..."
                  style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button onClick={save} style={{ flex: 1, background: '#eb8e09', border: 'none', borderRadius: 9, padding: '11px', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                {editing ? 'Update Member' : 'Add Member'}
              </button>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, padding: '11px', color: '#9ca3af', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
