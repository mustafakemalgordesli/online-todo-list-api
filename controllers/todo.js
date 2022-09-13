const Todo = require('../models/Todo');
const httpStatus = require('http-status-codes');

const addTodo = (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content || "",
        userId: req.userData.userId
    });

    todo.save()
    .then(result => {
        // console.log(result);
        res.send({
            data: result,
            success: true,
            message: "todo created"
        });
    })
    .catch(err => {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "todo don't saved"
        })
    })
}

const getAllTodos = (req, res, next) => {
    Todo.find({ userId: req.userData.userId })
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                todos: docs
            };
            res.status(httpStatus.OK).json({
                data: response,
                success: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "todos failed"
            });
        });
}

const updateTodo = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Todo.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(httpStatus.OK).json({
                message: 'Todo updated',
                success: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to update todo"
            });
        });
}

const deleteTodo = (req, res, next) => {
    const id = req.params.productId;
    Todo.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(httpStatus.OK).json({
                message: 'Product deleted',
                success: true,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
            });
        });
}




module.exports = {
    addTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
}