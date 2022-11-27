var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost:27017/zahid', { useNewUrlParser: true })
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log(err));


const { Schema } = mongoose;
const playlistSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

const reactPlaylist = new Playlist({
  title: 'Zahid Hasan', // String is shorthand for {type: String}
  author: 'Zahid',
  body: 'This is my first app',
});
reactPlaylist.save();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
