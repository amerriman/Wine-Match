// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var swig = require('swig');
var mongoose = require('mongoose');
var passport = require('passport');


// *** routes *** //
// var routes = require('./routes/index.js');
var apiRoutes = require('./routes/api.js');
var user = require('./routes/userAPI.js');



// *** express instance *** //
var app = express();


// *** config file *** //
var config = require('./_config');


// *** mongoose *** ///
mongoose.connect(config.mongoURI[app.settings.env], function(err, res){
if(err) {
console.log('Error connecting to the database. ' + err);
} else {
console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
}
});


// *** view engine *** //
// var swig = new swig.Swig();
// app.engine('html', swig.renderFile);
// app.set('view engine', 'html');




// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// *** static directory *** //
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.use('/api/', apiRoutes);
app.use('/auth/', user);


//NEW MAIN ROUTE
//When user hits main route, we're just sending up this static index file - angular handles the rests  This can go in the index.js route file also
app.use('/', function (req,res) {
  res.sendFile(path.join(__dirname, '../client/views/', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500).json
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500).json({status: 'Error!'});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({status: 'Error!'});
});


module.exports = app;
