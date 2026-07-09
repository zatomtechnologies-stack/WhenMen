import React, { useEffect, useState } from 'react';
import { ShieldCheck, Scale, AlertOctagon, HeartHandshake, HelpCircle } from 'lucide-react';

interface LegalProps {
  initialTab?: 'privacy' | 'terms' | 'refund' | 'nondiscrimination';
}

export default function Legal({ initialTab = 'privacy' }: LegalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund' | 'nondiscrimination'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div id="legal-pages-container" className="page-transition">
      {/* SECTION 1: HERO */}
      <section className="bg-brand-dark-bg text-white py-24 relative overflow-hidden text-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Governance and legal compliance"
            className="w-full h-full object-cover opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
            GOVERNANCE & STANDARDS
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Legal & Compliance
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Please review our corporate standards, terms of use, donor refunds, and non-discrimination statements.
          </p>
        </div>
      </section>

      {/* Policies Navigation Tab List */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sibling navigation column */}
          <div className="lg:col-span-4 space-y-3 shrink-0">
            <h3 className="font-display font-bold text-sm uppercase text-gray-400 tracking-wider mb-4 border-b border-gray-100 pb-2">
              Corporate Standards
            </h3>
            {[
              { id: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4 shrink-0" /> },
              { id: 'terms', label: 'Terms of Service', icon: <Scale className="w-4 h-4 shrink-0" /> },
              { id: 'refund', label: 'Refund Policy', icon: <AlertOctagon className="w-4 h-4 shrink-0" /> },
              { id: 'nondiscrimination', label: 'Non-Discrimination', icon: <HeartHandshake className="w-4 h-4 shrink-0" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  window.location.hash = `#/privacy?tab=${tab.id}`; // Simple deep navigation anchor mock
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-brand-maroon-500 text-white border-brand-maroon-500 shadow-sm'
                    : 'bg-brand-neutral-bg text-gray-600 border-gray-200 hover:bg-gray-150'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Detailed Policy Text Column */}
          <div className="lg:col-span-8 bg-brand-neutral-bg border border-gray-200 p-8 rounded-3xl shadow-sm space-y-6 text-gray-600 leading-relaxed font-sans text-xs sm:text-sm">
            
            {activeTab === 'privacy' && (
              <div id="policy-privacy-text" className="space-y-4 animate-fadeIn">
                <h2 className="font-display font-extrabold text-2xl text-brand-neutral-dark mb-4 border-b border-gray-200 pb-2">
                  PRIVACY POLICY
                </h2>
                <p className="font-semibold text-brand-neutral-dark">
                  Effective Date: June 15, 2026
                </p>
                <p>
                  WHENMEN INC. ("we," "us," or "our") respects your privacy. This policy explains how we collect, use, and protect your personal information when you interface with our websites, newsletter signup forms, membership logs, and secure donation portals.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">1. Information We Collect</h4>
                <p>
                  We collect information you provide directly to us, including full names, email addresses, phone digits, shipping address, and areas of spiritual interest when you register on our rosters or sow contributions.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">2. How We Use Information</h4>
                <p>
                  Your details are utilized to fulfill requested event registrations, email weekly prayer outlines via Resend, log secure financial entries, and contact you for pastoral support when explicitly requested on our prayer request checkboxes.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">3. Data Integrity & Safety</h4>
                <p>
                  We never sell, distribute, or license user profiles to third-party marketing brokers. Financial transactions are conducted entirely through secure, tokenized SSL portals managed by trusted processing channels (e.g. Stripe/PayPal equivalent configurations).
                </p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div id="policy-terms-text" className="space-y-4 animate-fadeIn">
                <h2 className="font-display font-extrabold text-2xl text-brand-neutral-dark mb-4 border-b border-gray-200 pb-2">
                  TERMS OF SERVICE
                </h2>
                <p className="font-semibold text-brand-neutral-dark">
                  Last Updated: June 15, 2026
                </p>
                <p>
                  By accessing and using the WHENMEN INC. website (whenmen.org and affiliated subdomains), you agree to comply with and be bound by the following terms, conditions, and applicable federal and state nonprofit governance rules.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">1. Acceptable Content & Code of Conduct</h4>
                <p>
                  You agree to use our digital bulletin boards, blog comment nodes, and prayer request pipelines solely for encouraging, lawful, and edifying purposes in line with our faith principles. Obscene, defamatory, or abusive entries will be filtered and deleted immediately.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">2. Intellectual Property</h4>
                <p>
                  The sermon videos, downloadable prayer challenges, assess templates, logos, and digital study text sheets displayed on this hub are owned by WHENMEN INC. and protected under copyright protections. You may download them for personal edification but cannot commercialize them.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">3. Limits of Liability</h4>
                <p>
                  WHENMEN INC. provides spiritual counseling referrals, peer-to-peer mentorship networks, and educational worksheets. We do not provide licensed medical, clinical psychology, or legal tax advice.
                </p>
              </div>
            )}

            {activeTab === 'refund' && (
              <div id="policy-refund-text" className="space-y-4 animate-fadeIn">
                <h2 className="font-display font-extrabold text-2xl text-brand-neutral-dark mb-4 border-b border-gray-200 pb-2">
                  REFUND POLICY
                </h2>
                <p className="font-semibold text-brand-neutral-dark">
                  Last Updated: June 15, 2026
                </p>
                <p>
                  Donations and seed offerings submitted to WHENMEN INC. are voluntary, non-refundable, and tax-deductible immediately upon completion.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">1. Voluntary Offerings & Tithing</h4>
                <p>
                  Because voluntary donations are put to work immediately to supply food distributions, acquire prison devotionals, and fund youth camps, we cannot undo or refund completed donations.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">2. Event Registrations & Outdoor Retreats</h4>
                <p>
                  Registrations for paid weekend camps, family enrichment workshops, or leadership cohorts may be refunded in full up to <span className="font-bold text-brand-neutral-dark">7 days prior</span> to the scheduled event. Cancellations made under the 7-day window are non-refundable but can be converted fully into tax-deductible charity sponsorships.
                </p>
              </div>
            )}

            {activeTab === 'nondiscrimination' && (
              <div id="policy-nondiscrimination-text" className="space-y-4 animate-fadeIn">
                <h2 className="font-display font-extrabold text-2xl text-brand-neutral-dark mb-4 border-b border-gray-200 pb-2">
                  NON-DISCRIMINATION STATEMENT
                </h2>
                <p>
                  WHENMEN INC. does not discriminate on the basis of race, color, ethnicity, national origin, age, socio-economic bracket, marital status, or physical disability in any of its programs, outreaches, food distributions, or fellowship activities.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">1. Inclusive Outreaches</h4>
                <p>
                  Our community food collection drives, holiday gift banquets, and prison reentry networks are free, open, and provided to all humans carrying need, without arbitrary conditions or discrimination.
                </p>
                <h4 className="font-display font-bold text-brand-neutral-dark text-base pt-2">2. Theological Target Grouping</h4>
                <p>
                  While our core peer-mentorship templates and prayer gatherings are uniquely designed as gender-specific programming for men and teenage boys to fulfill our target faith mission, we happily welcome all couples to our family workshops and respect the dignity of all human lives.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>
    </div>
  );
}
