import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import AppContext from "../context/AppContext";

export default function SingIn() {
  const { setLogin, setUser } = useContext(AppContext);

  const [name, setName] = useState();
  const [pass, setPass] = useState();

  const createAcount = () => {
    const data = {
      username: name,
      password: pass,
    };
    axios.post("/api/create", data).then((res) => {
      console.log(res.data);
      const data = res.data;
      setUser(data);
      setLogin(true);
      window.localStorage.setItem("userTask", JSON.stringify(data));
    });
  };
  return (
    <div
      className="App"
      style={{
        margin: 20,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>TODO LIST</h1>
      <div
        style={{
          margin: 40,
          padding: 30,
          width: 300,
          border: "solid",
        }}
      >
        <h3 style={{ textAlign: "center", margin: 20 }}>Create Acount</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={createAcount}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
