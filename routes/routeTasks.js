const express = require("express");
const conexion = require("../conexion/conexion");
const date = new Date();

const route = express.Router();

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send({ error: "user not authenticate" });
  }
};

route.post("/create", isAuth, (req, res) => {
  const userId = req.session.passport.user.id;
  const desc = req.body.desc;
  const dateTask = req.body.dateTask;
  const query =
    "insert into tasks (user_id, description, date) values ($1, $2, $3)";

  conexion.query(query, [userId, desc, dateTask], (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ create: true });
    }
  });
});

route.get("/select", isAuth, (req, res) => {
  const userId = req.session.passport.user.id;
  const query =
    "select id, description, date, complete from tasks where user_id = $1 ";

  conexion.query(query, [userId], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results.rows);
    }
  });
});

route.post("/delete", isAuth, (req, res) => {
  const idTask = req.body.idTask;
  const query = "delete from tasks where id = $1 ";
  conexion.query(query, [idTask], (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ delete: true });
    }
  });
});

route.post("/update", isAuth, (req, res) => {
  const idTask = req.body.idTask;
  const complete = req.body.complete;
  const query = "update tasks set complete=$2 where id = $1 ";
  conexion.query(query, [idTask, complete], (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ update: true });
    }
  });
});

module.exports = route;
