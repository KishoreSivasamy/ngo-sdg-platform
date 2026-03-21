import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function LiveChat() {
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)
  const [activeChat, setActiveChat] = useState(0)
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Green Earth Foundation',
      avatar: 'G',
      category: 'Environment',
      lastMessage: 'Can we collaborate on the tree plantation drive?',
      time: '10:30 AM',
      unread: 2,
      online: true,
      messages: [
        { id: 1, sender: 'them', text: 'Hello! We would like to collaborate on the upcoming tree plantation drive.', time: '10:25 AM' },
        { id: 2, sender: 'them', text: 'Can we collaborate on the tree plantation drive?', time: '10:30 AM' },
      ]
    },
    {
      id: 2,
      name: 'Health For All',
      avatar: 'H',
      category: 'Health',
      lastMessage: 'We need volunteers for our medical camp',
      time: '9:15 AM',
      unread: 0,
      online: true,
      messages: [
        { id: 1, sender: 'me',   text: 'Hi! We heard about your free medical camp initiative.', time: '9:00 AM' },
        { id: 2, sender: 'them', text: 'Yes! We are organizing one next month in Trichy.', time: '9:10 AM' },
        { id: 3, sender: 'them', text: 'We need volunteers for our medical camp', time: '9:15 AM' },
      ]
    },
    {
      id: 3,
      name: 'Bright Minds NGO',
      avatar: 'B',
      category: 'Education',
      lastMessage: 'Thank you for the resource sharing!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'me',   text: 'We would like to share some educational resources with you.', time: 'Yesterday' },
        { id: 2, sender: 'them', text: 'Thank you for the resource sharing!', time: 'Yesterday' },
      ]
    },
    {
      id: 4,
      name: 'Feed India',
      avatar: 'F',
      category: 'Food',
      lastMessage: 'The food distribution was a great success!',
      time: 'Mon',
      unread: 1,
      online: false,
      messages: [
        { id: 1, sender: 'them', text: 'The food distribution was a great success!', time: 'Mon' },
      ]
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => { scrollToBottom() }, [activeChat, chats])

  const handleSend = () => {
    if (!message.trim()) return
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    const updated = chats.map((c, i) => {
      if (i === activeChat) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: message,
          time: 'Just now'
        }
      }
      return c
    })
    setChats(updated)
    setMessage('')

    // Simulate reply after 1.5 seconds
    setTimeout(() => {
      const replies = [
        'That sounds great! Let us discuss further.',
        'Thank you for reaching out!',
        'We would love to collaborate on this.',
        'Can we schedule a meeting this week?',
        'Great idea! We will get back to you soon.',
      ]
      const reply = {
        id: Date.now() + 1,
        sender: 'them',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setChats(prev => prev.map((c, i) => {
        if (i === activeChat) {
          return { ...c, messages: [...c.messages, reply], lastMessage: reply.text, time: 'Just now' }
        }
        return c
      }))
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const categoryColor = (cat) => {
    if (cat === 'Environment') return '#2d6a4f'
    if (cat === 'Health')      return '#c62828'
    if (cat === 'Education')   return '#1565c0'
    if (cat === 'Food')        return '#f57f17'
    return '#555'
  }

  const currentChat = chats[activeChat]

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🌍 NGO Connect</h2>
        <nav>
          {[
             { label: '📊 Dashboard', path: '/ngo-dashboard' },
             { label: '💬 Live Chat', path: '/chat'           },
             { label: '📄 Verify',    path: '/ngo-verify'     },
             { label: '🔍 Discover',  path: '/discover'       },
             { label: '📊 Analytics', path: '/analytics'      },
             { label: '⚙️ Settings',  path: '/settings'       },
             ].map((item, i) => (
            <div key={i}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.navItem,
                backgroundColor: item.path === '/chat' ? '#2d6a4f' : 'transparent',
                color: item.path === '/chat' ? '#fff' : '#ccc'
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

      {/* Chat Container */}
      <div style={styles.chatContainer}>

        {/* Chat List */}
        <div style={styles.chatList}>
          <div style={styles.chatListHeader}>
            <h2 style={styles.chatListTitle}>💬 NGO Chats</h2>
            <span style={styles.chatCount}>{chats.length}</span>
          </div>
          <input
            type="text"
            placeholder="🔍 Search chats..."
            style={styles.searchInput}
          />
          {chats.map((chat, i) => (
            <div
              key={chat.id}
              onClick={() => {
                setActiveChat(i)
                setChats(prev => prev.map((c, idx) =>
                  idx === i ? { ...c, unread: 0 } : c
                ))
              }}
              style={{
                ...styles.chatItem,
                backgroundColor: activeChat === i ? '#f0f4f8' : '#fff',
                borderLeft: activeChat === i ? '3px solid #2d6a4f' : '3px solid transparent'
              }}>
              <div style={styles.chatAvatar}>
                <div style={{
                  ...styles.avatarCircle,
                  backgroundColor: categoryColor(chat.category)
                }}>
                  {chat.avatar}
                </div>
                {chat.online && <div style={styles.onlineDot} />}
              </div>
              <div style={styles.chatInfo}>
                <div style={styles.chatTopRow}>
                  <span style={styles.chatName}>{chat.name}</span>
                  <span style={styles.chatTime}>{chat.time}</span>
                </div>
                <div style={styles.chatBottomRow}>
                  <span style={styles.chatLastMsg}>{chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span style={styles.unreadBadge}>{chat.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div style={styles.chatWindow}>

          {/* Chat Header */}
          <div style={styles.chatHeader}>
            <div style={styles.chatHeaderLeft}>
              <div style={{
                ...styles.headerAvatar,
                backgroundColor: categoryColor(currentChat.category)
              }}>
                {currentChat.avatar}
              </div>
              <div>
                <h3 style={styles.headerName}>{currentChat.name}</h3>
                <p style={styles.headerStatus}>
                  {currentChat.online
                    ? '🟢 Online'
                    : '⚫ Offline'}
                </p>
              </div>
            </div>
            <div style={styles.chatHeaderRight}>
              <button style={styles.headerBtn}>📞 Call</button>
              <button style={styles.headerBtn}>📎 Attach</button>
              <button style={styles.headerBtn}>⋮ More</button>
            </div>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            <div style={styles.dateDivider}>Today</div>
            {currentChat.messages.map(msg => (
              <div key={msg.id} style={{
                ...styles.messageRow,
                justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start'
              }}>
                {msg.sender === 'them' && (
                  <div style={{
                    ...styles.msgAvatar,
                    backgroundColor: categoryColor(currentChat.category)
                  }}>
                    {currentChat.avatar}
                  </div>
                )}
                <div>
                  <div style={{
                    ...styles.messageBubble,
                    backgroundColor: msg.sender === 'me' ? '#2d6a4f' : '#fff',
                    color: msg.sender === 'me' ? '#fff' : '#333',
                    borderRadius: msg.sender === 'me'
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{
                    ...styles.msgTime,
                    textAlign: msg.sender === 'me' ? 'right' : 'left'
                  }}>
                    {msg.time} {msg.sender === 'me' && '✓✓'}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div style={styles.inputArea}>
            <button style={styles.attachBtn}>😊</button>
            <button style={styles.attachBtn}>📎</button>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.messageInput}
            />
            <button
              onClick={handleSend}
              style={{
                ...styles.sendBtn,
                backgroundColor: message.trim() ? '#2d6a4f' : '#ccc'
              }}
              disabled={!message.trim()}>
              ➤
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', height: '100vh', backgroundColor: '#f0f4f8', overflow: 'hidden' },
  sidebar: {
    width: '240px', backgroundColor: '#1b4332',
    padding: '24px 16px', display: 'flex',
    flexDirection: 'column', flexShrink: 0
  },
  logo: { color: '#fff', fontSize: '20px', marginBottom: '32px', textAlign: 'center' },
  navItem: {
    padding: '12px 16px', borderRadius: '8px',
    marginBottom: '8px', cursor: 'pointer',
    fontSize: '14px', fontWeight: '500'
  },
  logoutBtn: {
    marginTop: 'auto', padding: '12px',
    backgroundColor: '#c62828', color: '#fff',
    border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px'
  },
  chatContainer: {
    display: 'flex', flex: 1, overflow: 'hidden'
  },
  chatList: {
    width: '320px', backgroundColor: '#fff',
    borderRight: '1px solid #e0e0e0',
    display: 'flex', flexDirection: 'column',
    flexShrink: 0
  },
  chatListHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '20px 16px 12px'
  },
  chatListTitle: { fontSize: '18px', color: '#1b4332', margin: 0 },
  chatCount: {
    backgroundColor: '#2d6a4f', color: '#fff',
    padding: '2px 10px', borderRadius: '12px',
    fontSize: '13px', fontWeight: '600'
  },
  searchInput: {
    margin: '0 12px 12px', padding: '10px 14px',
    borderRadius: '8px', border: '1px solid #e0e0e0',
    fontSize: '13px', outline: 'none'
  },
  chatItem: {
    display: 'flex', gap: '12px', padding: '14px 16px',
    cursor: 'pointer', borderBottom: '1px solid #f5f5f5',
    transition: 'background 0.2s'
  },
  chatAvatar: { position: 'relative', flexShrink: 0 },
  avatarCircle: {
    width: '44px', height: '44px', borderRadius: '50%',
    color: '#fff', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '18px', fontWeight: 'bold'
  },
  onlineDot: {
    width: '12px', height: '12px', backgroundColor: '#4caf50',
    borderRadius: '50%', border: '2px solid #fff',
    position: 'absolute', bottom: 0, right: 0
  },
  chatInfo: { flex: 1, overflow: 'hidden' },
  chatTopRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' },
  chatName: { fontSize: '14px', fontWeight: '600', color: '#333' },
  chatTime: { fontSize: '11px', color: '#aaa' },
  chatBottomRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  chatLastMsg: {
    fontSize: '13px', color: '#888',
    overflow: 'hidden', textOverflow: 'ellipsis',
    whiteSpace: 'nowrap', maxWidth: '180px'
  },
  unreadBadge: {
    backgroundColor: '#2d6a4f', color: '#fff',
    padding: '2px 7px', borderRadius: '10px',
    fontSize: '11px', fontWeight: '600', flexShrink: 0
  },
  chatWindow: {
    flex: 1, display: 'flex',
    flexDirection: 'column', overflow: 'hidden'
  },
  chatHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '16px 24px',
    backgroundColor: '#fff', borderBottom: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  chatHeaderLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  headerAvatar: {
    width: '44px', height: '44px', borderRadius: '50%',
    color: '#fff', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '18px', fontWeight: 'bold'
  },
  headerName: { fontSize: '16px', color: '#1b4332', margin: 0, marginBottom: '2px' },
  headerStatus: { fontSize: '12px', color: '#888', margin: 0 },
  chatHeaderRight: { display: 'flex', gap: '8px' },
  headerBtn: {
    padding: '8px 14px', backgroundColor: '#f5f5f5',
    border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '13px'
  },
  messages: {
    flex: 1, overflowY: 'auto',
    padding: '24px', display: 'flex',
    flexDirection: 'column', gap: '12px',
    backgroundColor: '#f8faf8'
  },
  dateDivider: {
    textAlign: 'center', fontSize: '12px',
    color: '#aaa', padding: '4px 12px',
    backgroundColor: '#e0e0e0', borderRadius: '12px',
    alignSelf: 'center', marginBottom: '8px'
  },
  messageRow: { display: 'flex', alignItems: 'flex-end', gap: '8px' },
  msgAvatar: {
    width: '32px', height: '32px', borderRadius: '50%',
    color: '#fff', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '13px',
    fontWeight: 'bold', flexShrink: 0
  },
  messageBubble: {
    padding: '12px 16px', maxWidth: '400px',
    fontSize: '14px', lineHeight: 1.5
  },
  msgTime: { fontSize: '11px', color: '#aaa', marginTop: '4px', paddingLeft: '4px' },
  inputArea: {
    display: 'flex', alignItems: 'center',
    gap: '8px', padding: '16px 20px',
    backgroundColor: '#fff', borderTop: '1px solid #e0e0e0'
  },
  attachBtn: {
    fontSize: '20px', background: 'none',
    border: 'none', cursor: 'pointer', padding: '4px'
  },
  messageInput: {
    flex: 1, padding: '12px 16px',
    borderRadius: '24px', border: '1px solid #e0e0e0',
    fontSize: '14px', outline: 'none',
    backgroundColor: '#f5f5f5'
  },
  sendBtn: {
    width: '44px', height: '44px', borderRadius: '50%',
    color: '#fff', border: 'none', cursor: 'pointer',
    fontSize: '18px', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  }
}

export default LiveChat