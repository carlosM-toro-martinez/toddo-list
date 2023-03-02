const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const conexion = require("./conexion/conexion");
const routeSessions = require("./routes/routeSessions");
const routeTasks = require("./routes/routeTasks");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routeSessions);
app.use("/api/tasks", routeTasks);

app.listen(8080);
