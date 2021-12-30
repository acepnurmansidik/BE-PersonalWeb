const express = require("express");
const createError = require("http-errors");
const path = require("path");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const flash = require("express-flash");

const homeRouter = require("./app/Home/router");
const blogRouter = require("./app/Blog/router");
const loginRouter = require("./app/Login/router");

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("_method"));
// set partials
hbs.registerPartials(__dirname + "/views/partials");
// register public
app.use("pulic", express.static(__dirname + "/public"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  session({
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "secretValue",
  })
);
app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRouter);
app.use(blogRouter);
app.use(loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
