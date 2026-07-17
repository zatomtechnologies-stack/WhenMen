import React from 'react';
import { Shield, BookOpen, UserCheck, FileText } from 'lucide-react';
import { TEAM_MEMBERS, CORE_VALUES } from '../data';
import { motion } from 'motion/react';
import StatementOfFaithSection from '../components/StatementOfFaithSection';

export default function About() {
  const statementOfFaith = [
    'We believe in the Holy Trinity: Father, Son, and Holy Spirit.',
    'We believe the Bible is the inspired, infallible Word of God.',
    'We believe salvation comes through faith in Jesus Christ alone.',
    'We believe in the power of prayer and the transforming work of the Holy Spirit.',
    'We believe men are called to spiritual leadership in their homes and communities.',
    'We believe in the unity of all believers across denominations and backgrounds.'
  ];

  return (
    <div id="about-page-container" className="page-transition">

      {/* ─── SECTION 1: HERO — full-bleed image + dark overlay ─── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="about-hero"
        className="relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Mountain peaks of endurance"
            className="w-full h-full object-cover"
          />
          {/* layered gradient: dark top, brand colour mid, full black bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-brand-maroon-900/60 to-black/90" />
          {/* radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(235,142,9,0.12)_0%,transparent_70%)]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-5 pt-24 pb-20">
          <span className="inline-block text-brand-gold-500 font-bold text-xs uppercase tracking-[0.3em] bg-brand-gold-500/10 border border-brand-gold-500/30 px-4 py-1.5 rounded-full">
            OUR IDENTITY
          </span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none">
            About<br /><span className="text-brand-gold-500">WHENMEN</span> INC.
          </h1>
          <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A brotherhood committed to raising men who transform generations.
          </p>
        </div>
        {/* wave clip into next section */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-10">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-[50px] fill-white">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" />
          </svg>
        </div>
      </motion.section>

      {/* ─── SECTION 2: OUR STORY — clean white + large quote pull ─── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        id="about-origin"
        className="py-28 bg-white relative overflow-hidden"
      >
        {/* subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(235,142,9,0.06)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
                How It Started
              </span>
              <h2 className="font-display font-extrabold text-4xl text-brand-neutral-dark tracking-tight">
                OUR STORY & ORIGIN
              </h2>
              <div className="w-16 h-1 bg-brand-gold-500 rounded-full" />
              <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                <p>
                  Our founder felt a burning burden for men who were spiritually asleep, emotionally wounded, and disconnected from purpose.
                </p>
                <p>
                  In <span className="font-semibold text-brand-maroon-500">2024</span>, a small group of men gathered in a simple living room to pray. That humble prayer meeting quickly became a fire, and that fire became a nationwide movement.
                </p>
                <p>
                  Today, WHENMEN INC. reaches across cities, prisons, and generations — because we believe that one transformed man becomes a powerful catalyst for transformed families.
                </p>
              </div>
            </div>
            {/* founder card — glassmorphism on light */}
            <div className="md:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-maroon-500 to-brand-maroon-900 p-8 text-white text-center space-y-4 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(235,142,9,0.2),transparent_60%)]" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-brand-gold-500/20 border-2 border-brand-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-brand-gold-500" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Pastor Lani Akinyode</h4>
                  <p className="text-xs text-brand-gold-500 font-bold uppercase tracking-wider">Founder & President</p>
                  <div className="w-8 h-0.5 bg-brand-gold-500/50 mx-auto my-4 rounded-full" />
                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    "A transformed husband and father changes the entire trajectory of his bloodline."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── SECTION 3: VISION & MISSION — deep dark mesh gradient ─── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        id="about-vision-mission"
        className="relative py-28 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d0d0d 0%, #1a0a00 40%, #2a1500 70%, #0d0d0d 100%)'
        }}
      >
        {/* mesh radial glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-gold-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-maroon-500/15 rounded-full blur-[100px] pointer-events-none" />
        {/* noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '200px' }}
        />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-[0.3em]">Purpose & Direction</span>
            <h2 className="font-display font-extrabold text-4xl text-white mt-3 tracking-tight">Vision & Mission</h2>
            <div className="w-12 h-0.5 bg-brand-gold-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                label: 'OUR VISION',
                headline: 'To raise a generation of men who passionately pursue God, lead their families with integrity, and leave a legacy that glorifies Christ.',
                body: 'We envision a world where men are spiritually awakened, emotionally healthy, financially responsible, and actively serving as leaders in their homes, churches, workplaces, and communities.'
              },
              {
                icon: <UserCheck className="w-6 h-6" />,
                label: 'OUR MISSION',
                headline: 'WHENMEN INC. exists to restore, equip, empower, and mobilize men through prayer, worship, discipleship, mentorship, and community outreach.',
                body: 'We create a safe place where men can be vulnerable without judgment, encounter God deeply, heal from life\'s struggles, discover purpose, and become better husbands, fathers, sons, brothers, and leaders.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative rounded-2xl p-8 space-y-4 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(235,142,9,0.15)' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-500/5 rounded-full blur-3xl" />
                <div className="w-12 h-12 bg-brand-gold-500/15 border border-brand-gold-500/30 rounded-xl flex items-center justify-center text-brand-gold-500">
                  {item.icon}
                </div>
                <p className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest">{item.label}</p>
                <h3 className="font-display font-bold text-xl text-white leading-snug">{item.headline}</h3>
                <div className="w-8 h-0.5 bg-brand-gold-500/40 rounded-full" />
                <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* angled clip into next */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-10">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block w-full h-[40px] fill-white">
            <polygon points="0,60 1200,0 1200,60" />
          </svg>
        </div>
      </motion.section>

      {/* ─── SECTION 4: STATEMENT OF FAITH — Stacked Card Deck + Remote ─── */}
      <StatementOfFaithSection statementOfFaith={statementOfFaith} />

      {/* ─── SECTION 5: CORE VALUES — warm gradient background ─── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        id="about-core-values"
        className="relative py-28 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #fff8ed 0%, #fff3da 50%, #ffefd0 100%)' }}
      >
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-brand-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-3 mb-16">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">How We Live</span>
            <h2 className="font-display font-extrabold text-4xl text-brand-neutral-dark tracking-tight">Our Core Values</h2>
            <div className="w-12 h-1 bg-brand-maroon-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {CORE_VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-brand-gold-500/20 shadow-sm flex flex-col gap-3 group hover:-translate-y-2 hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-maroon-500/10 text-brand-maroon-500 rounded-xl flex items-center justify-center text-2xl group-hover:bg-brand-maroon-500 group-hover:text-white transition-all select-none">
                  {val.emoji}
                </div>
                <h4 className="font-display font-bold text-base text-brand-neutral-dark">{val.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── SECTION 6: LEADERSHIP TEAM — dark section with image bg ─── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        id="about-team"
        className="relative py-28 overflow-hidden bg-brand-dark-bg"
      >
        {/* background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Leadership team background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-bg/80 via-brand-dark-bg/60 to-brand-dark-bg" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(235,142,9,0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-3 mb-16">
            <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">Governance & Oversight</span>
            <h2 className="font-display font-extrabold text-4xl text-white tracking-tight">Leadership Team</h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full" />
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Godly stewardship requires active oversight. Meet our board of directors and executive leaders.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl p-6 text-center space-y-4 overflow-hidden group"
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(235,142,9,0.12)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-20 h-20 bg-brand-gold-500/15 border-2 border-brand-gold-500/50 text-brand-gold-500 rounded-full flex items-center justify-center mx-auto relative z-10">
                  <span className="font-display font-black text-2xl select-none">
                    {member.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-display font-extrabold text-lg text-white">{member.name}</h4>
                  <p className="text-xs text-brand-gold-500 font-bold uppercase tracking-wider">{member.title}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans relative z-10">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* wave into next */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-10">
          <svg viewBox="0 0 1200 70" preserveAspectRatio="none" className="block w-full h-[45px]" style={{ fill: '#fff8ed' }}>
            <path d="M0,35 C400,70 800,0 1200,35 L1200,70 L0,70 Z" />
          </svg>
        </div>
      </motion.section>

      {/* ─── SECTION 7: FINANCIAL TRANSPARENCY — warm neutral + centered card ─── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        id="about-financial-transparency"
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #fff8ed 0%, #ffefd0 100%)' }}
      >
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-maroon-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-14 space-y-8 border border-brand-gold-500/15">
            <div className="text-center space-y-3">
              <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">Stewardship & Accountability</span>
              <h3 className="font-display font-black text-3xl text-brand-neutral-dark">FINANCIAL TRANSPARENCY</h3>
              <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full" />
            </div>
            <p className="text-gray-600 text-center text-sm leading-relaxed max-w-2xl mx-auto">
              As a registered 501(c)(3) nonprofit organization (EIN: <span className="font-semibold text-brand-neutral-dark">XX-XXXXXXX</span>), we are deeply committed to financial integrity, absolute transparency, and faithful stewardship of every kingdom dollar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              {[
                { label: 'View Our Annual Report' },
                { label: 'View Our 990 IRS Form' },
              ].map((doc) => (
                <a
                  key={doc.label}
                  href="/resources"
                  className="p-4 bg-brand-neutral-bg border border-brand-gold-500/20 rounded-xl hover:border-brand-maroon-500 hover:shadow-md text-center font-bold text-sm text-brand-maroon-500 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-brand-gold-500" />
                  {doc.label}
                </a>
              ))}
            </div>
            <div className="pt-4 text-center max-w-xl mx-auto space-y-2">
              <p className="font-display font-semibold italic text-gray-500 text-sm">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </p>
              <span className="block text-xs font-bold text-brand-gold-700">— 2 Corinthians 9:7</span>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
