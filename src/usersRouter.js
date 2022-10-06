const express = require('express')
const router = express.Router()
const { getUser} = require('./usersService')

router.get('/', getUser)


module.exports = {
  usersRouter: router
}
