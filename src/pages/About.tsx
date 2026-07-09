import React from 'react';
import { Shield, BookOpen, UserCheck, Scale, Heart, FileText, Gift, HeartHandshake } from 'lucide-react';
import { TEAM_MEMBERS, CORE_VALUES } from '../data';
import { motion } from 'motion/react';

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
      {/* SECTION 1: PAGE HERO */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="about-hero" 
        className="bg-brand-dark-bg text-white py-24 relative overflow-hidden text-center"
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Mountain peaks of endurance"
            className="w-full h-full object-cover opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
            OUR IDENTITY
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            About WHENMEN INC.
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A brotherhood committed to raising men who transform generations.
          </p>
        </div>
      </motion.section>

      {/* SECTION 2: OUR STORY / ORIGIN */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="about-origin" 
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-6">
              <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
                How It Started
              </span>
              <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
                OUR STORY & ORIGIN
              </h2>
              <div className="w-12 h-1 bg-brand-gold-500 rounded-full"></div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                <p>
                  Our founder felt a burning burden for men who were spiritually asleep, emotionally wounded, and disconnected from purpose.
                </p>
                <p>
                  In <span className="font-semibold text-brand-maroon-500">2024</span>, a small group of men gathered in a simple living room to pray. That humble prayer meeting quickly became a fire, and that fire became a nationwide movement.
                </p>
                <p>
                  Today, WHENMEN INC. reaches across cities, prisons, and generations—because we believe that one single transformed man becomes a powerful, positive catalyst for transformed families.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-4 bg-brand-neutral-bg p-6 rounded-2xl border border-gray-200 text-center space-y-4">
              <div className="w-20 h-20 bg-brand-maroon-500 text-white rounded-full flex items-center justify-center mx-auto border border-brand-gold-500/20">
                <Shield className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-brand-neutral-dark">Pastor John Doe</h4>
                <p className="text-xs text-brand-maroon-500">Founder & President</p>
              </div>
              <p className="text-xs text-gray-500 italic">
                "A transformed husband and father changes the entire trajectory of his bloodline."
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3 & 4: VISION & MISSION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="about-vision-mission" 
        className="py-20 bg-brand-neutral-bg border-t border-b border-gray-150"
      >
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-brand-maroon-500/10 text-brand-maroon-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-2xl text-brand-neutral-dark tracking-tight">
              OUR VISION
            </h3>
            <div className="w-10 h-0.5 bg-brand-gold-500 rounded-full"></div>
            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-brand-maroon-500 italic">
                To raise a generation of men who passionately pursue God, lead their families with integrity, impact their communities with love, and leave a legacy that glorifies Christ.
              </p>
              <p>
                We envision a world where men are spiritually awakened, emotionally healthy, financially responsible, and actively serving as leaders in their homes, churches, workplaces, and communities.
              </p>
            </div>
          </div>

          {/* Mission card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-brand-maroon-500/10 text-brand-maroon-500 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-2xl text-brand-neutral-dark tracking-tight">
              OUR MISSION
            </h3>
            <div className="w-10 h-0.5 bg-brand-gold-500 rounded-full"></div>
            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-brand-maroon-500 italic">
                WHENMEN INC. exists to restore, equip, empower, and mobilize men through prayer, worship, discipleship, mentorship, fellowship, and community outreach.
              </p>
              <p>
                Our mission is to create a safe place where men can be vulnerable without judgment, encounter God deeply, heal from life's struggles, discover purpose, and become better husbands, fathers, sons, brothers, and leaders.
              </p>
              <p>
                We believe that when men are transformed, families are strengthened, communities are impacted, and generations are changed.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5 & 6: STATEMENT OF FAITH */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="about-statement-of-faith" 
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Doctrine & Foundations
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              Statement of Faith
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-sm max-w-xl mx-auto mt-2">
              Our core beliefs guide every resource we write, every prayer we make, and every sermon we preach.
            </p>
          </div>

          <div className="bg-brand-neutral-bg border border-gray-200 rounded-2xl p-6 sm:p-8 divide-y divide-gray-200/60 shadow-sm">
            {statementOfFaith.map((belief, idx) => (
              <div key={idx} className="py-4.5 first:pt-0 last:pb-0 flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-maroon-500 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 select-none">
                  {idx + 1}
                </div>
                <p className="font-sans font-medium text-gray-700 text-sm sm:text-base">
                  {belief}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 7: OUR CORE VALUES */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="about-core-values" 
        className="py-20 bg-brand-neutral-bg border-t border-b border-gray-150"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              How We Live
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              Our Core Values
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between group hover:border-brand-maroon-500/20 hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-10 h-10 bg-brand-maroon-500/10 text-brand-maroon-500 rounded-lg flex items-center justify-center mb-4 text-xl group-hover:bg-brand-maroon-500 group-hover:text-white transition-all select-none">
                    {val.emoji}
                  </div>
                  <h4 className="font-display font-bold text-base text-brand-neutral-dark mb-2">
                    {val.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 8: LEADERSHIP TEAM */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="about-team" 
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Governance & Oversight
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              Leadership Team
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Godly stewardship requires active oversight. Meet our board of directors and executive leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-brand-neutral-bg border border-gray-200 p-6 rounded-2xl text-center space-y-4 shadow-sm"
              >
                <div className="w-20 h-20 bg-brand-maroon-500/15 border-2 border-brand-maroon-500 text-brand-maroon-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-display font-black text-2xl select-none">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-brand-neutral-dark">
                    {member.name}
                  </h4>
                  <p className="text-xs text-brand-maroon-500 font-bold uppercase tracking-wider">
                    {member.title}
                  </p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 9: FINANCIAL TRANSPARENCY */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="about-financial-transparency" 
        className="py-20 bg-brand-neutral-bg border-t border-gray-150"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
            <div className="text-center space-y-3">
              <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
                Stewardship & Accountability
              </span>
              <h3 className="font-display font-black text-2xl text-brand-neutral-dark">
                FINANCIAL TRANSPARENCY
              </h3>
              <div className="w-10 h-0.5 bg-brand-gold-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4 text-center max-w-2xl mx-auto text-gray-600 text-sm leading-relaxed">
              <p>
                As a registered 501(c)(3) nonprofit organization (EIN: <span className="font-semibold text-brand-neutral-dark">XX-XXXXXXX</span>), we are deeply committed to financial integrity, absolute transparency, and faithful stewardship of every kingdom dollar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4">
              <a
                href="/resources"
                className="p-4 bg-brand-neutral-bg border border-gray-200 rounded-xl hover:border-brand-maroon-500 text-center font-bold text-sm text-brand-maroon-500 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-brand-gold-500" />
                View Our Annual Report
              </a>
              <a
                href="/resources"
                className="p-4 bg-brand-neutral-bg border border-gray-200 rounded-xl hover:border-brand-maroon-500 text-center font-bold text-sm text-brand-maroon-500 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-brand-gold-500" />
                View Our 990 IRS Form
              </a>
            </div>

            {/* Quote of Cheerful Giver */}
            <div className="border-t border-gray-100 pt-8 text-center max-w-xl mx-auto">
              <p className="font-display font-semibold italic text-gray-500 text-sm">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </p>
              <span className="block text-xs font-bold text-brand-gold-700 mt-2">
                — 2 Corinthians 9:7
              </span>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
