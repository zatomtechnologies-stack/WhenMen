import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Activity, Music, Users, Heart, Globe, BookOpen, Award, ArrowLeft, ArrowRight, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';
import { PROGRAMS } from '../data';
import { motion } from 'motion/react';

interface ProgramsProps {
  onNavigate: (path: string) => void;
  selectedProgramId: string | null;
  onClearProgram: () => void;
}

export default function Programs({ onNavigate, selectedProgramId, onClearProgram }: ProgramsProps) {
  const [activeProgramId, setActiveProgramId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProgramId) {
      setActiveProgramId(selectedProgramId);
      // Scroll to detail area
      const el = document.getElementById('programs-hub-container');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedProgramId]);

  const getIcon = (id: string) => {
    switch (id) {
      case 'prayer': return <Activity className="w-6 h-6 text-white" />;
      case 'worship': return <Music className="w-6 h-6 text-white" />;
      case 'mentorship': return <Users className="w-6 h-6 text-white" />;
      case 'family': return <Heart className="w-6 h-6 text-white" />;
      case 'outreach': return <Globe className="w-6 h-6 text-white" />;
      case 'leadership': return <Shield className="w-6 h-6 text-white" />;
      case 'prison': return <BookOpen className="w-6 h-6 text-white" />;
      case 'youth': return <Award className="w-6 h-6 text-white" />;
      default: return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  const currentProgram = PROGRAMS.find(p => p.id === activeProgramId);

  return (
    <div id="programs-hub-container" className="page-transition">
      {/* Page Hero */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-brand-dark-bg text-white py-24 relative overflow-hidden text-center"
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Collaborative work and mentorship"
            className="w-full h-full object-cover opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
            OUR CORE PILLARS
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            What We Do
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Programs designed to restore, equip, and mobilize men for eternal purpose.
          </p>
        </div>
      </motion.section>

      {/* Program Selector or Program Detail Split */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {currentProgram ? (
            /* DETAILED PROGRAM SUB-PAGE VIEW */
            <div id="program-detail-view" className="space-y-12 animate-fadeIn">
              {/* Back button */}
              <button
                onClick={() => {
                  setActiveProgramId(null);
                  onClearProgram();
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-maroon-500 hover:text-brand-maroon-600 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Programs Hub
              </button>

              {/* Title & Icon Header */}
              <div className="bg-brand-dark-bg text-white p-8 sm:p-12 rounded-3xl border border-brand-gold-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 opacity-5 scale-150">
                  <Shield className="w-64 h-64 text-brand-gold-500" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-brand-maroon-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-brand-gold-500/30">
                      {getIcon(currentProgram.id)}
                    </div>
                    <div>
                      <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
                        PROGRAM SUB-PAGE
                      </span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                        {currentProgram.title}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate(`/join?program=${currentProgram.id}`)}
                    className="px-6 py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-sm border border-brand-gold-500/20 transition-all shadow-md cursor-pointer"
                  >
                    {currentProgram.ctaText}
                  </button>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Column: Problem & Solution & How it works */}
                <div className="lg:col-span-8 space-y-10">
                  
                  {/* The Problem (The Need) */}
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-brand-neutral-dark flex items-center gap-2 border-b border-gray-150 pb-2">
                      <AlertTriangle className="w-5 h-5 text-brand-maroon-500" />
                      THE NEED
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-sans text-base">
                      {currentProgram.need}
                    </p>
                  </div>

                  {/* The Solution (What We Do) */}
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-brand-neutral-dark flex items-center gap-2 border-b border-gray-150 pb-2">
                      <ShieldCheck className="w-5 h-5 text-brand-gold-600" />
                      WHAT WE DO
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-sans text-base">
                      {currentProgram.whatWeDo}
                    </p>
                  </div>

                  {/* How It Works (Steps) */}
                  <div className="space-y-5">
                    <h3 className="font-display font-bold text-xl text-brand-neutral-dark border-b border-gray-150 pb-2">
                      HOW IT WORKS
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {currentProgram.howItWorks.map((step, idx) => (
                        <div key={idx} className="bg-brand-neutral-bg p-5 rounded-xl border border-gray-200/80 flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-brand-maroon-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                            {idx + 1}
                          </div>
                          <p className="text-gray-700 font-medium text-sm sm:text-base pt-1 leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Column: Schedule & Quick Info */}
                <div className="lg:col-span-4 space-y-8 bg-brand-neutral-bg p-8 rounded-3xl border border-gray-200 shadow-sm self-start">
                  
                  {/* Schedule Card */}
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-lg text-brand-neutral-dark flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-brand-maroon-500" />
                      SCHEDULE & LOCATION
                    </h4>
                    <div className="w-8 h-0.5 bg-brand-gold-500 rounded-full"></div>
                    <ul className="space-y-4 text-sm font-sans text-gray-700 leading-relaxed">
                      {currentProgram.schedule.map((sch, i) => (
                        <li key={i} className="flex gap-2 items-start border-b border-gray-200/40 pb-3 last:border-0 last:pb-0">
                          <span className="text-brand-gold-600 font-bold shrink-0">•</span>
                          <span>{sch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions inside Right Column */}
                  <div className="space-y-3 pt-6 border-t border-gray-200/80">
                    <button
                      onClick={() => onNavigate(`/join?program=${currentProgram.id}`)}
                      className="w-full py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold text-center text-sm rounded-lg border border-brand-gold-500/20 transition-all cursor-pointer"
                    >
                      {currentProgram.ctaText}
                    </button>
                    {currentProgram.secondaryCtaText && (
                      <button
                        onClick={() => {
                          if (currentProgram.id === 'outreach') onNavigate('/give');
                          else if (currentProgram.id === 'prayer') onNavigate('/events');
                          else onNavigate('/contact');
                        }}
                        className="w-full py-3 bg-white hover:bg-gray-50 text-brand-maroon-500 border border-brand-maroon-500/30 font-bold text-center text-sm rounded-lg transition-all cursor-pointer"
                      >
                        {currentProgram.secondaryCtaText}
                      </button>
                    )}
                  </div>

                  {/* Accountability Badge */}
                  <div className="pt-4 text-center">
                    <span className="inline-block text-[10px] uppercase font-mono tracking-widest text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded">
                      VERIFIED PILLAR SECURE
                    </span>
                  </div>

                </div>

              </div>
            </div>
          ) : (
            /* ALL PROGRAMS HUB GRID VIEW */
            <div id="all-programs-list" className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h3 className="font-display font-extrabold text-2xl text-brand-neutral-dark">
                  Restore, Equip, Mobilize
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Click any of the core ministry tracks below to explore their schedule, programmatic approach, and how you can lock shields with us.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROGRAMS.map((prog) => (
                  <div
                    key={prog.id}
                    id={`program-hub-card-${prog.id}`}
                    onClick={() => setActiveProgramId(prog.id)}
                    className="bg-brand-neutral-bg border border-gray-200 p-6 rounded-2xl hover:border-brand-maroon-500/30 hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-brand-maroon-500 text-white rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-gold-500 transition-colors border border-brand-gold-500/10">
                        {getIcon(prog.id)}
                      </div>
                      <h4 className="font-display font-bold text-lg text-brand-neutral-dark mb-2 group-hover:text-brand-maroon-500 transition-colors">
                        {prog.title}
                      </h4>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        {prog.teaser}
                      </p>
                    </div>
                    
                    <span className="text-xs font-bold text-brand-maroon-500 group-hover:text-brand-gold-600 flex items-center gap-1.5 mt-2 transition-all">
                      View Sub-page Details
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </motion.section>
    </div>
  );
}
