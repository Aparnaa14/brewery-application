import React from "react";
import ReactDOM from "react-dom";

// Custom CSS, Bootstrap 4, JQuery, & Popper.js
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";

// Page Components
import App from "./App";


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

