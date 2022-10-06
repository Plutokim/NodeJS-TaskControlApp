const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('./models/User')

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = new User({
      username,
      password: await bcrypt.hash(password, 10)
    })
    user
      .save()
      .then(() => {
        const payload = {
          username: user.username,
          userID: user._id,
        }
        const jwtToken = jwt.sign(payload, 'secret-jwt-key')
        res.status(200).json({ message: 'Success',
          jwt_token: jwtToken})
      })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({ username: username })
    if (!user) {
      throw Error('No username')
    }
    const isPasswordCorrect = await bcrypt.compare(
      String(password),
      String(user.password)
    )
    if (!isPasswordCorrect) {
      throw Error('Password incorrect')
    }
    const payload = {
      username: user.username,
      userID: user._id,
    }
    const jwtToken = jwt.sign(payload, 'secret-jwt-key')
    return res.status(200).json({
      message: 'Success',
      jwt_token: jwtToken
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = {
  register,
  login
}
