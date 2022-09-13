const express = require('express');
const TodoController = require('../controllers/todo');
const verifyJWT = require('../middlewares/verifyJWT');
const router = express.Router();


router.post('/', verifyJWT, TodoController.addTodo);
router.get('/', verifyJWT, TodoController.getAllTodos);
router.patch('/:id', verifyJWT, TodoController.updateTodo);
router.delete('/:id', verifyJWT, TodoController.deleteTodo);

module.exports = router;