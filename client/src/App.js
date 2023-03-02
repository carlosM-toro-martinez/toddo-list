import React, { useState } from "react";
//import { BrowserRouter, Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "./context/AppContext";
import useInitialState from "./hooks/useInitialState";
import RoutesMachine from "./routes/RoutesMachine";

function App() {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <RoutesMachine />
    </AppContext.Provider>
  );
}

export default App;
