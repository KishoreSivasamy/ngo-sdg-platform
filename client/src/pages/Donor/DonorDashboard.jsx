import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function DonorDashboard() {
  const navigate = useNavigate()
  const [donor, setDonor] = useState({ name: '', email: '' })
  const [stats] = useState({
    totalDonated: 15000,
    activeCampaigns: 8,
    ngosSupported: 5,
    livesImpacted: 230
  })

  useEffect(() => {
    const name = localStorage.getItem('name') || 'Donor'
    const email = localStorage.getItem('email') || ''
    setDonor({ name, email })
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const campaigns = [
    { id: 1, name: 'Clean Water Project',    ngo: 'Water For All',     goal: 50000, raised: 32000, category: 'Environment' },
    { id: 2, name: 'Education For Children', ngo: 'Bright Future NGO', goal: 30000, raised: 28000, category: 'Education'   },
    { id: 3, name: 'Food Relief Program',    ngo: 'Feed India',        goal: 20000, raised: 15000, category: 'Health'      },
  ]

  const recentDonations = [
    { id: 1, campaign: 'Clean Water Project',    amount: 5000, date: '2025-11-01', status: 'Completed' },
    { id: 2, campaign: 'Education For Children', amount: 3000, date: '2025-10-15', status: 'Completed' },
    { id: 3, campaign: 'Food Relief Program',    amount: 2000, date: '2025-10-01', status: 'Completed' },
  ]

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
  { label: '📊 Dashboard',    path: '/donor-dashboard' },
  { label: '🏛️ Browse NGOs',  path: '/discover'        },
  { label: '💰 My Donations', path: '/donate'           },
  { label: '📅 Events',       path: '/discover'         },
  { label: '⚙️ Settings',     path: '/settings'         },
].map((item, i) => (
  <div key={i}
    onClick={() => navigate(item.path)}
    style={{
      ...styles.navItem,
      backgroundColor: item.path === '/donor-dashboard' ? '#2d6a4f' : 'transparent',
      color: item.path === '/donor-dashboard' ? '#fff' : '#ccc'
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
            <h1 style={styles.heading}>Welcome back, {donor.name}! 👋</h1>
            <p style={styles.subheading}>Here's your impact summary</p>
          </div>
          <div style={styles.avatar}>
            {donor.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          {[
            { label: 'Total Donated',    value: `₹${stats.totalDonated.toLocaleString()}`, icon: '💰', color: '#2d6a4f' },
            { label: 'Active Campaigns', value: stats.activeCampaigns,                      icon: '📢', color: '#1565c0' },
            { label: 'NGOs Supported',   value: stats.ngosSupported,                        icon: '🏛️', color: '#6a1b9a' },
            { label: 'Lives Impacted',   value: stats.livesImpacted,                        icon: '❤️', color: '#c62828' },
          ].map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={{ ...styles.statValue, color: stat.color }}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Active Campaigns */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔥 Active Campaigns</h2>
          <div style={styles.campaignGrid}>
            {campaigns.map(c => (
              <div key={c.id} style={styles.campaignCard}>
                <div style={styles.campaignCategory}>{c.category}</div>
                <h3 style={styles.campaignName}>{c.name}</h3>
                <p style={styles.campaignNgo}>by {c.ngo}</p>
                <div style={styles.progressBar}>
                  <div style={{
                    ...styles.progressFill,
                    width: `${(c.raised / c.goal) * 100}%`
                  }} />
                </div>
                <div style={styles.progressText}>
                  <span>₹{c.raised.toLocaleString()} raised</span>
                  <span>₹{c.goal.toLocaleString()} goal</span>
                </div>
                <button style={styles.donateBtn}>Donate Now</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Donations */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📋 Recent Donations</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Campaign</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentDonations.map(d => (
                <tr key={d.id} style={styles.tableRow}>
                  <td style={styles.td}>{d.campaign}</td>
                  <td style={styles.td}>₹{d.amount.toLocaleString()}</td>
                  <td style={styles.td}>{d.date}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8'
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#1b4332',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh'
  },
  logo: {
    color: '#fff',
    fontSize: '20px',
    marginBottom: '32px',
    textAlign: 'center'
  },
  navItem: {
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  logoutBtn: {
    marginTop: 'auto',
    padding: '12px',
    backgroundColor: '#c62828',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    position: 'absolute',
    bottom: '24px',
    width: 'calc(100% - 32px)'
  },
  main: {
    marginLeft: '240px',
    padding: '32px',
    flex: 1
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  heading: {
    fontSize: '24px',
    color: '#1b4332',
    marginBottom: '4px'
  },
  subheading: {
    color: '#888',
    fontSize: '14px'
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#2d6a4f',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    textAlign: 'center'
  },
  statIcon: {
    fontSize: '28px',
    marginBottom: '8px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '13px',
    color: '#888'
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#1b4332',
    marginBottom: '20px'
  },
  campaignGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  campaignCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '16px'
  },
  campaignCategory: {
    fontSize: '11px',
    backgroundColor: '#e8f5e9',
    color: '#2d6a4f',
    padding: '4px 10px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '10px',
    fontWeight: '600'
  },
  campaignName: {
    fontSize: '15px',
    color: '#333',
    marginBottom: '4px'
  },
  campaignNgo: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '12px'
  },
  progressBar: {
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    height: '8px',
    marginBottom: '6px'
  },
  progressFill: {
    backgroundColor: '#2d6a4f',
    borderRadius: '10px',
    height: '8px'
  },
  progressText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#888',
    marginBottom: '12px'
  },
  donateBtn: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#2d6a4f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#f5f5f5'
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '13px',
    color: '#555',
    fontWeight: '600'
  },
  tableRow: {
    borderBottom: '1px solid #f0f0f0'
  },
  td: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#333'
  },
  badge: {
    backgroundColor: '#e8f5e9',
    color: '#2d6a4f',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  }
}

export default DonorDashboard 
