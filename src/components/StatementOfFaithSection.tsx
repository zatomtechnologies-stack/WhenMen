import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, RotateCcw, Pause, Play } from 'lucide-react';

interface Props {
  statementOfFaith: string[];
}

const CARD_COLORS = [
  { bg: '#0d0d0d', accent: '#eb8e09', text: '#ffffff', sub: 'rgba(235,142,9,0.15)' },
  { bg: '#1a0e00', accent: '#eb8e09', text: '#ffffff', sub: 'rgba(235,142,9,0.12)' },
  { bg: '#0f0f0f', accent: '#f5a623', text: '#ffffff', sub: 'rgba(245,166,35,0.12)' },
  { bg: '#110900', accent: '#eb8e09', text: '#ffffff', sub: 'rgba(235,142,9,0.10)' },
  { bg: '#0a0a0a', accent: '#f0a020', text: '#ffffff', sub: 'rgba(240,160,32,0.14)' },
  { bg: '#160c00', accent: '#eb8e09', text: '#ffffff', sub: 'rgba(235,142,9,0.13)' },
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export default function StatementOfFaithSection({ statementOfFaith }: Props) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = statementOfFaith.length;

  const goTo = useCallback((idx: number, dir: 1 | -1) => {
    setDirection(dir);
    setActive(idx);
  }, []);

  const next = useCallback(() => {
    goTo((active + 1) % total, 1);
  }, [active, total, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + total) % total, -1);
  }, [active, total, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(next, 3800);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, next]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
    setIsDragging(false);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    if (Math.abs(e.touches[0].clientY - touchStart) > 5) setIsDragging(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || !isDragging) return;
    const diff = touchStart - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
    setIsDragging(false);
  };

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prev();
      if (e.key === ' ') setIsPlaying(p => !p);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const col = CARD_COLORS[active];

  // Stack variants — cards behind the active one peeking
  const getStackStyle = (offset: number) => ({
    scale: 1 - offset * 0.04,
    y: offset * 14,
    opacity: offset === 0 ? 1 : offset === 1 ? 0.7 : offset === 2 ? 0.4 : 0,
    zIndex: 10 - offset,
  });

  return (
    <section
      id="about-statement-of-faith"
      className="relative py-28 overflow-hidden bg-brand-neutral-bg"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(235,142,9,0.04)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(235,142,9,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(235,142,9,0.025)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-maroon-500 font-bold text-xs uppercase tracking-[0.25em] block mb-3"
          >
            Doctrine & Foundations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl text-brand-neutral-dark tracking-tight"
          >
            Statement of Faith
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="w-14 h-1 bg-brand-gold-500 mx-auto mt-4 rounded-full origin-left"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-sm max-w-md mx-auto mt-4"
          >
            Our core beliefs guide every resource, every prayer, and every sermon.
          </motion.p>
        </div>

        {/* Main 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — stacked card deck */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[400px] flex items-center justify-center select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Background stack — 3 cards peeking behind */}
            {[2, 1, 0].map((offset) => {
              const cardIdx = (active + offset + 1) % total;
              const stackCol = CARD_COLORS[cardIdx];
              const style = getStackStyle(offset + 1);
              if (offset === 2) return null; // only show 2 behind
              return (
                <div
                  key={`stack-${cardIdx}`}
                  className="absolute w-full max-w-md rounded-3xl"
                  style={{
                    transform: `scale(${style.scale}) translateY(${style.y}px)`,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    height: '320px',
                    background: stackCol.bg,
                    border: `1px solid rgba(235,142,9,0.15)`,
                  }}
                />
              );
            })}

            {/* Active card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, y: direction * 80, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -direction * 80, scale: 0.94 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-full max-w-md rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
                style={{ zIndex: 10, background: col.bg, border: `1px solid rgba(235,142,9,0.25)` }}
              >
                {/* Top accent line */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${col.accent}, transparent)` }} />

                <div className="p-8 sm:p-10 flex flex-col justify-between h-[318px]">
                  {/* Roman numeral + progress dots */}
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display font-black text-6xl leading-none select-none"
                      style={{ color: col.sub, WebkitTextStroke: `1.5px ${col.accent}40` }}
                    >
                      {ROMAN[active]}
                    </span>
                    <div className="flex gap-1.5">
                      {statementOfFaith.map((_, i) => (
                        <div
                          key={i}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: i === active ? '20px' : '6px',
                            height: '6px',
                            background: i === active ? col.accent : 'rgba(255,255,255,0.2)',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Belief text */}
                  <div className="flex-grow flex items-center py-4">
                    <p
                      className="font-display font-semibold text-xl sm:text-2xl leading-snug"
                      style={{ color: col.text }}
                    >
                      {statementOfFaith[active]}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.25em]"
                      style={{ color: `${col.accent}80` }}
                    >
                      WHENMEN INC. · Doctrine
                    </span>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: `${col.accent}60` }}
                    >
                      {active + 1} / {total}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Swipe hint — shown once */}
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.2, repeat: 2 }}
                className="text-brand-gold-500/60"
              >
                <ChevronUp className="w-4 h-4" />
              </motion.div>
              <span className="text-[9px] text-brand-gold-500/50 uppercase tracking-widest">Swipe</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Remote control panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">Navigate Beliefs</p>

            {/* Remote device */}
            <div
              className="relative rounded-[2.5rem] p-6 flex flex-col items-center gap-5 shadow-2xl w-full max-w-[260px]"
              style={{
                background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)',
                border: '1px solid rgba(235,142,9,0.2)',
                boxShadow: '0 0 60px rgba(235,142,9,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Speaker grille top */}
              <div className="flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-3 bg-white/10 rounded-full" />
                ))}
              </div>

              {/* Screen */}
              <div
                className="w-full rounded-2xl overflow-hidden relative"
                style={{ background: '#0a0a0a', border: '1px solid rgba(235,142,9,0.15)', height: '90px' }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 text-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={active}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="font-display font-bold text-brand-gold-500 text-sm leading-tight line-clamp-3"
                    >
                      {ROMAN[active]}. {statementOfFaith[active].split(' ').slice(0, 6).join(' ')}…
                    </motion.span>
                  </AnimatePresence>
                </div>
                {/* screen scanline effect */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] pointer-events-none" />
              </div>

              {/* D-pad style nav */}
              <div className="grid grid-cols-3 gap-2 w-full">
                <div />
                <button
                  onClick={prev}
                  className="aspect-square rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer group"
                  style={{ background: 'rgba(235,142,9,0.12)', border: '1px solid rgba(235,142,9,0.25)' }}
                  aria-label="Previous belief"
                >
                  <ChevronUp className="w-5 h-5 text-brand-gold-500 group-hover:text-white transition-colors" />
                </button>
                <div />

                <button
                  onClick={() => goTo(0, -1)}
                  className="aspect-square rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer group"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  aria-label="First belief"
                >
                  <RotateCcw className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="aspect-square rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer"
                  style={{
                    background: isPlaying ? 'rgba(235,142,9,0.2)' : 'rgba(255,255,255,0.05)',
                    border: isPlaying ? '1px solid rgba(235,142,9,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying
                    ? <Pause className="w-4 h-4 text-brand-gold-500" />
                    : <Play className="w-4 h-4 text-gray-300 fill-gray-300" />
                  }
                </button>
                <div />

                <div />
                <button
                  onClick={next}
                  className="aspect-square rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer group"
                  style={{ background: 'rgba(235,142,9,0.12)', border: '1px solid rgba(235,142,9,0.25)' }}
                  aria-label="Next belief"
                >
                  <ChevronDown className="w-5 h-5 text-brand-gold-500 group-hover:text-white transition-colors" />
                </button>
                <div />
              </div>

              {/* Direct belief selector dots */}
              <div className="flex gap-2 flex-wrap justify-center">
                {statementOfFaith.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > active ? 1 : -1)}
                    className="rounded-full transition-all duration-200 cursor-pointer hover:scale-125"
                    style={{
                      width: i === active ? '24px' : '8px',
                      height: '8px',
                      background: i === active ? '#eb8e09' : 'rgba(255,255,255,0.2)',
                    }}
                    aria-label={`Go to belief ${i + 1}`}
                  />
                ))}
              </div>

              {/* Auto-play status */}
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: isPlaying ? '#22c55e' : '#6b7280', boxShadow: isPlaying ? '0 0 6px #22c55e' : 'none' }}
                />
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                  {isPlaying ? 'Auto' : 'Manual'}
                </span>
              </div>

              {/* Bottom speaker grille */}
              <div className="flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-3 bg-white/10 rounded-full" />
                ))}
              </div>
            </div>

            {/* Keyboard hint */}
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-[10px] uppercase tracking-widest">Keyboard</span>
              {['↑', '↓', 'Space'].map((k) => (
                <kbd key={k} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 border border-gray-200 font-mono text-gray-500">
                  {k}
                </kbd>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
