import React, { useState } from 'react';
import { Shield, CreditCard, Heart, CheckCircle, Flame, Lock, HelpCircle, ArrowRight } from 'lucide-react';
import { DONATION_TIERS } from '../data';
import { motion } from 'motion/react';

export default function Give() {
  const [giftType, setGiftType] = useState<'one-time' | 'monthly'>('monthly');
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');
  const [formState, setFormData] = useState({ name: '', email: '', phone: '', address: '', note: '' });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [addFees, setAddFees] = useState(true);
  const [giveSuccess, setGiveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const activeAmount = selectedPreset === 'custom' ? Number(customAmount) || 0 : selectedPreset;
  const processedAmount = addFees ? Number((activeAmount * 1.03).toFixed(2)) : activeAmount;

  const handleGiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && activeAmount > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setGiveSuccess(true);
      }, 1500);
    }
  };

  return (
    <div id="give-page-container" className="page-transition">
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
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            alt="Support, stewardship, and generosity hands"
            className="w-full h-full object-cover opacity-45 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-dark-bg/50 to-brand-dark-bg"></div>
        </div>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.45)_0%,transparent_75%)] z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 pt-10">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
            SACRIFICIAL STEWARDSHIP
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Invest in Transformed Men
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your radical generosity directly fuels daily prayers, prison reentry, family workshops, and next-generation leadership development.
          </p>
        </div>
      </motion.section>

      {/* SECTION 2: WHY GIVE (Connect giving to outcomes) */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Kingdom Dividends
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              WHERE YOUR GIFT GOES
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-brand-neutral-bg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-brand-dark-bg text-white border-b border-brand-gold-500/10 font-display">
                    <th className="p-4.5 font-bold uppercase tracking-wider text-xs">Role</th>
                    <th className="p-4.5 font-bold uppercase tracking-wider text-xs">Impact Yield</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700 font-sans">
                  {DONATION_TIERS.map((tier, idx) => (
                    <tr key={idx} className="hover:bg-white transition-colors">
                      <td className="p-4.5 font-display font-extrabold text-brand-maroon-500 text-base">
                        ${tier.amount}/month
                      </td>
                      <td className="p-4.5 text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                        {tier.impact}
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-white transition-colors">
                    <td className="p-4.5 font-display font-extrabold text-brand-maroon-500 text-base">
                      One-Time Gifts
                    </td>
                    <td className="p-4.5 text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                      Also welcome to directly support special regional outreaches, capital projects, and upcoming worship event budgets.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: DONATION FORM */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="give-form-section" 
        className="py-20 bg-brand-neutral-bg border-t border-b border-gray-150"
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
            <div className="text-center space-y-2">
              <Heart className="w-10 h-10 text-brand-maroon-500 mx-auto" />
              <h3 className="font-display font-black text-2xl text-brand-neutral-dark">
                SECURE DONATION HUB
              </h3>
              <div className="w-10 h-0.5 bg-brand-gold-500 mx-auto rounded-full"></div>
            </div>

            {giveSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-display font-bold text-lg text-emerald-900">Thank you for your Investment!</h4>
                <p className="text-xs max-w-sm mx-auto leading-relaxed text-gray-600">
                  Your secure contribution of <span className="font-extrabold text-brand-neutral-dark">${processedAmount}</span> has been processed. A tax-deductible donor receipt has been dispatched to <span className="font-semibold">{formState.email}</span> via the Resend client.
                </p>
                <div className="pt-4 border-t border-emerald-100 text-[10px] text-gray-400 font-mono">
                  REF-ID: WM-DON-{Math.floor(Math.random() * 900000) + 100000}
                </div>
              </div>
            ) : (
              <form onSubmit={handleGiveSubmit} className="space-y-6 font-sans">
                {/* Gift Type (One-Time | Monthly) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Gift Frequency</label>
                  <div className="grid grid-cols-2 gap-2 border border-gray-200 rounded-lg p-1 bg-gray-50">
                    <button
                      type="button"
                      onClick={() => { setGiftType('one-time'); setSelectedPreset(100); }}
                      className={`py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        giftType === 'one-time' ? 'bg-brand-maroon-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      One-Time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => { setGiftType('monthly'); setSelectedPreset(100); }}
                      className={`py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        giftType === 'monthly' ? 'bg-brand-maroon-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Monthly Partner (Sustainer)
                    </button>
                  </div>
                </div>

                {/* Presets and Custom Amount */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Select Amount</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[25, 50, 100, 250, 500].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setSelectedPreset(val)}
                        className={`py-3 rounded-lg border text-sm font-extrabold transition-all cursor-pointer ${
                          selectedPreset === val
                            ? 'bg-brand-maroon-500 text-white border-brand-maroon-500 shadow-sm'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelectedPreset('custom')}
                      className={`py-3 rounded-lg border text-sm font-extrabold transition-all cursor-pointer ${
                        selectedPreset === 'custom'
                          ? 'bg-brand-maroon-500 text-white border-brand-maroon-500 shadow-sm'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Custom
                    </button>
                  </div>

                  {selectedPreset === 'custom' && (
                    <div className="pt-2 animate-fadeIn">
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm font-bold">$</span>
                        </div>
                        <input
                          type="number"
                          required
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter your custom amount"
                          className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Donor Info (Name, Email, Phone, Address) */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1">
                    Donor Profile
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormData({ ...formState, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormData({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Postal Address (For Official Tax Receipt) *</label>
                    <input
                      type="text"
                      required
                      value={formState.address}
                      onChange={(e) => setFormData({ ...formState, address: e.target.value })}
                      placeholder="123 Faith Way, Dallas, TX 75201"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1">
                    Payment Gateway
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'Credit Card' },
                      { id: 'paypal', label: 'PayPal' },
                      { id: 'bank', label: 'Bank Transfer' }
                    ].map((method) => (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === method.id
                            ? 'bg-brand-neutral-dark text-white border-brand-neutral-dark'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3 animate-fadeIn">
                      <div className="flex gap-2">
                        <div className="flex-grow">
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Card Number</label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="•••• •••• •••• ••••" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-xs focus:outline-none bg-white font-mono" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Expiry (MM/YY)</label>
                          <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none bg-white font-mono" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">CVC / Security Code</label>
                          <input type="password" placeholder="•••" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none bg-white font-mono" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50/50 border border-blue-150 p-4 rounded-xl text-center text-xs text-blue-800 animate-fadeIn">
                      * Standard secure PayPal checkout redirect sandbox triggered during transaction.
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-1 text-xs text-gray-600 animate-fadeIn">
                      <p className="font-bold">Routing Transit Numbers:</p>
                      <p>Bank of America: Routing ••••••••• | Account •••••••••</p>
                    </div>
                  )}
                </div>

                {/* Notes, Anonymous check, Fees check */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Dedication / Note</label>
                  <textarea
                    rows={2}
                    value={formState.note}
                    onChange={(e) => setFormData({ ...formState, note: e.target.value })}
                    placeholder="e.g. In honor of my father, or general kingdom seed..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon-500"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 border border-gray-150 p-2.5 rounded-lg bg-gray-50 hover:bg-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={() => setIsAnonymous(!isAnonymous)}
                      className="accent-brand-maroon-500 w-4 h-4"
                    />
                    <span className="text-xs text-gray-700 font-semibold">Make this gift anonymous on public ledger sheets</span>
                  </label>

                  <label className="flex items-center gap-2 border border-gray-150 p-2.5 rounded-lg bg-gray-50 hover:bg-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={addFees}
                      onChange={() => setAddFees(!addFees)}
                      className="accent-brand-maroon-500 w-4 h-4"
                    />
                    <span className="text-xs text-gray-700 font-semibold">Add 3% to cover credit card processing fees (${(activeAmount * 0.03).toFixed(2)})</span>
                  </label>
                </div>

                {/* Donate CTA button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-brand-maroon-500 hover:bg-brand-maroon-600 disabled:bg-gray-400 text-white font-bold rounded-lg text-sm border border-brand-gold-500/20 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-brand-gold-500 shrink-0" />
                  {loading ? 'Securing Transaction...' : `Donate Securely $${processedAmount}`}
                </button>

                <p className="text-[10px] text-center text-gray-400 font-sans leading-relaxed">
                  All donations are fully tax-deductible. WHENMEN INC. is a registered 501(c)(3) nonprofit faith-based entity. EIN: XX-XXXXXXX. Secured by standard SSL and bank-level tokenized encryption.
                </p>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: THE BROTHERHOOD BUILDER CLUB */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="give-builder-club" 
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-brand-dark-bg text-white p-8 sm:p-12 rounded-3xl border border-brand-gold-500/20 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest block">
                Sustaining Covenant Circle
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                THE BROTHERHOOD BUILDER CLUB
              </h3>
              <div className="w-10 h-0.5 bg-brand-gold-500 mx-auto rounded-full"></div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed text-center max-w-xl mx-auto font-sans">
              Monthly partners who sustain our work year-round provide the predictive budget needed to coordinate consistent prison visitions, youth mentorship events, and chapter launches.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-200 font-sans py-4">
              {[
                'Exclusive quarterly newsletters and video check-ins from the founder John Doe.',
                'Early priority access to outdoor camps and men\'s retreat registration guides.',
                'An annual physical copy of the WHENMEN custom prayer leather-journal.',
                'Your name listed in our Annual Oversight Stewardship report (unless ticked anonymous).'
              ].map((benefit, i) => (
                <div key={i} className="flex gap-2 items-start bg-black/30 p-4 rounded-xl border border-white/5">
                  <CheckCircle className="w-4.5 h-4.5 text-brand-gold-500 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => { setGiftType('monthly'); setSelectedPreset(100); }}
                className="px-6 py-3 bg-brand-maroon-500 hover:bg-brand-maroon-600 text-white font-bold rounded-lg text-sm border border-brand-gold-500/20 transition-all cursor-pointer"
              >
                Join the Brotherhood Builder Club
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: OTHER WAYS TO GIVE */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="give-other-ways" 
        className="py-20 bg-brand-neutral-bg border-t border-b border-gray-150"
      >
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-brand-maroon-500 font-bold text-xs uppercase tracking-widest block">
              Amplified Sowing
            </span>
            <h2 className="font-display font-extrabold text-3xl text-brand-neutral-dark tracking-tight">
              MULTIPLY YOUR IMPACT
            </h2>
            <div className="w-12 h-1 bg-brand-gold-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
            {[
              { title: 'Check by Mail', details: 'Check payable to: WHENMEN INC., [Mailing Address Headquarters, Dallas, TX]. Please specify any restriction instructions in the check memo line.' },
              { title: 'Stock & Securities', details: 'Contribute equity securities or stock portfolios directly. Contact us to receive detailed broker wire instructions.' },
              { title: 'In-Kind Donations', details: 'Donate physical supplies, soundboards, facility space, or print services. Reach out directly to receive active supplies lists.' },
              { title: 'Planned Giving & Bequests', details: 'Include WHENMEN INC. in your legacy estate plans, wills, or trust instruments. Build a multi-generational legacy.' },
            ].map((way, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-2">
                <h4 className="font-display font-bold text-base text-brand-neutral-dark">
                  • {way.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {way.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: DONOR PRIVACY STATEMENT */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        id="give-privacy" 
        className="py-16 bg-white text-center"
      >
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h4 className="font-display font-bold text-sm uppercase text-brand-maroon-500 tracking-wider">
            YOUR PRIVACY MATTERS
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed font-sans max-w-2xl mx-auto">
            WHENMEN INC. never sells, trades, or shares your personal donor details, email coordinates, or phone logs with any external parties. We employ industry standard bank-level encryption protocols across all transaction channels. You are free to edit or terminate your recurring partnerships at any time.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
