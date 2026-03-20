import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function EmailTest() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState({})
  const [success, setSuccess] = useState({})

  const sendTestEmail = async (type) => {
    if (!email) { alert('Please enter your email first!'); return }
    setLoading(prev => ({ ...prev, [type]: true }))
    try {
      const res = await fetch(`http://localhost:5000/api/notifications/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email,
          role: 'donor',
          amount: 5000,
          ngoName: 'Green Earth Foundation',
          date: 'December 1, 2025',
          location: 'Chennai',
          status: 'approved',
          eventName: 'Tree Plantation Drive'
        })
      })
      if (res.ok) {
        setSuccess(prev => ({ ...prev, [type]: true }))
        setTimeout(() => setSuccess(prev => ({ ...prev, [type]: false })), 3000)
      }
    } catch (err) {
      alert('Error sending email!')
    }
    setLoading(prev => ({ ...prev, [type]: false }))
  }

  const emails = [
    { type: 'welcome',      label: 'Welcome Email',         icon: '👋' },
    { type: 'donation',     label: 'Donation Confirmation', icon: '💰' },
    { type: 'event',        label: 'Event Reminder',        icon: '📅' },
    { type: 'verification', label: 'NGO Verification',      icon: '✅' },
  ]

  return (
    <div style={styles.wrapper}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
            { label: '📊 Dashboard',     path: '/donor-dashboard' },
            { label: '📧 Notifications', path: '/email-test'      },
            { label: '⚙️ Settings',      path: '/settings'        },
          ].map((item, i) => (
            <div key={i} onClick={() => navigate(item.path)} style={{
              ...styles.navItem,
              backgroundColor: item.label.includes('Notif') ? '#2d6a4f' : 'transparent',
              color: item.label.includes('Notif') ? '#fff' : '#ccc'
            }}>
              {item.label}
            </div>
          ))}
        </nav>
        <button
          onClick={() => { localStorage.clear(); navigate('/') }}
          style={styles.logoutBtn}>
          🚪 Logout
        </button>
      </div>

      <div style={styles.main}>
        <h1 style={styles.heading}>📧 Email Notifications</h1>
        <p style={styles.subheading}>Test and manage email notifications</p>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📬 Enter your email to test</h3>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.grid}>
          {emails.map(e => (
            <div key={e.type} style={styles.emailCard}>
              <div style={styles.icon}>{e.icon}</div>
              <h3 style={styles.emailLabel}>{e.label}</h3>
              {success[e.type] && (
                <div style={styles.successMsg}>✅ Email sent!</div>
              )}
              <button
                onClick={() => sendTestEmail(e.type)}
                disabled={loading[e.type]}
                style={{
                  ...styles.sendBtn,
                  backgroundColor: loading[e.type] ? '#ccc' : '#2d6a4f'
                }}>
                {loading[e.type] ? '⏳ Sending...' : '📧 Send Test'}
              </button>
            </div>
          ))}
        </div>
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
  heading: { fontSize: '24px', color: '#1b4332', marginBottom: '4px' },
  subheading: { color: '#888', fontSize: '14px', marginBottom: '24px' },
  card: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '24px', marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  cardTitle: { fontSize: '16px', color: '#1b4332', marginBottom: '16px' },
  input: {
    width: '100%', padding: '12px 16px',
    borderRadius: '8px', border: '1px solid #ddd',
    fontSize: '14px', outline: 'none',
    boxSizing: 'border-box'
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'
  },
  emailCard: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '24px', textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  icon: { fontSize: '36px', marginBottom: '12px' },
  emailLabel: { fontSize: '15px', color: '#1b4332', marginBottom: '16px' },
  successMsg: {
    backgroundColor: '#e8f5e9', color: '#2d6a4f',
    padding: '8px', borderRadius: '6px',
    fontSize: '13px', marginBottom: '10px'
  },
  sendBtn: {
    width: '100%', padding: '10px',
    color: '#fff', border: 'none',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: '13px', fontWeight: '600'
  }
}

export default EmailTest