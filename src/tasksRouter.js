const express = require('express')
const router = express.Router()
const {
    getTasksByBoardID,
    addTask,
    getTaskByID,
    updateTaskByID,
    changeStatusTaskByID,
    deleteTaskByID
} = require('./tasksService')

router.get('/all/:id', getTasksByBoardID)

router.post('/', addTask)

router.get('/:id', getTaskByID)

router.put('/:id', updateTaskByID)

router.patch('/:id', changeStatusTaskByID)

router.delete('/:id', deleteTaskByID)

module.exports = {
    tasksRouter: router
}
