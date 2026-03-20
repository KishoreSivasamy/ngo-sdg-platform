 import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ImpactDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total NGOs',         value: '124',    icon: '🏛️', color: '#1565c0', change: '+12 this month'  },
    { label: 'Total Donations',    value: '₹12.4L', icon: '💰', color: '#2d6a4f', change: '+₹1.2L this month' },
    { label: 'Lives Impacted',     value: '45,000', icon: '❤️', color: '#c62828', change: '+3,200 this month' },
    { label: 'Active Volunteers',  value: '876',    icon: '👥', color: '#6a1b9a', change: '+54 this month'   },
    { label: 'Events Completed',   value: '342',    icon: '📅', color: '#e65100', change: '+28 this month'   },
    { label: 'SDGs Addressed',     value: '17',     icon: '🌍', color: '#00695c', change: 'All 17 SDGs'      },
  ]

  const sdgs = [
    { id: 1,  name: 'No Poverty',             color: '#e5243b', progress: 72 },
    { id: 2,  name: 'Zero Hunger',            color: '#dda63a', progress: 58 },
    { id: 3,  name: 'Good Health',            color: '#4c9f38', progress: 81 },
    { id: 4,  name: 'Quality Education',      color: '#c5192d', progress: 65 },
    { id: 5,  name: 'Gender Equality',        color: '#ff3a21', progress: 54 },
    { id: 6,  name: 'Clean Water',            color: '#26bde2', progress: 70 },
    { id: 7,  name: 'Clean Energy',           color: '#fcc30b', progress: 45 },
    { id: 8,  name: 'Decent Work',            color: '#a21942', progress: 50 },
    { id: 9,  name: 'Innovation',             color: '#fd6925', progress: 62 },
    { id: 10, name: 'Reduced Inequality',     color: '#dd1367', progress: 48 },
    { id: 11, name: 'Sustainable Cities',     color: '#fd9d24', progress: 55 },
    { id: 12, name: 'Responsible Production', color: '#bf8b2e', progress: 40 },
    { id: 13, name: 'Climate Action',         color: '#3f7e44', progress: 68 },
    { id: 14, name: 'Life Below Water',       color: '#0a97d9', progress: 42 },
    { id: 15, name: 'Life on Land',           color: '#56c02b', progress: 60 },
    { id: 16, name: 'Peace & Justice',        color: '#00689d', progress: 53 },
    { id: 17, name: 'Partnerships',           color: '#19486a', progress: 78 },
  ]

  const topNGOs = [
    { rank: 1, name: 'Health For All',          donations: '₹2.8L', volunteers: 60,  beneficiaries: 8000, category: 'Health'       },
    { rank: 2, name: 'Green Earth Foundation',  donations: '₹2.1L', volunteers: 120, beneficiaries: 5000, category: 'Environment'   },
    { rank: 3, name: 'Feed India',              donations: '₹1.9L', volunteers: 95,  beneficiaries: 6500, category: 'Food'          },
    { rank: 4, name: 'Bright Minds NGO',        donations: '₹1.5L', volunteers: 85,  beneficiaries: 3200, category: 'Education'     },
    { rank: 5, name: 'Water For All',           donations: '₹1.2L', volunteers: 45,  beneficiaries: 2800, category: 'Environment'   },
  ]

  const monthlyData = [
    { month: 'Jun', donations: 80000,  volunteers: 120 },
    { month: 'Jul', donations: 95000,  volunteers: 145 },
    { month: 'Aug', donations: 110000, volunteers: 160 },
    { month: 'Sep', donations: 98000,  volunteers: 155 },
    { month: 'Oct', donations: 125000, volunteers: 180 },
    { month: 'Nov', donations: 140000, volunteers: 210 },
  ]

  const maxDonation = Math.max(...monthlyData.map(d => d.donations))

  const categoryData = [
    { name: 'Health',       value: 32, color: '#c62828' },
    { name: 'Education',    value: 25, color: '#1565c0' },
    { name: 'Environment',  value: 20, color: '#2d6a4f' },
    { name: 'Food',         value: 15, color: '#f57f17' },
    { name: 'Others',       value: 8,  color: '#6a1b9a' },
  ]

  const categoryColor = (cat) => {
    if (cat === 'Environment')  return { backgroundColor: '#e8f5e9', color: '#2d6a4f' }
    if (cat === 'Education')    return { backgroundColor: '#e3f2fd', color: '#1565c0' }
    if (cat === 'Health')       return { backgroundColor: '#fce4ec', color: '#c62828' }
    if (cat === 'Food')         return { backgroundColor: '#fff8e1', color: '#f57f17' }
    return {}
  }

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
            { label: '📊 Overview',    tab: 'overview'  },
            { label: '🌍 SDG Progress', tab: 'sdg'      },
            { label: '🏆 Top NGOs',    tab: 'top'       },
            { label: '📈 Trends',      tab: 'trends'    },
          ].map((item, i) => (
            <div key={i}
              onClick={() => setActiveTab(item.tab)}
              style={{
                ...styles.navItem,
                backgroundColor: activeTab === item.tab ? '#2d6a4f' : 'transparent',
                color: activeTab === item.tab ? '#fff' : '#ccc'
              }}>
              {item.label}
            </div>
          ))}
        </nav>
        <button onClick={() => navigate('/')} style={styles.logoutBtn}>
          🚪 Logout
        </button>
      </div>

      {/* Main */}
      <div style={styles.main}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>📊 Impact Analytics Dashboard</h1>
            <p style={styles.subheading}>Real-time SDG progress and impact metrics</p>
          </div>
          <div style={styles.dateBadge}>📅 Updated: Nov 2025</div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div style={styles.statsGrid}>
              {stats.map((stat, i) => (
                <div key={i} style={styles.statCard}>
                  <div style={styles.statIcon}>{stat.icon}</div>
                  <div style={{ ...styles.statValue, color: stat.color }}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                  <div style={styles.statChange}>{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Two Column */}
            <div style={styles.twoCol}>

              {/* Bar Chart - Monthly Donations */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>📈 Monthly Donations (₹)</h2>
                <div style={styles.barChart}>
                  {monthlyData.map((d, i) => (
                    <div key={i} style={styles.barGroup}>
                      <div style={styles.barWrapper}>
                        <div style={{
                          ...styles.bar,
                          height: `${(d.donations / maxDonation) * 150}px`,
                          backgroundColor: '#2d6a4f'
                        }} />
                      </div>
                      <div style={styles.barLabel}>{d.month}</div>
                      <div style={styles.barValue}>
                        ₹{(d.donations / 1000).toFixed(0)}K
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>🥧 Donations by Category</h2>
                <div style={styles.categoryList}>
                  {categoryData.map((c, i) => (
                    <div key={i} style={styles.categoryItem}>
                      <div style={styles.categoryLeft}>
                        <div style={{
                          width: '12px', height: '12px',
                          borderRadius: '50%',
                          backgroundColor: c.color,
                          flexShrink: 0
                        }} />
                        <span style={styles.categoryName}>{c.name}</span>
                      </div>
                      <div style={styles.categoryRight}>
                        <div style={styles.categoryBar}>
                          <div style={{
                            ...styles.categoryFill,
                            width: `${c.value * 3}px`,
                            backgroundColor: c.color
                          }} />
                        </div>
                        <span style={styles.categoryValue}>{c.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>
        )}

        {/* SDG Progress Tab */}
        {activeTab === 'sdg' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🌍 SDG Progress Tracker</h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>
              Progress towards all 17 UN Sustainable Development Goals
            </p>
            <div style={styles.sdgGrid}>
              {sdgs.map(sdg => (
                <div key={sdg.id} style={styles.sdgCard}>
                  <div style={{
                    ...styles.sdgNumber,
                    backgroundColor: sdg.color
                  }}>
                    {sdg.id}
                  </div>
                  <div style={styles.sdgInfo}>
                    <div style={styles.sdgName}>{sdg.name}</div>
                    <div style={styles.sdgBarWrapper}>
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
          </div>
        )}

        {/* Top NGOs Tab */}
        {activeTab === 'top' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🏆 Top Performing NGOs</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Rank</th>
                  <th style={styles.th}>NGO Name</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Total Donations</th>
                  <th style={styles.th}>Volunteers</th>
                  <th style={styles.th}>Beneficiaries</th>
                </tr>
              </thead>
              <tbody>
                {topNGOs.map(n => (
                  <tr key={n.rank} style={styles.tableRow}>
                    <td style={styles.td}>
                      <span style={styles.rank}>
                        {n.rank === 1 ? '🥇' : n.rank === 2 ? '🥈' : n.rank === 3 ? '🥉' : `#${n.rank}`}
                      </span>
                    </td>
                    <td style={styles.td}><strong>{n.name}</strong></td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...categoryColor(n.category) }}>
                        {n.category}
                      </span>
                    </td>
                    <td style={styles.td}>{n.donations}</td>
                    <td style={styles.td}>{n.volunteers}</td>
                    <td style={styles.td}>{n.beneficiaries.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📈 Volunteer Growth Trend</h2>
            <div style={styles.barChart}>
              {monthlyData.map((d, i) => (
                <div key={i} style={styles.barGroup}>
                  <div style={styles.barWrapper}>
                    <div style={{
                      ...styles.bar,
                      height: `${(d.volunteers / 210) * 150}px`,
                      backgroundColor: '#1565c0'
                    }} />
                  </div>
                  <div style={styles.barLabel}>{d.month}</div>
                  <div style={styles.barValue}>{d.volunteers}</div>
                </div>
              ))}
            </div>
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
  dateBadge: {
    backgroundColor: '#e8f5e9', color: '#2d6a4f',
    padding: '8px 16px', borderRadius: '20px',
    fontSize: '13px', fontWeight: '600'
  },
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px', marginBottom: '24px'
  },
  statCard: {
    backgroundColor: '#fff', padding: '20px',
    borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    textAlign: 'center'
  },
  statIcon: { fontSize: '28px', marginBottom: '8px' },
  statValue: { fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' },
  statLabel: { fontSize: '13px', color: '#888', marginBottom: '4px' },
  statChange: { fontSize: '11px', color: '#2d6a4f', fontWeight: '600' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  section: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '24px', marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  sectionTitle: { fontSize: '18px', color: '#1b4332', marginBottom: '20px' },
  barChart: {
    display: 'flex', alignItems: 'flex-end',
    gap: '16px', padding: '16px 0', height: '200px'
  },
  barGroup: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', flex: 1
  },
  barWrapper: {
    display: 'flex', alignItems: 'flex-end',
    height: '150px', width: '100%', justifyContent: 'center'
  },
  bar: { width: '36px', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' },
  barLabel: { fontSize: '12px', color: '#888', marginTop: '6px' },
  barValue: { fontSize: '11px', color: '#555', fontWeight: '600' },
  categoryList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  categoryItem: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', gap: '12px'
  },
  categoryLeft: { display: 'flex', alignItems: 'center', gap: '8px', width: '140px' },
  categoryName: { fontSize: '14px', color: '#333' },
  categoryRight: { display: 'flex', alignItems: 'center', gap: '8px', flex: 1 },
  categoryBar: {
    flex: 1, height: '8px', backgroundColor: '#f0f0f0',
    borderRadius: '4px', overflow: 'hidden'
  },
  categoryFill: { height: '100%', borderRadius: '4px' },
  categoryValue: { fontSize: '13px', fontWeight: '600', color: '#333', width: '36px' },
  sdgGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px'
  },
  sdgCard: {
    display: 'flex', alignItems: 'center',
    gap: '12px', padding: '12px',
    border: '1px solid #e0e0e0', borderRadius: '8px'
  },
  sdgNumber: {
    width: '36px', height: '36px', borderRadius: '8px',
    color: '#fff', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '14px',
    fontWeight: 'bold', flexShrink: 0
  },
  sdgInfo: { flex: 1 },
  sdgName: { fontSize: '13px', color: '#333', marginBottom: '6px', fontWeight: '600' },
  sdgBarWrapper: { display: 'flex', alignItems: 'center', gap: '8px' },
  sdgBar: {
    flex: 1, height: '6px', backgroundColor: '#f0f0f0',
    borderRadius: '4px', overflow: 'hidden'
  },
  sdgFill: { height: '100%', borderRadius: '4px' },
  sdgPercent: { fontSize: '12px', fontWeight: '600', color: '#555', width: '36px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#f5f5f5' },
  th: {
    padding: '12px 16px', textAlign: 'left',
    fontSize: '13px', color: '#555', fontWeight: '600'
  },
  tableRow: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '12px 16px', fontSize: '14px', color: '#333' },
  rank: { fontSize: '18px' },
  badge: { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
}

export default ImpactDashboard
