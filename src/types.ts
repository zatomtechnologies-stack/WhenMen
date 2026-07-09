export interface Program {
  id: string;
  title: string;
  teaser: string;
  iconName: string;
  need: string;
  whatWeDo: string;
  howItWorks: string[];
  schedule: string[];
  ctaText: string;
  secondaryCtaText?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  role?: string;
  year?: string;
  category?: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'prayer' | 'worship' | 'outreach' | 'workshop' | 'youth' | 'all' | 'family';
  registrationRequired: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface VolunteerRole {
  id: string;
  role: string;
  timeCommitment: string;
  description: string;
}

export interface DonationTier {
  amount: number;
  impact: string;
}
