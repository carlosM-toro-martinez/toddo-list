import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ListGroup, Badge, Button } from "react-bootstrap";
import AppContext from "../context/AppContext";
import TaskCreate from "./TaskCreate";

export default function Home() {
  const { task, setTask, setLogin } = useContext(AppContext);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    axios.get("/api/tasks/select").then((res) => {
      if (!res.data.error) {
        console.log(res.data);
        setTasks(res.data);
      } else {
        window.localStorage.removeItem("userTask");
        setLogin(false);
      }
    });
  }, [task]);

  const deleteTask = (idTask) => {
    setTask(idTask);
    axios.post("/api/tasks/delete", { idTask }).then((res) => {
      console.log(res.data);
    });
  };
  const updateTask = (idTask, complete) => {
    let state;
    if (complete) state = !complete;
    else state = true;

    console.log(state);
    axios.post("/api/tasks/update", { idTask, complete: state }).then((res) => {
      console.log(res.data);
      setTask(complete);
    });
  };

  return (
    <div style={{ marginTop: 50, marginBotton: 100 }}>
      <TaskCreate />
      <ListGroup as="ol" numbered>
        {tasks
          ? tasks.map((data) => (
              <ListGroup.Item
                key={data.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div
                    className="fw-bold"
                    style={{
                      textDecoration: data.complete
                        ? "line-through red"
                        : "none",
                    }}
                  >
                    {data.description.toUpperCase()}
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: 20,
                    paddingBottom: 5,
                    paddingRight: 30,
                    paddingLeft: 30,
                    justifyContent: "flex-end",
                  }}
                >
                  <Badge bg={data.complete ? "danger" : "primary"}>
                    {data.date.slice(0, 10)}
                  </Badge>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateTask(data.id, data.complete)}
                    style={{ marginBottom: 10, marginLeft: 10 }}
                  >
                    {data.complete ? "uncheck" : "Mark Complete"}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => deleteTask(data.id)}
                    style={{ marginBottom: 10, marginLeft: 10 }}
                  >
                    🗑️
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          : null}
      </ListGroup>
    </div>
  );
}
