import React, { useState, useEffect } from 'react';
import { Shield, Search, CheckCircle, Table, Landmark, FileCheck, ArrowRight, UserCheck, HelpCircle } from 'lucide-react';
import { VOLUNTEER_ROLES } from '../data';
import { motion } from 'motion/react';

interface JoinProps {
  currentPath?: string;
}

export default function Join({ currentPath }: JoinProps = {}) {
  const [citySearch, setCitySearch] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [membershipForm, setMembershipForm] = useState({
    name: '', email: '', phone: '', cityState: '', ageRange: '26-35',
    interests: [] as string[], source: 'Friend', message: ''
  });
  const [membershipSuccess, setMembershipSuccess] = useState(false);
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [chapterFormSuccess, setChapterFormSuccess] = useState(false);

  useEffect(() => {
    const search = currentPath ? currentPath.split('?')[1] || '' : window.location.search;
    const params = new URLSearchParams(search);
    const interestParam = params.get('interest');
    const programParam = params.get('program');

    const paramValue = interestParam || programParam;
    if (paramValue) {
      const decoded = decodeURIComponent(paramValue).toLowerCase().trim();
      
      const programMapping: Record<string, string> = {
        'prayer': 'Daily Prayer Gatherings',
        'daily prayer gatherings': 'Daily Prayer Gatherings',
        'worship': 'WHENMEN Worship',
        'whenmen worship': 'WHENMEN Worship',
        'mentorship': 'Mentorship & Discipleship',
        'mentorship & discipleship': 'Mentorship & Discipleship',
        'family': 'Marriage & Family Enrichment',
        'marriage & family enrichment': 'Marriage & Family Enrichment',
        'outreach': 'Community Outreach',
        'community outreach': 'Community Outreach',
        'leadership': 'Leadership Development',
        'leadership development': 'Leadership Development',
        'prison': 'Prison & Reentry Support',
        'prison & reentry support': 'Prison & Reentry Support',
        'youth': 'Youth & Next Generation',
        'youth & next generation': 'Youth & Next Generation',
        'nextgen': 'Youth & Next Generation'
      };

      const matchedInterest = programMapping[decoded] || 
        Object.values(programMapping).find(v => v.toLowerCase() === decoded);

      if (matchedInterest) {
        setMembershipForm(prev => {
          if (!prev.interests.includes(matchedInterest)) {
            return {
              ...prev,
              interests: [...prev.interests, matchedInterest]
            };
          }
          return prev;
        });

        setTimeout(() => {
          const element = document.getElementById('join-membership');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    }
  }, [currentPath]);

  const initialChapters = [
    { city: 'Dallas, TX', type: 'Weekly Prayer + Monthly Worship' },
    { city: 'Houston, TX', type: 'Weekly Prayer + Bi-Monthly Outreach' },
    { city: 'Atlanta, GA', type: 'Weekly Prayer + Quarterly Workshop' },
    { city: 'Online Only', type: 'Daily Zoom Prayer + Virtual Events' }
  ];

  const filteredChapters = initialChapters.filter(c =>
    c.city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleInterestChange = (interest: string) => {
    setMembershipForm(prev => {
      const isSelected = prev.interests.includes(interest);
      const newInterests = isSelected
        ? prev.interests.filter(item => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleMembershipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (membershipForm.name && membershipForm.email && membershipForm.cityState) {
      setMembershipSuccess(true);
      setTimeout(() => {
        setMembershipForm({
          name: '', email: '', phone: '', cityState: '', ageRange: '26-35',
          interests: [], source: 'Friend', message: ''
        });
        setMembershipSuccess(false);
      }, 5000);
    }
  };

  return (
    <div id="join-page-container" className="page-transition">
      {/* SECTION 1: HERO */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-brand-dark-bg text-white py-24 relative overflow-hidden text-center"
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Outdoor group of brothers locking shields"
            className="w-full h-full object-cover opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
            LOCK SHIELDS
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Join the Movement
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Whether you are searching for hope, healing, purpose, or a deeper brotherhood, there is a physical or virtual place for you.
          </p>
        </div>
      </motion.section>

      {/* SECTION 2: FIND A GATHERING */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="join-find-gathering" 
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Local Chapters & Hubs
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              Find a Chapter
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-sm">
              Search by City, State or type "Online" to see local coordinates.
            </p>
          </div>

          {/* Chapter Search Bar */}
          <div className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Dallas, Houston, Online..."
                value={citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setSearchTriggered(true);
                }}
                className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
              />
            </div>
            <button
              onClick={() => setSearchTriggered(true)}
              className="px-6 py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-sm transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Search Results */}
          <div className="bg-brand-neutral-bg border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h4 className="font-display font-bold text-base text-brand-neutral-dark mb-4 border-b border-gray-200/80 pb-2">
              Active Regional Nodes
            </h4>
            <div className="divide-y divide-gray-200/60">
              {(searchTriggered ? filteredChapters : initialChapters).map((chapter, i) => (
                <div key={i} className="py-4.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <span className="block font-display font-extrabold text-brand-neutral-dark text-base">
                      {chapter.city}
                    </span>
                    <span className="text-xs text-brand-maroon-500 font-medium">
                      Pillars: {chapter.type}
                    </span>
                  </div>
                  <a
                    href="/contact"
                    className="text-xs font-bold text-brand-gold-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Contact Coordinator
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
              {(searchTriggered && filteredChapters.length === 0) && (
                <div className="text-center py-6 text-xs text-gray-500 font-semibold italic">
                  No active chapter found in your area yet. Read further below to start one!
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: MEMBERSHIP SIGN-UP FORM */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="join-membership" 
        className="py-20 bg-brand-neutral-bg relative overflow-hidden bg-[radial-gradient(rgba(128,0,32,0.035)_1.5px,transparent_1.5px)] bg-[size:24px_24px]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-neutral-bg via-transparent to-brand-neutral-bg pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
            <div className="text-center space-y-2">
              <UserCheck className="w-10 h-10 text-brand-maroon-500 mx-auto" />
              <h3 className="font-display font-black text-2xl text-brand-neutral-dark">
                MEMBERSHIP SIGN-UP
              </h3>
              <div className="w-10 h-0.5 bg-brand-gold-500 mx-auto rounded-full"></div>
              <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-md mx-auto">
                Commit to the covenant of brotherhood. Submitting this joins you into the WhenMen roster and triggers a welcome email packs containing prayer outlines.
              </p>
            </div>

            {membershipSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-display font-bold text-lg text-emerald-900">Welcome to the Brotherhood!</h4>
                <p className="text-xs max-w-sm mx-auto leading-relaxed">
                  Confirmation successfully stored. Welcome email via Resend API mock generated. We are praying for you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMembershipSubmit} className="space-y-6 font-sans">
                {/* Name, Email, Phone, City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={membershipForm.name}
                      onChange={(e) => setMembershipForm({ ...membershipForm, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={membershipForm.email}
                      onChange={(e) => setMembershipForm({ ...membershipForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={membershipForm.phone}
                      onChange={(e) => setMembershipForm({ ...membershipForm, phone: e.target.value })}
                      placeholder="(555) 555-5555"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">City/State *</label>
                    <input
                      type="text"
                      required
                      value={membershipForm.cityState}
                      onChange={(e) => setMembershipForm({ ...membershipForm, cityState: e.target.value })}
                      placeholder="e.g. Dallas, TX"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                    />
                  </div>
                </div>

                {/* Age & Source */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Age Range *</label>
                    <select
                      value={membershipForm.ageRange}
                      onChange={(e) => setMembershipForm({ ...membershipForm, ageRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                    >
                      {['18-25', '26-35', '36-45', '46-55', '56+'].map(age => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">How did you hear about us?</label>
                    <select
                      value={membershipForm.source}
                      onChange={(e) => setMembershipForm({ ...membershipForm, source: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                    >
                      {['Friend / Word of Mouth', 'Social Media', 'Church Partner', 'Web Search', 'Other'].map(src => (
                        <option key={src} value={src}>{src}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Checkboxes: Areas of Interest */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Areas of Interest (Check all that apply) *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      'Daily Prayer Gatherings',
                      'WHENMEN Worship',
                      'Mentorship & Discipleship',
                      'Marriage & Family Enrichment',
                      'Community Outreach',
                      'Leadership Development',
                      'Prison & Reentry Support',
                      'Youth & Next Generation'
                    ].map((interest) => (
                      <label key={interest} className="flex items-center gap-2 border border-gray-200/80 p-2.5 rounded-lg bg-gray-50 hover:bg-white cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={membershipForm.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="accent-brand-maroon-500 w-4 h-4 shrink-0"
                        />
                        <span className="text-gray-700 font-medium">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Prayer Request / Message</label>
                  <textarea
                    rows={3}
                    value={membershipForm.message}
                    onChange={(e) => setMembershipForm({ ...membershipForm, message: e.target.value })}
                    placeholder="Share any specific prayer points or why you wish to join..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-sm border border-brand-gold-500/20 transition-all shadow-md cursor-pointer"
                >
                  Submit Covenant Application
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: VOLUNTEER OPPORTUNITIES */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="join-volunteer" 
        className="py-20 bg-white relative overflow-hidden bg-[linear-gradient(to_right,rgba(128,0,32,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,0,32,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem]"
      >
        <div className="max-w-5xl mx-auto px-4 space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Serve with Us
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              VOLUNTEER OPPORTUNITIES
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              Every army needs laborers. Explore active roles where you can commit your spiritual talents.
            </p>
          </div>

          {/* Volunteer Table */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-brand-neutral-bg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-brand-dark-bg text-white border-b border-brand-gold-500/10 font-display">
                    <th className="p-4.5 font-bold uppercase tracking-wider text-xs">Role</th>
                    <th className="p-4.5 font-bold uppercase tracking-wider text-xs">Time Commitment</th>
                    <th className="p-4.5 font-bold uppercase tracking-wider text-xs">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700 font-sans">
                  {VOLUNTEER_ROLES.map((role) => (
                    <tr key={role.id} className="hover:bg-white transition-colors">
                      <td className="p-4.5 font-bold text-brand-neutral-dark">{role.role}</td>
                      <td className="p-4.5 text-brand-maroon-500 font-bold">{role.timeCommitment}</td>
                      <td className="p-4.5 text-xs text-gray-500 max-w-sm leading-relaxed">{role.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: START A LOCAL CHAPTER */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="join-start-chapter" 
        className="py-20 bg-brand-neutral-bg"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-brand-dark-bg text-white p-8 sm:p-12 rounded-3xl border border-brand-gold-500/20 shadow-xl space-y-8">
            <div className="text-center space-y-3">
              <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
                Chapter Plant Initiation
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                BRING WHENMEN TO YOUR CITY
              </h3>
              <div className="w-10 h-0.5 bg-brand-gold-500 mx-auto rounded-full"></div>
              <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                Are you passionate about seeing families and communities transformed? We provide training, complete curriculum materials, legal framework outlines, and ongoing leadership support.
              </p>
            </div>

            {/* Requirements list */}
            <div className="bg-black/45 p-6 rounded-2xl border border-white/5 space-y-4">
              <h4 className="text-brand-gold-500 font-display font-semibold text-sm uppercase tracking-wide">
                Requirements Checklist:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300 font-sans leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <FileCheck className="w-4.5 h-4.5 text-brand-gold-500 shrink-0" />
                  <span>Committed believer with a distinct calling to men's ministry work.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileCheck className="w-4.5 h-4.5 text-brand-gold-500 shrink-0" />
                  <span>2+ years of consistent involvement with WHENMEN INC. parent chapters.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileCheck className="w-4.5 h-4.5 text-brand-gold-500 shrink-0" />
                  <span>3-5 committed, verified brothers to launch regional activities with.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileCheck className="w-4.5 h-4.5 text-brand-gold-500 shrink-0" />
                  <span>Absolute agreement with our full Statement of Faith and Core Values.</span>
                </li>
              </ul>
            </div>

            {/* Chapters Form toggle */}
            <div className="text-center">
              {chapterFormSuccess ? (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl inline-block max-w-md">
                  Thank you! Your Chapter Plant Application has been locked and forwarded to administrative oversight.
                </div>
              ) : showChapterForm ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setChapterFormSuccess(true);
                  }}
                  className="max-w-md mx-auto space-y-3 font-sans text-left bg-black/20 p-5 rounded-xl border border-white/5"
                >
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Your Full Name *</label>
                    <input type="text" required className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded text-xs focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Target City, State *</label>
                    <input type="text" required className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded text-xs focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Target Partner Church / Sponsor</label>
                    <input type="text" className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded text-xs focus:outline-none" />
                  </div>
                  <button type="submit" className="w-full py-2 bg-brand-maroon-500 text-white font-bold text-xs rounded">
                    Submit Chapter Proposal
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowChapterForm(true)}
                  className="px-6 py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-sm border border-brand-gold-500/20 transition-all cursor-pointer"
                >
                  Apply to Start a Chapter
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: CORPORATE & CHURCH PARTNERSHIPS */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="join-partnerships" 
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Ecumenical & Corporate Alliances
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              PARTNER WITH US
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="bg-brand-neutral-bg p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="w-10 h-10 bg-brand-maroon-500/10 text-brand-maroon-500 rounded-lg flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-brand-neutral-dark">
                FOR CHURCHES
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed font-sans">
                Host a regional WHENMEN event at your sanctuary, provide facilities for local chapter study assemblies, or refer men from your congregation to enter our 12-week Discipleship Track.
              </p>
            </div>

            <div className="bg-brand-neutral-bg p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="w-10 h-10 bg-brand-maroon-500/10 text-brand-maroon-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-brand-neutral-dark">
                FOR BUSINESSES
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed font-sans">
                Engage in Corporate Sponsorship matching, offer matching donations for our regional Outreaches, or establish employee corporate volunteer days with our local reentry bootcamps.
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-sm transition-colors cursor-pointer border border-brand-gold-500/10 shadow-sm"
            >
              Become a Partner
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
