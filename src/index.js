const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const { authRouter } = require('./authRouter')
const { usersRouter } = require('./usersRouter')
const { boardsRouter } = require('./boardsRouter')
const { tasksRouter } = require('./tasksRouter')

const { authMiddleware } = require('./middlewares/authMiddleware')

const app = express()




mongoose.connect('mongodb+srv://zoomoff:SaveuswePlay@cluster0.r7w6al7.mongodb.net/?retryWrites=true&w=majority')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/auth', authRouter)
app.use('/api/users/me', authMiddleware, usersRouter)
app.use('/api/boards', authMiddleware, boardsRouter)
app.use('/api/tasks', authMiddleware, tasksRouter)

app.listen(8080)

// app.use(errorHandler)
//
// function errorHandler(err, req, res) {
//   console.error(err)
//   res.status(500).json({ message: 'Server error' })
// }
