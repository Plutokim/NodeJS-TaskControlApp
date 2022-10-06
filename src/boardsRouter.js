const express = require('express')
const router = express.Router()
const {
  getBoards,
  addBoard,
  getBoardByID,
  updateBoardByID,
  deleteBoardByID
} = require('./boardsService')

router.get('/', getBoards)

router.post('/', addBoard)

router.get('/:id', getBoardByID)

router.put('/:id', updateBoardByID)

router.delete('/:id', deleteBoardByID)

module.exports = {
  boardsRouter: router
}
