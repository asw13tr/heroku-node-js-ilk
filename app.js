const express = require('express');
var createError = require('http-errors');
const app = express();
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressEjsLayouts);


app.use('/', require('./routes/main'));
app.use('/aswpanel', require('./routes/panel'));


/*
Geliştirme aşamsı bitince açarsın
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(res.locals);
  res.status(err.status || 500);
  res.render('error');
});
*/

app.listen(3000);
