import React, { useState, useEffect, useRef } from 'react';
import { CreditCard, Heart, CheckCircle, Lock, ArrowRight, Star, Shield, Zap, Users, Building, TrendingUp, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { DONATION_TIERS, TESTIMONIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TIER_ICONS = [Heart, Users, Zap, Shield, Star];
const TIER_LABELS = ['Supporter', 'Partner', 'Champion', 'Pillar', 'Cornerstone'];

export default function Give() {
  const [giftType, setGiftType] = useState<'one-time' | 'monthly'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');
  const [formState, setFormData] = useState({ name: '', email: '', note: '' });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [addFees, setAddFees] = useState(true);
  const [giveSuccess, setGiveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBillingDetails, setShowBillingDetails] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  const [activeTierIdx, setActiveTierIdx] = useState(2); // default highlight $100

  const formRef = useRef<HTMLDivElement>(null);

  const activeAmount = selectedAmount === 'custom' ? Number(customAmount) || 0 : selectedAmount;
  const processedAmount = addFees ? Number((activeAmount * 1.03).toFixed(2)) : activeAmount;

  const activeTierData = DONATION_TIERS.find(t => t.amount === activeAmount);

  const handleGiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && activeAmount > 0) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setGiveSuccess(true); }, 1800);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleTierSelect = (amount: number, idx: number) => {
    setSelectedAmount(amount);
    setActiveTierIdx(idx);
    setGiftType('monthly');
  };

  // GSAP staggered stat counters
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-give-stat]',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-give-stats]', start: 'top 80%' }
        }
      );
      gsap.fromTo('[data-tier-card]',
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '[data-tiers-section]', start: 'top 75%' }
        }
      );
      gsap.fromTo('[data-other-way]',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '[data-other-ways]', start: 'top 80%' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div id="give-page-container" className="page-transition overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO (matches inner page style)
      ═══════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Generosity and stewardship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-brand-maroon-900/60 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(235,142,9,0.12)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5 pt-24 pb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-brand-gold-500 font-bold text-xs uppercase tracking-[0.3em] bg-brand-gold-500/10 border border-brand-gold-500/30 px-4 py-1.5 rounded-full"
          >
            Sacrificial Stewardship
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none"
          >
            Invest in<br /><span className="text-brand-gold-500">Transformed</span> Men.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Your generosity directly fuels daily prayers, prison reentry, family workshops, and the next generation of leaders.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
          >
            <button
              onClick={scrollToForm}
              className="group px-8 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold rounded-xl text-sm shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Give Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('builder-club')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm border border-white/25 hover:border-white/50 transition-all cursor-pointer backdrop-blur-sm"
            >
              Become a Monthly Partner
            </button>
          </motion.div>
        </div>

        {/* Wave clip into next section */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-10">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-[50px] fill-brand-dark-bg">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" />
          </svg>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — IMPACT STATS (dark, animated)
      ═══════════════════════════════════════════ */}
      <section data-give-stats className="py-20 bg-brand-dark-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(235,142,9,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/8">
            {[
              { value: '2,500+', label: 'Men Transformed', sub: 'through brotherhood' },
              { value: '150+', label: 'Families Restored', sub: 'marriage & family programs' },
              { value: '12+', label: 'Cities Reached', sub: 'active local chapters' },
              { value: '8', label: 'Prisons Visited', sub: 'reentry & mentorship' },
            ].map((stat, i) => (
              <div data-give-stat key={i} className="bg-brand-dark-bg/80 p-8 sm:p-10 text-center group hover:bg-white/3 transition-colors duration-300">
                <span className="block font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-gold-500 tracking-tight mb-2 group-hover:scale-110 transition-transform duration-300 origin-center">
                  {stat.value}
                </span>
                <span className="block font-display font-bold text-white text-sm uppercase tracking-wider mb-1">
                  {stat.label}
                </span>
                <span className="block text-gray-500 text-xs font-sans">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — IMPACT TIERS (visual cards)
      ═══════════════════════════════════════════ */}
      <section data-tiers-section className="py-28 bg-brand-neutral-bg relative overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(235,142,9,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(235,142,9,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-maroon-500 font-bold text-xs uppercase tracking-[0.2em] block mb-3"
            >
              Kingdom Dividends
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl text-brand-neutral-dark tracking-tight mb-4"
            >
              Choose Your Impact
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-base max-w-xl mx-auto"
            >
              Every level of generosity unlocks real, measurable transformation in men, families, and communities.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DONATION_TIERS.map((tier, idx) => {
              const Icon = TIER_ICONS[idx];
              const isActive = activeTierIdx === idx;
              return (
                <div
                  data-tier-card
                  key={idx}
                  onClick={() => handleTierSelect(tier.amount, idx)}
                  className={`relative group cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col border-2 ${
                    isActive
                      ? 'bg-brand-maroon-500 border-brand-maroon-500 text-white shadow-2xl shadow-brand-maroon-500/30 scale-105'
                      : 'bg-white border-gray-200 hover:border-brand-maroon-500/40 hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Selected
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isActive ? 'bg-white/20' : 'bg-brand-maroon-500/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-brand-maroon-500'}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                    {TIER_LABELS[idx]}
                  </span>
                  <span className={`font-display font-black text-3xl tracking-tight mb-3 ${isActive ? 'text-white' : 'text-brand-neutral-dark'}`}>
                    ${tier.amount}
                    <span className={`text-sm font-semibold ml-1 ${isActive ? 'text-white/60' : 'text-gray-400'}`}>/mo</span>
                  </span>
                  <p className={`text-xs leading-relaxed flex-grow ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                    {tier.impact}
                  </p>
                  <div className={`mt-4 pt-4 border-t text-xs font-bold flex items-center gap-1 ${
                    isActive ? 'border-white/20 text-white' : 'border-gray-100 text-brand-maroon-500'
                  }`}>
                    Select this tier
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-maroon-500 transition-colors cursor-pointer"
            >
              Or choose a custom amount below
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — BROTHERHOOD BUILDER CLUB
      ═══════════════════════════════════════════ */}
      <section id="builder-club" className="py-0 bg-brand-dark-bg relative overflow-hidden">
        {/* Top angled divider */}
        <div className="h-20 bg-brand-neutral-bg clip-path-[polygon(0_0,100%_0,100%_100%,0_0)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />

        <div className="max-w-6xl mx-auto px-6 py-20 relative">
          {/* Decorative gold ring */}
          <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] rounded-full border border-brand-gold-500/10 pointer-events-none" />
          <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[350px] h-[350px] rounded-full border border-brand-gold-500/15 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <span className="text-brand-gold-500 text-xs font-bold uppercase tracking-[0.25em] block mb-3">
                  Sustaining Covenant Circle
                </span>
                <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                  The Brotherhood<br />
                  <span className="text-brand-gold-500">Builder Club</span>
                </h2>
              </div>
              <p className="text-gray-300 text-base leading-relaxed font-light">
                Monthly partners are the backbone of our mission. Your consistent support builds the predictable budget that lets us plan chapters, fund prison visits, and launch youth programs without interruption.
              </p>

              <div className="space-y-3">
                {[
                  'Exclusive quarterly video check-ins from Pastor Lani Akinyode',
                  'Priority access to men\'s retreats and outdoor camps',
                  'Annual custom WHENMEN prayer leather journal, shipped to you',
                  'Named in our Annual Stewardship Report (unless anonymous)',
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-gold-500/20 border border-brand-gold-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-brand-gold-500" />
                    </div>
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => { setGiftType('monthly'); setSelectedAmount(100); setActiveTierIdx(2); scrollToForm(); }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl shadow-brand-gold-500/25 cursor-pointer"
              >
                Join the Builder Club
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Right: testimonial card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
                <div className="text-brand-gold-500 font-serif text-7xl leading-none opacity-40 select-none">"</div>
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed italic font-light -mt-4">
                  {TESTIMONIALS[0].text}
                </p>
                <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-brand-gold-500/20 border border-brand-gold-500/30 flex items-center justify-center text-brand-gold-500 font-display font-black text-sm">
                    {TESTIMONIALS[0].name.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-display font-bold text-white text-sm">{TESTIMONIALS[0].name}</span>
                    <span className="block text-xs text-gray-500">{TESTIMONIALS[0].location} · Brotherhood Member</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom angled divider out */}
        <div className="h-20 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — THE GIVING FORM (2-col)
      ═══════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-maroon-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-extrabold text-4xl sm:text-5xl text-brand-neutral-dark tracking-tight"
            >
              Make Your Gift
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-16 h-1 bg-brand-gold-500 mx-auto mt-4 rounded-full origin-left"
            />
          </div>

          <div ref={formRef}>
            <AnimatePresence mode="wait">
              {giveSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-lg mx-auto bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-xl space-y-5"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-brand-neutral-dark">Thank You, Brother!</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                    Your secure gift of <strong className="text-brand-neutral-dark">${processedAmount}</strong> has been received. A tax-deductible receipt is on its way to <strong>{formState.email}</strong>.
                  </p>
                  <div className="font-mono text-[11px] text-gray-400 bg-gray-50 px-4 py-2 rounded-lg inline-block">
                    REF: WM-{Math.floor(Math.random() * 900000) + 100000}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                >
                  {/* LEFT COL: Amount + Frequency */}
                  <div className="bg-brand-neutral-bg rounded-3xl p-8 space-y-7 border border-gray-100">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Gift Frequency</p>
                      <div className="grid grid-cols-2 gap-2 bg-white p-1 rounded-xl border border-gray-200">
                        {(['one-time', 'monthly'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setGiftType(type)}
                            className={`py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                              giftType === type
                                ? 'bg-brand-maroon-500 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            {type === 'one-time' ? 'One-Time Gift' : 'Monthly Partner'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Select Amount</p>
                      <div className="grid grid-cols-3 gap-2.5">
                        {[25, 50, 100, 250, 500].map((val) => (
                          <button
                            type="button"
                            key={val}
                            onClick={() => { setSelectedAmount(val); setActiveTierIdx(DONATION_TIERS.findIndex(t => t.amount === val)); }}
                            className={`py-3.5 rounded-xl border-2 text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                              selectedAmount === val
                                ? 'bg-brand-maroon-500 text-white border-brand-maroon-500 shadow-md'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-maroon-500/40 hover:-translate-y-0.5'
                            }`}
                          >
                            ${val}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setSelectedAmount('custom')}
                          className={`py-3.5 rounded-xl border-2 text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                            selectedAmount === 'custom'
                              ? 'bg-brand-maroon-500 text-white border-brand-maroon-500 shadow-md'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-brand-maroon-500/40 hover:-translate-y-0.5'
                          }`}
                        >
                          Custom
                        </button>
                      </div>

                      <AnimatePresence>
                        {selectedAmount === 'custom' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-3"
                          >
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                              <input
                                type="number"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 focus:border-brand-maroon-500 rounded-xl text-sm bg-white focus:outline-none transition-colors"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Impact callout — live updates */}
                    <AnimatePresence mode="wait">
                      {activeTierData && selectedAmount !== 'custom' && (
                        <motion.div
                          key={String(activeAmount)}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="bg-brand-maroon-500/8 border border-brand-maroon-500/20 rounded-xl p-4 flex gap-3 items-start"
                        >
                          <Zap className="w-4 h-4 text-brand-maroon-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-gray-600 leading-relaxed">
                            <strong className="text-brand-maroon-500">${activeAmount}/month</strong> — {activeTierData.impact}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-2 text-xs text-gray-400 pt-2">
                      <Lock className="w-3.5 h-3.5 text-brand-gold-500" />
                      <span>256-bit SSL encrypted · 501(c)(3) tax-deductible</span>
                    </div>
                  </div>

                  {/* RIGHT COL: Donor info + Payment */}
                  <form onSubmit={handleGiveSubmit} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg space-y-5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormData({ ...formState, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-maroon-500 text-sm bg-white focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormData({ ...formState, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-maroon-500 text-sm bg-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Billing details accordion */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setShowBillingDetails(!showBillingDetails)}
                        className="flex items-center justify-between w-full text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-600 transition-colors"
                      >
                        <span>Billing Address (for mailed tax receipt)</span>
                        {showBillingDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      <AnimatePresence>
                        {showBillingDetails && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-2"
                          >
                            <input
                              type="text"
                              value={billingAddress}
                              onChange={(e) => setBillingAddress(e.target.value)}
                              placeholder="Street, City, State, ZIP"
                              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-maroon-500 text-sm bg-white focus:outline-none transition-colors"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Payment method */}
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Method</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'card', label: 'Card' },
                          { id: 'paypal', label: 'PayPal' },
                          { id: 'bank', label: 'Bank' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPaymentMethod(m.id as any)}
                            className={`py-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                              paymentMethod === m.id
                                ? 'bg-brand-neutral-dark text-white border-brand-neutral-dark'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                      <AnimatePresence mode="wait">
                        {paymentMethod === 'card' && (
                          <motion.div
                            key="card"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="mt-3 space-y-2.5"
                          >
                            <div className="relative">
                              <CreditCard className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-300" />
                              <input type="text" placeholder="•••• •••• •••• ••••" className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-maroon-500 font-mono bg-white transition-colors" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input type="text" placeholder="MM / YY" className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-maroon-500 font-mono bg-white transition-colors" />
                              <input type="password" placeholder="CVC" className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-maroon-500 font-mono bg-white transition-colors" />
                            </div>
                          </motion.div>
                        )}
                        {paymentMethod === 'paypal' && (
                          <motion.div key="paypal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 bg-blue-50 rounded-xl p-4 text-center text-xs text-blue-700">
                            You'll be redirected to PayPal to complete your gift securely.
                          </motion.div>
                        )}
                        {paymentMethod === 'bank' && (
                          <motion.div key="bank" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 bg-gray-50 rounded-xl p-4 text-xs text-gray-600 space-y-1">
                            <p className="font-bold">Bank Transfer Details</p>
                            <p>Bank of America · Routing ••••• · Account •••••</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Dedication note */}
                    <input
                      type="text"
                      value={formState.note}
                      onChange={(e) => setFormData({ ...formState, note: e.target.value })}
                      placeholder="Dedication (optional) — e.g. In honor of my father"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-maroon-500 text-sm bg-white focus:outline-none transition-colors"
                    />

                    {/* Options */}
                    <div className="space-y-2">
                      {[
                        { state: isAnonymous, set: setIsAnonymous, label: 'Keep this gift anonymous' },
                        { state: addFees, set: setAddFees, label: `Cover processing fees (+$${(activeAmount * 0.03).toFixed(2)})` },
                      ].map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors select-none">
                          <div
                            onClick={() => opt.set(!opt.state)}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                              opt.state ? 'bg-brand-maroon-500 border-brand-maroon-500' : 'border-gray-300'
                            }`}
                          >
                            {opt.state && <CheckCircle className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{opt.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || activeAmount === 0}
                      className="w-full py-4 bg-brand-maroon-500 hover:bg-brand-maroon-600 disabled:bg-gray-300 text-white font-bold rounded-xl text-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-brand-maroon-500/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-brand-gold-500 shrink-0" />
                          Give Securely · ${processedAmount}{giftType === 'monthly' ? '/mo' : ''}
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 leading-relaxed">
                      WHENMEN INC. is a registered 501(c)(3) · EIN: XX-XXXXXXX · All gifts tax-deductible
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — OTHER WAYS TO GIVE
      ═══════════════════════════════════════════ */}
      <section data-other-ways className="py-24 bg-brand-neutral-bg">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-[0.2em] block mb-3">Amplified Sowing</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-neutral-dark tracking-tight">More Ways to Invest</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Mail, title: 'Check by Mail', detail: 'Payable to WHENMEN INC., Dallas, TX. Note any designation in memo.' },
              { icon: TrendingUp, title: 'Stock & Securities', detail: 'Transfer equity portfolios directly. Contact us for broker wire instructions.' },
              { icon: Building, title: 'In-Kind Donations', detail: 'Supplies, equipment, facility space, or services. Reach out for our needs list.' },
              { icon: Heart, title: 'Planned Giving', detail: 'Include WHENMEN in your estate, will, or trust to build a multi-generational legacy.' },
            ].map((way, i) => {
              const Icon = way.icon;
              return (
                <div
                  data-other-way
                  key={i}
                  className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-brand-maroon-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4"
                >
                  <div className="w-11 h-11 bg-brand-maroon-500/8 rounded-xl flex items-center justify-center group-hover:bg-brand-maroon-500 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-brand-maroon-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-brand-neutral-dark mb-1.5 group-hover:text-brand-maroon-500 transition-colors">
                      {way.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{way.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — TRUST STRIP
      ═══════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-14 bg-white border-t border-gray-100"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14">
            {[
              { icon: Lock, label: '256-bit SSL Secure' },
              { icon: CheckCircle, label: '501(c)(3) Certified' },
              { icon: Shield, label: 'Tax-Deductible Gifts' },
              { icon: Heart, label: 'Donor Privacy Protected' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 text-gray-400">
                  <Icon className="w-4 h-4 text-brand-gold-500" />
                  <span className="text-xs font-semibold">{item.label}</span>
                </div>
              );
            })}
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-8 max-w-xl mx-auto leading-relaxed">
            WHENMEN INC. never sells, trades, or shares donor information with third parties. 
            Bank-level encryption is applied to all transactions. 
            Recurring gifts can be modified or cancelled at any time.
          </p>
        </div>
      </motion.section>

    </div>
  );
}
