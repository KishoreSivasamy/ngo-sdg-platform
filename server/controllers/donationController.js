const Razorpay = require('razorpay')
const crypto   = require('crypto')

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
})

// Create order
exports.createOrder = async (req, res) => {
  const { amount } = req.body
  try {
    const options = {
      amount:   amount * 100, // convert to paise
      currency: 'INR',
      receipt:  `receipt_${Date.now()}`
    }
    const order = await razorpay.orders.create(options)
    res.json({
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      keyId:    process.env.RAZORPAY_KEY_ID
    })
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message })
  }
}

// Verify payment
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
  try {
    const body      = razorpay_order_id + '|' + razorpay_payment_id
    const expected  = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex')

    if (expected === razorpay_signature) {
      res.json({ success: true, paymentId: razorpay_payment_id })
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' })
  }
} 
