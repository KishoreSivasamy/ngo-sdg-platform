import API_URL from '../../config'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('https://ngo-connect-backend-mkg0.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Login failed')
      } else {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)

        if (data.role === 'admin')          navigate('/admin')
        else if (data.role === 'ngo')       navigate('/ngo-dashboard')
        else if (data.role === 'donor')     navigate('/donor-dashboard')
        else                                navigate('/volunteer-dashboard')
      }
    } catch (err) {
      setError('Server error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌍 NGO Connect</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p style={styles.footerText}>
  Don't have an account?{' '}
  <span
    onClick={() => navigate('/register')}
    style={styles.link}>
    Register here
  </span>
</p>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8'
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px'
  },
  title: {
    textAlign: 'center',
    fontSize: '26px',
    color: '#2d6a4f',
    marginBottom: '6px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: '24px',
    fontSize: '14px'
  },
  error: {
    backgroundColor: '#ffe0e0',
    color: '#cc0000',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px'
  },
  inputGroup: {
    marginBottom: '18px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2d6a4f',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '6px'
  },
  footerText: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#555'
  },
  link: {
    color: '#2d6a4f',
    fontWeight: '600',
    textDecoration: 'none'
  }
}

export default Login