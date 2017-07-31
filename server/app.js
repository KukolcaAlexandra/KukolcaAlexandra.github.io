var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var HttpError = require('./error').HttpError;

var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var router = require('router');

var app = express();
app.set('port', config.get('port'));

// view engine setup
app.engine('ejs', require('ejs-locals')); //layout partial block
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//app.use(express.favicon);
//app.use(logger('dev'));
app.use(morgan('combined'));
//app.use(bodyParser.json());
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use(require('./middleware/sendHttpError'));
//app.use(app.router);
require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
	//res.send
	console.log("error handler");
	if (typeof err == 'number') {
		err = new HttpError(err);
	}

	if (err instanceof HttpError) {
		res.sendHttpError(err);
	} else {
		//express.errorHandler()(err, req, res, next); //development
		err = new HttpError(500);
		res.sendHttpError(err);
	}
})

http.createServer(app).listen(config.get('port'), function(){
	console.log('Express server listening on port ' + config.get('port'));
});

/*
// Middleware
app.use(function(req, res, next) {
	if (req.url == '/') {
		res.end("hello");
	} else {
		next();
	}
});

app.use(function(req, res, next) {
	if (req.url == '/test') {
		res.end("test");
	} else {
		next();
	}
});

app.use(function(req, res) {
	res.send(404, "Page Not Found Sorry");
});*/

//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
