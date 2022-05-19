var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var mongo = require('./config/database');
const loadEnv = require('./config/env');

loadEnv.get();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const dbHost = process.env.MONGO_DB_HOST;
const dbPort = process.env.MONGO_DB_PORT;
const dbName = process.env.MONGO_DB_DATABASE;

console.log(mongo.mountDbUri(dbHost, dbPort, ''));

mongo
	.connect(
		mongo.mountDbUri(dbHost, dbPort, '') +
			'?directConnection=true&serverSelectionTimeoutMS=2000'
	)
	.asPromise()
	.then(async (conn) => {
    console.log('Connection state: ', conn.readyState);
    const collection = await conn.collection(process.env.MONGO_DB_DATABASE);
    console.log('db connect: ', collection.collectionName);
	});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
