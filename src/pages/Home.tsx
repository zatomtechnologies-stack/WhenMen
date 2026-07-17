import React, { useState, useRef, useEffect } from 'react';
import { Shield, ArrowRight, Play, CheckCircle, Flame, Calendar, Sparkles, Volume2, VolumeX, Mail } from 'lucide-react';
import { IMPACT_STATS, PROGRAMS, TESTIMONIALS, UPCOMING_EVENTS } from '../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useScrollReveal, useParallax } from '../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onNavigate: (path: string) => void;
  onSelectProgram: (id: string) => void;
}

export default function Home({ onNavigate, onSelectProgram }: HomeProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  // Scroll reveal refs
  const statsRef = useScrollReveal({ stagger: 0.15, y: 40 }) as React.RefObject<HTMLDivElement>;
  const whoWeAreRef = useScrollReveal({ y: 50 }) as React.RefObject<HTMLElement>;
  const cardsRef = useScrollReveal({ stagger: 0.1, y: 60 }) as React.RefObject<HTMLElement>;
  const testimonialRef = useScrollReveal({ y: 50 }) as React.RefObject<HTMLElement>;
  const joinCtaRef = useScrollReveal({ y: 40 }) as React.RefObject<HTMLElement>;

  // Parallax for hero background
  const parallaxBgRef = useParallax(0.25) as React.RefObject<HTMLDivElement>;

  // CountUp trigger
  const { ref: statsInViewRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Hero entrance animation
  useEffect(() => {
    if (!heroTextRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTextRef.current!.querySelectorAll('[data-hero]'),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: 'power4.out',
          delay: 0.2,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const featuredEvent = UPCOMING_EVENTS[0]; // WHENMEN Worship Night
  const featuredTestimonial = TESTIMONIALS[0]; // Michael T.

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSuccess(false);
      }, 5000);
    }
  };

  return (
    <div id="homepage-container" className="page-transition">
      {/* Lightbox Video Modal */}
      {showLightbox && (
        <div id="lightbox-overlay" className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-brand-dark-bg rounded-2xl overflow-hidden border border-brand-gold-500/30 relative">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 text-white hover:text-brand-gold-500 p-2 rounded-full bg-black/60 z-10 cursor-pointer"
            >
              ✕ Close
            </button>
            <div className="aspect-video w-full flex flex-col items-center justify-center bg-gradient-to-tr from-brand-maroon-900 via-brand-dark-bg to-black p-8 text-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,0,32,0.15)_0%,transparent_100%)]"></div>
              <Flame className="w-16 h-16 text-brand-gold-500 mb-6 animate-bounce" />
              <h3 className="font-display font-extrabold text-2xl md:text-4xl text-white mb-4">
                WHENMEN INC. — OUR STORY
              </h3>
              <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-6">
                "When Men Pray, Families Change. When Men Worship, Generations Shift. When Men Rise, Communities Thrive."
              </p>
              <div className="w-full max-w-md bg-black/50 p-4 rounded-xl border border-white/5 text-xs text-brand-gold-100 italic">
                * [Seeding Video Playback] This opens a 90-second testimony presentation featuring the transformation journeys of men across our chapters.
              </div>
              <button
                onClick={() => setShowLightbox(false)}
                className="mt-8 px-6 py-2.5 bg-brand-maroon-500 text-white font-bold rounded-lg border border-brand-gold-500/20 hover:bg-brand-maroon-600 cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: VIDEO HERO (Full Viewport) */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-dark-bg">
        {/* Real Looping Ambient Video Background */}
        <div className="absolute inset-0 z-0" ref={parallaxBgRef}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-brand-dark-bg/65 to-brand-dark-bg z-10"></div>
          
          <img
            src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Gathering around fire fallback"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />

          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=1920"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            src="https://assets.mixkit.co/videos/preview/mixkit-fire-flame-background-loop-41712-large.mp4"
          />

          <div className="w-full h-full object-cover scale-105 opacity-25 bg-[radial-gradient(ellipse_at_top,rgba(235,142,9,0.15)_0%,transparent_80%)] flex items-center justify-center relative z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-maroon-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="grid grid-cols-6 gap-4 p-8 w-full max-w-5xl opacity-10 select-none pointer-events-none">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border border-brand-gold-500/20 rounded p-4 text-center text-[10px] font-mono text-brand-gold-500">
                  WHENMEN #{i + 100}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div id="hero-video-controls" className="absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-xs select-none">
          <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-brand-gold-500 transition-colors flex items-center gap-1 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            {isPlaying ? 'Looping Ambient Video' : 'Paused'}
          </button>
          <span className="text-white/20">|</span>
          <button onClick={() => setIsMuted(!isMuted)} className="hover:text-brand-gold-500 transition-colors flex items-center gap-1 cursor-pointer">
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            {isMuted ? 'Muted' : 'Sound On'}
          </button>
        </div>

        {/* Hero Text Content */}
        <div ref={heroTextRef} className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-6">
          <div data-hero className="inline-flex items-center gap-2 bg-brand-maroon-500/20 border border-brand-gold-500/30 px-3.5 py-1.5 rounded-full text-brand-gold-500 text-xs font-semibold uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Faith-Based 501(c)(3) Nonprofit Brotherhood
          </div>
          <h1 data-hero className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl tracking-tight text-white mb-6">
            Every Man Needs a<br className="hidden sm:block" />
            <span className="text-gradient bg-gradient-to-r from-brand-gold-500 via-brand-maroon-100 to-brand-gold-500 bg-clip-text text-transparent">
              Brotherhood.
            </span>{' '}
            Find Yours.
          </h1>
          <p data-hero className="font-sans text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            A movement of men praying, worshipping, and transforming families, communities, and generations for the glory of God.
          </p>

          <div data-hero className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              id="hero-cta-join"
              onClick={() => onNavigate('/join')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon-500 to-brand-maroon-600 text-white font-bold rounded-lg border border-brand-gold-500/30 shadow-xl hover:shadow-brand-maroon-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Join the Movement
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="hero-cta-story"
              onClick={() => setShowLightbox(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 hover:border-brand-gold-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-brand-gold-500 fill-brand-gold-500" />
              Watch Our Story
            </button>
          </div>

          <div data-hero className="mt-16 max-w-3xl mx-auto border-t border-brand-maroon-500/20 pt-8">
            <p className="font-display font-semibold italic text-brand-gold-100 text-base sm:text-lg leading-relaxed text-center px-4">
              "When Men Pray, Families Change. When Men Worship, Generations Shift. When Men Rise, Communities Thrive."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: IMPACT STATS BAR */}
      <section id="stats-section" className="bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-700 pt-10 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div ref={(el) => { (statsRef as any).current = el; (statsInViewRef as any)(el); }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-brand-gold-500/20">
            {IMPACT_STATS.map((stat, i) => {
              // Extract numeric value for CountUp
              const numMatch = stat.value.match(/[\d,]+/);
              const numVal = numMatch ? parseInt(numMatch[0].replace(/,/g, '')) : 0;
              const prefix = stat.value.match(/^[^\d]*/)?.[0] ?? '';
              const suffix = stat.value.replace(/^[^\d]*[\d,]+/, '');
              return (
                <div key={i} data-reveal id={`stat-card-${i}`} className="text-center pt-6 lg:pt-0 lg:px-4">
                  <span className="block font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-gold-500 tracking-tight">
                    {prefix}
                    {statsInView ? (
                      <CountUp end={numVal} duration={2.5} separator="," useEasing />
                    ) : '0'}
                    {suffix}
                  </span>
                  <span className="block font-display font-bold text-sm tracking-wide uppercase text-white mt-1">
                    {stat.label}
                  </span>
                  <span className="block text-xs text-brand-maroon-100/70 mt-1.5 max-w-[200px] mx-auto">
                    {stat.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-[#faf9f6] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,55.05,16.22,83.1,22.81,159.25,40.67,243.69,70.92,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* SECTION 3: WHO WE ARE (Snapshot) */}
      <section ref={whoWeAreRef as React.RefObject<HTMLElement>} id="who-we-are-section" className="py-24 bg-brand-neutral-bg relative overflow-hidden bg-[radial-gradient(rgba(128,0,32,0.04)_1.5px,transparent_1.5px)] bg-[size:24px_24px]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-neutral-bg via-transparent to-brand-neutral-bg pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div data-reveal className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-brand-maroon-500 hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer animate-pulse" />
          </div>
          <h2 data-reveal className="font-display font-extrabold text-3xl sm:text-4xl text-brand-neutral-dark mb-6 tracking-tight">
            WHO WE ARE
          </h2>
          <div data-reveal className="w-16 h-1 bg-brand-gold-500 mx-auto mb-8 rounded-full"></div>
          
          <div data-reveal className="space-y-6 max-w-4xl mx-auto text-base sm:text-lg text-gray-700 leading-relaxed font-sans text-center">
            <p className="font-semibold text-brand-maroon-500 text-lg sm:text-xl">
              WHENMEN INC. is a faith-based 501(c)(3) nonprofit organization committed to the spiritual, emotional, mental, and social development of men.
            </p>
            <p className="italic text-gray-600 font-medium">
              We are more than a ministry — we are a brotherhood.
            </p>
            <p>
              We bring together men from different backgrounds, denominations, professions, cultures, and generations with one common purpose: to seek God and become better men.
            </p>
          </div>

          <div className="mt-10">
            <button
              id="who-we-are-learn-more"
              onClick={() => onNavigate('/about')}
              className="px-6 py-3 bg-white text-brand-maroon-500 border-2 border-brand-maroon-500 font-bold rounded-lg hover:bg-brand-maroon-500 hover:text-white hover:border-brand-maroon-500 transition-all shadow-sm flex items-center gap-2 mx-auto cursor-pointer"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT WE DO (6-Card Grid) */}
      <section ref={cardsRef as React.RefObject<HTMLElement>} id="what-we-do-section" className="pt-32 pb-24 bg-white relative overflow-hidden bg-[linear-gradient(to_right,rgba(128,0,32,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,0,32,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem]">
        {/* Slanted Top Divider (from Light Neutral Who We Are to White) */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-[#faf9f6] fill-current">
            <polygon points="1200,0 0,0 0,120" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div data-reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block mb-2">
              Ministries & Operations
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-neutral-dark tracking-tight">
              What We Do
            </h2>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Each of our core pillars is specifically engineered to target different areas of a man's life, guiding him to fulfill his spiritual potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.slice(0, 6).map((prog) => (
              <div
                key={prog.id}
                data-reveal
                id={`program-card-${prog.id}`}
                className="bg-brand-neutral-bg/90 backdrop-blur-sm border border-gray-200/60 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-brand-maroon-500/20 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-brand-maroon-500/10 text-brand-maroon-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-maroon-500 group-hover:text-white transition-all border border-brand-maroon-500/25">
                    <Flame className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-brand-neutral-dark mb-3 group-hover:text-brand-maroon-500 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {prog.teaser}
                  </p>
                </div>
                <button
                  onClick={() => onSelectProgram(prog.id)}
                  className="text-sm font-bold text-brand-maroon-500 group-hover:text-brand-gold-600 flex items-center gap-1.5 mt-4 transition-all hover:translate-x-1 text-left cursor-pointer"
                >
                  Explore Pillar Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              id="what-we-do-explore-all"
              onClick={() => onNavigate('/programs')}
              className="px-6 py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg transition-all shadow-md flex items-center gap-2 mx-auto cursor-pointer"
            >
              Explore All 8 Programs
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRANSFORMATION STORY */}
      <section ref={testimonialRef as React.RefObject<HTMLElement>} id="testimonial-section" className="pt-32 pb-24 bg-brand-neutral-bg relative overflow-hidden">
        {/* Wave Top Divider (from White to Light Neutral) */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120C26.9,111.25,55.05,103.78,83.1,97.19,159.25,79.33,243.69,49.08,321.39,56.44Z" />
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-maroon-500/5 rounded-full blur-3xl"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div data-reveal className="bg-brand-dark-bg text-white p-8 sm:p-12 md:p-16 rounded-3xl border border-brand-gold-500/20 shadow-2xl relative">
            <div className="absolute top-6 left-6 text-brand-gold-500 font-serif text-6xl opacity-20 pointer-events-none select-none">“</div>
            <div className="absolute bottom-6 right-6 text-brand-gold-500 font-serif text-6xl opacity-20 pointer-events-none select-none">”</div>

            <div className="text-center max-w-3xl mx-auto space-y-6">
              <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
                Transformation Story
              </span>
              <p className="font-display font-medium text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed italic">
                "{featuredTestimonial.text}"
              </p>
              <div>
                <span className="block font-display font-bold text-brand-gold-500 text-base">
                  — {featuredTestimonial.name}
                </span>
                <span className="block text-xs text-brand-maroon-100/60 mt-0.5">
                  {featuredTestimonial.location}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              id="testimonial-read-stories"
              onClick={() => onNavigate('/stories')}
              className="text-brand-maroon-500 hover:text-brand-maroon-600 font-bold text-sm flex items-center gap-2 mx-auto transition-all hover:underline cursor-pointer"
            >
              Read More Brotherhood Stories
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: UPCOMING EVENT HIGHLIGHT */}
      <section id="event-highlight-section" className="pt-28 pb-16 bg-white relative overflow-hidden">
        {/* Slanted Top Divider (from Light Neutral to White) */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-[#faf9f6] fill-current">
            <polygon points="0,0 1200,0 1200,120" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-brand-maroon-50 to-brand-gold-50 border border-brand-gold-500/10 p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-5">
              <div className="bg-brand-maroon-500 text-white p-4 rounded-xl border border-brand-gold-500/20 shadow-md text-center shrink-0 w-20 h-20 flex flex-col justify-center select-none">
                <span className="block font-display font-extrabold text-xs tracking-wider uppercase opacity-80">JUL</span>
                <span className="block font-display font-black text-2xl tracking-tighter">15</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold-700">
                  <Calendar className="w-3.5 h-3.5" />
                  UPCOMING HIGHLIGHT
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-neutral-dark">
                  {featuredEvent.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {featuredEvent.time} | {featuredEvent.location}
                </p>
              </div>
            </div>
            <button
              id="event-highlight-cta"
              onClick={() => onNavigate('/events')}
              className="w-full md:w-auto px-6 py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg border border-brand-gold-500/20 shadow-md hover:shadow-brand-maroon-500/25 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              Register Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: JOIN CTA (Final Section) */}
      <section id="join-cta-section" className="pt-36 pb-32 bg-brand-dark-bg text-white relative overflow-hidden">
        {/* Wave Top Divider (from White to Dark) */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[48px] text-white fill-current">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86C243.69,70.92,159.25,40.67,83.1,22.81,55.05,16.22,26.9,8.75,0,0V120H1200V12.83C1132.19,35.92,1055.71,28.31,985.66,92.83Z" />
          </svg>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(128,0,32,0.2)_0%,transparent_80%)]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            JOIN THE MOVEMENT
          </h2>
          <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
          
          <div className="space-y-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              Whether you are searching for hope, healing, purpose, brotherhood, or a deeper relationship with God, there is a place for you here.
            </p>
            <p className="font-semibold text-white">
              Together, we are raising men who will transform families, communities, and generations for the glory of God.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              id="final-cta-join-today"
              onClick={() => onNavigate('/join')}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg border border-brand-gold-500/30 transition-all cursor-pointer"
            >
              Join Us Today
            </button>
            <button
              id="final-cta-partner"
              onClick={() => onNavigate('/give')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-brand-gold-500/25 font-bold rounded-lg transition-all cursor-pointer"
            >
              Partner With Us
            </button>
          </div>
        </div>

        {/* Wave Bottom Divider (from Dark to Light Neutral) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[48px] text-[#faf9f6] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,55.05,16.22,83.1,22.81,159.25,40.67,243.69,70.92,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* SECTION 8: NEWSLETTER SIGNUP */}
      <section id="newsletter-section" className="py-20 bg-brand-neutral-bg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-gray-200/80 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6">
            <div className="w-12 h-12 bg-brand-maroon-500/10 text-brand-maroon-500 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-2xl text-brand-neutral-dark">
                Get The WHENMEN Weekly
              </h3>
              <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                Prayer points, event updates, and biblical encouragement delivered directly to your inbox to keep your armor locked.
              </p>
            </div>

            {newsletterSuccess ? (
              <div id="newsletter-success-toast" className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl max-w-md mx-auto text-sm flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! You have subscribed to the WHENMEN Weekly.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} id="newsletter-form" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon-500 text-sm bg-gray-50 flex-grow"
                />
                <button
                  type="submit"
                  id="newsletter-subscribe-button"
                  className="px-6 py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-sm transition-colors shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
