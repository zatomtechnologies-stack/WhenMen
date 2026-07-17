import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      submenu: [
        { name: 'Our Vision & Team', path: '/about' },
        { name: 'Frequently Asked Questions', path: '/faq' },
        { name: 'Legal & Governance', path: '/privacy' },
      ]
    },
    { 
      name: 'Programs', 
      path: '/programs',
      submenu: [
        { name: 'All Core Programs', path: '/programs' },
        { name: 'Daily Prayer Gatherings', path: '/programs?id=prayer' },
        { name: 'Prison & Reentry Support', path: '/programs?id=prison' },
        { name: 'Marriage & Family Enrichment', path: '/programs?id=family' },
        { name: 'Youth & Next Gen', path: '/programs?id=youth' },
      ]
    },
    {
      name: 'Community',
      path: '/stories',
      submenu: [
        { name: 'Stories', path: '/stories' },
        { name: 'Events', path: '/events' },
        { name: 'Resources', path: '/resources' },
        { name: 'Contact Us', path: '/contact' },
      ]
    },
    { name: 'Join Us', path: '/join' },
    { name: 'Give', path: '/give' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
    setExpandedMobileMenu(null);
  };

  const toggleMobileMenu = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedMobileMenu(expandedMobileMenu === name ? null : name);
  };

  const isHomepage = currentPath === '/' || currentPath === '' || currentPath === '/index.html';

  // Determine header classes based on page and scroll position
  const headerBgClass = isScrolled
    ? 'bg-brand-dark-bg/65 backdrop-blur-md border-b border-brand-maroon-500/15 shadow-lg py-3'
    : 'bg-transparent py-5 border-none';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            id="header-logo"
            onClick={() => handleLinkClick('/')}
            className="flex items-center cursor-pointer group"
          >
            <img
              src="/WhenMen.png"
              alt="WhenMen Inc."
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const hasSubmenu = !!item.submenu;
              const isActive = currentPath === item.path || 
                (item.path === '/' && (currentPath === '' || currentPath === '/')) ||
                (item.path !== '/' && currentPath.startsWith(item.path)) ||
                (item.submenu?.some(sub => currentPath.startsWith(sub.path.split('?')[0])) ?? false);

              if (hasSubmenu) {
                return (
                  <div key={item.name} className="relative group py-2">
                    <button
                      id={`nav-item-${item.name.toLowerCase().replace(' ', '-')}`}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'text-brand-gold-500 bg-brand-maroon-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-brand-gold-500/70" />
                    </button>
                    {/* Hover Dropdown */}
                    <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-brand-dark-bg/95 backdrop-blur-md border border-brand-maroon-500/25 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 py-2">
                      {item.submenu?.map((sub) => {
                        const isSubActive = currentPath === sub.path;
                        return (
                          <button
                            key={sub.name}
                            onClick={() => handleLinkClick(sub.path)}
                            className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                              isSubActive
                                ? 'text-brand-gold-500 bg-brand-maroon-500/20'
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {sub.name}
                            <ChevronRight className="w-3 h-3 text-brand-gold-500/40" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.name}
                  id={`nav-item-${item.name.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleLinkClick(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-brand-gold-500 bg-brand-maroon-500/15 border-b-2 border-brand-gold-500'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            <button
              id="header-cta"
              onClick={() => handleLinkClick('/give')}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-brand-maroon-500 to-brand-maroon-600 text-white font-medium text-sm rounded-md border border-brand-gold-500/40 hover:from-brand-maroon-600 hover:to-brand-maroon-700 shadow-md hover:shadow-brand-maroon-500/25 transition-all flex items-center gap-1 cursor-pointer"
            >
              Partner with Us
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button
              id="header-cta-mobile"
              onClick={() => handleLinkClick('/give')}
              className="mr-3 px-3 py-1.5 bg-brand-maroon-500 text-white font-medium text-xs rounded border border-brand-gold-500/30 hover:bg-brand-maroon-600 cursor-pointer"
            >
              Give
            </button>
            <button
              id="mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold-500 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-drawer" className="xl:hidden bg-brand-dark-bg border-b border-brand-maroon-500/30 px-4 pt-2 pb-6 space-y-1 shadow-2xl animate-fadeIn max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => {
            const hasSubmenu = !!item.submenu;
            const isActive = currentPath === item.path || 
              (item.path === '/' && (currentPath === '' || currentPath === '/')) ||
              (item.path !== '/' && currentPath.startsWith(item.path)) ||
              (item.submenu?.some(sub => currentPath.startsWith(sub.path.split('?')[0])) ?? false);
            const isExpanded = expandedMobileMenu === item.name;

            return (
              <div key={item.name} className="w-full">
                {hasSubmenu ? (
                  <div>
                    <button
                      id={`nav-item-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                      onClick={(e) => toggleMobileMenu(item.name, e)}
                      className={`w-full text-left px-4 py-3 rounded-md text-base font-semibold transition-all flex justify-between items-center cursor-pointer ${
                        isActive
                          ? 'text-brand-gold-500 bg-brand-maroon-500/20 border-l-4 border-brand-gold-500'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-brand-gold-500/75 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    {isExpanded && (
                      <div className="pl-4 mt-1 space-y-1 bg-black/20 rounded-md py-1 border-l border-brand-gold-500/20">
                        {item.submenu?.map((sub) => (
                          <button
                            key={sub.name}
                            onClick={() => handleLinkClick(sub.path)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-400 hover:text-white rounded-md transition-colors block"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    id={`nav-item-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                    onClick={() => handleLinkClick(item.path)}
                    className={`w-full text-left px-4 py-3 rounded-md text-base font-semibold transition-all flex justify-between items-center cursor-pointer ${
                      isActive
                        ? 'text-brand-gold-500 bg-brand-maroon-500/20 border-l-4 border-brand-gold-500'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    <ChevronRight className={`w-4 h-4 text-brand-gold-500/50 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                )}
              </div>
            );
          })}
          <div className="pt-4 px-4">
            <button
              id="mobile-drawer-cta"
              onClick={() => handleLinkClick('/join')}
              className="w-full py-3 bg-gradient-to-r from-brand-maroon-500 to-brand-maroon-600 text-white font-bold text-center rounded-md border border-brand-gold-500/40 hover:from-brand-maroon-600 hover:to-brand-maroon-700 block cursor-pointer"
            >
              Join the Movement
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
