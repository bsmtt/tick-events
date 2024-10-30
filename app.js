var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const i18n = require("./config/i18n");

var indexRouter = require("./routes/index.routes");
var usersRouter = require("./routes/users.routes");
var adminsRouter = require("./routes/admins.routes");

const cors = require("cors");
const mongoose = require("mongoose");
const lang = require("./middlewares/lang");

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb://localhost:27017/tick-events",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log(err);
  }
);

var app = express();
const port = process.env.PORT || 4000;

app.use(i18n.init);
app.use(lang);
app.use(cors({
  origin: 'http://localhost:4200', // replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: 10000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admins", adminsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(err.status).json({
    "message" : err.message,
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = app;
