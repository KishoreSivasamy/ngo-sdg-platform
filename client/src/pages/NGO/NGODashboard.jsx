 import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NGODashboard() {
  const navigate = useNavigate()
  const [ngo, setNgo] = useState({ name: '' })
  const [stats] = useState({
    totalDonations: 75000,
    activeVolunteers: 42,
    beneficiaries: 1200,
    eventsCompleted: 18
  })

  useEffect(() => {
    const name = localStorage.getItem('name') || 'NGO'
    setNgo({ name })
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const recentDonations = [
    { id: 1, donor: 'Rahul Kumar',   amount: 5000,  date: '2025-11-01', status: 'Completed' },
    { id: 2, donor: 'Priya Sharma',  amount: 3000,  date: '2025-10-28', status: 'Completed' },
    { id: 3, donor: 'Amit Singh',    amount: 10000, date: '2025-10-20', status: 'Completed' },
    { id: 4, donor: 'Sneha Patel',   amount: 2500,  date: '2025-10-15', status: 'Pending'   },
  ]

  const volunteers = [
    { id: 1, name: 'Ravi Kumar',    skill: 'Teaching',    events: 5, status: 'Active'    },
    { id: 2, name: 'Anita Raj',     skill: 'Medical',     events: 3, status: 'Active'    },
    { id: 3, name: 'Suresh Menon',  skill: 'Engineering', events: 7, status: 'Active'    },
    { id: 4, name: 'Kavya Nair',    skill: 'Marketing',   events: 2, status: 'Inactive'  },
  ]

  const upcomingEvents = [
    { id: 1, name: 'Tree Plantation Drive',  date: '2025-12-01', location: 'Chennai',   volunteers: 20 },
    { id: 2, name: 'Free Medical Camp',      date: '2025-12-10', location: 'Trichy',    volunteers: 15 },
    { id: 3, name: 'Education Workshop',     date: '2025-12-20', location: 'Coimbatore',volunteers: 10 },
  ]

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
            { label: '📊 Dashboard',     active: true  },
            { label: '👥 Volunteers',    active: false },
            { label: '💰 Donations',     active: false },
            { label: '📅 Events',        active: false },
            { label: '📄 Documents',     active: false },
            { label: '📈 Analytics',     active: false },
            { label: '⚙️ Settings',      active: false },
          ].map((item, i) => (
            <div key={i} style={{
              ...styles.navItem,
              backgroundColor: item.active ? '#2d6a4f' : 'transparent',
              color: item.active ? '#fff' : '#ccc'
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
            <h1 style={styles.heading}>Welcome, {ngo.name}! 👋</h1>
            <p style={styles.subheading}>Manage your NGO operations</p>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.verifiedBadge}>✅ Verified NGO</span>
            <div style={styles.avatar}>
              {ngo.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          {[
            { label: 'Total Donations',    value: `₹${stats.totalDonations.toLocaleString()}`, icon: '💰', color: '#2d6a4f' },
            { label: 'Active Volunteers',  value: stats.activeVolunteers,                       icon: '👥', color: '#1565c0' },
            { label: 'Beneficiaries',      value: stats.beneficiaries,                          icon: '❤️', color: '#c62828' },
            { label: 'Events Completed',   value: stats.eventsCompleted,                        icon: '📅', color: '#6a1b9a' },
          ].map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={{ ...styles.statValue, color: stat.color }}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={styles.twoCol}>

          {/* Recent Donations */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>💰 Recent Donations</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Donor</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map(d => (
                  <tr key={d.id} style={styles.tableRow}>
                    <td style={styles.td}>{d.donor}</td>
                    <td style={styles.td}>₹{d.amount.toLocaleString()}</td>
                    <td style={styles.td}>{d.date}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge,
                        backgroundColor: d.status === 'Completed' ? '#e8f5e9' : '#fff8e1',
                        color: d.status === 'Completed' ? '#2d6a4f' : '#f57f17'
                      }}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Upcoming Events */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📅 Upcoming Events</h2>
            {upcomingEvents.map(e => (
              <div key={e.id} style={styles.eventCard}>
                <div style={styles.eventInfo}>
                  <h3 style={styles.eventName}>{e.name}</h3>
                  <p style={styles.eventMeta}>📍 {e.location} &nbsp;|&nbsp; 📅 {e.date}</p>
                  <p style={styles.eventMeta}>👥 {e.volunteers} volunteers needed</p>
                </div>
                <button style={styles.manageBtn}>Manage</button>
              </div>
            ))}
            <button style={styles.addEventBtn}>+ Add New Event</button>
          </div>

        </div>

        {/* Volunteers Table */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>👥 Volunteers</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Skill</th>
                <th style={styles.th}>Events</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map(v => (
                <tr key={v.id} style={styles.tableRow}>
                  <td style={styles.td}>{v.name}</td>
                  <td style={styles.td}>{v.skill}</td>
                  <td style={styles.td}>{v.events}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: v.status === 'Active' ? '#e8f5e9' : '#fce4ec',
                      color: v.status === 'Active' ? '#2d6a4f' : '#c62828'
                    }}>
                      {v.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.viewBtn}>View</button>
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
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  verifiedBadge: {
    backgroundColor: '#e8f5e9',
    color: '#2d6a4f',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600'
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
    marginBottom: '24px'
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
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px'
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
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  eventCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    marginBottom: '12px'
  },
  eventInfo: {
    flex: 1
  },
  eventName: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '4px'
  },
  eventMeta: {
    fontSize: '12px',
    color: '#888'
  },
  manageBtn: {
    padding: '6px 16px',
    backgroundColor: '#2d6a4f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  addEventBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    color: '#2d6a4f',
    border: '2px dashed #2d6a4f',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    marginTop: '8px'
  },
  viewBtn: {
    padding: '4px 12px',
    backgroundColor: '#e8f5e9',
    color: '#2d6a4f',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  }
}

export default NGODashboard
