import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PublicPortal() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [counter, setCounter] = useState({ ngos: 0, lives: 0, volunteers: 0, donations: 0 })
  const [menuOpen, setMenuOpen] = useState(false)

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Counter animation
  useEffect(() => {
    const targets = { ngos: 124, lives: 45000, volunteers: 876, donations: 124 }
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      setCounter({
        ngos:       Math.floor(targets.ngos       * progress),
        lives:      Math.floor(targets.lives      * progress),
        volunteers: Math.floor(targets.volunteers * progress),
        donations:  Math.floor(targets.donations  * progress),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    { name: 'Rahul Kumar',  role: 'Donor',     text: 'NGO Connect made it so easy to find and donate to verified NGOs. I can track exactly how my money is being used!',          avatar: 'R', location: 'Chennai'    },
    { name: 'Priya Sharma', role: 'Volunteer',  text: 'I found amazing volunteering opportunities through this platform. The event management system is incredibly well designed.',  avatar: 'P', location: 'Trichy'     },
    { name: 'Dr. Anand',    role: 'NGO Leader', text: 'Our NGO grew significantly after joining NGO Connect. The donor base and volunteer network has transformed our operations.',   avatar: 'A', location: 'Coimbatore' },
  ]

  const sdgGoals = [
    { id: 1,  name: 'No Poverty',             color: '#e5243b', emoji: '🏚️' },
    { id: 2,  name: 'Zero Hunger',            color: '#dda63a', emoji: '🌾' },
    { id: 3,  name: 'Good Health',            color: '#4c9f38', emoji: '💊' },
    { id: 4,  name: 'Quality Education',      color: '#c5192d', emoji: '📚' },
    { id: 5,  name: 'Gender Equality',        color: '#ff3a21', emoji: '⚖️' },
    { id: 6,  name: 'Clean Water',            color: '#26bde2', emoji: '💧' },
    { id: 13, name: 'Climate Action',         color: '#3f7e44', emoji: '🌍' },
    { id: 17, name: 'Partnerships',           color: '#19486a', emoji: '🤝' },
  ]

  const features = [
    { icon: '🔒', title: 'Secure & Verified',      desc: 'All NGOs are verified through OCR document verification and government API integration'    },
    { icon: '💰', title: 'Transparent Donations',  desc: 'Track every rupee you donate with real-time impact dashboards and detailed reports'        },
    { icon: '🌍', title: 'SDG Aligned',            desc: 'Every activity is mapped to the UN Sustainable Development Goals for maximum impact'       },
    { icon: '🤝', title: 'Community Driven',        desc: 'Connect NGOs, donors, and volunteers in one unified platform for coordinated action'       },
    { icon: '📊', title: 'Real-time Analytics',    desc: 'Powerful dashboards showing live impact metrics, donation tracking and SDG progress'        },
    { icon: '🌐', title: 'Multilingual Support',   desc: 'Breaking language barriers with multilingual support for inclusive participation'           },
  ]

  const navLinks = [
    { label: 'Home',      href: '#home'      },
    { label: 'NGOs',      href: '#ngos'      },
    { label: 'Impact',    href: '#impact'    },
    { label: 'Events',    href: '#events'    },
    { label: 'Stories',   href: '#stories'   },
    { label: 'About',     href: '#about'     },
  ]

  const featuredNGOs = [
    { name: 'Green Earth Foundation', category: 'Environment', location: 'Chennai',    description: 'Working towards a greener planet through tree plantation.',  rating: 4.8, volunteers: 120, color: '#2d6a4f' },
    { name: 'Bright Minds NGO',       category: 'Education',   location: 'Trichy',     description: 'Quality education for underprivileged children.',            rating: 4.6, volunteers: 85,  color: '#1565c0' },
    { name: 'Health For All',         category: 'Health',      location: 'Coimbatore', description: 'Free medical camps for rural communities.',                  rating: 4.9, volunteers: 60,  color: '#c62828' },
    { name: 'Feed India',             category: 'Food',        location: 'Madurai',    description: 'Combating hunger across Tamil Nadu.',                        rating: 4.7, volunteers: 95,  color: '#f57f17' },
  ]

  return (
    <div style={styles.page}>

      {/* Navbar */}
      <nav style={{
        ...styles.navbar,
        backgroundColor: scrolled ? 'rgba(27, 67, 50, 0.98)' : 'transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
        backdropFilter: scrolled ? 'blur(10px)' : 'none'
      }}>
        <h1 style={styles.navLogo}>🌍 NGO Connect</h1>

        {/* Desktop Nav */}
        <div style={styles.navLinks}>
          {navLinks.map((link, i) => (
            <a key={i} href={link.href} style={styles.navLink}>{link.label}</a>
          ))}
        </div>

        <div style={styles.navBtns}>
          <button onClick={() => navigate('/')}         style={styles.loginBtn}>Login</button>
          <button onClick={() => navigate('/register')} style={styles.registerBtn}>Get Started</button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={styles.menuBtn}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link, i) => (
            <a key={i} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={styles.mobileLink}>
              {link.label}
            </a>
          ))}
          <button onClick={() => navigate('/')}         style={styles.mobilLoginBtn}>Login</button>
          <button onClick={() => navigate('/register')} style={styles.mobileRegBtn}>Get Started</button>
        </div>
      )}

      {/* Hero Section with Video Background */}
      <section id="home" style={styles.hero}>
        {/* Animated background */}
        <div style={styles.heroBg}>
          <div style={styles.heroCircle1} />
          <div style={styles.heroCircle2} />
          <div style={styles.heroCircle3} />
        </div>

        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            🌟 Empowering Social Change Since 2024
          </div>
          <h1 style={styles.heroTitle}>
            Connecting NGOs,<br />
            <span style={styles.heroHighlight}>Accelerating SDG Progress</span>
          </h1>
          <p style={styles.heroSubtitle}>
            A cloud-based platform empowering NGOs, donors, and volunteers
            to collaborate and create lasting social impact across India.
            Join us in achieving all 17 UN Sustainable Development Goals.
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
            <button
              onClick={() => navigate('/analytics')}
              style={styles.heroBtn3}>
              View Impact 📊
            </button>
          </div>
        </div>

        {/* Animated Counter Stats */}
        <div style={styles.heroStats}>
          {[
            { value: `${counter.ngos}+`,        label: 'Registered NGOs',  icon: '🏛️' },
            { value: `${counter.lives.toLocaleString()}+`, label: 'Lives Impacted', icon: '❤️' },
            { value: `${counter.volunteers}+`,  label: 'Volunteers',       icon: '👥' },
            { value: `₹${counter.donations}L+`, label: 'Donations Raised', icon: '💰' },
          ].map((s, i) => (
            <div key={i} style={styles.heroStat}>
              <div style={styles.heroStatIcon}>{s.icon}</div>
              <div style={styles.heroStatValue}>{s.value}</div>
              <div style={styles.heroStatLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={styles.scrollIndicator}>
          <div style={styles.scrollDot} />
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>Why NGO Connect?</span>
            <h2 style={styles.sectionTitle}>Everything you need to create impact</h2>
            <p style={styles.sectionSubtitle}>
              Our platform combines cutting-edge technology with social purpose
            </p>
          </div>
          <div style={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} style={styles.featureCard}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured NGOs */}
      <section id="ngos" style={styles.ngosSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>Featured NGOs</span>
            <h2 style={styles.sectionTitle}>NGOs Making a Difference</h2>
            <p style={styles.sectionSubtitle}>
              Discover verified NGOs working across various social causes
            </p>
          </div>
          <div style={styles.ngoGrid}>
            {featuredNGOs.map((ngo, i) => (
              <div key={i} style={styles.ngoCard}>
                <div style={{ ...styles.ngoCardTop, backgroundColor: ngo.color }}>
                  <div style={styles.ngoAvatar}>{ngo.name.charAt(0)}</div>
                  <span style={styles.ngoCategoryBadge}>{ngo.category}</span>
                </div>
                <div style={styles.ngoCardBody}>
                  <h3 style={styles.ngoName}>{ngo.name}</h3>
                  <p style={styles.ngoLocation}>📍 {ngo.location}</p>
                  <p style={styles.ngoDesc}>{ngo.description}</p>
                  <div style={styles.ngoStats}>
                    <span>⭐ {ngo.rating}</span>
                    <span>👥 {ngo.volunteers} volunteers</span>
                  </div>
                  <button
                    onClick={() => navigate('/discover')}
                    style={{ ...styles.ngoBtn, backgroundColor: ngo.color }}>
                    View Profile →
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.centerBtn}>
            <button onClick={() => navigate('/discover')} style={styles.seeAllBtn}>
              See All NGOs →
            </button>
          </div>
        </div>
      </section>

      {/* SDG Goals Section */}
      <section id="impact" style={styles.sdgSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={{ ...styles.sectionTag, backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              UN SDGs
            </span>
            <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>
              Working Towards All 17 SDGs
            </h2>
            <p style={{ ...styles.sectionSubtitle, color: '#aaa' }}>
              Every NGO activity is aligned with the UN Sustainable Development Goals
            </p>
          </div>
          <div style={styles.sdgGrid}>
            {sdgGoals.map((sdg, i) => (
              <div key={i} style={styles.sdgCard}>
                <div style={{
                  ...styles.sdgNumber,
                  backgroundColor: sdg.color
                }}>
                  {sdg.emoji}
                </div>
                <div style={styles.sdgInfo}>
                  <span style={styles.sdgId}>SDG {sdg.id}</span>
                  <span style={styles.sdgName}>{sdg.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.centerBtn}>
            <button
              onClick={() => navigate('/analytics')}
              style={styles.analyticsBtn}>
              View Full SDG Progress →
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.howSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>How It Works</span>
            <h2 style={styles.sectionTitle}>Simple Steps to Get Started</h2>
            <p style={styles.sectionSubtitle}>Join thousands of changemakers in just 4 steps</p>
          </div>
          <div style={styles.stepsGrid}>
            {[
              { step: '01', icon: '📝', title: 'Register',      desc: 'Create your account as NGO, Donor, or Volunteer in minutes',          color: '#2d6a4f' },
              { step: '02', icon: '✅', title: 'Get Verified',   desc: 'NGOs get verified through our advanced OCR document system',           color: '#1565c0' },
              { step: '03', icon: '🤝', title: 'Connect',        desc: 'Discover NGOs, join events, and make secure donations',                color: '#6a1b9a' },
              { step: '04', icon: '📊', title: 'Track Impact',   desc: 'Monitor your contribution and see real-time SDG progress',             color: '#c62828' },
            ].map((s, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={{ ...styles.stepNum, backgroundColor: s.color }}>{s.step}</div>
                <div style={styles.stepIcon}>{s.icon}</div>
                <h3 style={styles.stepTitle}>{s.title}</h3>
                <p style={styles.stepDesc}>{s.desc}</p>
                {i < 3 && <div style={styles.stepArrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" style={styles.testimonialsSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>Testimonials</span>
            <h2 style={styles.sectionTitle}>What Our Community Says</h2>
            <p style={styles.sectionSubtitle}>Real stories from real people making a difference</p>
          </div>
          <div style={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} style={styles.testimonialCard}>
                <div style={styles.quoteIcon}>"</div>
                <p style={styles.testimonialText}>{t.text}</p>
                <div style={styles.testimonialAuthor}>
                  <div style={styles.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <h4 style={styles.testimonialName}>{t.name}</h4>
                    <p style={styles.testimonialRole}>{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <div style={styles.ctaBox}>
            <h2 style={styles.ctaTitle}>Ready to Make a Difference?</h2>
            <p style={styles.ctaDesc}>
              Join thousands of NGOs, donors, and volunteers already creating
              impact on our platform. It's free to get started!
            </p>
            <div style={styles.ctaBtns}>
              <button onClick={() => navigate('/register')} style={styles.ctaBtn1}>
                🚀 Join as Donor
              </button>
              <button onClick={() => navigate('/register')} style={styles.ctaBtn2}>
                🏛️ Register NGO
              </button>
              <button onClick={() => navigate('/register')} style={styles.ctaBtn3}>
                🤝 Become Volunteer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={styles.newsletterSection}>
        <div style={styles.container}>
          <div style={styles.newsletterBox}>
            <div style={styles.newsletterLeft}>
              <h3 style={styles.newsletterTitle}>📧 Stay Updated</h3>
              <p style={styles.newsletterDesc}>
                Get weekly updates on NGO activities and SDG progress
              </p>
            </div>
            <div style={styles.newsletterRight}>
              {subscribed ? (
                <div style={styles.subscribedMsg}>✅ Thank you for subscribing!</div>
              ) : (
                <div style={styles.subscribeRow}>
                  <input
                    type="email"
                    placeholder="Enter your email"
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div style={styles.footerCol}>
              <h3 style={styles.footerLogo}>🌍 NGO Connect</h3>
              <p style={styles.footerDesc}>
                A cloud-based platform accelerating SDG progress through
                NGO collaboration and transparency.
              </p>
              <p style={styles.footerDesc}>
                Built by students of K.Ramakrishnan College of Engineering,
                Trichy under Anna University.
              </p>
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Platform</h4>
              {[
                { label: 'Discover NGOs', path: '/discover'  },
                { label: 'Analytics',     path: '/analytics' },
                { label: 'Live Chat',     path: '/chat'      },
                { label: 'Register',      path: '/register'  },
              ].map((item, i) => (
                <p key={i}
                  onClick={() => navigate(item.path)}
                  style={styles.footerLink}>
                  {item.label}
                </p>
              ))}
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>For</h4>
              {['NGOs', 'Donors', 'Volunteers', 'Government'].map((item, i) => (
                <p key={i} style={styles.footerLink}>{item}</p>
              ))}
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.footerTitle}>Contact</h4>
              <p style={styles.footerLink}>📧 info@ngoconnect.in</p>
              <p style={styles.footerLink}>📞 +91 98765 43210</p>
              <p style={styles.footerLink}>📍 Trichy, Tamil Nadu</p>
              <p style={styles.footerLink}>🏛️ K.Ramakrishnan College</p>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>© 2025 NGO Connect. Built for SDG Progress.</p>
            <p>K.Ramakrishnan College of Engineering, Trichy | Anna University</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", margin: 0, padding: 0, overflowX: 'hidden' },

  // Navbar
  navbar: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '16px 48px',
    position: 'fixed', top: 0, left: 0, right: 0,
    zIndex: 1000, transition: 'all 0.3s ease'
  },
  navLogo: { fontSize: '22px', color: '#fff', margin: 0, fontWeight: 'bold' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '32px' },
  navLink: { color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
  navBtns: { display: 'flex', gap: '12px', alignItems: 'center' },
  loginBtn: {
    padding: '8px 20px', backgroundColor: 'transparent',
    color: '#fff', border: '1px solid rgba(255,255,255,0.5)',
    borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
  },
  registerBtn: {
    padding: '8px 20px', backgroundColor: '#52b788',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600'
  },
  menuBtn: {
    display: 'none', backgroundColor: 'transparent',
    border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer'
  },
  mobileMenu: {
    position: 'fixed', top: '60px', left: 0, right: 0,
    backgroundColor: '#1b4332', padding: '20px',
    zIndex: 999, display: 'flex', flexDirection: 'column', gap: '16px'
  },
  mobileLink: { color: '#fff', textDecoration: 'none', fontSize: '16px' },
  mobilLoginBtn: {
    padding: '10px', backgroundColor: 'transparent',
    color: '#fff', border: '1px solid #fff', borderRadius: '8px', cursor: 'pointer'
  },
  mobileRegBtn: {
    padding: '10px', backgroundColor: '#52b788',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontWeight: '600'
  },

  // Hero
  hero: {
    minHeight: '100vh', backgroundColor: '#1b4332',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '120px 48px 60px', position: 'relative', overflow: 'hidden'
  },
  heroBg: { position: 'absolute', inset: 0, overflow: 'hidden' },
  heroCircle1: {
    position: 'absolute', width: '600px', height: '600px',
    borderRadius: '50%', backgroundColor: 'rgba(82, 183, 136, 0.1)',
    top: '-200px', right: '-200px', animation: 'pulse 4s ease-in-out infinite'
  },
  heroCircle2: {
    position: 'absolute', width: '400px', height: '400px',
    borderRadius: '50%', backgroundColor: 'rgba(82, 183, 136, 0.08)',
    bottom: '-100px', left: '-100px'
  },
  heroCircle3: {
    position: 'absolute', width: '200px', height: '200px',
    borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)',
    top: '40%', left: '20%'
  },
  heroContent: { textAlign: 'center', maxWidth: '800px', position: 'relative', zIndex: 1 },
  heroBadge: {
    display: 'inline-block', backgroundColor: 'rgba(82, 183, 136, 0.2)',
    color: '#52b788', padding: '8px 20px', borderRadius: '20px',
    fontSize: '14px', fontWeight: '600', marginBottom: '24px',
    border: '1px solid rgba(82, 183, 136, 0.3)'
  },
  heroTitle: {
    fontSize: '56px', fontWeight: '800', color: '#fff',
    lineHeight: 1.2, marginBottom: '20px'
  },
  heroHighlight: { color: '#52b788' },
  heroSubtitle: {
    fontSize: '18px', color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.7, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px'
  },
  heroBtns: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
  heroBtn: {
    padding: '16px 32px', backgroundColor: '#52b788',
    color: '#fff', border: 'none', borderRadius: '10px',
    cursor: 'pointer', fontSize: '16px', fontWeight: '700',
    boxShadow: '0 4px 20px rgba(82,183,136,0.4)'
  },
  heroBtn2: {
    padding: '16px 32px', backgroundColor: 'transparent',
    color: '#fff', border: '2px solid rgba(255,255,255,0.5)',
    borderRadius: '10px', cursor: 'pointer', fontSize: '16px', fontWeight: '600'
  },
  heroBtn3: {
    padding: '16px 32px', backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '10px', cursor: 'pointer', fontSize: '16px', fontWeight: '600'
  },
  heroStats: {
    display: 'flex', justifyContent: 'center', gap: '48px',
    marginTop: '80px', paddingTop: '40px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    position: 'relative', zIndex: 1, flexWrap: 'wrap'
  },
  heroStat: { textAlign: 'center' },
  heroStatIcon: { fontSize: '32px', marginBottom: '8px' },
  heroStatValue: { fontSize: '36px', fontWeight: '800', color: '#52b788', marginBottom: '4px' },
  heroStatLabel: { fontSize: '14px', color: 'rgba(255,255,255,0.6)' },
  scrollIndicator: {
    position: 'absolute', bottom: '32px',
    display: 'flex', justifyContent: 'center', width: '100%'
  },
  scrollDot: {
    width: '6px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: '3px'
  },

  // Container
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 48px' },

  // Section headers
  sectionHeader: { textAlign: 'center', marginBottom: '48px' },
  sectionTag: {
    display: 'inline-block', backgroundColor: '#e8f5e9',
    color: '#2d6a4f', padding: '6px 16px', borderRadius: '20px',
    fontSize: '13px', fontWeight: '700', marginBottom: '12px'
  },
  sectionTitle: { fontSize: '36px', color: '#1b4332', marginBottom: '12px', fontWeight: '700' },
  sectionSubtitle: { fontSize: '16px', color: '#888', maxWidth: '600px', margin: '0 auto' },

  // Features
  featuresSection: { padding: '80px 0', backgroundColor: '#fff' },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  featureCard: {
    padding: '32px', borderRadius: '16px',
    border: '1px solid #f0f0f0', textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s'
  },
  featureIcon: { fontSize: '40px', marginBottom: '16px' },
  featureTitle: { fontSize: '18px', color: '#1b4332', marginBottom: '10px', fontWeight: '600' },
  featureDesc: { fontSize: '14px', color: '#888', lineHeight: 1.6 },

  // NGOs
  ngosSection: { padding: '80px 0', backgroundColor: '#f8faf8' },
  ngoGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' },
  ngoCard: { borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', backgroundColor: '#fff' },
  ngoCardTop: { padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  ngoAvatar: {
    width: '56px', height: '56px', borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.3)', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', fontWeight: 'bold'
  },
  ngoCategoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff',
    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'
  },
  ngoCardBody: { padding: '20px' },
  ngoName: { fontSize: '16px', color: '#1b4332', marginBottom: '4px', fontWeight: '600' },
  ngoLocation: { fontSize: '13px', color: '#888', marginBottom: '8px' },
  ngoDesc: { fontSize: '13px', color: '#666', lineHeight: 1.5, marginBottom: '12px' },
  ngoStats: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '12px' },
  ngoBtn: {
    width: '100%', padding: '10px', color: '#fff',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontSize: '13px', fontWeight: '600'
  },
  centerBtn: { textAlign: 'center', marginTop: '32px' },
  seeAllBtn: {
    padding: '14px 32px', backgroundColor: 'transparent',
    color: '#2d6a4f', border: '2px solid #2d6a4f',
    borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: '600'
  },

  // SDG
  sdgSection: { padding: '80px 0', backgroundColor: '#1b4332' },
  sdgGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' },
  sdgCard: {
    display: 'flex', alignItems: 'center', gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.08)', padding: '16px',
    borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)'
  },
  sdgNumber: {
    width: '48px', height: '48px', borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', flexShrink: 0
  },
  sdgInfo: { display: 'flex', flexDirection: 'column', gap: '2px' },
  sdgId: { fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' },
  sdgName: { fontSize: '13px', color: '#fff', fontWeight: '600' },
  analyticsBtn: {
    padding: '14px 32px', backgroundColor: '#52b788',
    color: '#fff', border: 'none', borderRadius: '10px',
    cursor: 'pointer', fontSize: '15px', fontWeight: '600'
  },

  // How it works
  howSection: { padding: '80px 0', backgroundColor: '#fff' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', position: 'relative' },
  stepCard: { textAlign: 'center', padding: '24px', position: 'relative' },
  stepNum: {
    display: 'inline-block', padding: '8px 16px', borderRadius: '20px',
    color: '#fff', fontSize: '14px', fontWeight: '800', marginBottom: '16px'
  },
  stepIcon: { fontSize: '40px', marginBottom: '12px' },
  stepTitle: { fontSize: '18px', color: '#1b4332', marginBottom: '8px', fontWeight: '600' },
  stepDesc: { fontSize: '14px', color: '#888', lineHeight: 1.6 },
  stepArrow: {
    position: 'absolute', right: '-12px', top: '50%',
    fontSize: '24px', color: '#ccc'
  },

  // Testimonials
  testimonialsSection: { padding: '80px 0', backgroundColor: '#f8faf8' },
  testimonialsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  testimonialCard: {
    backgroundColor: '#fff', borderRadius: '16px', padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)', position: 'relative'
  },
  quoteIcon: {
    fontSize: '64px', color: '#e8f5e9', fontFamily: 'Georgia, serif',
    lineHeight: 1, position: 'absolute', top: '16px', left: '24px'
  },
  testimonialText: {
    fontSize: '15px', color: '#555', lineHeight: 1.7,
    marginBottom: '24px', paddingTop: '24px', fontStyle: 'italic'
  },
  testimonialAuthor: { display: 'flex', alignItems: 'center', gap: '12px' },
  testimonialAvatar: {
    width: '44px', height: '44px', borderRadius: '50%',
    backgroundColor: '#2d6a4f', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '18px', fontWeight: 'bold', flexShrink: 0
  },
  testimonialName: { fontSize: '15px', color: '#1b4332', fontWeight: '600', margin: 0 },
  testimonialRole: { fontSize: '13px', color: '#888', margin: 0 },

  // CTA
  ctaSection: { padding: '80px 0', backgroundColor: '#fff' },
  ctaBox: {
    backgroundColor: '#1b4332', borderRadius: '24px',
    padding: '64px', textAlign: 'center'
  },
  ctaTitle: { fontSize: '36px', color: '#fff', marginBottom: '16px', fontWeight: '700' },
  ctaDesc: { fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' },
  ctaBtns: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
  ctaBtn1: {
    padding: '14px 28px', backgroundColor: '#52b788',
    color: '#fff', border: 'none', borderRadius: '10px',
    cursor: 'pointer', fontSize: '15px', fontWeight: '600'
  },
  ctaBtn2: {
    padding: '14px 28px', backgroundColor: 'transparent',
    color: '#fff', border: '2px solid rgba(255,255,255,0.4)',
    borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: '600'
  },
  ctaBtn3: {
    padding: '14px 28px', backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: '600'
  },

  // Newsletter
  newsletterSection: { padding: '40px 0', backgroundColor: '#f0f4f8' },
  newsletterBox: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', backgroundColor: '#fff',
    borderRadius: '16px', padding: '32px 40px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)', flexWrap: 'wrap', gap: '24px'
  },
  newsletterLeft: {},
  newsletterTitle: { fontSize: '20px', color: '#1b4332', marginBottom: '4px' },
  newsletterDesc: { fontSize: '14px', color: '#888' },
  newsletterRight: {},
  subscribeRow: { display: 'flex', gap: '12px' },
  subscribeInput: {
    padding: '12px 20px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '14px',
    outline: 'none', width: '280px'
  },
  subscribeBtn: {
    padding: '12px 24px', backgroundColor: '#2d6a4f',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600'
  },
  subscribedMsg: {
    backgroundColor: '#e8f5e9', color: '#2d6a4f',
    padding: '12px 24px', borderRadius: '8px',
    fontSize: '14px', fontWeight: '600'
  },

  // Footer
  footer: { backgroundColor: '#1b4332', padding: '64px 0 0' },
  footerGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', paddingBottom: '48px' },
  footerCol: {},
  footerLogo: { fontSize: '22px', color: '#fff', marginBottom: '16px' },
  footerDesc: { color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.7, marginBottom: '8px' },
  footerTitle: { color: '#fff', fontSize: '15px', marginBottom: '20px', fontWeight: '600' },
  footerLink: { color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '10px', cursor: 'pointer' },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    padding: '24px 0', textAlign: 'center',
    color: 'rgba(255,255,255,0.4)', fontSize: '13px'
  },
}

export default PublicPortal