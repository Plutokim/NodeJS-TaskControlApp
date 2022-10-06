const { Task } = require('./models/Task')

const getTasksByBoardID = async (req, res, next) => {
    try {
        const tasks = await Task.find({ userId: req.user._id, boardId: req.params.id }, '-__v')
        res.status(200).json({
            'tasks': tasks
        })
    } catch (error) {
        next(error.message)
    }
}

const addTask = async (req, res) => {
    const task = new Task({
        userId: req.user._id,
        boardId: req.body.boardId,
        name: req.body.name,
        status: req.body.status,
    })
    try {
        await task.save()
        res.status(200).json({ message: 'Success' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getTaskByID = async (req, res) => {
    try {
        const task = await Task.findOne({ userId: req.user._id, _id: req.params.id }, '-__v')
        res.status(200).json({ task: task })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateTaskByID = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(
            { userId: req.user._id, _id: req.params.id },
            { name: req.body.name }
        )
        res.status(200).json({ message: 'Success' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const changeStatusTaskByID = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(
            { userId: req.user._id, _id: req.params.id },
            { status: req.body.status }
        )
        res.status(200).json({ message: 'Success' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteTaskByID = async (req, res) => {
    try {
        await Task.findByIdAndDelete({ userId: req.user._id, _id: req.params.id })
        res.status(200).json({ message: 'Success' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    getTasksByBoardID,
    addTask,
    getTaskByID,
    updateTaskByID,
    changeStatusTaskByID,
    deleteTaskByID
}
