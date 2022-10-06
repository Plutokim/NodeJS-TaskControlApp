const express = require('express')
const router = express.Router()

const { register, login } = require('./authService.js')

router.post('/register', register)

router.post('/login', login)

module.exports = {
  authRouter: router
}
