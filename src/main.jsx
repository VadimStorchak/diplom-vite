import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<React.StrictMode>
        <App />
    </React.StrictMode>, rootElement);
} else {
    render(<React.StrictMode>
        <App />
    </React.StrictMode>, rootElement);
}
