const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const passport = require('passport');
//const cors = require('cors');
const MongoStore = require('connect-mongo');

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
app.use(express.urlencoded({ extended: false })); // body-parser 역할
app.use(cookieParser(process.env.SESSION_KEY));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );

app.use(session({
  secret: `${process.env.SESSION_KEY}`, // 세션 암호화 키
  resave: false,    // 세션을 항상 저장할지 여부
  saveUninitialized: false,  // 초기화되지 않은 세션을 저장할지 여부
  cookie: { secure: true },
  store: MongoStore.create({
    mongoUrl: `${process.env.SESSION_DB_URI}`
  })
}));

// http to https redirection middleware
/*
app.use((req, res, next)=>{
  if(req.secure){
    next();
  }else{
    res.redirect(`https://${req.hostname}:${process.env.HTTPS_PORT}${req.url}`);
  }
});
*/

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
