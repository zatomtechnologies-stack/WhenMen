import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-brand-dark-bg text-gray-400 border-t border-brand-maroon-500/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Logo & Tagline */}
        <div id="footer-col-1" className="space-y-4">
          <div className="flex items-center cursor-pointer group" onClick={() => handleLinkClick('/')}>
            <img
              src="/WhenMen.png"
              alt="WhenMen Inc."
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            A movement of men praying, worshipping, and transforming families, communities, and generations for the glory of God.
          </p>
          <div className="pt-2">
            <span className="text-brand-gold-500 font-display font-semibold italic text-sm block">
              "Impact. Influence. Inspire."
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div id="footer-col-2" className="space-y-4">
          <h3 className="font-display font-bold text-white tracking-wider text-sm uppercase border-b border-brand-maroon-500/10 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: 'About Us', path: '/about' },
              { label: 'Our Programs', path: '/programs' },
              { label: 'Upcoming Events', path: '/events' },
              { label: 'Invest / Give', path: '/give' },
              { label: 'Get Involved', path: '/join' },
            ].map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleLinkClick(link.path)}
                  className="hover:text-brand-gold-500 hover:underline transition-colors cursor-pointer text-left flex items-center gap-1 group"
                >
                  <span className="w-1.5 h-1.5 bg-brand-maroon-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div id="footer-col-3" className="space-y-4">
          <h3 className="font-display font-bold text-white tracking-wider text-sm uppercase border-b border-brand-maroon-500/10 pb-2">
            Resources
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: 'Brotherhood Blog', path: '/resources' },
              { label: 'Prayer & Devotionals', path: '/resources' },
              { label: 'Podcast & Audio', path: '/resources' },
              { label: 'Frequently Asked Questions', path: '/faq' },
              { label: 'Confidential Prayer Form', path: '/contact' },
            ].map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleLinkClick(link.path)}
                  className="hover:text-brand-gold-500 hover:underline transition-colors cursor-pointer text-left flex items-center gap-1 group"
                >
                  <span className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Connect */}
        <div id="footer-col-4" className="space-y-4">
          <h3 className="font-display font-bold text-white tracking-wider text-sm uppercase border-b border-brand-maroon-500/10 pb-2">
            Connect
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-brand-gold-500 shrink-0 mt-0.5" />
              <a href="mailto:info@whenmen.org" className="hover:text-white hover:underline transition-colors">
                info@whenmen.org
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-brand-gold-500 shrink-0 mt-0.5" />
              <span>(214) 555-0190</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-gold-500 shrink-0 mt-0.5" />
              <span className="text-gray-300">
                WHENMEN INC. Headquarters,<br />
                Dallas, TX, United States
              </span>
            </li>
          </ul>
          {/* Social Icons */}
          <div className="flex gap-3 pt-3">
            {[
              { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
              { icon: <Facebook className="w-4 h-4" />, href: '#', label: 'Facebook' },
              { icon: <Youtube className="w-4 h-4" />, href: '#', label: 'YouTube' },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-maroon-500 hover:text-white transition-all flex items-center justify-center border border-white/10 hover:border-brand-gold-500/30 text-gray-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div id="footer-bottom" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-maroon-500/10 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500">
        <div>
          <span>© 2026 WHENMEN INC. | 501(c)(3) Faith-Based Nonprofit. All Rights Reserved.</span>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
          {[
            { label: 'Privacy Policy', path: '/privacy' },
            { label: 'Terms of Service', path: '/terms' },
            { label: 'Refund Policy', path: '/refund' },
            { label: 'Non-Discrimination', path: '/nondiscrimination' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item.path)}
              className="hover:text-brand-gold-500 hover:underline transition-colors cursor-pointer text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
