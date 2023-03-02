const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  port: 5432,
  password: "root",
  database: "tasks",
  user: "postgres",
});

client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("conexion success");
  }
});

module.exports = client;
