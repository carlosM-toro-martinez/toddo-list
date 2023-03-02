const express = require("express");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const conexion = require("../conexion/conexion");

const route = express.Router();

passport.use(
  new passportLocal(async (name, pass, done) => {
    const query = "select * from users where user_name = $1 and password = $2";
    await conexion.query(query, [name, pass], (err, results) => {
      try {
        if (err) {
          console.log(err);
          return done(err);
        } else {
          return done(null, results.rows[0]);
        }
      } catch (error) {
        console.error(error);
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, name: user.user_name });
});

passport.deserializeUser((user, done) => {
  done(null, { id: user.id, name: user.user_name });
});

const creaeteUser = (req, res, next) => {
  const name = req.body.username;
  const pass = req.body.password;
  const querySelect = "select user_name from users";
  conexion.query(querySelect, (err, results) => {
    console.log(results.rows);
    let aux = 1;
    if (err) {
      console.error(err);
    } else {
      results.rows.map((data) => {
        if (data.user_name === name) {
          aux = 0;
        }
      });
      if (aux === 1) {
        conexion.query(
          "insert into users (user_name, password) values ($1, $2)",
          [name, pass],
          (err) => {
            if (err) {
              console.log(err);
            } else {
              return next();
            }
          }
        );
      } else {
        res.send({ create: false });
      }
    }
  });
};

route.post(
  "/create",
  creaeteUser,
  passport.authenticate("local", {
    failureMessage: "error",
  }),
  (req, res) => {
    console.log(req.session);
    res.send(req.session.passport.user);
  }
);

route.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: "error",
  }),
  (req, res) => {
    console.log(req.session);
    res.send(req.session.passport.user);
  }
);

module.exports = route;
