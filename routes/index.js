const express = require('express');
const authRouter = require('./auth');
const todoRouter = require('./todos');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/todos', todoRouter);


module.exports = router;