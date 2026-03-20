import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileSettings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)

  const [profile, setProfile] = useState({
    name:     localStorage.getItem('name')  || '',
    email:    localStorage.getItem('email') || '',
    phone:    '',
    location: '',
    bio:      '',
    role:     localStorage.getItem('role')  || 'donor'
  })

  const [password, setPassword] = useState({
    current:  '',
    newPass:  '',
    confirm:  ''
  })

  const [notifications, setNotifications] = useState({
    emailDonations:  true,
    emailEvents:     true,
    emailNewsletter: false,
    smsAlerts:       false,
  })

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  const handleSaveProfile = () => {
    localStorage.setItem('name', profile.name)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSavePassword = () => {
    if (password.newPass !== password.confirm) {
      alert('Passwords do not match!')
      return
    }
    setPasswordSaved(true)
    setTimeout(() => setPasswordSaved(false), 3000)
    setPassword({ current: '', newPass: '', confirm: '' })
  }

  const roleColor = {
    donor:     { backgroundColor: '#e8f5e9', color: '#2d6a4f' },
    ngo:       { backgroundColor: '#e3f2fd', color: '#1565c0' },
    volunteer: { backgroundColor: '#f3e5f5', color: '#6a1b9a' },
    admin:     { backgroundColor: '#fce4ec', color: '#c62828' },
  }

  const getDashboardPath = () => {
    const role = localStorage.getItem('role')
    if (role === 'admin')     return '/admin'
    if (role === 'ngo')       return '/ngo-dashboard'
    if (role === 'volunteer') return '/volunteer-dashboard'
    return '/donor-dashboard'
  }

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
            { label: '📊 Dashboard',  action: () => navigate(getDashboardPath()) },
            { label: '⚙️ Settings',   action: () => {}                           },
            { label: '🔍 Discover',   action: () => navigate('/discover')        },
            { label: '📊 Analytics',  action: () => navigate('/analytics')       },
          ].map((item, i) => (
            <div key={i} onClick={item.action} style={{
              ...styles.navItem,
              backgroundColor: item.label.includes('Settings') ? '#2d6a4f' : 'transparent',
              color: item.label.includes('Settings') ? '#fff' : '#ccc'
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

      {/* Main */}
      <div style={styles.main}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>⚙️ Profile Settings</h1>
            <p style={styles.subheading}>Manage your account information</p>
          </div>
          <span style={{
            ...styles.roleBadge,
            ...roleColor[profile.role]
          }}>
            {profile.role.toUpperCase()}
          </span>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {[
            { label: '👤 Profile',       tab: 'profile'       },
            { label: '🔒 Password',      tab: 'password'      },
            { label: '🔔 Notifications', tab: 'notifications' },
            { label: '🗑️ Danger Zone',   tab: 'danger'        },
          ].map((t, i) => (
            <button key={i}
              onClick={() => setActiveTab(t.tab)}
              style={{
                ...styles.tab,
                backgroundColor: activeTab === t.tab ? '#2d6a4f' : '#fff',
                color: activeTab === t.tab ? '#fff' : '#555',
                border: activeTab === t.tab ? '1px solid #2d6a4f' : '1px solid #ddd'
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>👤 Personal Information</h2>

            {/* Avatar */}
            <div style={styles.avatarSection}>
              <div style={styles.avatar}>
                {profile.name.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h3 style={styles.avatarName}>{profile.name || 'Your Name'}</h3>
                <p style={styles.avatarRole}>{profile.role}</p>
                <button style={styles.changeAvatarBtn}>Change Photo</button>
              </div>
            </div>

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  style={styles.input}
                  placeholder="Enter your full name"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  style={{ ...styles.input, backgroundColor: '#f5f5f5' }}
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  style={styles.input}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Location</label>
                <input
                  name="location"
                  value={profile.location}
                  onChange={handleProfileChange}
                  style={styles.input}
                  placeholder="City, State"
                />
              </div>
              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  style={styles.textarea}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>
            </div>

            {saved && (
              <div style={styles.successMsg}>
                ✅ Profile saved successfully!
              </div>
            )}

            <button onClick={handleSaveProfile} style={styles.saveBtn}>
              💾 Save Changes
            </button>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🔒 Change Password</h2>
            <div style={styles.formSingle}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Current Password</label>
                <input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  style={styles.input}
                  placeholder="Enter current password"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input
                  type="password"
                  name="newPass"
                  value={password.newPass}
                  onChange={handlePasswordChange}
                  style={styles.input}
                  placeholder="Enter new password"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm New Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  style={styles.input}
                  placeholder="Confirm new password"
                />
              </div>

              {/* Password strength */}
              {password.newPass && (
                <div style={styles.strengthBox}>
                  <p style={styles.strengthLabel}>Password Strength:</p>
                  <div style={styles.strengthBar}>
                    <div style={{
                      ...styles.strengthFill,
                      width: password.newPass.length > 8 ? '100%' :
                             password.newPass.length > 5 ? '60%' : '30%',
                      backgroundColor: password.newPass.length > 8 ? '#2d6a4f' :
                                       password.newPass.length > 5 ? '#f57f17' : '#c62828'
                    }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#888' }}>
                    {password.newPass.length > 8 ? '💪 Strong' :
                     password.newPass.length > 5 ? '⚠️ Medium' : '❌ Weak'}
                  </p>
                </div>
              )}

              {passwordSaved && (
                <div style={styles.successMsg}>✅ Password changed successfully!</div>
              )}

              <button onClick={handleSavePassword} style={styles.saveBtn}>
                🔒 Update Password
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🔔 Notification Preferences</h2>
            <div style={styles.notifList}>
              {[
                { key: 'emailDonations',  label: 'Email - Donation Updates',    desc: 'Get notified when donations are made'          },
                { key: 'emailEvents',     label: 'Email - Event Reminders',     desc: 'Reminders for upcoming events'                 },
                { key: 'emailNewsletter', label: 'Email - Newsletter',          desc: 'Monthly newsletter and impact reports'         },
                { key: 'smsAlerts',       label: 'SMS - Important Alerts',      desc: 'SMS for critical updates and verifications'    },
              ].map((n, i) => (
                <div key={i} style={styles.notifItem}>
                  <div style={styles.notifInfo}>
                    <p style={styles.notifLabel}>{n.label}</p>
                    <p style={styles.notifDesc}>{n.desc}</p>
                  </div>
                  <div
                    onClick={() => setNotifications({
                      ...notifications,
                      [n.key]: !notifications[n.key]
                    })}
                    style={{
                      ...styles.toggle,
                      backgroundColor: notifications[n.key] ? '#2d6a4f' : '#ccc'
                    }}>
                    <div style={{
                      ...styles.toggleDot,
                      transform: notifications[n.key] ? 'translateX(24px)' : 'translateX(0)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <button style={styles.saveBtn}>💾 Save Preferences</button>
          </div>
        )}

        {/* Danger Zone Tab */}
        {activeTab === 'danger' && (
          <div style={styles.card}>
            <h2 style={{ ...styles.cardTitle, color: '#c62828' }}>🗑️ Danger Zone</h2>
            <div style={styles.dangerBox}>
              <div style={styles.dangerItem}>
                <div>
                  <h3 style={styles.dangerTitle}>Deactivate Account</h3>
                  <p style={styles.dangerDesc}>
                    Temporarily deactivate your account. You can reactivate it anytime.
                  </p>
                </div>
                <button style={styles.dangerBtn}>Deactivate</button>
              </div>
              <div style={styles.dangerItem}>
                <div>
                  <h3 style={styles.dangerTitle}>Delete Account</h3>
                  <p style={styles.dangerDesc}>
                    Permanently delete your account and all associated data. This cannot be undone.
                  </p>
                </div>
                <button style={styles.deleteBtn}>Delete Account</button>
              </div>
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
    alignItems: 'center', marginBottom: '24px'
  },
  heading: { fontSize: '24px', color: '#1b4332', marginBottom: '4px' },
  subheading: { color: '#888', fontSize: '14px' },
  roleBadge: {
    padding: '6px 16px', borderRadius: '20px',
    fontSize: '13px', fontWeight: '700'
  },
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px' },
  tab: {
    padding: '10px 20px', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '500'
  },
  card: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  cardTitle: { fontSize: '18px', color: '#1b4332', marginBottom: '24px' },
  avatarSection: {
    display: 'flex', alignItems: 'center',
    gap: '20px', marginBottom: '28px',
    paddingBottom: '24px', borderBottom: '1px solid #f0f0f0'
  },
  avatar: {
    width: '72px', height: '72px', borderRadius: '50%',
    backgroundColor: '#2d6a4f', color: '#fff',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '28px', fontWeight: 'bold'
  },
  avatarName: { fontSize: '18px', color: '#1b4332', marginBottom: '4px' },
  avatarRole: { fontSize: '13px', color: '#888', marginBottom: '8px', textTransform: 'capitalize' },
  changeAvatarBtn: {
    padding: '6px 14px', backgroundColor: '#f5f5f5',
    color: '#555', border: '1px solid #ddd',
    borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
  },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' },
  formSingle: { display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#444' },
  input: {
    padding: '10px 14px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '14px', outline: 'none'
  },
  textarea: {
    padding: '10px 14px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '14px',
    outline: 'none', resize: 'vertical', fontFamily: 'inherit'
  },
  successMsg: {
    backgroundColor: '#e8f5e9', color: '#2d6a4f',
    padding: '12px 16px', borderRadius: '8px',
    fontSize: '14px', marginBottom: '16px'
  },
  saveBtn: {
    padding: '12px 28px', backgroundColor: '#2d6a4f',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600'
  },
  strengthBox: { marginTop: '4px' },
  strengthLabel: { fontSize: '13px', color: '#555', marginBottom: '6px' },
  strengthBar: {
    height: '6px', backgroundColor: '#f0f0f0',
    borderRadius: '4px', overflow: 'hidden', marginBottom: '4px'
  },
  strengthFill: { height: '100%', borderRadius: '4px', transition: 'all 0.3s' },
  notifList: { display: 'flex', flexDirection: 'column', gap: '0px' },
  notifItem: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '20px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  notifInfo: {},
  notifLabel: { fontSize: '14px', color: '#333', fontWeight: '600', marginBottom: '4px' },
  notifDesc: { fontSize: '13px', color: '#888' },
  toggle: {
    width: '48px', height: '24px', borderRadius: '12px',
    cursor: 'pointer', position: 'relative', transition: 'background 0.3s'
  },
  toggleDot: {
    width: '20px', height: '20px', backgroundColor: '#fff',
    borderRadius: '50%', position: 'absolute', top: '2px', left: '2px',
    transition: 'transform 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
  },
  dangerBox: { display: 'flex', flexDirection: 'column', gap: '16px' },
  dangerItem: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '20px',
    border: '1px solid #ffcdd2', borderRadius: '8px',
    backgroundColor: '#fff8f8'
  },
  dangerTitle: { fontSize: '15px', color: '#c62828', marginBottom: '4px' },
  dangerDesc: { fontSize: '13px', color: '#888', maxWidth: '500px' },
  dangerBtn: {
    padding: '8px 20px', backgroundColor: '#fff',
    color: '#c62828', border: '1px solid #c62828',
    borderRadius: '6px', cursor: 'pointer',
    fontSize: '13px', fontWeight: '600', flexShrink: 0
  },
  deleteBtn: {
    padding: '8px 20px', backgroundColor: '#c62828',
    color: '#fff', border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px', fontWeight: '600', flexShrink: 0
  }
}

export default ProfileSettings