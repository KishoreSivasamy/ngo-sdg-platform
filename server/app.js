const express = require('express')
const cors    = require('cors')
const app     = express()

app.use(cors({
  origin: [
    'https://ngo-connect-backend-mkg0.onrender.com',
    'https://ngo-sdg-platform.vercel.app'
  ]
}))
app.use(express.json())

app.use('/api/auth',          require('./routes/authRoutes'))
app.use('/api/ngo',           require('./routes/ngoRoutes'))
app.use('/api/donor',         require('./routes/donorRoutes'))
app.use('/api/volunteer',     require('./routes/volunteerRoutes'))
app.use('/api/event',         require('./routes/eventRoutes'))
app.use('/api/donation',      require('./routes/donationRoutes'))
app.use('/api/report',        require('./routes/reportRoutes'))
app.use('/api/notifications', require('./routes/notificationRoutes'))

module.exports = app