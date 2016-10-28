var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var busboy = require('connect-busboy');
var routes = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/report');
//report is the name of the database
require('./config/passport');//We simply want to load it which will run through passport.js file, so no need of binding it.
//We are basically outsourcing it to passport.js
// view engine setup
app.engine('.hbs' , expressHbs({defaultLayout: 'layout' , extname: '.hbs'}));
// set the default engine to express handlebars that we downloaded for extra features.
//To change the extension of expressHbs which is .handlebars to .hbs and setting the default to layouts.
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/tablejs",express.static(__dirname+"/node_modules/tablefilter/dist/tablefilter"));
app.use("/tablecss",express.static(__dirname+"/node_modules/tablefilter/dist/tablefilter/style"));
app.use("/chartlib",express.static(__dirname+"/node_modules/chartist/dist"));
app.use("/process",express.static(__dirname+"/PHP_files"));
app.use(validator());//This has to be done after the body is parsed.
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }//session will expire after three hours
}));
//default of resave is true but it is deprecated, true means it will save the session on each request,
//saveUninitialized- default is true, meaning session will be stored in the server even if it is not initialized.
app.use(flash());//it needs to be initialized after session because it uses session.
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/imagefiles",express.static(__dirname+"/public/images"));

app.use(function(req, res, next) {//defining a global variable login to check if user is logged in or not
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;//to make sessions available to handlebars, just like login.
  next();
});

app.use('/user', userRoutes);//Ordering is important
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
