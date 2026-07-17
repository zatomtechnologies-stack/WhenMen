import React, { useState } from 'react';
import AdminLogin from './pages/AdminLogin';
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/Overview';
import {
  EventsPage, ProgramsPage, BlogPage, TeamPage, TestimonialsPage,
  FAQsPage, StatsPage, GalleryPage
} from './pages/DashPages';
import {
  ContactsPage, PrayersPage, RegistrationsPage, MembershipsPage
} from './pages/InboxPages';
import {
  SubscriberListPage, CampaignPage, EmailHistoryPage
} from './pages/SubscriberPages';
import {
  DonationsPage, TiersPage, PaymentConfigPage,
  SiteSettingsPage, EmailConfigPage, AdminUsersPage
} from './pages/GivingSettingsPages';

const PAGE_MAP: Record<string, (nav: (p: string) => void) => React.ReactNode> = {
  overview: (nav) => <Overview onNavigate={nav} />,
  events: () => <EventsPage />,
  programs: () => <ProgramsPage />,
  blog: () => <BlogPage />,
  team: () => <TeamPage />,
  testimonials: () => <TestimonialsPage />,
  faqs: () => <FAQsPage />,
  stats: () => <StatsPage />,
  gallery: () => <GalleryPage />,
  contacts: () => <ContactsPage />,
  prayers: () => <PrayersPage />,
  registrations: () => <RegistrationsPage />,
  memberships: () => <MembershipsPage />,
  'subscriber-list': () => <SubscriberListPage />,
  campaigns: () => <CampaignPage />,
  history: () => <EmailHistoryPage />,
  donations: () => <DonationsPage />,
  tiers: () => <TiersPage />,
  'payment-config': () => <PaymentConfigPage />,
  'site-settings': () => <SiteSettingsPage />,
  'email-config': () => <EmailConfigPage />,
  'admin-users': () => <AdminUsersPage />,
};

export default function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState('overview');

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <DashboardLayout
      activePage={page}
      onNavigate={setPage}
      onLogout={() => setAuthed(false)}
    >
      {PAGE_MAP[page]?.(setPage) ?? <Overview onNavigate={setPage} />}
    </DashboardLayout>
  );
}
