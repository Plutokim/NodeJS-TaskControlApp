const { Board } = require('./models/Board')
const { Task } = require('./models/Task')

const getBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({ userId: req.user._id }, '-__v')
    for(let i =0;i< boards.length;i++){
      boards[i].toDo = await Task.find({userId: req.user._id, boardId:boards[i]._id, status:"Todo"}).count()
      boards[i].inProgress = await Task.find({userId: req.user._id, boardId:boards[i]._id, status:"In progress"}).count()
      boards[i].done = await Task.find({userId: req.user._id, boardId: boards[i]._id, status:"Done"}).count()
    }
    res.status(200).json({
      'boards': boards
    })
  } catch (error) {
    next(error.message)
  }
}

const addBoard = async (req, res) => {
  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
  })
  try {
    await board.save()
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getBoardByID = async (req, res) => {
  try {
    const board = await Board.findOne({ userId: req.user._id, _id: req.params.id }, '-__v')
    board.toDo = await Task.find({userId: req.user._id, boardId:board._id, status:"Todo"}).count()
    board.inProgress = await Task.find({userId: req.user._id, boardId:board._id, status:"In progress"}).count()
    board.done = await Task.find({userId: req.user._id, boardId: board._id, status:"Done"}).count()
    res.status(200).json({ board: board })
  } catch (error) {
    res.status(400).json({ message: error.message }) 
  }
}

const updateBoardByID = async (req, res) => {
  try {
    await Board.findByIdAndUpdate(
      { userId: req.user._id, _id: req.params.id },
      { name: req.body.name }
    )
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


const deleteBoardByID = async (req, res) => {
  try {
    await Board.findByIdAndDelete({ userId: req.user._id, _id: req.params.id })
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getBoards,
  addBoard,
  getBoardByID,
  updateBoardByID,
  deleteBoardByID
}
