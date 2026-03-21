 import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminPanel() {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState({ name: '' })
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    const name = localStorage.getItem('name') || 'Admin'
    setAdmin({ name })
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const stats = [
    { label: 'Total NGOs',       value: 124,    icon: '🏛️', color: '#1565c0' },
    { label: 'Total Donors',     value: 3240,   icon: '💰', color: '#2d6a4f' },
    { label: 'Total Volunteers', value: 876,    icon: '👥', color: '#6a1b9a' },
    { label: 'Total Donations',  value: '₹12.4L', icon: '📊', color: '#c62828' },
  ]

  const pendingNGOs = [
    { id: 1, name: 'Green Earth Foundation', location: 'Chennai',    category: 'Environment', date: '2025-11-01' },
    { id: 2, name: 'Bright Minds NGO',       location: 'Trichy',     category: 'Education',   date: '2025-11-03' },
    { id: 3, name: 'Health For All',         location: 'Coimbatore', category: 'Health',      date: '2025-11-05' },
    { id: 4, name: 'Feed The Poor',          location: 'Madurai',    category: 'Food',        date: '2025-11-07' },
  ]

  const allUsers = [
    { id: 1, name: 'Rahul Kumar',  email: 'rahul@gmail.com',  role: 'donor',     status: 'Active'   },
    { id: 2, name: 'Green Earth',  email: 'green@ngo.com',    role: 'ngo',       status: 'Pending'  },
    { id: 3, name: 'Priya Sharma', email: 'priya@gmail.com',  role: 'volunteer', status: 'Active'   },
    { id: 4, name: 'Amit Singh',   email: 'amit@gmail.com',   role: 'donor',     status: 'Active'   },
    { id: 5, name: 'Bright Minds', email: 'bright@ngo.com',   role: 'ngo',       status: 'Pending'  },
  ]

  const recentDonations = [
    { id: 1, donor: 'Rahul Kumar',  ngo: 'Water For All',     amount: 5000,  date: '2025-11-01' },
    { id: 2, donor: 'Priya Sharma', ngo: 'Bright Future NGO', amount: 3000,  date: '2025-10-28' },
    { id: 3, donor: 'Amit Singh',   ngo: 'Feed India',        amount: 10000, date: '2025-10-20' },
  ]

  const roleColor = (role) => {
    if (role === 'ngo')       return { backgroundColor: '#e3f2fd', color: '#1565c0' }
    if (role === 'donor')     return { backgroundColor: '#e8f5e9', color: '#2d6a4f' }
    if (role === 'volunteer') return { backgroundColor: '#f3e5f5', color: '#6a1b9a' }
    return {}
  }

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>⚙️ Admin Panel</h2>
        <nav>
          {[
  { label: '📊 Dashboard',     tab: 'dashboard', path: null     },
  { label: '🏛️ NGO Approvals', tab: 'ngos',      path: null     },
  { label: '👥 Users',         tab: 'users',     path: null     },
  { label: '💰 Donations',     tab: 'donations', path: null     },
  { label: '📅 Events',        tab: 'events',    path: null     },
  { label: '📈 Analytics',     tab: null,        path: '/analytics' },
  { label: '⚙️ Settings',      tab: null,        path: '/settings'  },
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
            <h1 style={styles.heading}>
              {activeTab === 'dashboard' && '📊 Dashboard Overview'}
              {activeTab === 'ngos'      && '🏛️ NGO Approvals'}
              {activeTab === 'users'     && '👥 User Management'}
              {activeTab === 'donations' && '💰 Donation Records'}
              {activeTab === 'events'    && '📅 Events'}
              {activeTab === 'analytics' && '📈 Analytics'}
              {activeTab === 'settings'  && '⚙️ Settings'}
            </h1>
            <p style={styles.subheading}>Welcome back, {admin.name}</p>
          </div>
          <div style={styles.avatar}>
            {admin.name.charAt(0).toUpperCase()}
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

            {/* Pending NGO Approvals */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>⏳ Pending NGO Approvals</h2>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>NGO Name</th>
                    <th style={styles.th}>Location</th>
                    <th style={styles.th}>Category</th>
                    <th style={styles.th}>Applied On</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingNGOs.map(n => (
                    <tr key={n.id} style={styles.tableRow}>
                      <td style={styles.td}>{n.name}</td>
                      <td style={styles.td}>{n.location}</td>
                      <td style={styles.td}>{n.category}</td>
                      <td style={styles.td}>{n.date}</td>
                      <td style={styles.td}>
                        <button style={styles.approveBtn}>✅ Approve</button>
                        <button style={styles.rejectBtn}>❌ Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Donations */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>💰 Recent Donations</h2>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>Donor</th>
                    <th style={styles.th}>NGO</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDonations.map(d => (
                    <tr key={d.id} style={styles.tableRow}>
                      <td style={styles.td}>{d.donor}</td>
                      <td style={styles.td}>{d.ngo}</td>
                      <td style={styles.td}>₹{d.amount.toLocaleString()}</td>
                      <td style={styles.td}>{d.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>👥 All Users</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(u => (
                  <tr key={u.id} style={styles.tableRow}>
                    <td style={styles.td}>{u.name}</td>
                    <td style={styles.td}>{u.email}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...roleColor(u.role) }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge,
                        backgroundColor: u.status === 'Active' ? '#e8f5e9' : '#fff8e1',
                        color: u.status === 'Active' ? '#2d6a4f' : '#f57f17'
                      }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.viewBtn}>View</button>
                      <button style={styles.rejectBtn}>Block</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* NGOs Tab */}
        {activeTab === 'ngos' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🏛️ Pending NGO Approvals</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>NGO Name</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Applied On</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingNGOs.map(n => (
                  <tr key={n.id} style={styles.tableRow}>
                    <td style={styles.td}>{n.name}</td>
                    <td style={styles.td}>{n.location}</td>
                    <td style={styles.td}>{n.category}</td>
                    <td style={styles.td}>{n.date}</td>
                    <td style={styles.td}>
                      <button style={styles.approveBtn}>✅ Approve</button>
                      <button style={styles.rejectBtn}>❌ Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>💰 All Donations</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Donor</th>
                  <th style={styles.th}>NGO</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map(d => (
                  <tr key={d.id} style={styles.tableRow}>
                    <td style={styles.td}>{d.donor}</td>
                    <td style={styles.td}>{d.ngo}</td>
                    <td style={styles.td}>₹{d.amount.toLocaleString()}</td>
                    <td style={styles.td}>{d.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Other Tabs */}
        {['events', 'analytics', 'settings'].includes(activeTab) && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🚧 Coming Soon</h2>
            <p style={{ color: '#888' }}>This section is under development.</p>
          </div>
        )}

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
  approveBtn: {
    padding: '5px 12px',
    backgroundColor: '#e8f5e9',
    color: '#2d6a4f',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    marginRight: '6px'
  },
  rejectBtn: {
    padding: '5px 12px',
    backgroundColor: '#fce4ec',
    color: '#c62828',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  viewBtn: {
    padding: '5px 12px',
    backgroundColor: '#e3f2fd',
    color: '#1565c0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    marginRight: '6px'
  }
}

export default AdminPanel
