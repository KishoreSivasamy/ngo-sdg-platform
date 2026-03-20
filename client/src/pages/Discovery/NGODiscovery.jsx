import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NGODiscovery() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')

  const categories = ['All', 'Environment', 'Education', 'Health', 'Food', 'Animal Welfare']
  const locations   = ['All', 'Chennai', 'Trichy', 'Coimbatore', 'Madurai', 'Salem']

  const ngos = [
    { id: 1,  name: 'Green Earth Foundation', category: 'Environment',    location: 'Chennai',    description: 'Working towards a greener planet through tree plantation and waste management drives.', volunteers: 120, beneficiaries: 5000, rating: 4.8, verified: true  },
    { id: 2,  name: 'Bright Minds NGO',        category: 'Education',      location: 'Trichy',     description: 'Providing quality education to underprivileged children across Tamil Nadu.',             volunteers: 85,  beneficiaries: 3200, rating: 4.6, verified: true  },
    { id: 3,  name: 'Health For All',           category: 'Health',         location: 'Coimbatore', description: 'Free medical camps and healthcare services for rural communities.',                      volunteers: 60,  beneficiaries: 8000, rating: 4.9, verified: true  },
    { id: 4,  name: 'Feed India',               category: 'Food',           location: 'Madurai',    description: 'Combating hunger by distributing meals to homeless and underprivileged families.',       volunteers: 95,  beneficiaries: 6500, rating: 4.7, verified: true  },
    { id: 5,  name: 'Water For All',            category: 'Environment',    location: 'Salem',      description: 'Ensuring clean drinking water access to remote villages and tribal areas.',               volunteers: 45,  beneficiaries: 2800, rating: 4.5, verified: true  },
    { id: 6,  name: 'Animal Care Trust',        category: 'Animal Welfare', location: 'Chennai',    description: 'Rescuing and rehabilitating stray animals across the city.',                             volunteers: 70,  beneficiaries: 1200, rating: 4.4, verified: false },
    { id: 7,  name: 'Care Foundation',          category: 'Health',         location: 'Trichy',     description: 'Supporting elderly citizens with medical care and emotional support.',                    volunteers: 55,  beneficiaries: 900,  rating: 4.3, verified: true  },
    { id: 8,  name: 'Tech For All',             category: 'Education',      location: 'Chennai',    description: 'Bridging the digital divide by teaching technology skills to rural youth.',               volunteers: 40,  beneficiaries: 1500, rating: 4.6, verified: true  },
    { id: 9,  name: 'Clean Ocean NGO',          category: 'Environment',    location: 'Coimbatore', description: 'Protecting marine ecosystems through beach cleanup and awareness campaigns.',             volunteers: 30,  beneficiaries: 400,  rating: 4.2, verified: false },
  ]

  const categoryColor = (cat) => {
    if (cat === 'Environment')    return { backgroundColor: '#e8f5e9', color: '#2d6a4f' }
    if (cat === 'Education')      return { backgroundColor: '#e3f2fd', color: '#1565c0' }
    if (cat === 'Health')         return { backgroundColor: '#fce4ec', color: '#c62828' }
    if (cat === 'Food')           return { backgroundColor: '#fff8e1', color: '#f57f17' }
    if (cat === 'Animal Welfare') return { backgroundColor: '#f3e5f5', color: '#6a1b9a' }
    return {}
  }

  const filtered = ngos.filter(n => {
    const matchSearch   = n.name.toLowerCase().includes(search.toLowerCase()) ||
                          n.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === 'All' || n.category === selectedCategory
    const matchLocation = selectedLocation === 'All' || n.location === selectedLocation
    return matchSearch && matchCategory && matchLocation
  })

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
            { label: '🔍 Discover NGOs', active: true  },
            { label: '📅 Events',        active: false },
            { label: '💰 Donate',        active: false },
            { label: '👤 My Profile',    active: false },
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
        <button
          onClick={() => navigate('/')}
          style={styles.logoutBtn}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>🔍 Discover NGOs</h1>
            <p style={styles.subheading}>Find and support NGOs making a difference</p>
          </div>
          <div style={styles.totalBadge}>
            {filtered.length} NGOs found
          </div>
        </div>

        {/* Search and Filters */}
        <div style={styles.filterBox}>
          <input
            type="text"
            placeholder="🔍 Search NGOs by name or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.filters}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={styles.select}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Location</label>
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                style={styles.select}
              >
                {locations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedLocation('All') }}
              style={styles.clearBtn}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Category Quick Filter */}
        <div style={styles.quickFilters}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              style={{
                ...styles.quickBtn,
                backgroundColor: selectedCategory === c ? '#2d6a4f' : '#fff',
                color: selectedCategory === c ? '#fff' : '#555',
                border: selectedCategory === c ? '1px solid #2d6a4f' : '1px solid #ddd'
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* NGO Cards Grid */}
        {filtered.length === 0 ? (
          <div style={styles.noResults}>
            <p>😕 No NGOs found matching your search.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedLocation('All') }}
              style={styles.clearBtn}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map(ngo => (
              <div key={ngo.id} style={styles.card}>

                {/* Card Header */}
                <div style={styles.cardHeader}>
                  <div style={styles.ngoAvatar}>
                    {ngo.name.charAt(0)}
                  </div>
                  <div style={styles.ngoInfo}>
                    <div style={styles.ngoNameRow}>
                      <h3 style={styles.ngoName}>{ngo.name}</h3>
                      {ngo.verified && (
                        <span style={styles.verifiedBadge}>✅ Verified</span>
                      )}
                    </div>
                    <div style={styles.badgeRow}>
                      <span style={{ ...styles.badge, ...categoryColor(ngo.category) }}>
                        {ngo.category}
                      </span>
                      <span style={styles.locationBadge}>📍 {ngo.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={styles.description}>{ngo.description}</p>

                {/* Stats */}
                <div style={styles.cardStats}>
                  <div style={styles.cardStat}>
                    <span style={styles.cardStatValue}>{ngo.volunteers}</span>
                    <span style={styles.cardStatLabel}>Volunteers</span>
                  </div>
                  <div style={styles.cardStat}>
                    <span style={styles.cardStatValue}>{ngo.beneficiaries.toLocaleString()}</span>
                    <span style={styles.cardStatLabel}>Beneficiaries</span>
                  </div>
                  <div style={styles.cardStat}>
                    <span style={styles.cardStatValue}>⭐ {ngo.rating}</span>
                    <span style={styles.cardStatLabel}>Rating</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={styles.cardActions}>
                  <button style={styles.donateBtn}>💰 Donate</button>
                  <button style={styles.volunteerBtn}>🤝 Volunteer</button>
                  <button style={styles.viewBtn}>View Profile</button>
                </div>

              </div>
            ))}
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
    alignItems: 'center', marginBottom: '24px'
  },
  heading: { fontSize: '24px', color: '#1b4332', marginBottom: '4px' },
  subheading: { color: '#888', fontSize: '14px' },
  totalBadge: {
    backgroundColor: '#2d6a4f', color: '#fff',
    padding: '8px 16px', borderRadius: '20px',
    fontSize: '14px', fontWeight: '600'
  },
  filterBox: {
    backgroundColor: '#fff', padding: '20px',
    borderRadius: '12px', marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  searchInput: {
    width: '100%', padding: '12px 16px',
    borderRadius: '8px', border: '1px solid #ddd',
    fontSize: '14px', marginBottom: '16px',
    outline: 'none', boxSizing: 'border-box'
  },
  filters: { display: 'flex', gap: '16px', alignItems: 'flex-end' },
  filterGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  filterLabel: { fontSize: '12px', color: '#555', fontWeight: '600' },
  select: {
    padding: '8px 12px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '14px',
    outline: 'none', cursor: 'pointer'
  },
  clearBtn: {
    padding: '8px 16px', backgroundColor: '#f5f5f5',
    color: '#555', border: '1px solid #ddd',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: '13px', fontWeight: '600'
  },
  quickFilters: {
    display: 'flex', gap: '8px',
    marginBottom: '24px', flexWrap: 'wrap'
  },
  quickBtn: {
    padding: '6px 16px', borderRadius: '20px',
    cursor: 'pointer', fontSize: '13px',
    fontWeight: '500', transition: 'all 0.2s'
  },
  noResults: {
    textAlign: 'center', padding: '60px',
    color: '#888', fontSize: '16px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  card: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    display: 'flex', flexDirection: 'column', gap: '12px'
  },
  cardHeader: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  ngoAvatar: {
    width: '48px', height: '48px', borderRadius: '12px',
    backgroundColor: '#2d6a4f', color: '#fff',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '20px',
    fontWeight: 'bold', flexShrink: 0
  },
  ngoInfo: { flex: 1 },
  ngoNameRow: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' },
  ngoName: { fontSize: '15px', color: '#1b4332', margin: 0 },
  verifiedBadge: {
    fontSize: '11px', backgroundColor: '#e8f5e9',
    color: '#2d6a4f', padding: '2px 8px', borderRadius: '10px'
  },
  badgeRow: { display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' },
  badge: { padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' },
  locationBadge: { fontSize: '12px', color: '#888' },
  description: { fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 },
  cardStats: {
    display: 'flex', justifyContent: 'space-between',
    backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '12px'
  },
  cardStat: { textAlign: 'center', flex: 1 },
  cardStatValue: { display: 'block', fontSize: '16px', fontWeight: 'bold', color: '#1b4332' },
  cardStatLabel: { fontSize: '11px', color: '#888' },
  cardActions: { display: 'flex', gap: '8px' },
  donateBtn: {
    flex: 1, padding: '8px',
    backgroundColor: '#2d6a4f', color: '#fff',
    border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '12px', fontWeight: '600'
  },
  volunteerBtn: {
    flex: 1, padding: '8px',
    backgroundColor: '#e8f5e9', color: '#2d6a4f',
    border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '12px', fontWeight: '600'
  },
  viewBtn: {
    flex: 1, padding: '8px',
    backgroundColor: '#f5f5f5', color: '#555',
    border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '12px', fontWeight: '600'
  }
}

export default NGODiscovery 
