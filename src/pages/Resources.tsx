import React, { useState } from 'react';
import { Shield, Search, BookOpen, Download, Play, Mail, FileText, CheckCircle, ArrowLeft, ArrowRight, Share2, MessageSquare } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import { motion } from 'motion/react';

interface ResourcesProps {
  onNavigate?: (path: string) => void;
}

export default function Resources({ onNavigate }: ResourcesProps = {}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Download gate state
  const [emailGateInput, setEmailGateInput] = useState('');
  const [unlockedDownloads, setUnlockedUnlocked] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  // New Comment state
  const [comments, setComments] = useState<{ author: string; text: string; date: string }[]>([
    { author: 'Thomas K.', text: 'This first habit has completely re-anchored my household. Praying out loud over my kids works immediate wonders.', date: '3 days ago' },
    { author: 'Marcus V.', text: 'Looking forward to the crisis leadership seminar. This curriculum is so timely.', date: '1 week ago' }
  ]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [commentSuccess, setCommentSuccess] = useState(false);

  const categories = ['All', 'Prayer', 'Family', 'Leadership', 'Worship', 'Restoration', 'Youth'];

  // Filtering blog posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadClick = (filename: string) => {
    if (unlockedDownloads) {
      alert(`Success: Downloaded ${filename} to your local device.`);
    } else {
      setDownloadingFile(filename);
    }
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailGateInput.trim()) {
      setUnlockedUnlocked(true);
      if (downloadingFile) {
        alert(`Success: Email verified. Downloaded ${downloadingFile} to your device.`);
        setDownloadingFile(null);
      }
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name && newComment.text) {
      setComments(prev => [...prev, { author: newComment.name, text: newComment.text, date: 'Just now' }]);
      setNewComment({ name: '', text: '' });
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 4000);
    }
  };

  return (
    <div id="resources-page-container" className="page-transition">
      
      {/* SECTION 1: HERO (Shown only when no single blog is selected) */}
      {!selectedPost ? (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-brand-dark-bg text-white py-24 relative overflow-hidden text-center"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1920"
              referrerPolicy="no-referrer"
              alt="Studying devotionals and books"
              className="w-full h-full object-cover opacity-45 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
          </div>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
            <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
              SPIRITUAL ARMORY
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              Equip Your Journey
            </h1>
            <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Teachings, devotionals, study guides, and leadership blueprints for the man seeking God.
            </p>
          </div>
        </motion.section>
      ) : (
        <div className="pt-36 bg-brand-dark-bg"></div> /* Spacer padding under header when viewing article */
      )}

      {/* Main Content Body */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {selectedPost ? (
            /* SECTION 3: BLOG SINGLE PAGE DETAILED VIEW */
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="blog-single-page" 
              className="max-w-4xl mx-auto space-y-8 animate-fadeIn"
            >
              
              {/* Back Button */}
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('/programs');
                  } else {
                    setSelectedPost(null);
                  }
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-maroon-500 hover:text-brand-maroon-600 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Programs Hub
              </button>

              {/* Title & Metadata */}
              <div className="space-y-4">
                <span className="inline-block text-xs uppercase font-extrabold text-brand-maroon-500 bg-brand-maroon-500/10 px-3 py-1 rounded-full">
                  {selectedPost.category}
                </span>
                <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-neutral-dark tracking-tight leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="font-bold text-brand-neutral-dark">By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Hero Image */}
              <div className="rounded-3xl overflow-hidden border border-gray-200 aspect-video max-h-[400px] w-full bg-gray-100">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Share block */}
              <div className="flex justify-between items-center py-4 border-t border-b border-gray-150 text-xs">
                <div className="flex gap-2">
                  <button onClick={() => alert('Copied article link to clipboard.')} className="px-3.5 py-1.5 border border-gray-300 hover:bg-gray-50 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer">
                    <Share2 className="w-3.5 h-3.5 text-gray-500" />
                    Share Link
                  </button>
                </div>
                <span className="text-gray-400 font-mono">WHENMEN INC. VOICE</span>
              </div>

              {/* Rich text Content */}
              <div className="prose max-w-none text-gray-700 leading-relaxed font-sans text-base sm:text-lg space-y-6 pt-2">
                {selectedPost.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('###')) {
                    return <h3 key={i} className="font-display font-bold text-2xl text-brand-neutral-dark pt-4 mb-2">{para.replace('###', '').trim()}</h3>;
                  }
                  if (para.startsWith('-')) {
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                        {para.split('\n').map((li, j) => (
                          <li key={j}>{li.replace('-', '').replace('*', '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.startsWith('1.')) {
                    return (
                      <ol key={i} className="list-decimal pl-5 space-y-3 text-sm sm:text-base">
                        {para.split('\n').map((li, j) => (
                          <li key={j}>{li.substring(2).trim()}</li>
                        ))}
                      </ol>
                    );
                  }
                  return <p key={i}>{para.replace('*', '').replace('*', '')}</p>;
                })}
              </div>

              {/* COMMENTS MOCKUP SECTION */}
              <div id="article-comments" className="border-t border-gray-200 pt-10 space-y-6">
                <h4 className="font-display font-extrabold text-xl text-brand-neutral-dark flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-brand-maroon-500" />
                  Comments ({comments.length})
                </h4>

                <div className="space-y-4">
                  {comments.map((c, idx) => (
                    <div key={idx} className="bg-brand-neutral-bg p-5 rounded-xl border border-gray-200 text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-brand-neutral-dark">{c.author}</span>
                        <span className="text-[10px] text-gray-400">{c.date}</span>
                      </div>
                      <p className="text-gray-600">{c.text}</p>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <form onSubmit={handleCommentSubmit} className="space-y-3 font-sans bg-brand-neutral-bg/60 p-6 rounded-2xl border border-gray-200">
                  <h5 className="font-display font-bold text-sm text-brand-neutral-dark">Leave a Comment</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      className="px-3 py-2 border border-gray-300 bg-white rounded text-xs focus:outline-none"
                    />
                  </div>
                  <textarea
                    required
                    rows={2}
                    placeholder="Type your comment here..."
                    value={newComment.text}
                    onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 bg-white rounded text-xs focus:outline-none"
                  ></textarea>
                  <button type="submit" className="px-4 py-2 bg-brand-maroon-500 text-white font-bold text-xs rounded hover:bg-brand-maroon-600 cursor-pointer">
                    Submit Comment
                  </button>
                  {commentSuccess && <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Comment appended to simulation stream.</span>}
                </form>
              </div>

            </motion.div>
          ) : (
            /* SECTION 2: BLOG GRID & DISCOVER */
            <div id="blog-hub-discover" className="space-y-20">
              
              {/* Blog and Devotionals Segment */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
                    Weekly Readings
                  </span>
                  <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
                    THE WHENMEN VOICE BLOG & DEVOTIONALS
                  </h2>
                  <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
                </div>

                {/* Filter and Search controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-brand-neutral-bg p-5 border border-gray-200 rounded-xl">
                  {/* Category list */}
                  <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1 rounded-md text-xs font-bold uppercase transition-all cursor-pointer ${
                          activeCategory === cat ? 'bg-brand-maroon-500 text-white' : 'text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search query input */}
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search devotionals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Blog Cards Grid */}
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12 text-xs text-gray-500 italic">No resources found matched your search parameters.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="bg-brand-neutral-bg border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
                      >
                        <div className="aspect-video w-full bg-gray-200 relative">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-brand-maroon-500 text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-brand-gold-500/20">
                            {post.category}
                          </span>
                        </div>
                        <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                          <div>
                            <span className="block text-[10px] text-gray-400 font-mono">{post.date} | {post.readTime}</span>
                            <h3 className="font-display font-extrabold text-lg text-brand-neutral-dark mb-2 group-hover:text-brand-maroon-500 transition-colors leading-tight">
                              {post.title}
                            </h3>
                            <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4">
                              {post.excerpt}
                            </p>
                          </div>
                          
                          <span className="text-xs font-bold text-brand-maroon-500 group-hover:text-brand-gold-600 flex items-center gap-1 mt-auto">
                            Read Full Article
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* SECTION 3: PODCAST / TEACHINGS */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                id="resources-podcast" 
                className="bg-brand-dark-bg text-white p-8 sm:p-12 rounded-3xl border border-brand-gold-500/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 opacity-5 scale-150 pointer-events-none">
                  <Play className="w-64 h-64 text-brand-gold-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
                      Featured Audio-Feed
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                      WHENMEN Weekly Teachings Podcast
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                      Stream our weekly leadership messages, corporate prayer instructions, and guest testimonies directly. Perfect for commute and workout intercessions.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => alert('Simulated redirection: Forwarding to Apple Podcasts stream.')} className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">
                        Apple Podcasts
                      </button>
                      <button onClick={() => alert('Simulated redirection: Forwarding to Spotify Podcasts stream.')} className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">
                        Spotify Feed
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-black/45 p-6 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded bg-brand-maroon-500 flex items-center justify-center text-white cursor-pointer hover:bg-brand-maroon-600 transition-colors shadow shrink-0">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-brand-gold-500 uppercase font-mono tracking-widest">LATEST RECORDING EP-42</span>
                        <h4 className="font-display font-bold text-sm text-white">Anchoring Your Shield in Times of Siege</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Duration: 28 mins | Speaker: Pastor Lani Akinyode</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 4: DOWNLOADABLE STUDY RESOURCES (Free tools with Email gate unlock) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                id="resources-downloads" 
                className="space-y-8"
              >
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
                    Toolbox & Blueprints
                  </span>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-neutral-dark">
                    FREE TOOLS FOR YOUR WALK
                  </h2>
                  <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
                  <p className="text-gray-500 text-xs sm:text-sm font-sans">
                    Download complete study guides, assessments, and marital checkpoint sheets. Input your email below to unlock the study files!
                  </p>
                </div>

                {/* Email Verification Gate */}
                {!unlockedDownloads && (
                  <div className="max-w-md mx-auto bg-brand-neutral-bg border border-gray-200 p-6 rounded-2xl shadow-sm text-center space-y-4">
                    <h4 className="font-display font-bold text-sm text-brand-neutral-dark">Verify Email to Unlock PDF Files</h4>
                    <form onSubmit={handleUnlockSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={emailGateInput}
                        onChange={(e) => setEmailGateInput(e.target.value)}
                        className="px-3.5 py-2 text-xs border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 flex-grow"
                      />
                      <button type="submit" className="px-4 py-2 bg-brand-maroon-500 text-white text-xs font-bold rounded-lg hover:bg-brand-maroon-600 transition-colors cursor-pointer">
                        Unlock All
                      </button>
                    </form>
                  </div>
                )}

                {/* Grid of PDFs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: '30-Day Prayer Challenge for Men', size: '2.4 MB', file: '30_Day_Prayer_Challenge.pdf' },
                    { title: 'Family Devotion Guide', size: '1.8 MB', file: 'Family_Devotion_Guide.pdf' },
                    { title: 'WHENMEN Leadership Assessment', size: '3.1 MB', file: 'Leadership_Assessment_Sheet.pdf' },
                    { title: 'Budget Template for Godly Stewardship', size: '940 KB', file: 'Godly_Stewardship_Ledger.xlsx' },
                    { title: 'Marriage Check-Up Worksheet', size: '1.2 MB', file: 'Marriage_Checkpoint_Guide.pdf' }
                  ].map((res, i) => (
                    <div
                      key={i}
                      onClick={() => handleDownloadClick(res.file)}
                      className="p-5 bg-brand-neutral-bg border border-gray-200 rounded-xl hover:border-brand-maroon-500 hover:shadow transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-brand-maroon-500/10 text-brand-maroon-500 rounded-lg group-hover:bg-brand-maroon-500 group-hover:text-white transition-all shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-brand-neutral-dark leading-tight group-hover:text-brand-maroon-500 transition-colors">
                            {res.title}
                          </h4>
                          <span className="block text-[10px] text-gray-400 font-mono mt-0.5">{res.size}</span>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-gray-400 shrink-0 group-hover:text-brand-gold-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* SECTION 5: NEWSLETTER ARCHIVE */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                id="newsletter-archive" 
                className="border-t border-gray-150 pt-16"
              >
                <div className="bg-brand-neutral-bg/60 border border-gray-200 p-8 rounded-3xl text-center space-y-4">
                  <h4 className="font-display font-extrabold text-xl text-brand-neutral-dark">
                    Newsletter Archive
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans max-w-md mx-auto">
                    Missed a week\'s edition of WHENMEN Weekly? Browse our past archives detailing community actions.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 text-xs font-medium text-gray-600 font-sans">
                    <button onClick={() => alert('Success: Downloaded WhenMen Weekly - Issue Jun 28, 2026')} className="p-3 bg-white border border-gray-200 rounded-lg hover:border-brand-maroon-500 text-center transition-all cursor-pointer">
                      "WHENMEN Weekly" — June 28, 2026
                    </button>
                    <button onClick={() => alert('Success: Downloaded WhenMen Weekly - Issue Jun 15, 2026')} className="p-3 bg-white border border-gray-200 rounded-lg hover:border-brand-maroon-500 text-center transition-all cursor-pointer">
                      "WHENMEN Weekly" — June 15, 2026
                    </button>
                    <button onClick={() => alert('Success: Downloaded WhenMen Weekly - Issue Jun 01, 2026')} className="p-3 bg-white border border-gray-200 rounded-lg hover:border-brand-maroon-500 text-center transition-all cursor-pointer">
                      "WHENMEN Weekly" — June 01, 2026
                    </button>
                  </div>
                </div>
              </motion.div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
}
