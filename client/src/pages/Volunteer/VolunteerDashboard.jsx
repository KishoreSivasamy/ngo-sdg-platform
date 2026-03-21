 import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function VolunteerDashboard() {
  const navigate = useNavigate()
  const [volunteer, setVolunteer] = useState({ name: '' })
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    const name = localStorage.getItem('name') || 'Volunteer'
    setVolunteer({ name })
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const stats = [
    { label: 'Events Joined',     value: 12,   icon: '📅', color: '#2d6a4f' },
    { label: 'Hours Contributed', value: 48,   icon: '⏰', color: '#1565c0' },
    { label: 'NGOs Supported',    value: 5,    icon: '🏛️', color: '#6a1b9a' },
    { label: 'People Helped',     value: 320,  icon: '❤️', color: '#c62828' },
  ]

  const upcomingEvents = [
    { id: 1, name: 'Tree Plantation Drive',  ngo: 'Green Earth Foundation', date: '2025-12-01', location: 'Chennai',    category: 'Environment', status: 'Registered' },
    { id: 2, name: 'Free Medical Camp',      ngo: 'Health For All',         date: '2025-12-10', location: 'Trichy',     category: 'Health',      status: 'Registered' },
    { id: 3, name: 'Education Workshop',     ngo: 'Bright Minds NGO',       date: '2025-12-20', location: 'Coimbatore', category: 'Education',   status: 'Pending'    },
  ]

  const availableEvents = [
    { id: 1, name: 'Beach Cleanup Drive',    ngo: 'Clean Ocean NGO',   date: '2025-12-05', location: 'Chennai',  category: 'Environment', volunteers: '8/20'  },
    { id: 2, name: 'Blood Donation Camp',    ngo: 'Red Cross India',   date: '2025-12-12', location: 'Trichy',   category: 'Health',      volunteers: '12/30' },
    { id: 3, name: 'Food Distribution',      ngo: 'Feed India',        date: '2025-12-18', location: 'Madurai',  category: 'Food',        volunteers: '5/15'  },
    { id: 4, name: 'Digital Literacy Camp',  ngo: 'Tech For All',      date: '2025-12-22', location: 'Chennai',  category: 'Education',   volunteers: '3/10'  },
  ]

  const pastEvents = [
    { id: 1, name: 'Water Conservation Drive', ngo: 'Water For All',     date: '2025-10-15', hours: 6,  certificate: true  },
    { id: 2, name: 'Old Age Home Visit',       ngo: 'Care Foundation',   date: '2025-10-22', hours: 4,  certificate: true  },
    { id: 3, name: 'Street Children Support',  ngo: 'Bright Future NGO', date: '2025-11-01', hours: 8,  certificate: false },
  ]

  const categoryColor = (cat) => {
    if (cat === 'Environment') return { backgroundColor: '#e8f5e9', color: '#2d6a4f' }
    if (cat === 'Health')      return { backgroundColor: '#fce4ec', color: '#c62828' }
    if (cat === 'Education')   return { backgroundColor: '#e3f2fd', color: '#1565c0' }
    if (cat === 'Food')        return { backgroundColor: '#fff8e1', color: '#f57f17' }
    return {}
  }

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
  { label: '📊 Dashboard',   tab: 'dashboard', path: null },
  { label: '📅 My Events',   tab: 'myevents',  path: null },
  { label: '🔍 Find Events', tab: 'find',      path: null },
  { label: '🏆 My History',  tab: 'history',   path: null },
  { label: '⚙️ Settings',    tab: null,        path: '/settings' },
].map((item, i) => (
  <div key={i}
    onClick={() => item.path ? navigate(item.path) : setActiveTab(item.tab)}
    style={{
      ...styles.navItem,
      backgroundColor: activeTab === item.tab ? '#2d6a4f' : 'transparent',
      color: activeTab === item.tab ? '#fff' : '#ccc'
    }}>
    {item.label}
  </div>
))}
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>Welcome, {volunteer.name}! 👋</h1>
            <p style={styles.subheading}>Make a difference today</p>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.skillBadge}>🎯 Teaching & Medical</span>
            <div style={styles.avatar}>
              {volunteer.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats */}
            <div style={styles.statsGrid}>
              {stats.map((stat, i) => (
                <div key={i} style={styles.statCard}>
                  <div style={styles.statIcon}>{stat.icon}</div>
                  <div style={{ ...styles.statValue, color: stat.color }}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Two column */}
            <div style={styles.twoCol}>

              {/* Upcoming Events */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>📅 My Upcoming Events</h2>
                {upcomingEvents.map(e => (
                  <div key={e.id} style={styles.eventCard}>
                    <div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ ...styles.badge, ...categoryColor(e.category) }}>
                          {e.category}
                        </span>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: e.status === 'Registered' ? '#e8f5e9' : '#fff8e1',
                          color: e.status === 'Registered' ? '#2d6a4f' : '#f57f17'
                        }}>
                          {e.status}
                        </span>
                      </div>
                      <h3 style={styles.eventName}>{e.name}</h3>
                      <p style={styles.eventMeta}>🏛️ {e.ngo}</p>
                      <p style={styles.eventMeta}>📍 {e.location} &nbsp;|&nbsp; 📅 {e.date}</p>
                    </div>
                    <button style={styles.viewBtn}>View</button>
                  </div>
                ))}
              </div>

              {/* Impact Summary */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>🏆 My Impact Summary</h2>
                <div style={styles.impactCard}>
                  <div style={styles.impactItem}>
                    <span style={styles.impactIcon}>🌱</span>
                    <div>
                      <div style={styles.impactValue}>500+</div>
                      <div style={styles.impactLabel}>Trees Planted</div>
                    </div>
                  </div>
                  <div style={styles.impactItem}>
                    <span style={styles.impactIcon}>📚</span>
                    <div>
                      <div style={styles.impactValue}>120</div>
                      <div style={styles.impactLabel}>Students Taught</div>
                    </div>
                  </div>
                  <div style={styles.impactItem}>
                    <span style={styles.impactIcon}>🏥</span>
                    <div>
                      <div style={styles.impactValue}>80</div>
                      <div style={styles.impactLabel}>Patients Assisted</div>
                    </div>
                  </div>
                  <div style={styles.impactItem}>
                    <span style={styles.impactIcon}>🍱</span>
                    <div>
                      <div style={styles.impactValue}>200</div>
                      <div style={styles.impactLabel}>Meals Served</div>
                    </div>
                  </div>
                </div>
                <div style={styles.certificateBox}>
                  <span>🎖️ You have earned <strong>2 certificates!</strong></span>
                  <button style={styles.downloadBtn}>Download All</button>
                </div>
              </div>

            </div>
          </>
        )}

        {/* Find Events Tab */}
        {activeTab === 'find' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🔍 Available Events</h2>
            <div style={styles.eventGrid}>
              {availableEvents.map(e => (
                <div key={e.id} style={styles.availableCard}>
                  <span style={{ ...styles.badge, ...categoryColor(e.category) }}>
                    {e.category}
                  </span>
                  <h3 style={{ ...styles.eventName, marginTop: '10px' }}>{e.name}</h3>
                  <p style={styles.eventMeta}>🏛️ {e.ngo}</p>
                  <p style={styles.eventMeta}>📍 {e.location}</p>
                  <p style={styles.eventMeta}>📅 {e.date}</p>
                  <p style={styles.eventMeta}>👥 Volunteers: {e.volunteers}</p>
                  <button style={styles.joinBtn}>Join Event</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🏆 Event History</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Event</th>
                  <th style={styles.th}>NGO</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Hours</th>
                  <th style={styles.th}>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {pastEvents.map(e => (
                  <tr key={e.id} style={styles.tableRow}>
                    <td style={styles.td}>{e.name}</td>
                    <td style={styles.td}>{e.ngo}</td>
                    <td style={styles.td}>{e.date}</td>
                    <td style={styles.td}>{e.hours} hrs</td>
                    <td style={styles.td}>
                      {e.certificate
                        ? <button style={styles.downloadBtn}>⬇️ Download</button>
                        : <span style={{ color: '#888', fontSize: '13px' }}>Not yet issued</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* My Events Tab */}
        {activeTab === 'myevents' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📅 My Registered Events</h2>
            {upcomingEvents.map(e => (
              <div key={e.id} style={styles.eventCard}>
                <div>
                  <h3 style={styles.eventName}>{e.name}</h3>
                  <p style={styles.eventMeta}>🏛️ {e.ngo}</p>
                  <p style={styles.eventMeta}>📍 {e.location} &nbsp;|&nbsp; 📅 {e.date}</p>
                </div>
                <button style={styles.viewBtn}>View Details</button>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>⚙️ Settings</h2>
            <p style={{ color: '#888' }}>Settings coming soon.</p>
          </div>
        )}

      </div>
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', minHeight: '100vh', backgroundColor: '#f0f4f8' },
  sidebar: {
    width: '240px', backgroundColor: '#1b4332',
    padding: '24px 16px', display: 'flex',
    flexDirection: 'column', position: 'fixed', height: '100vh'
  },
  logo: { color: '#fff', fontSize: '20px', marginBottom: '32px', textAlign: 'center' },
  navItem: {
    padding: '12px 16px', borderRadius: '8px',
    marginBottom: '8px', cursor: 'pointer',
    fontSize: '14px', fontWeight: '500'
  },
  logoutBtn: {
    padding: '12px', backgroundColor: '#c62828',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px',
    position: 'absolute', bottom: '24px', width: 'calc(100% - 32px)'
  },
  main: { marginLeft: '240px', padding: '32px', flex: 1 },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '32px'
  },
  heading: { fontSize: '24px', color: '#1b4332', marginBottom: '4px' },
  subheading: { color: '#888', fontSize: '14px' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  skillBadge: {
    backgroundColor: '#e8f5e9', color: '#2d6a4f',
    padding: '6px 14px', borderRadius: '20px',
    fontSize: '13px', fontWeight: '600'
  },
  avatar: {
    width: '48px', height: '48px', borderRadius: '50%',
    backgroundColor: '#2d6a4f', color: '#fff',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '20px', fontWeight: 'bold'
  },
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px', marginBottom: '24px'
  },
  statCard: {
    backgroundColor: '#fff', padding: '24px',
    borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    textAlign: 'center'
  },
  statIcon: { fontSize: '28px', marginBottom: '8px' },
  statValue: { fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' },
  statLabel: { fontSize: '13px', color: '#888' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' },
  section: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '24px', marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  sectionTitle: { fontSize: '18px', color: '#1b4332', marginBottom: '20px' },
  eventCard: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '14px',
    border: '1px solid #e0e0e0', borderRadius: '8px', marginBottom: '12px'
  },
  eventName: { fontSize: '14px', color: '#333', marginBottom: '4px' },
  eventMeta: { fontSize: '12px', color: '#888', marginBottom: '2px' },
  badge: { padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' },
  viewBtn: {
    padding: '6px 16px', backgroundColor: '#e3f2fd',
    color: '#1565c0', border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px', fontWeight: '600'
  },
  impactCard: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '16px', marginBottom: '16px'
  },
  impactItem: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px'
  },
  impactIcon: { fontSize: '24px' },
  impactValue: { fontSize: '20px', fontWeight: 'bold', color: '#1b4332' },
  impactLabel: { fontSize: '12px', color: '#888' },
  certificateBox: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '12px 16px',
    backgroundColor: '#fff8e1', borderRadius: '8px',
    fontSize: '14px', color: '#333'
  },
  downloadBtn: {
    padding: '6px 14px', backgroundColor: '#2d6a4f',
    color: '#fff', border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '12px', fontWeight: '600'
  },
  eventGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'
  },
  availableCard: {
    border: '1px solid #e0e0e0', borderRadius: '10px', padding: '16px'
  },
  joinBtn: {
    width: '100%', marginTop: '12px', padding: '8px',
    backgroundColor: '#2d6a4f', color: '#fff',
    border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px', fontWeight: '600'
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#f5f5f5' },
  th: {
    padding: '12px 16px', textAlign: 'left',
    fontSize: '13px', color: '#555', fontWeight: '600'
  },
  tableRow: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '12px 16px', fontSize: '14px', color: '#333' },
}

export default VolunteerDashboard
