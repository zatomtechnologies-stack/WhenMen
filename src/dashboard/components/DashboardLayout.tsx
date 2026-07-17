import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Calendar, BookOpen, Users, MessageSquare,
  HelpCircle, BarChart2, Image, Mail, Heart, UserCheck,
  DollarSign, Settings, ChevronDown, ChevronRight, Menu, X,
  Bell, LogOut, Shield, Star, Layers, Send, FileText,
  CreditCard, Inbox, Globe, ExternalLink
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: { id: string; label: string }[];
}

const NAV: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  {
    id: 'content', label: 'Content', icon: <Layers className="w-4 h-4" />,
    children: [
      { id: 'events', label: 'Events' },
      { id: 'programs', label: 'Programs' },
      { id: 'blog', label: 'Blog & Devotionals' },
      { id: 'team', label: 'Team Members' },
      { id: 'testimonials', label: 'Testimonials' },
      { id: 'faqs', label: 'FAQs' },
      { id: 'stats', label: 'Impact Stats' },
      { id: 'gallery', label: 'Photo Gallery' },
    ]
  },
  {
    id: 'inbox', label: 'Inbox', icon: <Inbox className="w-4 h-4" />,
    children: [
      { id: 'contacts', label: 'Contact Messages' },
      { id: 'prayers', label: 'Prayer Requests' },
      { id: 'registrations', label: 'Event Registrations' },
      { id: 'memberships', label: 'Membership Applications' },
    ]
  },
  {
    id: 'subscribers', label: 'Subscribers', icon: <Mail className="w-4 h-4" />,
    children: [
      { id: 'subscriber-list', label: 'Subscriber List' },
      { id: 'campaigns', label: 'Send Campaign' },
      { id: 'history', label: 'Email History' },
    ]
  },
  {
    id: 'giving', label: 'Giving', icon: <Heart className="w-4 h-4" />,
    children: [
      { id: 'donations', label: 'Donations Log' },
      { id: 'tiers', label: 'Donation Tiers' },
      { id: 'payment-config', label: 'Payment Config' },
    ]
  },
  {
    id: 'settings-group', label: 'Settings', icon: <Settings className="w-4 h-4" />,
    children: [
      { id: 'site-settings', label: 'Site Settings' },
      { id: 'email-config', label: 'Email Config' },
      { id: 'admin-users', label: 'Admin Users' },
    ]
  },
];

const NOTIFICATIONS = [
  { id: 1, text: '5 new prayer requests', time: '2m ago', dot: 'bg-amber-400' },
  { id: 2, text: 'New membership application', time: '18m ago', dot: 'bg-emerald-400' },
  { id: 3, text: '3 unread contact messages', time: '1h ago', dot: 'bg-blue-400' },
];

interface DashboardLayoutProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function DashboardLayout({ activePage, onNavigate, onLogout, children }: DashboardLayoutProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['content']);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleNav = (id: string) => {
    onNavigate(id);
    setSidebarOpen(false);
  };

  const activeLabel = (() => {
    for (const item of NAV) {
      if (item.id === activePage) return item.label;
      if (item.children) {
        const child = item.children.find(c => c.id === activePage);
        if (child) return child.label;
      }
    }
    return 'Dashboard';
  })();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3 border-b border-white/5">
        <img src="/WhenMen.png" alt="WhenMen" className="h-8 w-auto object-contain" />
        <div>
          <span className="block text-[9px] text-brand-gold-500/60 uppercase tracking-widest font-bold mt-0.5">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 scrollbar-hide">
        {NAV.map(item => {
          const isGroup = !!item.children;
          const isExpanded = expandedGroups.includes(item.id);
          const isActive = item.id === activePage;
          const hasActiveChild = item.children?.some(c => c.id === activePage);

          if (!isGroup) {
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                  isActive
                    ? 'bg-brand-gold-500/15 text-brand-gold-500 border border-brand-gold-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={isActive ? 'text-brand-gold-500' : 'text-gray-500'}>{item.icon}</span>
                {item.label}
              </button>
            );
          }

          return (
            <div key={item.id}>
              <button
                onClick={() => toggleGroup(item.id)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  hasActiveChild
                    ? 'text-brand-gold-500'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={hasActiveChild ? 'text-brand-gold-500' : 'text-gray-500'}>{item.icon}</span>
                  {item.label}
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-3 pl-3 border-l border-white/6 mt-1 mb-1 space-y-0.5">
                      {item.children!.map(child => (
                        <button
                          key={child.id}
                          onClick={() => handleNav(child.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                            child.id === activePage
                              ? 'bg-brand-gold-500/12 text-brand-gold-500'
                              : 'text-gray-500 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Bottom: visit site + logout */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-gray-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          View Live Site
          <ExternalLink className="w-3 h-3 ml-auto" />
        </a>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">

      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 border-r border-white/5 overflow-hidden"
        style={{ background: 'rgba(13,13,13,0.98)' }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-60 border-r border-white/5 overflow-hidden"
              style={{ background: 'rgba(13,13,13,0.99)' }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-5 border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600 hidden sm:block">Dashboard</span>
              <ChevronRight className="w-3 h-3 text-gray-700 hidden sm:block" />
              <span className="text-white font-semibold">{activeLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(p => !p)}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-gold-500 rounded-full" />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/8 z-50 overflow-hidden shadow-2xl"
                    style={{ background: '#141414' }}
                  >
                    <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                      <button onClick={() => setNotifOpen(false)} className="text-gray-600 hover:text-white cursor-pointer"><X className="w-3.5 h-3.5" /></button>
                    </div>
                    {NOTIFICATIONS.map(n => (
                      <div key={n.id} className="px-4 py-3 flex items-start gap-3 hover:bg-white/3 transition-colors border-b border-white/4 last:border-0">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                        <div>
                          <p className="text-xs text-gray-300">{n.text}</p>
                          <p className="text-[10px] text-gray-600 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/8">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-gold-500 to-brand-gold-700 flex items-center justify-center text-white font-bold text-xs">
                LA
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-white leading-none">Pastor Lani</p>
                <p className="text-[10px] text-gray-600 mt-0.5">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
