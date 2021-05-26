import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { storage } from './firebase';
import {Router, Route, browserHistory, IndexRoute} from "react-router"; 
import {Auth} from "./components/auth";
import {Upload} from "./components/file-upload";
import {Posts} from "./components/posts";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
