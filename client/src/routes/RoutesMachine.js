import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import SingIn from "../components/SingIn";
import AppContext from "../context/AppContext";

export default function RoutesMachine() {
  const { login } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/singin"
          element={login ? <Navigate to={"/home"} /> : <SingIn />}
        />
        <Route
          path="/"
          element={login ? <Navigate to={"/home"} /> : <Login />}
        />
        <Route path="/home" element={login ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}
