const express = require('express')
const router  = express.Router()

router.post('/welcome',      async (req, res) => { res.json({ message: 'Welcome email endpoint' }) })
router.post('/donation',     async (req, res) => { res.json({ message: 'Donation email endpoint' }) })
router.post('/event',        async (req, res) => { res.json({ message: 'Event email endpoint' }) })
router.post('/verification', async (req, res) => { res.json({ message: 'Verification email endpoint' }) })

module.exports = router