const mongoose = require('mongoose')

const boardSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    done: {
        type: String,
        default: '0',
        required: false
    },
    inProgress: {
        type: String,
        default: '0',
        required: false
    },
    toDo: {
        type: String,
        default: '0',
        required: false
    },
})

const Board = mongoose.model('board', boardSchema)

module.exports = {
    Board
}
