// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; // Si tienes estilos CSS
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Asegúrate de que este sea el archivo donde agregaste el estilo CSS


ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
