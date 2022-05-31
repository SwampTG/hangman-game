var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const loadEnv = require('./config/env');
var bodyparser = require('body-parser');

loadEnv.get();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gameRouter = require('./routes/game');

var app = express();
var urlencodedParser = bodyparser.urlencoded({ extended: false });

// const setModels = (collection) => {
// 	models.saveModels(collection);
// };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(urlencodedParser);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/v1/game', gameRouter)
app.use('/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
