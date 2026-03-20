 import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PublicPortal() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const stats = [
    { value: '124+',    label: 'Registered NGOs',  icon: '🏛️' },
    { value: '45,000+', label: 'Lives Impacted',    icon: '❤️' },
    { value: '876+',    label: 'Volunteers',        icon: '👥' },
    { value: '₹12.4L',  label: 'Donations Raised',  icon: '💰' },
  ]

  const featuredNGOs = [
    { name: 'Green Earth Foundation', category: 'Environment', location: 'Chennai',    description: 'Working towards a greener planet.',          rating: 4.8, volunteers: 120 },
    { name: 'Bright Minds NGO',       category: 'Education',   location: 'Trichy',     description: 'Quality education for underprivileged.',     rating: 4.6, volunteers: 85  },
    { name: 'Health For All',         category: 'Health',      location: 'Coimbatore', description: 'Free medical camps for rural communities.',  rating: 4.9, volunteers: 60  },
    { name: 'Feed India',             category: 'Food',        location: 'Madurai',    description: 'Combating hunger across Tamil Nadu.',        rating: 4.7, volunteers: 95  },
  ]

  const successStories = [
    { id: 1, title: 'Clean Water For 500 Families',    ngo: 'Water For All',         description: 'Through our clean water initiative, 500 families in rural Salem now have access to safe drinking water.',   impact: '2,500 people', icon: '💧' },
    { id: 2, title: '1000 Children Back to School',    ngo: 'Bright Minds NGO',      description: 'Our education drive helped 1000 underprivileged children enroll in school across Trichy district.',          impact: '1,000 children', icon: '📚' },
    { id: 3, title: 'Free Medical Camp Success',       ngo: 'Health For All',        description: 'Our free medical camp served over 800 patients in remote villages with essential healthcare services.',        impact: '800 patients', icon: '🏥' },
  ]

  const upcomingEvents = [
    { name: 'Tree Plantation Drive',  ngo: 'Green Earth',  date: 'Dec 1, 2025',  location: 'Chennai',    volunteers: '20 needed' },
    { name: 'Free Medical Camp',      ngo: 'Health For All', date: 'Dec 10, 2025', location: 'Trichy',   volunteers: '15 needed' },
    { name: 'Food Distribution',      ngo: 'Feed India',   date: 'Dec 15, 2025', location: 'Madurai',    volunteers: '10 needed' },
    { name: 'Education Workshop',     ngo: 'Bright Minds', date: 'Dec 20, 2025', location: 'Coimbatore', volunteers: '8 needed'  },
  ]

  const sdgHighlights = [
    { id: 1,  name: 'No Poverty',        color: '#e5243b', progress: 72 },
    { id: 3,  name: 'Good Health',       color: '#4c9f38', progress: 81 },
    { id: 4,  name: 'Quality Education', color: '#c5192d', progress: 65 },
    { id: 6,  name: 'Clean Water',       color: '#26bde2', progress: 70 },
    { id: 13, name: 'Climate Action',    color: '#3f7e44', progress: 68 },
    { id: 17, name: 'Partnerships',      color: '#19486a', progress: 78 },
  ]

  const categoryColor = (cat) => {
    if (cat === 'Environment') return { backgroundColor: '#e8f5e9', color: '#2d6a4f' }
    if (cat === 'Education')   return { backgroundColor: '#e3f2fd', color: '#1565c0' }
    if (cat === 'Health')      return { backgroundColor: '#fce4ec', color: '#c62828' }
    if (cat === 'Food')        return { backgroundColor: '#fff8e1', color: '#f57f17' }
    return {}
  }

  return (
    <div style={styles.page}>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.navLogo}>🌍 NGO Connect</h1>
        <div style={styles.navLinks}>
          <a href="#ngos"    style={styles.navLink}>NGOs</a>
          <a href="#events"  style={styles.navLink}>Events</a>
          <a href="#impact"  style={styles.navLink}>Impact</a>
          <a href="#stories" style={styles.navLink}>Stories</a>
          <button onClick={() => navigate('/')}      style={styles.loginBtn}>Login</button>
          <button onClick={() => navigate('/register')} style={styles.registerBtn}>Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Connecting NGOs,<br />
            <span style={styles.heroHighlight}>Accelerating SDG Progress</span>
          </h1>
          <p style={styles.heroSubtitle}>
            A cloud-based platform empowering NGOs, donors, and volunteers
            to collaborate and create lasting social impact across India.
          </p>
          <div style={styles.heroBtns}>
            <button
              onClick={() => navigate('/register')}
              style={styles.heroBtn}>
              Get Started Free 🚀
            </button>
            <button
              onClick={() => navigate('/discover')}
              style={styles.heroBtn2}>
              Discover NGOs 🔍
            </button>
          </div>
        </div>

        {/* Stats in Hero */}
        <div style={styles.heroStats}>
          {stats.map((s, i) => (
            <div key={i} style={styles.heroStat}>
              <div style={styles.heroStatIcon}>{s.icon}</div>
              <div style={styles.heroStatValue}>{s.value}</div>
              <div style={styles.heroStatLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured NGOs */}
      <section id="ngos" style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>🏛️ Featured NGOs</h2>
          <p style={styles.sectionSubtitle}>
            Discover verified NGOs making a real difference
          </p>
          <div style={styles.ngoGrid}>
            {featuredNGOs.map((ngo, i) => (
              <div key={i} style={styles.ngoCard}>
                <div style={styles.ngoAvatar}>
                  {ngo.name.charAt(0)}
                </div>
                <h3 style={styles.ngoName}>{ngo.name}</h3>
                <div style={styles.ngoBadgeRow}>
                  <span style={{ ...styles.badge, ...categoryColor(ngo.category) }}>
                    {ngo.category}
                  </span>
                  <span style={styles.locationText}>📍 {ngo.location}</span>
                </div>
                <p style={styles.ngoDesc}>{ngo.description}</p>
                <div style={styles.ngoStats}>
                  <span>⭐ {ngo.rating}</span>
                  <span>👥 {ngo.volunteers} volunteers</span>
                </div>
                <button style={styles.viewBtn}>View Profile</button>
              </div>
            ))}
          </div>
          <div style={styles.centerBtn}>
            <button
              onClick={() => navigate('/discover')}
              style={styles.seeAllBtn}>
              See All NGOs →
            </button>
          </div>
        </div>
      </section>

      {/* SDG Progress */}
      <section id="impact" style={{ ...styles.section, backgroundColor: '#1b4332' }}>
        <div style={styles.sectionInner}>
          <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>🌍 SDG Progress</h2>
          <p style={{ ...styles.sectionSubtitle, color: '#aaa' }}>
            Tracking our collective progress towards the UN Sustainable Development Goals
          </p>
          <div style={styles.sdgGrid}>
            {sdgHighlights.map((sdg, i) => (
              <div key={i} style={styles.sdgCard}>
                <div style={{
                  ...styles.sdgNumber,
                  backgroundColor: sdg.color
                }}>
                  {sdg.id}
                </div>
                <div style={styles.sdgInfo}>
                  <div style={styles.sdgName}>{sdg.name}</div>
                  <div style={styles.sdgBarRow}>
                    <div style={styles.sdgBar}>
                      <div style={{
                        ...styles.sdgFill,
                        width: `${sdg.progress}%`,
                        backgroundColor: sdg.color
                      }} />
                    </div>
                    <span style={styles.sdgPercent}>{sdg.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.centerBtn}>
            <button
              onClick={() => navigate('/analytics')}
              style={styles.seeAllBtn}>
              View Full Analytics →
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>📅 Upcoming Events</h2>
          <p style={styles.sectionSubtitle}>Join events and make a difference</p>
          <div style={styles.eventGrid}>
            {upcomingEvents.map((e, i) => (
              <div key={i} style={styles.eventCard}>
                <div style={styles.eventDate}>{e.date}</div>
                <h3 style={styles.eventName}>{e.name}</h3>
                <p style={styles.eventMeta}>🏛️ {e.ngo}</p>
                <p style={styles.eventMeta}>📍 {e.location}</p>
                <p style={styles.eventMeta}>👥 {e.volunteers}</p>
                <button style={styles.joinBtn}>Join Event</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" style={{ ...styles.section, backgroundColor: '#f9f9f9' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>🌟 Success Stories</h2>
          <p style={styles.sectionSubtitle}>Real impact from real people</p>
          <div style={styles.storiesGrid}>
            {successStories.map(s => (
              <div key={s.id} style={styles.storyCard}>
                <div style={styles.storyIcon}>{s.icon}</div>
                <h3 style={styles.storyTitle}>{s.title}</h3>
                <p style={styles.storyNgo}>by {s.ngo}</p>
                <p style={styles.storyDesc}>{s.description}</p>
                <div style={styles.storyImpact}>
                  ❤️ Impact: <strong>{s.impact}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>⚙️ How It Works</h2>
          <p style={styles.sectionSubtitle}>Simple steps to get started</p>
          <div style={styles.stepsGrid}>
            {[
              { step: '01', title: 'Register',        desc: 'Create your account as NGO, Donor, or Volunteer in minutes.',        icon: '📝' },
              { step: '02', title: 'Get Verified',     desc: 'NGOs get verified through our OCR document verification system.',    icon: '✅' },
              { step: '03', title: 'Connect',          desc: 'Discover NGOs, join events, and make donations securely.',           icon: '🤝' },
              { step: '04', title: 'Track Impact',     desc: 'Monitor your contribution and see real-time SDG progress.',          icon: '📊' },
            ].map((s, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepNumber}>{s.step}</div>
                <div style={styles.stepIcon}>{s.icon}</div>
                <h3 style={styles.stepTitle}>{s.title}</h3>
                <p style={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ ...styles.section, backgroundColor: '#2d6a4f' }}>
        <div style={{ ...styles.sectionInner, textAlign: 'center' }}>
          <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>📧 Stay Updated</h2>
          <p style={{ ...styles.sectionSubtitle, color: '#aaa' }}>
            Subscribe to get updates on NGO activities and SDG progress
          </p>
          {subscribed ? (
            <div style={styles.subscribedMsg}>
              ✅ Thank you for subscribing!
            </div>
          ) : (
            <div style={styles.subscribeRow}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={styles.subscribeInput}
              />
              <button
                onClick={() => { if (email) setSubscribed(true) }}
                style={styles.subscribeBtn}>
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerCol}>
            <h3 style={styles.footerLogo}>🌍 NGO Connect</h3>
            <p style={styles.footerDesc}>
              A cloud-based platform accelerating SDG progress through
              NGO collaboration and transparency.
            </p>
          </div>
          <div style={styles.footerCol}>
            <h4 style={styles.footerTitle}>Platform</h4>
            <p style={styles.footerLink} onClick={() => navigate('/discover')}>Discover NGOs</p>
            <p style={styles.footerLink} onClick={() => navigate('/analytics')}>Analytics</p>
            <p style={styles.footerLink} onClick={() => navigate('/register')}>Register</p>
          </div>
          <div style={styles.footerCol}>
            <h4 style={styles.footerTitle}>For</h4>
            <p style={styles.footerLink}>NGOs</p>
            <p style={styles.footerLink}>Donors</p>
            <p style={styles.footerLink}>Volunteers</p>
          </div>
          <div style={styles.footerCol}>
            <h4 style={styles.footerTitle}>Contact</h4>
            <p style={styles.footerLink}>📧 info@ngoconnect.in</p>
            <p style={styles.footerLink}>📞 +91 88078 50078</p>
            <p style={styles.footerLink}>📍 Trichy, Tamil Nadu</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© 2025 NGO Connect. Built for SDG Progress. K.Ramakrishnan College of Engineering.</p>
        </div>
      </footer>

    </div>
  )
}

const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", margin: 0, padding: 0 },
  navbar: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '16px 48px',
    backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    position: 'sticky', top: 0, zIndex: 100
  },
  navLogo: { fontSize: '22px', color: '#1b4332', margin: 0 },
  navLinks: { display: 'flex', alignItems: 'center', gap: '24px' },
  navLink: {
    color: '#555', textDecoration: 'none',
    fontSize: '14px', fontWeight: '500', cursor: 'pointer'
  },
  loginBtn: {
    padding: '8px 20px', backgroundColor: 'transparent',
    color: '#2d6a4f', border: '1px solid #2d6a4f',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: '14px', fontWeight: '600'
  },
  registerBtn: {
    padding: '8px 20px', backgroundColor: '#2d6a4f',
    color: '#fff', border: 'none',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: '14px', fontWeight: '600'
  },
  hero: {
    backgroundColor: '#1b4332', padding: '80px 48px 60px',
    color: '#fff'
  },
  heroContent: { maxWidth: '700px', margin: '0 auto', textAlign: 'center' },
  heroTitle: { fontSize: '42px', fontWeight: 'bold', marginBottom: '16px', lineHeight: 1.3 },
  heroHighlight: { color: '#52b788' },
  heroSubtitle: { fontSize: '16px', color: '#aaa', marginBottom: '32px', lineHeight: 1.6 },
  heroBtns: { display: 'flex', gap: '16px', justifyContent: 'center' },
  heroBtn: {
    padding: '14px 28px', backgroundColor: '#52b788',
    color: '#fff', border: 'none', borderRadius: '10px',
    cursor: 'pointer', fontSize: '16px', fontWeight: '600'
  },
  heroBtn2: {
    padding: '14px 28px', backgroundColor: 'transparent',
    color: '#fff', border: '2px solid #fff',
    borderRadius: '10px', cursor: 'pointer',
    fontSize: '16px', fontWeight: '600'
  },
  heroStats: {
    display: 'flex', justifyContent: 'center',
    gap: '48px', marginTop: '60px',
    paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  heroStat: { textAlign: 'center' },
  heroStatIcon: { fontSize: '28px', marginBottom: '8px' },
  heroStatValue: { fontSize: '28px', fontWeight: 'bold', color: '#52b788' },
  heroStatLabel: { fontSize: '13px', color: '#aaa' },
  section: { padding: '60px 0', backgroundColor: '#fff' },
  sectionInner: { maxWidth: '1200px', margin: '0 auto', padding: '0 48px' },
  sectionTitle: { fontSize: '28px', color: '#1b4332', textAlign: 'center', marginBottom: '8px' },
  sectionSubtitle: { color: '#888', textAlign: 'center', marginBottom: '40px', fontSize: '15px' },
  ngoGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
  ngoCard: {
    border: '1px solid #e0e0e0', borderRadius: '12px',
    padding: '20px', textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  ngoAvatar: {
    width: '56px', height: '56px', borderRadius: '50%',
    backgroundColor: '#2d6a4f', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', fontWeight: 'bold',
    margin: '0 auto 12px'
  },
  ngoName: { fontSize: '15px', color: '#1b4332', marginBottom: '8px' },
  ngoBadgeRow: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '10px' },
  badge: { padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' },
  locationText: { fontSize: '12px', color: '#888' },
  ngoDesc: { fontSize: '13px', color: '#666', marginBottom: '12px', lineHeight: 1.5 },
  ngoStats: {
    display: 'flex', justifyContent: 'center',
    gap: '16px', fontSize: '13px', color: '#555',
    marginBottom: '12px'
  },
  viewBtn: {
    width: '100%', padding: '8px',
    backgroundColor: '#2d6a4f', color: '#fff',
    border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px', fontWeight: '600'
  },
  centerBtn: { textAlign: 'center', marginTop: '32px' },
  seeAllBtn: {
    padding: '12px 28px', backgroundColor: 'transparent',
    color: '#2d6a4f', border: '2px solid #2d6a4f',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: '14px', fontWeight: '600'
  },
  sdgGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  sdgCard: {
    display: 'flex', alignItems: 'center', gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '16px', borderRadius: '10px'
  },
  sdgNumber: {
    width: '40px', height: '40px', borderRadius: '8px',
    color: '#fff', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '16px',
    fontWeight: 'bold', flexShrink: 0
  },
  sdgInfo: { flex: 1 },
  sdgName: { fontSize: '13px', color: '#fff', marginBottom: '6px', fontWeight: '600' },
  sdgBarRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  sdgBar: {
    flex: 1, height: '6px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '4px', overflow: 'hidden'
  },
  sdgFill: { height: '100%', borderRadius: '4px' },
  sdgPercent: { fontSize: '12px', color: '#aaa', width: '36px' },
  eventGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
  eventCard: {
    border: '1px solid #e0e0e0', borderRadius: '12px',
    padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  eventDate: {
    fontSize: '12px', color: '#2d6a4f',
    fontWeight: '600', marginBottom: '8px'
  },
  eventName: { fontSize: '15px', color: '#1b4332', marginBottom: '8px' },
  eventMeta: { fontSize: '12px', color: '#888', marginBottom: '4px' },
  joinBtn: {
    width: '100%', marginTop: '12px', padding: '8px',
    backgroundColor: '#2d6a4f', color: '#fff',
    border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px', fontWeight: '600'
  },
  storiesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  storyCard: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
  },
  storyIcon: { fontSize: '36px', marginBottom: '12px' },
  storyTitle: { fontSize: '17px', color: '#1b4332', marginBottom: '6px' },
  storyNgo: { fontSize: '13px', color: '#2d6a4f', fontWeight: '600', marginBottom: '10px' },
  storyDesc: { fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '12px' },
  storyImpact: {
    fontSize: '13px', color: '#555',
    backgroundColor: '#e8f5e9', padding: '8px 12px',
    borderRadius: '6px'
  },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' },
  stepCard: { textAlign: 'center', padding: '24px' },
  stepNumber: {
    fontSize: '36px', fontWeight: 'bold',
    color: '#e0e0e0', marginBottom: '8px'
  },
  stepIcon: { fontSize: '32px', marginBottom: '12px' },
  stepTitle: { fontSize: '17px', color: '#1b4332', marginBottom: '8px' },
  stepDesc: { fontSize: '13px', color: '#888', lineHeight: 1.6 },
  subscribeRow: { display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' },
  subscribeInput: {
    padding: '12px 20px', borderRadius: '8px',
    border: 'none', fontSize: '14px',
    width: '320px', outline: 'none'
  },
  subscribeBtn: {
    padding: '12px 24px', backgroundColor: '#1b4332',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600'
  },
  subscribedMsg: {
    backgroundColor: '#e8f5e9', color: '#2d6a4f',
    padding: '16px 32px', borderRadius: '8px',
    fontSize: '16px', fontWeight: '600',
    display: 'inline-block', marginTop: '24px'
  },
  footer: { backgroundColor: '#1b4332', padding: '48px 48px 24px' },
  footerInner: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px', maxWidth: '1200px',
    margin: '0 auto', paddingBottom: '32px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  footerCol: {},
  footerLogo: { color: '#fff', fontSize: '20px', marginBottom: '12px' },
  footerDesc: { color: '#aaa', fontSize: '13px', lineHeight: 1.6 },
  footerTitle: { color: '#fff', fontSize: '15px', marginBottom: '16px' },
  footerLink: {
    color: '#aaa', fontSize: '13px',
    marginBottom: '8px', cursor: 'pointer'
  },
  footerBottom: {
    textAlign: 'center', paddingTop: '24px',
    color: '#aaa', fontSize: '13px',
    maxWidth: '1200px', margin: '0 auto'
  },
}

export default PublicPortal
