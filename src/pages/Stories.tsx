import React, { useState } from 'react';
import { Play, MessageSquare, Camera, CheckCircle, Heart, X } from 'lucide-react';
import { TESTIMONIALS, BY_THE_NUMBERS_STATS } from '../data';
import { motion } from 'motion/react';

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', location: '', text: '' });
  const [showModal, setShowModal] = useState(false);

  // Mock Gallery Photos with Categories
  const galleryItems = [
    { id: 1, title: 'Morning Prayer Gathering', category: 'prayer', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop' },
    { id: 2, title: 'Worship Night Altar', category: 'worship', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop' },
    { id: 3, title: 'Community Service Team', category: 'outreach', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400&auto=format&fit=crop' },
    { id: 4, title: 'Marriage Enrichment Circle', category: 'family', url: 'https://images.unsplash.com/photo-1543269608-bc15324c1029?q=80&w=400&auto=format&fit=crop' },
    { id: 5, title: 'Father-Son Trekking', category: 'youth', url: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=400&auto=format&fit=crop' },
    { id: 6, title: 'Daily Devotion Circle', category: 'prayer', url: 'https://images.unsplash.com/photo-1521791136368-1a46827d0adf?q=80&w=400&auto=format&fit=crop' },
  ];

  const filteredGallery = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.text) {
      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', location: '', text: '' });
        setSubmitSuccess(false);
        setShowModal(false);
      }, 4000);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitSuccess(false);
    setFormData({ name: '', email: '', location: '', text: '' });
  };

  return (
    <div id="stories-page-container" className="page-transition">

      {/* SHARE YOUR STORY MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-brand-maroon-500 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-brand-gold-500" />
                <h2 id="story-modal-title" className="font-display font-bold text-xl text-white">
                  Share Your Story
                </h2>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-7">
              {submitSuccess ? (
                <div className="py-8 flex flex-col items-center gap-3 text-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                  <p className="font-display font-bold text-lg text-brand-neutral-dark">
                    Thank You, Brother!
                  </p>
                  <p className="text-sm text-gray-500 max-w-sm">
                    Your testimony has been submitted to our team. We'll review it and reach out soon.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    Has WHENMEN INC. played a role in your spiritual or family restoration? Lock shields with other men by sharing your testimony.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. David R."
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Your Location *</label>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Houston, TX"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address (Kept Confidential) *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. david@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Your Testimony *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        placeholder="Describe how God transformed your life, family, or leadership through this brotherhood..."
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 resize-none"
                      />
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-sm transition-colors cursor-pointer"
                      >
                        Submit My Testimony
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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
            src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Transformation and vision sunset"
            className="w-full h-full object-cover opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
            TRANSFORMATION CHRONICLES
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Real Stories. Real Transformation.
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every single transformed man becomes a powerful catalyst for transformation in his home, workplace, church, and community.
          </p>
          {/* CTA to open modal */}
          <div className="pt-4">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-7 py-3 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold rounded-lg text-sm shadow-lg transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Share Your Story
            </button>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: BY THE NUMBERS */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="stories-stats" 
        className="py-16 bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-700 text-white text-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-gold-500 uppercase tracking-widest mb-10">
            OUR IMPACT BY THE NUMBERS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {BY_THE_NUMBERS_STATS.map((stat, i) => (
              <div key={i} className="bg-black/25 p-6 rounded-2xl border border-white/5 shadow-sm">
                <span className="block font-display font-black text-2xl sm:text-3xl text-brand-gold-500">
                  {stat.value}
                </span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: TRANSFORMATION STORIES */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="stories-testimonials" 
        className="py-20 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Life Transformation Logs
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              Our Transformed Brothers
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
              Our prayer gatherings, worship experiences, mentorship initiatives, and outreach efforts are helping men grow spiritually, restore families, overcome addiction, heal emotionally, and discover God's plan.
            </p>
          </div>

          {/* Testimonial Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-brand-neutral-bg p-8 rounded-2xl border border-gray-200/80 shadow-sm relative flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 text-brand-gold-500">
                  <Heart className="w-5 h-5 fill-brand-gold-500/20" />
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm sm:text-base italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-200/60 pt-4">
                  <span className="block font-display font-bold text-brand-maroon-500 text-sm">
                    — {t.name}
                  </span>
                  <span className="block text-[10px] text-gray-400 mt-0.5 font-semibold">
                    {t.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Share Story CTA banner */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-700 px-8 py-10 text-center space-y-4">
            <MessageSquare className="w-8 h-8 text-brand-gold-500 mx-auto" />
            <h3 className="font-display font-bold text-2xl text-white">
              Has God Transformed Your Life Through This Brotherhood?
            </h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Lock shields with other men by sharing your testimony. Your story could be the one that changes another man's life.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold rounded-lg text-sm shadow-lg transition-all cursor-pointer mt-2"
            >
              <MessageSquare className="w-4 h-4" />
              Share Your Story
            </button>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: VIDEO TESTIMONIALS */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="stories-videos" 
        className="py-20 bg-brand-neutral-bg"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Audio-Visual Witness
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              Video Testimonials
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              60-90 second video clips from men expressing raw breakthroughs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { id: 1, title: 'Breakthrough over Isolation', duration: '1:15', speaker: 'Michael T.' },
              { id: 2, title: 'Marriage Restoration Story', duration: '1:45', speaker: 'James & Angela' },
              { id: 3, title: 'From Prison to Pulpit Witness', duration: '2:10', speaker: 'Marcus T.' },
            ].map((vid) => (
              <div
                key={vid.id}
                className="bg-brand-dark-bg text-white rounded-2xl overflow-hidden border border-brand-gold-500/10 shadow-md group hover:border-brand-gold-500/30 transition-all flex flex-col justify-between"
              >
                <div className="aspect-video w-full bg-black/40 flex items-center justify-center relative">
                  <div className="w-12 h-12 rounded-full bg-brand-maroon-500 text-white flex items-center justify-center border border-brand-gold-500/20 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-white">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-gold-500 transition-colors">
                    {vid.title}
                  </h4>
                  <span className="block text-xs text-brand-maroon-100/50">
                    Featured: {vid.speaker}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: PHOTO GALLERY */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="stories-gallery" 
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="flex justify-center">
              <Camera className="w-8 h-8 text-brand-maroon-500" />
            </div>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              Brotherhood Photo Gallery
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 justify-center pt-6">
              {['all', 'prayer', 'worship', 'outreach', 'family', 'youth'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeCategory === cat
                      ? 'bg-brand-maroon-500 text-white border-brand-maroon-500 shadow-sm'
                      : 'bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm aspect-square bg-gray-100"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <span className="block text-[10px] text-brand-gold-500 uppercase font-mono tracking-widest mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-display font-bold text-white text-base">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
