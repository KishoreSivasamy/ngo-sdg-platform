import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DonatePage() {
  const navigate = useNavigate()
  const [selectedNGO,    setSelectedNGO]    = useState(null)
  const [amount,         setAmount]         = useState('')
  const [customAmount,   setCustomAmount]   = useState('')
  const [loading,        setLoading]        = useState(false)
  const [success,        setSuccess]        = useState(false)
  const [paymentId,      setPaymentId]      = useState('')

  const ngos = [
    { id: 1, name: 'Green Earth Foundation', category: 'Environment', description: 'Tree plantation and waste management', goal: 50000, raised: 32000 },
    { id: 2, name: 'Bright Minds NGO',       category: 'Education',   description: 'Education for underprivileged children',  goal: 30000, raised: 28000 },
    { id: 3, name: 'Health For All',         category: 'Health',      description: 'Free medical camps for rural areas',       goal: 40000, raised: 15000 },
    { id: 4, name: 'Feed India',             category: 'Food',        description: 'Combating hunger across Tamil Nadu',        goal: 20000, raised: 12000 },
  ]

  const presetAmounts = [100, 500, 1000, 2000, 5000, 10000]

  const categoryColor = (cat) => {
    if (cat === 'Environment') return { backgroundColor: '#e8f5e9', color: '#2d6a4f' }
    if (cat === 'Education')   return { backgroundColor: '#e3f2fd', color: '#1565c0' }
    if (cat === 'Health')      return { backgroundColor: '#fce4ec', color: '#c62828' }
    if (cat === 'Food')        return { backgroundColor: '#fff8e1', color: '#f57f17' }
    return {}
  }

  const finalAmount = customAmount || amount

  const handlePayment = async () => {
    if (!selectedNGO) { alert('Please select an NGO!'); return }
    if (!finalAmount) { alert('Please enter donation amount!'); return }

    setLoading(true)
    try {
      // Step 1 - Create order
      const orderRes = await fetch('http://localhost:5000/api/donation/create-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ amount: parseInt(finalAmount) })
      })
      const orderData = await orderRes.json()

      // Step 2 - Open Razorpay
      const options = {
        key:          orderData.keyId,
        amount:       orderData.amount,
        currency:     orderData.currency,
        name:         'NGO Connect',
        description:  `Donation to ${selectedNGO.name}`,
        order_id:     orderData.orderId,
        handler: async (response) => {
          // Step 3 - Verify payment
          const verifyRes = await fetch('http://localhost:5000/api/donation/verify-payment', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(response)
          })
          const verifyData = await verifyRes.json()
          if (verifyData.success) {
            setPaymentId(verifyData.paymentId)
            setSuccess(true)
          }
        },
        prefill: {
          name:    localStorage.getItem('name') || 'Donor',
          email:   localStorage.getItem('email') || '',
        },
        theme: { color: '#2d6a4f' }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      alert('Payment failed! Make sure Razorpay keys are set in .env')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.sidebar}>
          <h2 style={styles.logo}>🌍 NGO Connect</h2>
          <button onClick={() => { localStorage.clear(); navigate('/') }} style={styles.logoutBtn}>
            🚪 Logout
          </button>
        </div>
        <div style={styles.main}>
          <div style={styles.successCard}>
            <div style={styles.successIcon}>🎉</div>
            <h2 style={styles.successTitle}>Payment Successful!</h2>
            <p style={styles.successDesc}>
              Thank you for your generous donation to <strong>{selectedNGO?.name}</strong>!
            </p>
            <div style={styles.receiptBox}>
              <h3 style={styles.receiptTitle}>🧾 Donation Receipt</h3>
              <div style={styles.receiptRow}>
                <span>Amount</span>
                <strong>₹{finalAmount}</strong>
              </div>
              <div style={styles.receiptRow}>
                <span>NGO</span>
                <strong>{selectedNGO?.name}</strong>
              </div>
              <div style={styles.receiptRow}>
                <span>Payment ID</span>
                <strong style={{ fontSize: '12px' }}>{paymentId}</strong>
              </div>
              <div style={styles.receiptRow}>
                <span>Date</span>
                <strong>{new Date().toLocaleDateString()}</strong>
              </div>
              <div style={styles.receiptRow}>
                <span>Status</span>
                <strong style={{ color: '#2d6a4f' }}>✅ Confirmed</strong>
              </div>
            </div>
            <div style={styles.successBtns}>
              <button
                onClick={() => navigate('/donor-dashboard')}
                style={styles.dashBtn}>
                Go to Dashboard
              </button>
              <button
                onClick={() => { setSuccess(false); setAmount(''); setCustomAmount(''); setSelectedNGO(null) }}
                style={styles.donateAgainBtn}>
                Donate Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
  { label: '📊 Dashboard', path: '/donor-dashboard' },
  { label: '💰 Donate',    path: '/donate'           },
  { label: '🔍 Discover',  path: '/discover'         },
  { label: '⚙️ Settings',  path: '/settings'         },
].map((item, i) => (
  <div key={i}
    onClick={() => navigate(item.path)}
    style={{
      ...styles.navItem,
      backgroundColor: item.path === '/donate' ? '#2d6a4f' : 'transparent',
      color: item.path === '/donate' ? '#fff' : '#ccc'
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
        <div style={styles.header}>
          <h1 style={styles.heading}>💰 Make a Donation</h1>
          <p style={styles.subheading}>Support NGOs and make a real difference</p>
        </div>

        <div style={styles.twoCol}>

          {/* Left - NGO Selection & Amount */}
          <div>
            {/* Select NGO */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>🏛️ Select NGO</h2>
              <div style={styles.ngoList}>
                {ngos.map(ngo => (
                  <div
                    key={ngo.id}
                    onClick={() => setSelectedNGO(ngo)}
                    style={{
                      ...styles.ngoItem,
                      border: selectedNGO?.id === ngo.id
                        ? '2px solid #2d6a4f'
                        : '2px solid #e0e0e0',
                      backgroundColor: selectedNGO?.id === ngo.id
                        ? '#f0fff4' : '#fff'
                    }}>
                    <div style={styles.ngoItemLeft}>
                      <div style={styles.ngoAvatar}>
                        {ngo.name.charAt(0)}
                      </div>
                      <div>
                        <h3 style={styles.ngoName}>{ngo.name}</h3>
                        <span style={{ ...styles.badge, ...categoryColor(ngo.category) }}>
                          {ngo.category}
                        </span>
                        <p style={styles.ngoDesc}>{ngo.description}</p>
                        <div style={styles.progressBar}>
                          <div style={{
                            ...styles.progressFill,
                            width: `${(ngo.raised / ngo.goal) * 100}%`
                          }} />
                        </div>
                        <p style={styles.progressText}>
                          ₹{ngo.raised.toLocaleString()} raised of ₹{ngo.goal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {selectedNGO?.id === ngo.id && (
                      <span style={styles.selectedCheck}>✅</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Select Amount */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>💵 Select Amount</h2>
              <div style={styles.amountGrid}>
                {presetAmounts.map(a => (
                  <button
                    key={a}
                    onClick={() => { setAmount(a); setCustomAmount('') }}
                    style={{
                      ...styles.amountBtn,
                      backgroundColor: amount === a && !customAmount ? '#2d6a4f' : '#fff',
                      color: amount === a && !customAmount ? '#fff' : '#333',
                      border: amount === a && !customAmount
                        ? '2px solid #2d6a4f'
                        : '2px solid #e0e0e0'
                    }}>
                    ₹{a.toLocaleString()}
                  </button>
                ))}
              </div>
              <div style={styles.customAmount}>
                <label style={styles.label}>Or enter custom amount:</label>
                <div style={styles.customRow}>
                  <span style={styles.rupeeSign}>₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setAmount('') }}
                    style={styles.customInput}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Summary */}
          <div>
            <div style={styles.summaryCard}>
              <h2 style={styles.cardTitle}>📋 Donation Summary</h2>

              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Selected NGO</span>
                <span style={styles.summaryValue}>
                  {selectedNGO ? selectedNGO.name : 'Not selected'}
                </span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Donation Amount</span>
                <span style={styles.summaryValue}>
                  {finalAmount ? `₹${parseInt(finalAmount).toLocaleString()}` : 'Not set'}
                </span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Payment Method</span>
                <span style={styles.summaryValue}>Razorpay (UPI/Card/Net Banking)</span>
              </div>
              <div style={styles.summaryDivider} />
              <div style={styles.summaryTotal}>
                <span>Total Amount</span>
                <strong style={styles.totalAmount}>
                  ₹{finalAmount ? parseInt(finalAmount).toLocaleString() : '0'}
                </strong>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={loading || !selectedNGO || !finalAmount}
                style={{
                  ...styles.payBtn,
                  backgroundColor: selectedNGO && finalAmount ? '#2d6a4f' : '#ccc',
                  cursor: selectedNGO && finalAmount ? 'pointer' : 'not-allowed'
                }}>
                {loading ? '⏳ Processing...' : `💳 Pay ₹${finalAmount ? parseInt(finalAmount).toLocaleString() : '0'}`}
              </button>

              {/* Security badges */}
              <div style={styles.securityBadges}>
                <span style={styles.securityBadge}>🔒 Secure Payment</span>
                <span style={styles.securityBadge}>✅ Razorpay</span>
                <span style={styles.securityBadge}>🏦 Bank Grade</span>
              </div>

              <p style={styles.disclaimer}>
                Your donation is secure and encrypted. You will receive a
                confirmation email after successful payment.
              </p>
            </div>

            {/* Payment Methods */}
            <div style={styles.paymentMethodsCard}>
              <h3 style={styles.pmTitle}>Accepted Payment Methods</h3>
              <div style={styles.pmGrid}>
                {['💳 Credit Card', '🏦 Debit Card', '📱 UPI', '🏛️ Net Banking', '💼 Wallet', '📊 EMI'].map((pm, i) => (
                  <div key={i} style={styles.pmItem}>{pm}</div>
                ))}
              </div>
            </div>
          </div>

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
  header: { marginBottom: '24px' },
  heading: { fontSize: '24px', color: '#1b4332', marginBottom: '4px' },
  subheading: { color: '#888', fontSize: '14px' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' },
  card: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '24px', marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  cardTitle: { fontSize: '18px', color: '#1b4332', marginBottom: '16px' },
  ngoList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  ngoItem: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '14px',
    borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s'
  },
  ngoItemLeft: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  ngoAvatar: {
    width: '44px', height: '44px', borderRadius: '10px',
    backgroundColor: '#2d6a4f', color: '#fff',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '18px',
    fontWeight: 'bold', flexShrink: 0
  },
  ngoName: { fontSize: '15px', color: '#1b4332', marginBottom: '4px' },
  badge: { padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' },
  ngoDesc: { fontSize: '12px', color: '#888', marginTop: '4px', marginBottom: '8px' },
  progressBar: { height: '6px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '4px', width: '200px' },
  progressFill: { height: '100%', backgroundColor: '#2d6a4f', borderRadius: '4px' },
  progressText: { fontSize: '11px', color: '#888' },
  selectedCheck: { fontSize: '20px' },
  amountGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' },
  amountBtn: {
    padding: '12px', borderRadius: '8px',
    cursor: 'pointer', fontSize: '15px', fontWeight: '600'
  },
  customAmount: { marginTop: '8px' },
  label: { fontSize: '13px', color: '#555', fontWeight: '600', display: 'block', marginBottom: '8px' },
  customRow: { display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' },
  rupeeSign: { padding: '10px 14px', backgroundColor: '#f5f5f5', fontSize: '16px', fontWeight: 'bold', color: '#555' },
  customInput: { flex: 1, padding: '10px 14px', border: 'none', fontSize: '16px', outline: 'none' },
  summaryCard: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '24px', marginBottom: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  summaryItem: {
    display: 'flex', justifyContent: 'space-between',
    padding: '12px 0', borderBottom: '1px solid #f0f0f0'
  },
  summaryLabel: { fontSize: '14px', color: '#888' },
  summaryValue: { fontSize: '14px', color: '#333', fontWeight: '600', textAlign: 'right', maxWidth: '180px' },
  summaryDivider: { height: '1px', backgroundColor: '#e0e0e0', margin: '8px 0' },
  summaryTotal: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginBottom: '16px' },
  totalAmount: { fontSize: '24px', color: '#2d6a4f' },
  payBtn: {
    width: '100%', padding: '16px',
    color: '#fff', border: 'none',
    borderRadius: '10px', fontSize: '18px',
    fontWeight: '700', marginBottom: '16px'
  },
  securityBadges: { display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' },
  securityBadge: {
    fontSize: '11px', backgroundColor: '#f5f5f5',
    padding: '4px 10px', borderRadius: '20px', color: '#555'
  },
  disclaimer: { fontSize: '12px', color: '#aaa', textAlign: 'center', lineHeight: 1.5 },
  paymentMethodsCard: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  pmTitle: { fontSize: '14px', color: '#555', marginBottom: '12px' },
  pmGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' },
  pmItem: {
    padding: '8px', backgroundColor: '#f9f9f9',
    borderRadius: '6px', fontSize: '12px',
    color: '#555', textAlign: 'center'
  },
  successCard: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '48px', textAlign: 'center',
    maxWidth: '600px', margin: '0 auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  successIcon: { fontSize: '64px', marginBottom: '16px' },
  successTitle: { fontSize: '28px', color: '#1b4332', marginBottom: '12px' },
  successDesc: { fontSize: '16px', color: '#666', marginBottom: '24px' },
  receiptBox: {
    backgroundColor: '#f9f9f9', borderRadius: '10px',
    padding: '20px', marginBottom: '24px', textAlign: 'left'
  },
  receiptTitle: { fontSize: '16px', color: '#1b4332', marginBottom: '16px' },
  receiptRow: {
    display: 'flex', justifyContent: 'space-between',
    padding: '8px 0', borderBottom: '1px solid #e0e0e0',
    fontSize: '14px', color: '#555'
  },
  successBtns: { display: 'flex', gap: '12px', justifyContent: 'center' },
  dashBtn: {
    padding: '12px 24px', backgroundColor: '#2d6a4f',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600'
  },
  donateAgainBtn: {
    padding: '12px 24px', backgroundColor: '#fff',
    color: '#2d6a4f', border: '2px solid #2d6a4f',
    borderRadius: '8px', cursor: 'pointer',
    fontSize: '14px', fontWeight: '600'
  }
}

export default DonatePage