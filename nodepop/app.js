var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./lib/connectMongoose');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * MIDDLEWARES
 */
app.locals.title = 'NodeApp';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * RUTAS DE LA API
 */

app.use('/api/anuncios', require('./routes/api/anuncios'));
app.use('/api/anuncios/tags', require('./routes/api/anuncios'));

/**
 * RUTAS DEL WEBSITE
 */

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', require('./routes/api/anuncios'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next (createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // Errores de validación
  if (err.array) { // <- detecto que el error proviene de express validator
    const infoError = err.array({})[0];
    err.status = 422; // cambio el código de error a uno más indicativo
    err.message = `HTTP ${err.status}. Error de validación en ${infoError.location}`;
    err.submessage = `${infoError.path} : ${infoError.msg}`;
  }

  // Establezco cod. error por defecto
  res.status(err.status || 500);

  // Ss es fallo en API -> respondo en formato Json
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message, descripcion: err.submessage });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.submessage = err.submessage;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renderizo el error en la vista
  res.render('error');
});

module.exports = app;
