import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./comp/dashboard.js";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
