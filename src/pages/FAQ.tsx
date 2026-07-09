import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldQuestion } from 'lucide-react';
import { FAQS } from '../data';
import { motion } from 'motion/react';

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>('f1'); // Expanded first FAQ by default

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('pushstate-change'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="faq-page-container" className="page-transition">
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
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Learning, questions, and guidance study"
            className="w-full h-full object-cover opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
            ANSWERS & OUTLINES
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Got questions about our faith tenets, membership logs, mentorship alignments, or chapter plants? Find clarifications here.
          </p>
        </div>
      </motion.section>

      {/* Accordion list */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-3 mb-12"
          >
            <div className="flex justify-center">
              <ShieldQuestion className="w-10 h-10 text-brand-maroon-500" />
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-neutral-dark tracking-tight">
              COMMUNITY MANUAL
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-4 font-sans text-sm sm:text-base"
          >
            {FAQS.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="bg-brand-neutral-bg border border-gray-200 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-5 sm:p-6 font-display font-extrabold text-brand-neutral-dark flex justify-between items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="shrink-0 text-brand-gold-600">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="p-6 bg-white border-t border-gray-150 text-gray-600 text-xs sm:text-sm leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Fallback support contact cta */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-brand-neutral-bg/60 border border-gray-200 p-8 rounded-3xl text-center space-y-4 mt-16 max-w-xl mx-auto"
          >
            <h4 className="font-display font-bold text-lg text-brand-neutral-dark">
              Still Have Questions?
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              If your question isn't answered here, please drop our admin staff a quick message directly. We typically reply within 48 business hours.
            </p>
            <div className="pt-2">
              <a
                href="/contact"
                onClick={(e) => handleLinkClick('/contact', e)}
                className="inline-block px-5 py-2.5 bg-brand-maroon-500 text-white font-bold rounded-lg text-xs hover:bg-brand-maroon-600 transition-colors cursor-pointer"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
