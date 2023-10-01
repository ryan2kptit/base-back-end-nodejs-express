require('dotenv').config()
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();

//init middlewares
app.use(morgan("dev"))       // use for development
// app.use(morgan("combined"))  // use for production
app.use(helmet())               
app.use(compression())          // compress data response
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


// init db
require('./dbs/init.mongodb')

const { checkOverLoad } = require('./helpers/check.connect')
// checkOverLoad()


// init routes
app.use('/', require('./routes/index'))

//handing error
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Error'
    })
})

module.exports = app