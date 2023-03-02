import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import AppContext from "../context/AppContext";

export default function TaskCreate() {
  const { user, setTask, setLogin } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [desc, setDesc] = useState();
  const [date, setDate] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createTask = () => {
    const data = {
      userId: user.id,
      desc: desc,
      dateTask: date,
    };

    axios.post("/api/tasks/create", data).then((res) => {
      console.log(res.data);
      setTask(data);
      setShow(false);
    });
  };
  const logOut = () => {
    setLogin(false);
    window.localStorage.removeItem("userTask");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>TASKS LIST</h1>
      <div
        style={{
          paddingTop: 20,
          paddingBottom: 5,
          paddingRight: 30,
          paddingLeft: 30,
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Button variant="danger" onClick={logOut} style={{ marginBottom: 10 }}>
          Log Out
        </Button>
        <Button
          size="lg"
          variant="outline-dark"
          onClick={handleShow}
          style={{ marginBottom: 2 }}
        >
          Add New📎
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={createTask}>
              Add Task
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
