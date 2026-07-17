import React, { useState } from 'react';
import { BLOG_POSTS } from '../../../data';
import type { BlogPost } from '../../../types';
import { Plus, Pencil, Trash2, Eye, X } from 'lucide-react';

const CAT_COLORS: Record<string, string> = {
  Prayer: '#8b5cf6', Family: '#ec4899', Leadership: '#6366f1',
  Restoration: '#f59e0b', Youth: '#10b981',
};

const emptyForm = { title: '', excerpt: '', category: 'Prayer', author: '', readTime: '', imageUrl: '' };

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({ title: p.title, excerpt: p.excerpt, category: p.category, author: p.author, readTime: p.readTime, imageUrl: p.imageUrl });
    setShowForm(true);
  };
  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));
  const save = () => {
    if (!form.title) return;
    if (editing) {
      setPosts(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p));
    } else {
      setPosts(prev => [...prev, {
        id: `b${Date.now()}`, slug: form.title.toLowerCase().replace(/\s+/g, '-'),
        content: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        ...form,
      }]);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0a0a0f', paddingTop: 2 }}>
        <div>
          <h2 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Blog & Devotionals</h2>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: '3px 0 0' }}>{posts.length} published posts</p>
        </div>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#eb8e09', border: 'none', borderRadius: 9, padding: '9px 16px', color: '#fff', fontWeight: 700, fontSize: '0.87rem', cursor: 'pointer' }}>
          <Plus size={15} /> New Post
        </button>
      </div>

      {/* Card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {posts.map(p => {
          const catColor = CAT_COLORS[p.category] || '#6b7280';
          const isHovered = hoveredId === p.id;
          return (
            <div
              key={p.id}
              style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', position: 'relative' }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Thumbnail */}
              <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                <img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: 10, left: 10, background: `${catColor}dd`, color: '#fff', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px' }}>
                  {p.category}
                </span>
                {/* Hover overlay */}
                {isHovered && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'opacity 0.2s' }}>
                    <button onClick={() => openEdit(p)} style={{ background: 'rgba(235,142,9,0.85)', border: 'none', borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Pencil size={13} /> Edit
                    </button>
                    <button style={{ background: 'rgba(99,102,241,0.85)', border: 'none', borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Eye size={13} /> Preview
                    </button>
                    <button onClick={() => deletePost(p.id)} style={{ background: 'rgba(239,68,68,0.85)', border: 'none', borderRadius: 8, padding: '8px', color: '#fff', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>
              {/* Content */}
              <div style={{ padding: '14px 16px 16px' }}>
                <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.95rem', margin: '0 0 6px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>
                  {p.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{p.author}</span>
                  <span style={{ color: '#374151', fontSize: '0.73rem' }}>{p.date} · {p.readTime}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline form */}
      {showForm && (
        <div style={{ marginTop: 24, background: '#13131f', border: '1px solid rgba(235,142,9,0.2)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, margin: 0 }}>{editing ? 'Edit Post' : 'New Blog Post'}</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { key: 'title', label: 'Title' },
              { key: 'author', label: 'Author' },
              { key: 'readTime', label: 'Read Time', placeholder: '5 min read' },
              { key: 'imageUrl', label: 'Cover Image URL' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.78rem', marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                <input
                  value={(form as any)[f.key]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={(f as any).placeholder || ''}
                  style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.78rem', marginBottom: 6, fontWeight: 500 }}>Category</label>
              <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}>
                {['Prayer', 'Family', 'Leadership', 'Restoration', 'Youth'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.78rem', marginBottom: 6, fontWeight: 500 }}>Excerpt</label>
            <textarea value={form.excerpt} onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))} rows={3} style={{ width: '100%', background: '#0a0a0f', border: '1.5px solid rgba(255,255,255,0.09)', borderRadius: 9, padding: '9px 12px', color: '#f1f1f1', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={save} style={{ background: '#eb8e09', border: 'none', borderRadius: 9, padding: '9px 20px', color: '#fff', fontWeight: 700, fontSize: '0.87rem', cursor: 'pointer' }}>
              {editing ? 'Update Post' : 'Publish Post'}
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
