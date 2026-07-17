import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Shield, ArrowRight, Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

// Floating particle
const Particle = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-brand-gold-500/20 pointer-events-none"
    style={{ left: `${x}%`, bottom: '-10px', width: size, height: size }}
    animate={{ y: [0, -window.innerHeight - 40], opacity: [0, 0.6, 0] }}
    transition={{ duration: 8 + Math.random() * 6, delay, repeat: Infinity, ease: 'linear' }}
  />
);

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => { emailRef.current?.focus(); }, []);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    delay: i * 0.9,
    x: Math.random() * 100,
    size: 3 + Math.random() * 8,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in both fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Demo: any credentials work — backend will enforce real auth later
      if (password.length >= 4) {
        onLogin();
      } else {
        setError('Invalid credentials. Please try again.');
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    }, 1600);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#080808]">

      {/* ── Full-bleed bg image + layered gradient ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop"
          referrerPolicy="no-referrer"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#100800] to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_70%_50%,rgba(235,142,9,0.07)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_30%_50%,rgba(235,142,9,0.04)_0%,transparent_100%)]" />
      </div>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      {/* ── Grid lines ── */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none
        bg-[linear-gradient(rgba(235,142,9,1)_1px,transparent_1px),linear-gradient(90deg,rgba(235,142,9,1)_1px,transparent_1px)]
        bg-[size:80px_80px]" />

      {/* ── Left branding panel (hidden on mobile) ── */}
      <div className="hidden lg:flex flex-col justify-between absolute left-0 top-0 bottom-0 w-[44%] px-16 py-14 z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <img src="/WhenMen.png" alt="WhenMen Inc." className="h-10 w-auto object-contain" />
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-brand-gold-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Admin Dashboard
            </p>
            <h1 className="font-display font-extrabold text-5xl text-white tracking-tight leading-[1.05]">
              Command<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-500 to-amber-400">
                Centre.
              </span>
            </h1>
            <p className="text-gray-400 text-base mt-5 max-w-sm leading-relaxed font-light">
              Manage content, communications, giving, and every aspect of the WHENMEN brotherhood platform.
            </p>
          </motion.div>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { label: '2,500+', sub: 'Members' },
              { label: '8', sub: 'Chapters' },
              { label: '847', sub: 'Subscribers' },
            ].map((s, i) => (
              <div
                key={i}
                className="px-4 py-2.5 rounded-xl border border-brand-gold-500/20 bg-brand-gold-500/5 backdrop-blur-sm"
              >
                <span className="block font-display font-black text-lg text-brand-gold-500">{s.label}</span>
                <span className="block text-[10px] uppercase tracking-widest text-gray-500">{s.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-gray-600 text-xs"
        >
          © 2026 WHENMEN INC. · Secured Admin Portal
        </motion.p>
      </div>

      {/* ── Right login card ── */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-6 lg:mr-[8%] lg:ml-auto"
      >
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-brand-gold-500/8 rounded-[2rem] blur-3xl scale-110 pointer-events-none" />

        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[2rem] overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(235,142,9,0.15)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Top gold bar */}
          <div className="h-1 bg-gradient-to-r from-transparent via-brand-gold-500 to-transparent" />

          <div className="px-10 pt-10 pb-12">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8 flex items-center gap-3">
              <img src="/WhenMen.png" alt="WhenMen" className="h-8 w-auto" />
            </div>

            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold-500/15 border border-brand-gold-500/30 flex items-center justify-center mb-5">
                <Lock className="w-5 h-5 text-brand-gold-500" />
              </div>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-gray-400 text-sm mt-1.5">
                Sign in to your admin portal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="relative">
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
                  focused === 'email' || email
                    ? 'top-2 text-[10px] text-brand-gold-500 uppercase tracking-wider'
                    : 'top-4 text-sm text-gray-500'
                }`}>
                  Email Address
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  className="w-full pt-7 pb-3 px-4 rounded-xl text-white text-sm focus:outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${focused === 'email' ? 'rgba(235,142,9,0.6)' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: focused === 'email' ? '0 0 0 3px rgba(235,142,9,0.08)' : 'none',
                  }}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
                  focused === 'password' || password
                    ? 'top-2 text-[10px] text-brand-gold-500 uppercase tracking-wider'
                    : 'top-4 text-sm text-gray-500'
                }`}>
                  Password
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  className="w-full pt-7 pb-3 pl-4 pr-12 rounded-xl text-white text-sm focus:outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${focused === 'password' ? 'rgba(235,142,9,0.6)' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: focused === 'password' ? '0 0 0 3px rgba(235,142,9,0.08)' : 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-gold-500 transition-colors cursor-pointer"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs font-medium flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2.5 mt-2"
                style={{
                  background: loading
                    ? 'rgba(235,142,9,0.5)'
                    : 'linear-gradient(135deg, #eb8e09 0%, #c97808 100%)',
                  boxShadow: loading ? 'none' : '0 8px 32px rgba(235,142,9,0.35)',
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Authenticating…
                  </>
                ) : (
                  <>
                    Access Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-7 border-t border-white/6 flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-brand-gold-500/50" />
                <span>256-bit SSL encrypted</span>
              </div>
              <span>Admin access only</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
