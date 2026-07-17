import React from 'react';
import { Users, Mail, DollarSign, HandHeart, TrendingUp, PlusCircle, BookOpen, Send, ArrowUpRight } from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

const STAT_CARDS = [
  { label: 'Total Members', value: '2,847', trend: '+12%', up: true, icon: Users, color: '#6366f1' },
  { label: 'Newsletter Subscribers', value: '1,243', trend: '+8%', up: true, icon: Mail, color: '#10b981' },
  { label: 'Donations This Month', value: '$12,450', trend: '+22%', up: true, icon: DollarSign, color: '#eb8e09' },
  { label: 'Prayer Requests', value: '34', trend: '7 new this week', up: true, icon: HandHeart, color: '#8b5cf6' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const MEMBER_DATA = [420, 780, 1100, 1480, 2050, 2847];
const GIVING_DATA = [3200, 5400, 8100, 9800, 11200, 12450];

const ACTIVITY = [
  { icon: HandHeart, color: '#8b5cf6', text: 'New prayer request received from Marcus T.', time: '2 min ago', badge: 'Prayer' },
  { icon: DollarSign, color: '#eb8e09', text: 'Donation of $150 received — Robert S.', time: '18 min ago', badge: 'Giving' },
  { icon: Users, color: '#10b981', text: 'James K. joined as a new member', time: '1 hr ago', badge: 'Member' },
  { icon: BookOpen, color: '#6366f1', text: 'Blog post "Fatherhood by Intention" published', time: '3 hr ago', badge: 'Blog' },
  { icon: Mail, color: '#06b6d4', text: 'Contact message from Emmanuel A. (Dallas)', time: '4 hr ago', badge: 'Inbox' },
  { icon: HandHeart, color: '#8b5cf6', text: 'Prayer request marked as Prayed — David R.', time: '5 hr ago', badge: 'Prayer' },
  { icon: TrendingUp, color: '#10b981', text: '5 new subscribers joined newsletter', time: '6 hr ago', badge: 'Growth' },
  { icon: DollarSign, color: '#eb8e09', text: 'Monthly recurring donation — Angela K. ($50)', time: '8 hr ago', badge: 'Giving' },
];

function LineChart() {
  const W = 340, H = 120, PAD = 16;
  const maxVal = Math.max(...MEMBER_DATA);
  const pts = MEMBER_DATA.map((v, i) => {
    const x = PAD + (i / (MEMBER_DATA.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((v / maxVal) * (H - PAD * 2));
    return `${x},${y}`;
  });
  const area = `M${pts[0]} L${pts.slice(1).join(' L')} L${(PAD + (W - PAD * 2))},${H} L${PAD},${H} Z`;
  const line = `M${pts[0]} L${pts.slice(1).join(' L')}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 120 }}>
      <defs>
        <linearGradient id="lgm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eb8e09" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#eb8e09" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lgm)" />
      <path d={line} fill="none" stroke="#eb8e09" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {MEMBER_DATA.map((v, i) => {
        const x = PAD + (i / (MEMBER_DATA.length - 1)) * (W - PAD * 2);
        const y = H - PAD - ((v / maxVal) * (H - PAD * 2));
        return <circle key={i} cx={x} cy={y} r={4} fill="#eb8e09" stroke="#13131f" strokeWidth={2} />;
      })}
    </svg>
  );
}

function BarChart() {
  const W = 340, H = 120, PAD = 16;
  const maxVal = Math.max(...GIVING_DATA);
  const barW = ((W - PAD * 2) / GIVING_DATA.length) * 0.55;
  const gap = ((W - PAD * 2) / GIVING_DATA.length);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 120 }}>
      {GIVING_DATA.map((v, i) => {
        const barH = ((v / maxVal) * (H - PAD * 2));
        const x = PAD + i * gap + (gap - barW) / 2;
        const y = H - PAD - barH;
        return (
          <rect key={i} x={x} y={y} width={barW} height={barH} rx={4}
            fill={i === GIVING_DATA.length - 1 ? '#eb8e09' : 'rgba(235,142,9,0.35)'} />
        );
      })}
    </svg>
  );
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  return (
    <div>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, marginBottom: 28 }}>
        {STAT_CARDS.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} style={{
              background: '#13131f', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '20px 20px 18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ background: `${card.color}1a`, borderRadius: 10, padding: 9 }}>
                  <Icon size={20} color={card.color} />
                </div>
                <span style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: 'rgba(16,185,129,0.12)', color: '#10b981',
                  border: '1px solid rgba(16,185,129,0.2)', borderRadius: 100,
                  fontSize: '0.72rem', fontWeight: 700, padding: '3px 9px',
                }}>
                  <ArrowUpRight size={10} />{card.trend}
                </span>
              </div>
              <p style={{ color: '#f1f1f1', fontSize: '1.75rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 4px' }}>
                {card.value}
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.83rem', margin: 0 }}>{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 28 }}>
        <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '0.97rem', fontWeight: 600, margin: 0 }}>
              Membership Growth
            </h3>
            <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>Last 6 months</span>
          </div>
          <LineChart />
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
            {MONTHS.map(m => (
              <span key={m} style={{ color: '#374151', fontSize: '0.72rem' }}>{m}</span>
            ))}
          </div>
        </div>
        <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '0.97rem', fontWeight: 600, margin: 0 }}>
              Giving by Month
            </h3>
            <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>Last 6 months</span>
          </div>
          <BarChart />
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
            {MONTHS.map(m => (
              <span key={m} style={{ color: '#374151', fontSize: '0.72rem' }}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Activity + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {/* Activity Feed */}
        <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
          <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '0.97rem', fontWeight: 600, margin: '0 0 16px' }}>
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ACTIVITY.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ background: `${a.color}1a`, borderRadius: 8, padding: 7, flexShrink: 0 }}>
                    <Icon size={14} color={a.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: '#d1d5db', fontSize: '0.82rem', margin: '0 0 3px', lineHeight: 1.4 }}>{a.text}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#6b7280', fontSize: '0.72rem' }}>{a.time}</span>
                      <span style={{ background: 'rgba(255,255,255,0.06)', color: '#9ca3af', borderRadius: 100, fontSize: '0.67rem', padding: '1px 7px' }}>{a.badge}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
            <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '0.97rem', fontWeight: 600, margin: '0 0 16px' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Create Event', icon: PlusCircle, path: '/admin/dashboard/events', color: '#eb8e09' },
                { label: 'Add Blog Post', icon: BookOpen, path: '/admin/dashboard/blog', color: '#6366f1' },
                { label: 'Send Newsletter', icon: Send, path: '/admin/dashboard/subscribers', color: '#10b981' },
              ].map(action => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => onNavigate(action.path)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 10, padding: '12px 14px', cursor: 'pointer',
                      color: '#d1d5db', fontSize: '0.88rem', fontWeight: 500,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  >
                    <div style={{ background: `${action.color}1a`, borderRadius: 8, padding: 7 }}>
                      <Icon size={15} color={action.color} />
                    </div>
                    {action.label}
                    <ArrowUpRight size={14} color="#374151" style={{ marginLeft: 'auto' }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary mini cards */}
          <div style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
            <h3 style={{ color: '#f1f1f1', fontFamily: "'Outfit', sans-serif", fontSize: '0.97rem', fontWeight: 600, margin: '0 0 14px' }}>
              Ministry Snapshot
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Active Events', value: '5', color: '#eb8e09' },
                { label: 'Unread Messages', value: '3', color: '#ef4444' },
                { label: 'Published Blog Posts', value: '5', color: '#6366f1' },
                { label: 'Team Members', value: '4', color: '#10b981' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.83rem' }}>{s.label}</span>
                  <span style={{ color: s.color, fontWeight: 700, fontSize: '0.97rem', fontFamily: "'Outfit', sans-serif" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
