const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const passportConfig = require('./src/passport');
passportConfig();

const indexRouter = require('./src/routes/index');
const signupRouter = require('./src/routes/signup');
const loginRouter = require('./src/routes/login');
const logoutRouter = require('./src/routes/logout');
const profileRouter = require('./src/routes/profile');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_KEY));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(session({
  secret: `${process.env.SESSION_KEY}`,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }  // 세션 타임아웃을 1시간으로 설정
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);

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
