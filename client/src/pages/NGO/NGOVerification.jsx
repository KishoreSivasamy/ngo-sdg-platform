 import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NGOVerification() {
  const navigate = useNavigate()
  const [files, setFiles] = useState({
    registration: null,
    trustDeed:    null,
    panCard:      null,
    fcra:         null,
  })
  const [uploading, setUploading]   = useState({})
  const [uploaded, setUploaded]     = useState({})
  const [verifying, setVerifying]   = useState(false)
  const [verified, setVerified]     = useState(false)
  const [step, setStep]             = useState(1)

  const documents = [
    { key: 'registration', label: 'NGO Registration Certificate', required: true,  desc: 'Certificate of incorporation or registration'     },
    { key: 'trustDeed',    label: 'Trust Deed / MOA',             required: true,  desc: 'Memorandum of Association or Trust Deed document'  },
    { key: 'panCard',      label: 'PAN Card',                     required: true,  desc: 'PAN card of the organization'                      },
    { key: 'fcra',         label: 'FCRA Certificate',             required: false, desc: 'Foreign Contribution Regulation Act certificate'   },
  ]

  const handleFileChange = (key, e) => {
    const file = e.target.files[0]
    if (!file) return
    setFiles({ ...files, [key]: file })

    // Simulate upload
    setUploading({ ...uploading, [key]: true })
    setTimeout(() => {
      setUploading(prev => ({ ...prev, [key]: false }))
      setUploaded(prev => ({ ...prev, [key]: true }))
    }, 1500)
  }

  const handleVerify = () => {
    const requiredDocs = documents.filter(d => d.required).map(d => d.key)
    const allUploaded  = requiredDocs.every(k => uploaded[k])
    if (!allUploaded) {
      alert('Please upload all required documents first!')
      return
    }
    setVerifying(true)
    // Simulate OCR verification
    setTimeout(() => {
      setVerifying(false)
      setVerified(true)
      setStep(3)
    }, 3000)
  }

  const allRequiredUploaded = documents
    .filter(d => d.required)
    .every(d => uploaded[d.key])

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
            { label: '📊 Dashboard',  path: '/ngo-dashboard'  },
            { label: '📄 Verification', path: '/ngo-verify'  },
            { label: '⚙️ Settings',   path: '/settings'      },
          ].map((item, i) => (
            <div key={i}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.navItem,
                backgroundColor: item.label.includes('Verif') ? '#2d6a4f' : 'transparent',
                color: item.label.includes('Verif') ? '#fff' : '#ccc'
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
            <h1 style={styles.heading}>📄 NGO Verification</h1>
            <p style={styles.subheading}>Upload documents to get your NGO verified</p>
          </div>
          <div style={{
            ...styles.statusBadge,
            backgroundColor: verified ? '#e8f5e9' : '#fff8e1',
            color: verified ? '#2d6a4f' : '#f57f17'
          }}>
            {verified ? '✅ Verified' : '⏳ Pending Verification'}
          </div>
        </div>

        {/* Progress Steps */}
        <div style={styles.steps}>
          {[
            { num: 1, label: 'Upload Documents' },
            { num: 2, label: 'OCR Verification'  },
            { num: 3, label: 'Verified'           },
          ].map((s, i) => (
            <div key={i} style={styles.stepItem}>
              <div style={{
                ...styles.stepCircle,
                backgroundColor: step >= s.num ? '#2d6a4f' : '#e0e0e0',
                color: step >= s.num ? '#fff' : '#888'
              }}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span style={{
                ...styles.stepLabel,
                color: step >= s.num ? '#2d6a4f' : '#888',
                fontWeight: step === s.num ? '600' : '400'
              }}>
                {s.label}
              </span>
              {i < 2 && <div style={{
                ...styles.stepLine,
                backgroundColor: step > s.num ? '#2d6a4f' : '#e0e0e0'
              }} />}
            </div>
          ))}
        </div>

        {/* Verified Success */}
        {verified && (
          <div style={styles.successCard}>
            <div style={styles.successIcon}>🎉</div>
            <h2 style={styles.successTitle}>Congratulations! Your NGO is Verified!</h2>
            <p style={styles.successDesc}>
              Your documents have been verified successfully through our OCR system.
              Your NGO is now visible to donors and volunteers on the platform.
            </p>
            <div style={styles.successDetails}>
              <div style={styles.successDetail}>
                <span style={styles.successDetailIcon}>✅</span>
                <span>Registration Certificate — Verified</span>
              </div>
              <div style={styles.successDetail}>
                <span style={styles.successDetailIcon}>✅</span>
                <span>Trust Deed / MOA — Verified</span>
              </div>
              <div style={styles.successDetail}>
                <span style={styles.successDetailIcon}>✅</span>
                <span>PAN Card — Verified</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/ngo-dashboard')}
              style={styles.dashboardBtn}>
              Go to Dashboard →
            </button>
          </div>
        )}

        {/* Verifying loader */}
        {verifying && (
          <div style={styles.verifyingCard}>
            <div style={styles.spinner}>⚙️</div>
            <h2 style={styles.verifyingTitle}>Verifying Documents...</h2>
            <p style={styles.verifyingDesc}>
              Our OCR system is extracting and verifying information from your documents.
              This may take a few moments.
            </p>
            <div style={styles.verifyingSteps}>
              {[
                '📄 Extracting text from documents...',
                '🔍 Comparing with government records...',
                '✅ Validating NGO registration number...',
              ].map((s, i) => (
                <div key={i} style={styles.verifyingStep}>{s}</div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Documents */}
        {!verified && !verifying && (
          <>
            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                📋 Please upload the required documents below. All documents should be
                clear, readable PDFs or images (JPG, PNG). Maximum file size: 5MB per document.
              </p>
            </div>

            <div style={styles.documentsGrid}>
              {documents.map(doc => (
                <div key={doc.key} style={styles.docCard}>
                  <div style={styles.docHeader}>
                    <div>
                      <h3 style={styles.docTitle}>
                        {doc.label}
                        {doc.required && <span style={styles.required}> *</span>}
                      </h3>
                      <p style={styles.docDesc}>{doc.desc}</p>
                    </div>
                    {uploaded[doc.key] && (
                      <span style={styles.uploadedBadge}>✅ Uploaded</span>
                    )}
                  </div>

                  {/* Upload Area */}
                  <label style={{
                    ...styles.uploadArea,
                    borderColor: uploaded[doc.key] ? '#2d6a4f' : '#ddd',
                    backgroundColor: uploaded[doc.key] ? '#f0fff4' : '#fafafa'
                  }}>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={e => handleFileChange(doc.key, e)}
                      style={{ display: 'none' }}
                    />
                    {uploading[doc.key] ? (
                      <div style={styles.uploadingState}>
                        <span style={styles.uploadIcon}>⏳</span>
                        <span style={styles.uploadText}>Uploading...</span>
                      </div>
                    ) : uploaded[doc.key] ? (
                      <div style={styles.uploadingState}>
                        <span style={styles.uploadIcon}>✅</span>
                        <span style={{ ...styles.uploadText, color: '#2d6a4f' }}>
                          {files[doc.key]?.name}
                        </span>
                        <span style={styles.changeText}>Click to change</span>
                      </div>
                    ) : (
                      <div style={styles.uploadingState}>
                        <span style={styles.uploadIcon}>📁</span>
                        <span style={styles.uploadText}>Click to upload</span>
                        <span style={styles.uploadHint}>PDF, JPG, PNG (max 5MB)</span>
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>

            {/* NITI Aayog Check */}
            <div style={styles.nitiBox}>
              <h3 style={styles.nitiTitle}>🏛️ NITI Aayog Darpan Verification</h3>
              <p style={styles.nitiDesc}>
                Enter your NITI Aayog Darpan registration ID for additional verification
              </p>
              <div style={styles.nitiRow}>
                <input
                  type="text"
                  placeholder="e.g. DL/2019/0123456"
                  style={styles.nitiInput}
                />
                <button style={styles.nitiBtn}>🔍 Verify ID</button>
              </div>
            </div>

            {/* Submit Button */}
            <div style={styles.submitRow}>
              <button
                onClick={handleVerify}
                disabled={!allRequiredUploaded}
                style={{
                  ...styles.submitBtn,
                  backgroundColor: allRequiredUploaded ? '#2d6a4f' : '#ccc',
                  cursor: allRequiredUploaded ? 'pointer' : 'not-allowed'
                }}>
                {allRequiredUploaded
                  ? '🚀 Submit for Verification'
                  : '⚠️ Upload all required documents first'}
              </button>
            </div>
          </>
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
  statusBadge: {
    padding: '8px 16px', borderRadius: '20px',
    fontSize: '14px', fontWeight: '600'
  },
  steps: {
    display: 'flex', alignItems: 'center',
    backgroundColor: '#fff', padding: '20px 32px',
    borderRadius: '12px', marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  stepItem: { display: 'flex', alignItems: 'center', gap: '10px' },
  stepCircle: {
    width: '36px', height: '36px', borderRadius: '50%',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '14px',
    fontWeight: 'bold', flexShrink: 0
  },
  stepLabel: { fontSize: '14px', whiteSpace: 'nowrap' },
  stepLine: { width: '80px', height: '2px', margin: '0 12px' },
  successCard: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '48px', textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  successIcon: { fontSize: '64px', marginBottom: '16px' },
  successTitle: { fontSize: '24px', color: '#1b4332', marginBottom: '12px' },
  successDesc: { fontSize: '15px', color: '#666', marginBottom: '24px', lineHeight: 1.6 },
  successDetails: {
    display: 'inline-flex', flexDirection: 'column',
    gap: '8px', textAlign: 'left', marginBottom: '32px'
  },
  successDetail: { display: 'flex', gap: '10px', fontSize: '14px', color: '#555' },
  successDetailIcon: { fontSize: '16px' },
  dashboardBtn: {
    padding: '14px 32px', backgroundColor: '#2d6a4f',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '16px', fontWeight: '600'
  },
  verifyingCard: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '48px', textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  spinner: { fontSize: '48px', marginBottom: '16px', animation: 'spin 1s linear infinite' },
  verifyingTitle: { fontSize: '22px', color: '#1b4332', marginBottom: '12px' },
  verifyingDesc: { fontSize: '14px', color: '#888', marginBottom: '24px' },
  verifyingSteps: { display: 'inline-flex', flexDirection: 'column', gap: '8px', textAlign: 'left' },
  verifyingStep: { fontSize: '14px', color: '#555', padding: '8px 16px', backgroundColor: '#f5f5f5', borderRadius: '6px' },
  infoBox: {
    backgroundColor: '#e3f2fd', borderRadius: '8px',
    padding: '14px 20px', marginBottom: '20px'
  },
  infoText: { fontSize: '14px', color: '#1565c0', margin: 0 },
  documentsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px', marginBottom: '24px'
  },
  docCard: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  docHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '14px'
  },
  docTitle: { fontSize: '15px', color: '#1b4332', marginBottom: '4px' },
  required: { color: '#c62828' },
  docDesc: { fontSize: '12px', color: '#888' },
  uploadedBadge: {
    fontSize: '12px', backgroundColor: '#e8f5e9',
    color: '#2d6a4f', padding: '4px 10px',
    borderRadius: '20px', fontWeight: '600', flexShrink: 0
  },
  uploadArea: {
    display: 'block', border: '2px dashed',
    borderRadius: '8px', padding: '24px',
    cursor: 'pointer', textAlign: 'center',
    transition: 'all 0.2s'
  },
  uploadingState: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  uploadIcon: { fontSize: '28px' },
  uploadText: { fontSize: '14px', color: '#555', fontWeight: '500' },
  uploadHint: { fontSize: '12px', color: '#aaa' },
  changeText: { fontSize: '12px', color: '#2d6a4f' },
  nitiBox: {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '24px', marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  nitiTitle: { fontSize: '16px', color: '#1b4332', marginBottom: '6px' },
  nitiDesc: { fontSize: '13px', color: '#888', marginBottom: '16px' },
  nitiRow: { display: 'flex', gap: '12px' },
  nitiInput: {
    flex: 1, padding: '10px 14px',
    borderRadius: '8px', border: '1px solid #ddd',
    fontSize: '14px', outline: 'none'
  },
  nitiBtn: {
    padding: '10px 20px', backgroundColor: '#1565c0',
    color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600'
  },
  submitRow: { textAlign: 'center' },
  submitBtn: {
    padding: '14px 40px', color: '#fff',
    border: 'none', borderRadius: '10px',
    fontSize: '16px', fontWeight: '600'
  }
}

export default NGOVerification
