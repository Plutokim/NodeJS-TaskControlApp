const jwt = require('jsonwebtoken')
const { User } = require('../models/User')

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Please, provide authorization header' })
  }

  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Please, include token to request' })
  }

  try {
    const tokenPayload = jwt.verify(token, 'secret-jwt-key')

    const user = await User.exists({ _id: tokenPayload.userID })

    if (!user) {
      throw Error("User doesn't exist")
    }

    req.user = {
      _id: tokenPayload.userID,
      username: tokenPayload.username,
    }

    next()
  } catch (err) {
    return res.status(401).json({ message: err.message })
  }
}

module.exports = {
  authMiddleware
}
