const bcrypt = require('bcryptjs')
const { User } = require('./models/User')

const getUser = (req, res) => {
  const { _id, username, createdDate } = req.user
  res.status(200).json({
    user: {
      _id: _id,
      username: username,
      createdDate: createdDate
    }
  })
}

// const deleteUser = (req, res) => {
//   User.findByIdAndDelete(req.user._id)
//     .then(() => {
//       res.status(200).json({
//         message: 'Success'
//       })
//     })
//     .catch((err) => {
//       res.status(400).json({
//         message: 'Error'
//       })
//     })
// }


module.exports = {
  getUser,
}
