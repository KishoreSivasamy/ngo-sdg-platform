const express = require('express')
const router  = express.Router()
const {
  register,
  login,
  getAllUsers,
  updateUserRole
} = require('../controllers/authController')

router.post('/register',    register)
router.post('/login',       login)
router.get('/users',        getAllUsers)
router.post('/update-role', updateUserRole)

module.exports = router