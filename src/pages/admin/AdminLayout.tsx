import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard, CalendarDays, Users, MessageSquareQuote, BookOpen,
  Mail, HandHeart, UserCheck, DollarSign, CreditCard, Settings,
  AtSign, Bell, Search, LogOut, ChevronRight, Menu, X
} from 'lucide-react';

import AdminDashboard from './AdminDashboard';
import Events from './sections/Events';
import TeamMembers from './sections/TeamMembers';
import Testimonials from './sections/Testimonials';
import BlogPosts from './sections/BlogPosts';
import Subscribers from './sections/Subscribers';
import ContactInbox from './sections/ContactInbox';
import PrayerRequests from './sections/PrayerRequests';
import Donations from './sections/Donations';
import SiteSettings from './sections/Settings';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NAV_GROUPS = [
  {
    label: 'OVERVIEW',
    items: [{ label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' }],
  },
  {
    label: 'CONTENT',
    items: [
      { label: 'Events', icon: CalendarDays, path: '/admin/dashboard/events' },
      { label: 'Team Members', icon: Users, path: '/admin/dashboard/team' },
      { label: 'Testimonials', icon: MessageSquareQuote, path: '/admin/dashboard/testimonials' },
      { label: 'Blog & Devotionals', icon: BookOpen, path: '/admin/dashboard/blog' },
    ],
  },
  {
    label: 'INBOX',
    items: [
      { label: 'Contact Messages', icon: Mail, path: '/admin/dashboard/contact', badge: 3 },
      { label: 'Prayer Requests', icon: HandHeart, path: '/admin/dashboard/prayer', badge: 7 },
      { label: 'Subscribers', icon: UserCheck, path: '/admin/dashboard/subscribers' },
    ],
  },
  {
    label: 'GIVING',
    items: [
      { label: 'Donations Log', icon: DollarSign, path: '/admin/dashboard/donations' },
      { label: 'Payment Config', icon: CreditCard, path: '/admin/dashboard/payments' },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { label: 'Site Settings', icon: Settings, path: '/admin/dashboard/settings' },
      { label: 'Email Config', icon: AtSign, path: '/admin/dashboard/email' },
    ],
  },
];

const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/dashboard/events': 'Events',
  '/admin/dashboard/team': 'Team Members',
  '/admin/dashboard/testimonials': 'Testimonials',
  '/admin/dashboard/blog': 'Blog & Devotionals',
  '/admin/dashboard/contact': 'Contact Inbox',
  '/admin/dashboard/prayer': 'Prayer Requests',
  '/admin/dashboard/subscribers': 'Subscribers',
  '/admin/dashboard/donations': 'Donations',
  '/admin/dashboard/payments': 'Payment Config',
  '/admin/dashboard/settings': 'Site Settings',
  '/admin/dashboard/email': 'Email Config',
};

function renderSection(path: string, onNavigate: (p: string) => void) {
  const section = path.split('?')[0];
  switch (section) {
    case '/admin/dashboard/events': return <Events />;
    case '/admin/dashboard/team': return <TeamMembers />;
    case '/admin/dashboard/testimonials': return <Testimonials />;
    case '/admin/dashboard/blog': return <BlogPosts />;
    case '/admin/dashboard/contact': return <ContactInbox />;
    case '/admin/dashboard/prayer': return <PrayerRequests />;
    case '/admin/dashboard/subscribers': return <Subscribers />;
    case '/admin/dashboard/donations': return <Donations />;
    case '/admin/dashboard/payments': return <SiteSettings initialTab="payment" />;
    case '/admin/dashboard/settings': return <SiteSettings initialTab="site" />;
    case '/admin/dashboard/email': return <SiteSettings initialTab="email" />;
    default: return <AdminDashboard onNavigate={onNavigate} />;
  }
}

export default function AdminLayout({ currentPath, onNavigate }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('wm_admin_auth') !== 'true') {
      onNavigate('/admin');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('wm_admin_auth');
    onNavigate('/admin');
  };

  const activePath = currentPath.split('?')[0];
  const pageTitle = PAGE_TITLES[activePath] || 'Dashboard';

  const sidebarContent = (
    <div
      style={{
        width: 240,
        minHeight: '100vh',
        background: '#0d0d14',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
        overflowY: 'auto',
      }}
    >
      {/* Logo + role */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/WhenMen.png" alt="WhenMen" style={{ height: 32 }} />
          <button className="md:hidden" onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{
          marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(235,142,9,0.12)', border: '1px solid rgba(235,142,9,0.25)',
          borderRadius: 100, padding: '4px 10px',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#eb8e09', display: 'inline-block' }} />
          <span style={{ color: '#eb8e09', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.03em' }}>Super Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 10px' }}>
        {NAV_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: 22 }}>
            <p style={{ color: '#374151', fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6, paddingLeft: 8, textTransform: 'uppercase' }}>
              {group.label}
            </p>
            {group.items.map(item => {
              const isActive = activePath === item.path || (item.path !== '/admin/dashboard' && activePath.startsWith(item.path));
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => { onNavigate(item.path); setSidebarOpen(false); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '9px 10px',
                    borderRadius: 9,
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: 2,
                    position: 'relative',
                    borderLeft: isActive ? '3px solid #eb8e09' : '3px solid transparent',
                    background: isActive ? 'rgba(235,142,9,0.10)' : 'transparent',
                    color: isActive ? '#eb8e09' : '#9ca3af',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.875rem',
                    textAlign: 'left',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <Icon size={16} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {'badge' in item && item.badge ? (
                    <span style={{ background: '#ef4444', color: '#fff', borderRadius: 100, fontSize: '0.68rem', fontWeight: 700, padding: '1px 7px', minWidth: 20, textAlign: 'center' }}>
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom user + logout */}
      <div style={{ padding: '14px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#eb8e09', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>LA</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: '#f1f1f1', fontSize: '0.82rem', fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Pastor Lani Akinyode</p>
            <p style={{ color: '#6b7280', fontSize: '0.72rem', margin: 0 }}>Super Admin</p>
          </div>
        </div>
        <button
          onClick={logout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: 8, color: '#ef4444', fontSize: '0.83rem', fontWeight: 600,
            cursor: 'pointer', justifyContent: 'center',
          }}
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f', fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar — desktop always visible */}
      <div className="hidden md:block" style={{ width: 240, flexShrink: 0 }}>
        {sidebarContent}
      </div>

      {/* Sidebar — mobile overlay */}
      {sidebarOpen && (
        <div className="md:hidden">
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 39 }}
            onClick={() => setSidebarOpen(false)}
          />
          {sidebarContent}
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <div style={{
          height: 60, flexShrink: 0, position: 'sticky', top: 0, zIndex: 30,
          background: 'rgba(13,13,20,0.85)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4, marginRight: 4 }}
            >
              <Menu size={20} />
            </button>
            <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>Admin</span>
            <ChevronRight size={14} color="#374151" />
            <span style={{ color: '#f1f1f1', fontSize: '0.92rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{pageTitle}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
              <Search size={18} />
            </button>
            <div style={{ position: 'relative' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <Bell size={18} />
              </button>
              <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'block' }} />
            </div>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#eb8e09', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.78rem' }}>LA</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>
          {renderSection(activePath, onNavigate)}
        </div>
      </div>
    </div>
  );
}
