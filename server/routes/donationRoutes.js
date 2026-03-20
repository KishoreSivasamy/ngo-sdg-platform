const express = require('express')
const router  = express.Router()
const { createOrder, verifyPayment } = require('../controllers/donationController')

router.post('/create-order',    createOrder)
router.post('/verify-payment',  verifyPayment)

router.get('/', (req, res) => {
  res.json({ message: 'Donation route working' })
})

module.exports = router