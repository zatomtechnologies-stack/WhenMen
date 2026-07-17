import { Program, Testimonial, UpcomingEvent, BlogPost, FAQItem, TeamMember, VolunteerRole, DonationTier } from './types';

export const IMPACT_STATS = [
  { value: '2,500+', label: 'Men Praying Weekly', description: 'Across multiple cities and online intercessions' },
  { value: '150+', label: 'Families Restored', description: 'Through Marriage & Family Enrichment' },
  { value: '12+', label: 'Cities Reached', description: 'With local active chapters and gatherings' },
  { value: '8', label: 'Programs Active', description: 'Serving spiritual, emotional, and social development' }
];

export const BY_THE_NUMBERS_STATS = [
  { value: '500+', label: 'Men Mentored' },
  { value: '150+', label: 'Families Served' },
  { value: '10,000+', label: 'Outreach Hours' },
  { value: '12', label: 'Cities Reached' },
  { value: '8', label: 'Prisons Visited' },
  { value: '300+', label: 'Youth Impacted' }
];

export const PROGRAMS: Program[] = [
  {
    id: 'prayer',
    title: 'Daily Prayer Gatherings',
    teaser: 'We gather consistently to seek God through corporate prayer, intercession, and biblical encouragement.',
    iconName: 'Activity',
    need: 'Men are often isolated in their spiritual lives, carrying burdens alone without a community to intercede for them. Prayer was never meant to be a solo sport. When men gather to pray, heaven moves and families are covered.',
    whatWeDo: 'Daily corporate prayer meetings—both in-person and virtual—where men come together to seek God\'s face, intercede for families, and receive biblical encouragement.',
    howItWorks: [
      'Join any morning prayer gathering (Mon–Fri, 6:00 AM CST)',
      'Participate in guided intercession and scripture reading',
      'Receive weekly prayer focus and encouragement',
      'Get paired with an accountability prayer partner'
    ],
    schedule: [
      'Morning Prayer: Monday–Friday, 6:00 AM CST (Zoom + In-Person)',
      'Saturday Intercession: 8:00 AM CST (In-Person)',
      'Night Prayer: Wednesdays, 9:00 PM CST (Zoom)'
    ],
    ctaText: 'Join Prayer Gathering',
    secondaryCtaText: 'View Prayer Calendar'
  },
  {
    id: 'worship',
    title: 'WHENMEN Worship',
    teaser: 'Creating an atmosphere where men encounter God\'s presence through passionate worship and prayer.',
    iconName: 'Music',
    need: 'Many men struggle to express worship openly. WHENMEN Worship creates a safe, masculine environment for unhindered, authentic praise.',
    whatWeDo: 'Monthly worship nights featuring live music, spontaneous prayer, prophetic ministry, and deep encounters with God\'s presence. Men laying down their armor to worship freely.',
    howItWorks: [
      'Attend our monthly city-wide worship nights',
      'Engage in powerful corporate singing and acoustic reflections',
      'Receive personal prayer ministry and prophetic laying on of hands',
      'Connect with worship leaders and local musicians'
    ],
    schedule: [
      'Monthly Worship Night: Next gathering on July 15, 2026 at 7:00 PM CST'
    ],
    ctaText: 'Register for Next Worship Night',
    secondaryCtaText: 'Join the Worship Team'
  },
  {
    id: 'mentorship',
    title: 'Mentorship & Discipleship',
    teaser: 'Equipping men to live purpose-filled lives through accountability, biblical teaching, and leadership development.',
    iconName: 'Users',
    need: '70% of Christian men feel unequipped to lead their families spiritually. Mentorship bridges the gap between raw theological knowledge and daily practical living. Every man needs a Paul, and every man needs a Timothy.',
    whatWeDo: 'A structured, relational framework that pairs mature leaders with men seeking guidance, utilizing the WHENMEN Discipleship Track to foster deep growth and accountability.',
    howItWorks: [
      'Apply as a Mentee or Mentor',
      'Complete spiritual assessment and matching based on background and location',
      'Meet bi-weekly for 12 weeks of structured discussion',
      'Progress through the WHENMEN Discipleship Track together'
    ],
    schedule: [
      'Flexible scheduling determined by mentor-mentee pairs',
      'Cohort-wide check-ins held quarterly'
    ],
    ctaText: 'Apply for Mentorship',
    secondaryCtaText: 'Become a Mentor'
  },
  {
    id: 'family',
    title: 'Marriage & Family Enrichment',
    teaser: 'Strengthening marriages and families through biblical principles and intentional community.',
    iconName: 'Heart',
    need: 'Divorce rates among families remain high, and fathers are often disconnected. Strong marriages and secure children require intentional investment and robust community support.',
    whatWeDo: 'We provide practical, interactive workshops, resources, and father-son adventure experiences designed to rebuild trust, model godly leadership, and strengthen marital vows.',
    howItWorks: [
      'Participate in quarterly couples\' workshops',
      'Join annual couple retreats focusing on deep communication',
      'Implement weekly family devotion guides provided by the ministry',
      'Attend parenting roundtables specifically structured for fathers'
    ],
    schedule: [
      'Next Workshop: "Leading Your Family Through Crisis" — July 20, 2026',
      'Fatherhood Roundtable: Second Tuesday of every month, 7:30 PM CST'
    ],
    ctaText: 'Register for Family Workshop',
    secondaryCtaText: 'Download Devotion Guides'
  },
  {
    id: 'outreach',
    title: 'Community Outreach',
    teaser: 'Serving through charitable initiatives, family support, youth mentorship, and acts of compassion.',
    iconName: 'Globe',
    need: 'Faith without works is dead. WHENMEN believes that transformed men must transform their communities. We do not just talk about love—we actively demonstrate it to those in need.',
    whatWeDo: 'Mobilizing armies of men to serve marginalized populations, provide physical sustenance, distribute educational supplies, and offer manual labor for restoration projects.',
    howItWorks: [
      'Join our local community service team roster',
      'Contribute to monthly collections of food and essentials',
      'Serve hands-on during scheduled outreach events',
      'Coordinate with church partners to map out neighborhood needs'
    ],
    schedule: [
      'Monthly Food Distribution: 2nd Saturday of every month at 8:00 AM',
      'Back-to-School Supply Drive: Entire month of August',
      'Thanksgiving Baskets Distribution: November 21, 2026',
      'Christmas Toy Drive & Banquet: December 19, 2026'
    ],
    ctaText: 'Volunteer for Outreach',
    secondaryCtaText: 'Donate Supplies'
  },
  {
    id: 'leadership',
    title: 'Leadership Development',
    teaser: 'Training men to become transformational leaders in their homes, churches, businesses, and communities.',
    iconName: 'Shield',
    need: 'The world is hungry for leaders who lead from a place of spiritual maturity and sacrificial love, rather than positional authority or self-interest.',
    whatWeDo: 'We run a rigorous, character-first leadership academy comprising four 8-week developmental modules designed to cultivate visionary leaders.',
    howItWorks: [
      'Register for the upcoming Leadership Cohort starting each fall',
      'Complete the four-stage leadership development track',
      'Succeed through peer review and active project leadership tasks',
      'Graduate and receive commissioning to lead local groups or initiatives'
    ],
    schedule: [
      'Module 1: FOUNDATIONS — Character & calling (8 weeks)',
      'Module 2: FORMATION — Spiritual disciplines & emotional health (8 weeks)',
      'Module 3: FUNCTION — Practical leadership skills (8 weeks)',
      'Module 4: FRUIT — Launching your own ministry/initiative (ongoing)'
    ],
    ctaText: 'Apply for Leadership Track',
    secondaryCtaText: 'View Course Syllabus'
  },
  {
    id: 'prison',
    title: 'Prison & Reentry Support',
    teaser: 'Bringing hope, restoration, mentorship, and practical support to incarcerated and formerly incarcerated individuals.',
    iconName: 'BookOpen',
    need: 'The incarcerated and formerly incarcerated are often forgotten by society—but never by God. Transitioning back into community requires relational bridges, employment skills, and emotional healing.',
    whatWeDo: 'Conducting in-prison bible studies, establishing pre-release mentorship connections, running job readiness bootcamps, and providing local housing and clothing referrals.',
    howItWorks: [
      'Join verified prison visitation teams (subject to state clearance)',
      'Partner as a Reentry Mentor to assist men in their first 90 days of freedom',
      'Support the Reentry Fund that provides transit vouchers and work tools',
      'Contribute counseling expertise to family reconciliation workshops'
    ],
    schedule: [
      'Weekly Prison Ministry Visits: Saturdays (Rotating Facilities)',
      'Job Readiness Workshop: Monthly, every 3rd Thursday at 6:30 PM'
    ],
    ctaText: 'Volunteer for Prison Ministry',
    secondaryCtaText: 'Support Reentry Fund'
  },
  {
    id: 'youth',
    title: 'Youth & Next Generation',
    teaser: 'Investing in boys and young men through mentorship, guidance, leadership training, and positive role models.',
    iconName: 'Award',
    need: 'Boys are growing up without fathers, without positive male role models, and without a clear vision for honorable manhood. Today\'s boys are tomorrow\'s husbands, fathers, and leaders.',
    whatWeDo: 'Providing target-age programming to guide young males from childhood to spiritual maturity through adventure camps, direct mentorship, and academic support.',
    howItWorks: [
      'WHENMEN Boys (Ages 8-12): Character building, outdoor skills & father-son events',
      'WHENMEN Young Men (Ages 13-18): Leadership training, career discovery & peer circles',
      'WHENMEN Campus (Ages 18-25): College campus outreach, fellowship & destiny alignment'
    ],
    schedule: [
      'Father-Son Adventure Day: Held bi-annually',
      'Youth Mentorship Circles: Meets bi-weekly on Friday evenings'
    ],
    ctaText: 'Enroll Your Son',
    secondaryCtaText: 'Volunteer as a Youth Mentor'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Michael T.',
    location: 'Dallas, TX',
    text: 'Before WHENMEN, I was spiritually dry and emotionally isolated. This brotherhood taught me how to lead my family with intention. My marriage is stronger, my sons have a role model, and I\'ve discovered purpose I never knew existed.'
  },
  {
    id: '2',
    name: 'David R.',
    location: 'Houston, TX',
    text: 'I was successful on the outside but empty inside. WHENMEN gave me a place to be real. Today, I lead a small group and my sons see what a man of God looks like.'
  },
  {
    id: '3',
    name: 'James & Angela K.',
    location: 'Atlanta, GA',
    text: 'My wife and I were separated. The Marriage Enrichment workshop gave us tools we never had. We\'re not just back together—we\'re thriving.'
  },
  {
    id: '4',
    name: 'Marcus T.',
    location: 'Chicago, IL',
    text: 'I thought my past defined me. WHENMEN\'s prison ministry visited my facility, and when I got out, they walked with me every step. Now I mentor other formerly incarcerated men.'
  },
  {
    id: '5',
    name: 'Robert S.',
    location: 'Dallas, TX',
    text: 'I never had a father. WHENMEN showed me what fatherhood looks like. Now I\'m raising my three boys with intentionality I never experienced.'
  }
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'e1',
    title: 'WHENMEN Worship Night',
    date: 'JUL 15',
    time: '7:00 PM CST',
    location: 'Dallas, TX & Livestream',
    category: 'worship',
    registrationRequired: true
  },
  {
    id: 'e2',
    title: 'Family Crisis Workshop',
    date: 'JUL 20',
    time: '9:00 AM CST',
    location: 'Online Webinar',
    category: 'family',
    registrationRequired: true
  },
  {
    id: 'e3',
    title: 'Community Food Drive',
    date: 'JUL 25',
    time: '8:00 AM CST',
    location: 'Houston Distribution Center',
    category: 'outreach',
    registrationRequired: false
  },
  {
    id: 'e4',
    title: 'Men\'s Fellowship Breakfast',
    date: 'AUG 01',
    time: '8:00 AM CST',
    location: 'Dallas Headquarters (Rotating)',
    category: 'all',
    registrationRequired: true
  },
  {
    id: 'e5',
    title: 'Youth Leadership Bootcamp',
    date: 'AUG 08',
    time: '10:00 AM CST',
    location: 'Atlanta Youth Complex',
    category: 'youth',
    registrationRequired: true
  }
];

export const RECURRING_EVENTS = [
  { title: 'Morning Prayer', schedule: 'Mon–Fri, 6:00 AM CST', channel: 'Zoom + In-Person' },
  { title: 'Night Prayer', schedule: 'Wednesdays, 9:00 PM CST', channel: 'Zoom Link' },
  { title: 'Saturday Intercession', schedule: 'Saturdays, 8:00 AM CST', channel: 'In-Person at Sanctuary' },
  { title: 'Men\'s Breakfast', schedule: 'First Saturday of month, 8:00 AM CST', channel: 'Rotating Locations (See email)' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'power-of-praying-man',
    title: 'The Power of a Praying Man: 5 Daily Habits',
    excerpt: 'Prayer is not a sign of weakness; it is the ultimate alignment of strength. Learn how consistent, focused prayer anchors a man\'s soul and guards his household.',
    content: `### Why Men Struggle with Prayer
Many men associate prayer with passive compliance, but biblically, it is an act of spiritual warfare. When a man kneels before God, he is standing up for his family. Overcoming the initial awkwardness of silent intercession requires structure and routine.

### The 5 Daily Habits of Spiritual Alignment
1. **The First Five Minutes:** Before you check your phone, check in with the Creator. Dedicate your morning tasks, stresses, and successes to Christ.
2. **Scripture Integration:** Never pray in a vacuum. Speak God's promises back to Him by anchoring your requests directly in the scripture.
3. **The Family Cover:** Pray out loud over your wife and children. Hearing a husband and father intercede for them builds immediate security.
4. **The Midday Halt:** Set a recurring alarm at noon to pause for sixty seconds. Re-calibrate your temper, your vocabulary, and your focus.
5. **The Evening Audit:** Before sleep, confess any grievances, release anger, and thank God for providing strength through another day.

### Join the Intercession
Do not walk this path alone. Join our 6:00 AM CST Morning Zoom Prayers where hundreds of brothers stand in agreement daily.`,
    category: 'Prayer',
    date: 'June 28, 2026',
    author: 'Pastor Lani Akinyode',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b2',
    slug: 'leading-family-through-crisis',
    title: 'Leading Your Family Through Crisis: A Biblical Framework',
    excerpt: 'When economic waves roll or personal tragedies strike, a man must stand as a beacon of stability. Explore how to lead with vulnerability and absolute faith.',
    content: `### The Pressure of Insecurity
When financial instability, health scares, or emotional friction hits the household, a man\'s instinct is often to retreat or mask his anxiety with anger. However, true biblical leadership does not mean pretending nothing is wrong. It means demonstrating where your ultimate security lies.

### The Pillars of Crisis Leadership
- **Absorb the Shock first:** Do not dump immediate fear onto your spouse or kids. Take your panic to God first in deep prayer, let Him quiet your mind, and then speak to your family.
- **Provide Spiritual Safety:** Gather your family together. Acknowledge the storm, but declare that your family serves a God who is larger than the storm.
- **Maintain Routine:** Consistent meals, family prayers, and simple moments of joy must continue. Stability in small things protects children from existential fear.
- **Practice Extreme Transparency:** Ask for help from your brotherhood. Isolated men break under pressure. Men surrounded by armor-bearers survive the siege.

*Register for our crisis management workshop on July 20 to receive direct coaching and resources.*`,
    category: 'Family',
    date: 'June 15, 2026',
    author: 'Robert S., Family Director',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b3',
    slug: 'financial-stewardship',
    title: 'Financial Stewardship: Managing God\'s Resources',
    excerpt: 'Money is a powerful tool and a dangerous master. Shift your mindset from ownership to stewardship and unlock true financial freedom.',
    content: `### Ownership vs. Stewardship
The core error of modern financial thinking is the word "Mine." A biblical man understands that everything—the talent to earn, the job, the investments, the bank balance—belongs fully to God. We are merely trusted asset managers.

### Actionable Steps for Stewardship
- **The First Fruits:** Honor God first with the tithe. It is an act of trust that declares God can do more with 90% of your money than you can do with 100%.
- **Live Below Your Means:** A godly legacy is not built on consumer debt. Trim excess, refuse the trap of luxury comparison, and build a margin to be generous.
- **Eliminate Toxic Debt:** Treat credit card debt like an intruder in your home. Eliminate it with aggressive focus.
- **Invest in Generations:** Save with the future in mind—not just your retirement, but supporting kingdom work, church launches, and family legacies.`,
    category: 'Leadership',
    date: 'June 05, 2026',
    author: 'Board Member 3, Treasurer',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b4',
    slug: 'when-brother-falls',
    title: 'When Your Brother Falls: How to Respond with Grace',
    excerpt: 'What do you do when a fellow man in the foxhole stumbles into sin or despair? Discover how to restore him in gentleness without compromising truth.',
    content: `### The Tragedy of Abandonment
Most men, when they fail morally or collapse emotionally, immediately withdraw out of intense shame. Sadly, the church often reacts by either pretending nothing happened or completely casting the offender aside. Both responses are unbiblical.

### The Restoration Protocol (Galatians 6:1)
1. **Go to Him Personally:** Do not gossip or text others. Drive to his house, look him in the eyes, and let him know he is still your brother.
2. **Watch Yourself:** Approach him with humility, remembering that you are capable of the exact same failure under the right temptation.
3. **Carry the Burden:** Sit in the ashes with him. Help him seek counseling, confess to his family, or enter recovery.
4. **Re-arm Him:** Do not leave him unarmed. Once he repents, welcome him back to the circle. A healed warrior is a formidable defender.`,
    category: 'Restoration',
    date: 'May 20, 2026',
    author: 'David R., Outreach Leader',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1521791136368-1a46827d0adf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b5',
    slug: 'fatherhood-by-intention',
    title: 'Fatherhood by Intention, Not Default',
    excerpt: 'Passively providing a paycheck is not fatherhood. True fathering requires dynamic presence, active listening, and modeling sacrificial love.',
    content: `### The Accidental Father
Too many men parent by reaction. They react when the grades are bad, react when there is screaming, but otherwise remain emotionally checked out. Intention requires stepping into the driver\'s seat of your child\'s development.

### How to Build a Fatherly Legacy
- **Date Your Kids:** Spend one-on-one time with each child regularly. It doesn\'t need to be expensive; it simply needs to be undivided.
- **Bless Your Children:** Speak words of explicit affirmation. Tell them you are proud of who they are, not just what they achieve.
- **Model Confession:** When you lose your temper or break a promise, apologize to your children. This teaches them accountability.
- **Teach Honor:** Model how to treat women by how you love, speak to, and serve their mother. Your sons learn how to be husbands, and your daughters learn what to look for.`,
    category: 'Youth',
    date: 'May 10, 2026',
    author: 'Michael T., Dallas Leader',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1543269608-bc15324c1029?q=80&w=600&auto=format&fit=crop'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'Is WHENMEN only for Christians?',
    answer: 'WHENMEN is a Christ-centered ministry. While our doors are open to any man seeking brotherhood, support, and a higher standard of living, our teachings, corporate worship, and community values are firmly rooted in biblical faith.'
  },
  {
    id: 'f2',
    question: 'Do I need to be a member of a specific church?',
    answer: 'No. We welcome men from all Christian denominations, backgrounds, or those who currently have no church home at all. Our focus is strictly on Jesus Christ and becoming better men, not denominational divides.'
  },
  {
    id: 'f3',
    question: 'Is there a cost to join?',
    answer: 'No. All general WHENMEN prayer gatherings, fellowship circles, and core programs are entirely free of charge. Some specific events like outdoor weekend retreats, marriage workshops, or study materials may have small registration fees to cover operations, but scholarships are always available upon request.'
  },
  {
    id: 'f4',
    question: 'Can women attend events?',
    answer: 'Our core daily prayer, mentorship, and youth tracks are designed specifically for men and boys. However, our quarterly Marriage & Family Enrichment workshops and annual couples\' retreats are open to couples, and we actively partner with local women\'s ministries for family-focused outreaches.'
  },
  {
    id: 'f5',
    question: 'How do I become a mentor?',
    answer: 'You must complete the mentor application form, submit a character reference, attend our weekend Mentor Training Seminar, and agree to our Statement of Faith and Code of Conduct. Once cleared, you commit to walking alongside a brother for at least 12 weeks with bi-weekly sessions.'
  },
  {
    id: 'f6',
    question: 'How are my donations used?',
    answer: '100% of public donations directly fund our local outreach efforts, prison reentry supplies, mentorship curriculum, community food baskets, and youth adventure camps. Our general administrative costs are strictly kept below 15%, and our financial records are fully audited for stewardship.'
  },
  {
    id: 'f7',
    question: 'Do you offer professional counseling?',
    answer: 'We provide peer support, accountability, and spiritual mentorship. For clinical mental health needs, trauma recovery, or professional marriage therapy, we refer individuals to our hand-picked network of trusted, licensed Christian counselors.'
  },
  {
    id: 'f8',
    question: 'How can my church partner with WHENMEN?',
    answer: 'Churches can partner by hosting regional WHENMEN worship nights, utilizing our Discipleship Track for their men\'s groups, providing facility space for community outreach distributions, or sponsoring prison reentry packets. Contact us via our Partnership form!'
  },
  {
    id: 'f9',
    question: 'Do you have programs for teenage boys?',
    answer: 'Yes! WHENMEN Youth serves boys ages 8-18. We have WHENMEN Boys (ages 8-12) focused on father-son adventure, and WHENMEN Young Men (ages 13-18) focusing on leadership, career discovery, and peer accountability circles.'
  },
  {
    id: 'f10',
    question: 'How do I start a WHENMEN chapter in my city?',
    answer: 'We provide complete curriculum, training manuals, video resources, and direct coaching support for qualified men with a calling to lead. You must have a team of 3-5 committed brothers, authorization from a local partner church, and complete our Chapter Leadership Track.'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Pastor Lani Akinyode',
    title: 'Founder & President',
    bio: 'A pastor, speaker, and entrepreneur with over 20 years of men\'s ministry experience and a burning passion to raise a generation of praying men.',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'tm2',
    name: 'Robert S.',
    title: 'Board Member, Chair of Family Ministry',
    bio: 'Family counselor and advocate who dedicated his career to building parenting resources and restoring estranged fathers to their children.',
    socials: { linkedin: '#' }
  },
  {
    id: 'tm3',
    name: 'David R.',
    title: 'Outreach Coordinator & Secretary',
    bio: 'Coordinates all regional food distribution drives, prison visit programs, and community restoration efforts with dynamic administrative excellence.',
    socials: { linkedin: '#', facebook: '#' }
  },
  {
    id: 'tm4',
    name: 'Marcus T.',
    title: 'Discipleship Lead & Treasurer',
    bio: 'Oversees curriculum distribution, cohort metrics, and financial stewardship audits, ensuring every dollar fuels life-changing brotherhood.',
    socials: { linkedin: '#' }
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  { id: 'v1', role: 'Event Setup Team', timeCommitment: '4 hrs/month', description: 'Assist with layout, breakdown, lighting, and welcome signage for monthly worship nights and community outreaches.' },
  { id: 'v2', role: 'Mentorship Volunteer', timeCommitment: '2 hrs/week', description: 'Walk hand-in-hand with a brother through our 12-week Discipleship Track, providing prayer and daily text accountability.' },
  { id: 'v3', role: 'Worship Team', timeCommitment: 'Varies by cohort', description: 'Seeking skilled vocalists, acoustic/electric guitarists, keyboardists, and sound technicians to lead authentic worship atmospheres.' },
  { id: 'v4', role: 'Prison Ministry Volunteer', timeCommitment: '1 Saturday/month', description: 'Accompany certified staff on prison facility visits to lead scripture study, distribute devotionals, and offer hope.' },
  { id: 'v5', role: 'Admin & Communications', timeCommitment: '3 hrs/week', description: 'Contribute skills in social media management, creative writing, newsletter drafting, graphic design, or photography.' },
  { id: 'v6', role: 'Youth Mentor', timeCommitment: '2 hrs/week', description: 'Provide guidance, academic encouragement, and positive character modeling for teenage boys (Ages 13-18) in our youth track.' }
];

export const DONATION_TIERS: DonationTier[] = [
  { amount: 25, impact: 'Sponsors one man with the full 12-week Discipleship Track curriculum and study guides.' },
  { amount: 50, impact: 'Fully funds a prison visitation team outreach event, including 100 pocket devotionals.' },
  { amount: 100, impact: 'Supports a community family crisis workshop, providing dinner and study kits for 5 couples.' },
  { amount: 250, impact: 'Provides launch capital, banner resources, and curriculum packages for a new city chapter.' },
  { amount: 500, impact: 'Underwrites sound systems and staging for a regional worship night or local leadership cohort.' }
];

export const CORE_VALUES = [
  { emoji: '✝', title: 'Christ-Centered Living', description: 'Jesus Christ is the cornerstone of our lives, families, and everything we build.' },
  { emoji: '🙏', title: 'Prayer Without Ceasing', description: 'We pray consistently because raw prayer moves mountains and keeps us aligned with God.' },
  { emoji: '🎵', title: 'Worship as a Lifestyle', description: 'Our praise is unhindered and authentic, expressing deep gratitude to the Creator daily.' },
  { emoji: '⚖', title: 'Integrity in Leadership', description: 'We act with transparency and accountability, whether in private or in the public sphere.' },
  { emoji: '🤝', title: 'Brotherhood & Accountability', description: 'We lock shields together; no man is left behind to fight his spiritual battles alone.' },
  { emoji: '❤️', title: 'Compassionate Service', description: 'We show our faith through hands-on service, feeding the hungry and loving our neighbors.' },
  { emoji: '⭐', title: 'Excellence in All We Do', description: 'We bring our absolute best work, respect, and craftsmanship to honor God.' },
  { emoji: '👨‍👩‍👦', title: 'Family First', description: 'We protect and lead our families, loving our wives selflessly and guiding our children.' },
  { emoji: '🎯', title: 'Purposeful Impact', description: 'We live with high intentionality, fulfilling our calling and leaving a legacy of faith.' },
  { emoji: '🤗', title: 'Love Without Judgment', description: 'We welcome men from all backgrounds, offering redemption and grace to every stumbler.' }
];
