const mongoose = require('mongoose')

const userShema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('users', userShema)

module.exports = {
  User
}
