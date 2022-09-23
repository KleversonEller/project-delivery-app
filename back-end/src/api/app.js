require('express-async-errors');
const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('../middleware/errorMiddleware');
const router = require('../routes/index');

const app = express();

app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(morgan('common'));
app.use(cors());

app.use(router.loginRouter);
app.use(router.productsRouter);
app.use(router.userRoutes);
app.use(express.static('public'));

app.use(errorHandler);

module.exports = app;
