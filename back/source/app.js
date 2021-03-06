const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors())
app.use(helmet());
app.use(bodyParser.json());

// items
const items = require('./routes/items');
app.use('/items', items);

// warehouses
const warehouses = require('./routes/warehouses');
app.use('/warehouses', warehouses);

//front
app.use(express.static(path.join(__dirname, '../../front/build')));
app.get('(/*)?', function (req, res) {
  res.sendFile(path.join(__dirname, '../../front/build', 'index.html'));
});

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('not found', req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

// errors
app.use(notFound);
app.use(errorHandler);

module.exports = app;