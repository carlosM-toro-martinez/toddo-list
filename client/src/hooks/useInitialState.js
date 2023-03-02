import React, { useState, useEffect } from "react";

export default function useInitialState() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState();
  const [task, setTask] = useState();

  useEffect(() => {
    const data = window.localStorage.getItem("userTask");
    const user = JSON.parse(data);
    setUser(user);
    if (data) setLogin(true);
  }, []);

  return { login, setLogin, user, setUser, task, setTask };
}
