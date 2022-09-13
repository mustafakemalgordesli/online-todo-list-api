const express = require('express');
// const helmet = require('helmet');
const logger = require('morgan');
const connectDB = require('./connectDb');
const config = require('./config');
const routes = require('./routes');
const errorHandling = require('./middlewares/errorHandling');

config();
connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(helmet());
app.use(logger('dev'));

app.get("/",  (req, res, next) => {
    res.send("Hello World");
})

app.use('/api', routes);
app.use(errorHandling);




app.listen(PORT, () => {
    console.log(PORT + ". port listening");
})


