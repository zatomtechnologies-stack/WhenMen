import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react';

interface AdminLoginProps {
  onNavigate: (path: string) => void;
}

export default function AdminLogin({ onNavigate }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);

    if (email === 'admin' && password === 'whenmen2026') {
      localStorage.setItem('wm_admin_auth', 'true');
      onNavigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: '#0a0a0f', fontFamily: "'Inter', sans-serif" }}
    >
      {/* LEFT PANEL */}
      <div className="relative hidden md:flex md:w-1/2 flex-col justify-between p-10 overflow-hidden"
        style={{ background: '#0d0d14' }}>
        {/* Ambient orbs */}
        <motion.div
          className="absolute"
          style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(235,142,9,0.18) 0%, transparent 70%)', top: -100, left: -100, pointerEvents: 'none' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute"
          style={{ width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(235,142,9,0.1) 0%, transparent 70%)', bottom: -80, right: -80, pointerEvents: 'none' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <img src="/WhenMen.png" alt="WhenMen" style={{ height: 42 }} />
        </div>

        {/* Quote */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            style={{ fontSize: '2.4rem', fontFamily: "'Outfit', sans-serif", fontStyle: 'italic', fontWeight: 700, lineHeight: 1.25, color: '#f1f1f1', maxWidth: 480 }}
          >
            "When Men Pray,<br />
            <span style={{ color: '#eb8e09' }}>Families Change.</span>"
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ marginTop: 20, color: '#6b7280', fontSize: '0.95rem' }}
          >
            Admin Portal — Manage your ministry with clarity and purpose.
          </motion.p>
        </div>

        {/* Stat badges */}
        <div className="relative z-10 flex flex-wrap gap-3">
          {[
            { label: '2,500+ Members', icon: '👥' },
            { label: '12 Cities', icon: '📍' },
            { label: '8 Programs', icon: '🎯' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
              style={{
                background: 'rgba(235,142,9,0.10)',
                border: '1px solid rgba(235,142,9,0.25)',
                borderRadius: 100,
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                color: '#f1f1f1',
                fontSize: '0.85rem',
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
              }}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            width: '100%',
            maxWidth: 420,
            background: 'rgba(19,19,31,0.8)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            padding: '40px 36px',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Mobile logo */}
          <div className="md:hidden mb-6">
            <img src="/WhenMen.png" alt="WhenMen" style={{ height: 36 }} />
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div style={{ background: 'rgba(235,142,9,0.15)', borderRadius: 10, padding: 8 }}>
              <Shield size={20} color="#eb8e09" />
            </div>
            <div>
              <h1 style={{ color: '#f1f1f1', fontSize: '1.5rem', fontFamily: "'Outfit', sans-serif", fontWeight: 700, margin: 0 }}>
                Welcome Back
              </h1>
              <p style={{ color: '#6b7280', fontSize: '0.83rem', margin: 0 }}>Sign in to your admin panel</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.82rem', marginBottom: 7, fontWeight: 500 }}>
                Username
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin"
                required
                style={{
                  width: '100%',
                  background: '#0a0a0f',
                  border: '1.5px solid rgba(255,255,255,0.09)',
                  borderRadius: 10,
                  padding: '11px 14px',
                  color: '#f1f1f1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = '#eb8e09')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.09)')}
              />
            </div>

            <div className="mb-2">
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '0.82rem', marginBottom: 7, fontWeight: 500 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  style={{
                    width: '100%',
                    background: '#0a0a0f',
                    border: '1.5px solid rgba(255,255,255,0.09)',
                    borderRadius: 10,
                    padding: '11px 44px 11px 14px',
                    color: '#f1f1f1',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#eb8e09')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.09)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 mt-4">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ accentColor: '#eb8e09', width: 15, height: 15 }}
              />
              <label htmlFor="remember" style={{ color: '#9ca3af', fontSize: '0.83rem', cursor: 'pointer' }}>
                Remember me
              </label>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  key="err"
                  initial={{ opacity: 0, height: 0 }}
                  animate={shake
                    ? { opacity: 1, height: 'auto', x: [0, -8, 8, -6, 6, 0] }
                    : { opacity: 1, height: 'auto', x: 0 }
                  }
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', color: '#ef4444', fontSize: '0.84rem', marginBottom: 14 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{
                width: '100%',
                background: loading ? 'rgba(235,142,9,0.5)' : '#eb8e09',
                border: 'none',
                borderRadius: 10,
                padding: '13px',
                color: '#fff',
                fontSize: '0.97rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {loading ? (
                <span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              ) : (
                <>
                  <LogIn size={17} />
                  Sign In
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
