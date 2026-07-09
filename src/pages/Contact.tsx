import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ShieldAlert, Heart, Calendar, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  const [prayerForm, setPrayerForm] = useState({ firstName: '', email: '', category: 'Personal', details: '', wantsContact: false });
  const [prayerSuccess, setPrayerSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSuccess(true);
      setTimeout(() => {
        setContactForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
        setContactSuccess(false);
      }, 5000);
    }
  };

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prayerForm.details) {
      setPrayerSuccess(true);
      setTimeout(() => {
        setPrayerForm({ firstName: '', email: '', category: 'Personal', details: '', wantsContact: false });
        setPrayerSuccess(false);
      }, 5000);
    }
  };

  return (
    <div id="contact-page-container" className="page-transition">
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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Corporate dynamic tower representing connection"
            className="w-full h-full object-cover opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
            WE ARE HERE FOR YOU
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Let's Connect
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a question, need counsel, wish to partner, or carrying a spiritual burden? Reach out today.
          </p>
        </div>
      </motion.section>

      {/* Main Grid: Info columns + Forms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* LEFT COLUMN: DIRECT CONTACT DETAILS */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-3">
                <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
                  Office Coordinates
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-neutral-dark tracking-tight">
                  Reach Us Directly
                </h2>
                <div className="w-12 h-1 bg-brand-gold-500 rounded-full"></div>
              </div>

              {/* Direct Info List */}
              <ul className="space-y-6 text-sm font-sans text-gray-600 leading-relaxed">
                <li className="flex items-start gap-3 bg-brand-neutral-bg p-5 border border-gray-200 rounded-xl">
                  <Mail className="w-5 h-5 text-brand-maroon-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-brand-neutral-dark text-sm">General Inbox</h4>
                    <a href="mailto:info@whenmen.org" className="text-xs hover:underline text-brand-maroon-500 font-bold block mt-1">
                      info@whenmen.org
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-brand-neutral-bg p-5 border border-gray-200 rounded-xl">
                  <Phone className="w-5 h-5 text-brand-maroon-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-brand-neutral-dark text-sm">Phone Line</h4>
                    <span className="text-xs font-semibold block mt-1">(214) 555-0190</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-brand-neutral-bg p-5 border border-gray-200 rounded-xl">
                  <MapPin className="w-5 h-5 text-brand-maroon-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-brand-neutral-dark text-sm">Mailing Address</h4>
                    <span className="text-xs text-gray-500 leading-relaxed block mt-1">
                      WHENMEN INC.<br />
                      Headquarters, Dallas, TX
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 bg-brand-neutral-bg p-5 border border-gray-200 rounded-xl">
                  <Clock className="w-5 h-5 text-brand-maroon-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-brand-neutral-dark text-sm">Office Hours</h4>
                    <span className="text-xs block mt-1 font-semibold text-gray-500">
                      Monday–Friday, 9:00 AM – 5:00 PM CST
                    </span>
                  </div>
                </li>
              </ul>

              {/* Trust block: Promise */}
              <div className="bg-gradient-to-br from-brand-maroon-50 to-brand-gold-50 border border-brand-gold-500/10 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-maroon-500 shrink-0" />
                  <h4 className="font-display font-bold text-sm text-brand-neutral-dark">
                    RESPONSE TIME PROMISE
                  </h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  "We respond to all general office inquiries within 48 business hours. Confidential prayer requests are categorized and prayed over by our intercessors within 24 hours."
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM */}
            <div className="lg:col-span-8 bg-brand-neutral-bg border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm self-start">
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-brand-maroon-500">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest font-mono">Communications Form</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-neutral-dark">
                  Send a Message
                </h3>
              </div>

              {contactSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center space-y-2 font-sans">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-display font-bold text-base">Message Sent Successfully!</h4>
                  <p className="text-xs leading-relaxed max-w-sm mx-auto text-gray-600">
                    Your correspondence has been filed. Our administrative team will reach out within our 48-hour response standard.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="(555) 555-5555"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Inquiry Subject *</label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                      >
                        {[
                          'General Inquiry',
                          'Prayer Request (Confidential)',
                          'Partnership / Collaboration',
                          'Media Inquiry',
                          'Volunteering',
                          'Giving / Donations',
                          'Technical Support'
                        ].map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your message details here..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg transition-colors border border-brand-gold-500/20 shadow cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* DEDICATED SECTION 3: CONFIDENTIAL PRAYER REQUEST FORM */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            id="confidential-prayer-area" 
            className="border-t border-gray-200 pt-16"
          >
            <div className="max-w-3xl mx-auto bg-brand-neutral-bg border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
              <div className="text-center space-y-2">
                <Heart className="w-10 h-10 text-brand-maroon-500 mx-auto animate-pulse" />
                <h3 className="font-display font-black text-2xl text-brand-neutral-dark">
                  CONFIDENTIAL PRAYER REQUEST
                </h3>
                <div className="w-10 h-0.5 bg-brand-gold-500 mx-auto rounded-full"></div>
                <p className="text-xs text-gray-500 leading-relaxed font-sans max-w-md mx-auto">
                  Our intercession team prays over every single request. Your sensitive information is kept strictly confidential within authorized prayer teams.
                </p>
              </div>

              {prayerSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-2 font-sans">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-display font-bold text-base text-emerald-900">Prayer Requested Locked!</h4>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
                    "The prayer of a righteous person is powerful and effective." — James 5:16. Our intercessors have received this and are standing in agreement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePrayerSubmit} className="space-y-4 font-sans text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">First Name (Or type "Anonymous")</label>
                      <input
                        type="text"
                        value={prayerForm.firstName}
                        onChange={(e) => setPrayerForm({ ...prayerForm, firstName: e.target.value })}
                        placeholder="Anonymous"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address (Optional, for follow-up)</label>
                      <input
                        type="email"
                        value={prayerForm.email}
                        onChange={(e) => setPrayerForm({ ...prayerForm, email: e.target.value })}
                        placeholder="brother@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Prayer Category *</label>
                    <select
                      value={prayerForm.category}
                      onChange={(e) => setPrayerForm({ ...prayerForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white text-xs"
                    >
                      {['Personal', 'Family', 'Marriage', 'Health', 'Finances', 'Spiritual', 'Other'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Confidential Request Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={prayerForm.details}
                      onChange={(e) => setPrayerForm({ ...prayerForm, details: e.target.value })}
                      placeholder="Type your prayer points here..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 bg-white"
                    ></textarea>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 border border-gray-150 p-2.5 rounded-lg bg-gray-50 hover:bg-white cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={prayerForm.wantsContact}
                        onChange={() => setPrayerForm({ ...prayerForm, wantsContact: !prayerForm.wantsContact })}
                        className="accent-brand-maroon-500 w-4 h-4 shrink-0"
                      />
                      <span className="text-xs text-gray-700 font-semibold">I would like a pastoral elder to contact me directly for counseling</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-neutral-dark text-white hover:bg-brand-maroon-500 font-bold rounded-lg transition-colors border border-brand-gold-500/20 shadow cursor-pointer text-sm"
                  >
                    Submit Confidential Prayer Request
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
