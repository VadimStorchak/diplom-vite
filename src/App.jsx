import React from 'react';
import './App.css';
import store from "./redux/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import Main from "./components/Main";

function App() {

    return (
        <div className="app">
            <Provider store={store}>
                <BrowserRouter>
                    <Main/>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App
