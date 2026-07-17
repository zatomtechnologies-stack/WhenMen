import React, { useState } from 'react';
import { Calendar, Search, MapPin, Clock, Filter, CheckCircle, Tag, Download, BookOpen, ExternalLink } from 'lucide-react';
import { UPCOMING_EVENTS, RECURRING_EVENTS } from '../data';
import { motion } from 'motion/react';

export default function Events() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [registeringEvent, setRegisteringEvent] = useState<any | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '' });

  // Handle Filtering
  const filteredEvents = UPCOMING_EVENTS.filter(event => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.name && registerForm.email) {
      setRegisterSuccess(true);
      setTimeout(() => {
        setRegisteringEvent(null);
        setRegisterSuccess(false);
        setRegisterForm({ name: '', email: '', phone: '' });
      }, 4000);
    }
  };

  const downloadICS = () => {
    alert('Downloaded WhenMen_Brotherhood_Calendar.ics to your device.');
  };

  return (
    <div id="events-page-container" className="page-transition">
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
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Gathering of brothers"
            className="w-full h-full object-cover opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
            SACRED FELLOWSHIP
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Upcoming Events & Gatherings
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Find a physical gathering near you or join hundreds of brothers globally online.
          </p>
        </div>
      </motion.section>

      {/* SECTION 2: CALENDAR, FILTERS & SEARCH */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Calendar Controller Bar */}
          <div className="bg-brand-neutral-bg border border-gray-200 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {['all', 'prayer', 'worship', 'outreach', 'family', 'youth'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-brand-maroon-500 text-white'
                      : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input & View Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search city, Zoom, webinar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                />
              </div>

              {/* View toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white shrink-0">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'list' ? 'bg-brand-maroon-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-brand-maroon-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>

          </div>

          {/* Event Listing View */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-2xl">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm font-sans font-medium">No upcoming events matched your filter. Try adjusting your category or search query.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  id={`event-card-${event.id}`}
                  className={`bg-brand-neutral-bg border border-gray-200/80 rounded-2xl p-6 transition-all hover:shadow-md ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row items-start md:items-center justify-between gap-6' : 'flex flex-col justify-between h-full'
                  }`}
                >
                  {/* Left segment: Date Badge + Main Details */}
                  <div className="flex items-start gap-5">
                    {/* Date badge */}
                    <div className="bg-brand-maroon-500 text-white p-3 rounded-xl border border-brand-gold-500/20 text-center w-16 shrink-0 select-none">
                      <span className="block font-display font-black text-lg leading-none">
                        {event.date.split(' ')[1]}
                      </span>
                      <span className="block text-[9px] uppercase tracking-widest font-bold mt-1 text-brand-gold-100">
                        {event.date.split(' ')[0]}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-brand-maroon-500 bg-brand-maroon-500/10 px-2 py-0.5 rounded-full">
                          <Tag className="w-2.5 h-2.5" />
                          {event.category}
                        </span>
                        {event.registrationRequired && (
                          <span className="text-[10px] text-brand-gold-600 bg-brand-gold-500/15 border border-brand-gold-500/20 px-2 py-0.5 rounded-full font-bold">
                            Registration Required
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-brand-neutral-dark">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-gold-500" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-gold-500" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className={`${viewMode === 'grid' ? 'mt-6 pt-4 border-t border-gray-200/50' : 'shrink-0 w-full md:w-auto'}`}>
                    <button
                      onClick={() => setRegisteringEvent(event)}
                      className="w-full md:w-auto px-5 py-2.5 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-xs tracking-wider transition-colors cursor-pointer"
                    >
                      {event.category === 'outreach' ? 'Volunteer' : 'Register Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </motion.section>

      {/* SECTION 3: RECURRING WEEKLY GATHERINGS */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="recurring-events" 
        className="py-20 bg-brand-neutral-bg"
      >
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Continuous Shield-Locking
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              EVERY WEEK WITH US
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              We gather consistently so that no man stands alone. Set these in your weekly ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {RECURRING_EVENTS.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex justify-between items-center"
              >
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-base text-brand-neutral-dark">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-brand-maroon-500 font-bold">
                    {rec.schedule}
                  </p>
                  <span className="block text-[11px] text-gray-400">
                    Platform: {rec.channel}
                  </span>
                </div>
                <div className="w-1.5 h-8 bg-brand-maroon-500 rounded-full shrink-0"></div>
              </div>
            ))}
          </div>

          {/* Add to calendar button */}
          <div className="text-center pt-4">
            <button
              onClick={downloadICS}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-maroon-500 hover:bg-brand-maroon-500 hover:text-white border-2 border-brand-maroon-500 font-bold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-brand-gold-500" />
              Add to Calendar (Download ICS File)
            </button>
          </div>
        </div>
      </motion.section>

      {/* REGISTRATION POPUP MODAL */}
      {registeringEvent && (
        <div id="register-modal" className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xl relative p-6 sm:p-8 space-y-6 animate-scaleIn">
            <button
              onClick={() => setRegisteringEvent(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-neutral-dark cursor-pointer text-sm font-bold"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <span className="text-[10px] text-brand-maroon-500 uppercase tracking-widest font-black block">
                RSVP ENTRY TICKET
              </span>
              <h3 className="font-display font-bold text-xl text-brand-neutral-dark leading-tight">
                {registeringEvent.title}
              </h3>
              <p className="text-xs text-gray-500">
                {registeringEvent.date} at {registeringEvent.time} | {registeringEvent.location}
              </p>
            </div>

            {registerSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-brand-neutral-dark">
                  Registration Complete!
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                  A verification confirmation code and digital entry ticket details have been sent to your email address.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 font-sans">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="brother@example.com"
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Phone Number (For Text Alert Updates)</label>
                  <input
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-sm transition-all cursor-pointer"
                >
                  Secure My Digital Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
