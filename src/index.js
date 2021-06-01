import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.headers.common['X-CSRFToken'] = getCookie("csrftoken");


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>        
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
