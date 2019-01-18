import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import Dashboard from './Dashboard';
import Config from './Config';

ReactDOM.render(
  <Router>
    <div>
      <Route path={`${process.env.PUBLIC_URL}/`} exact component={Dashboard} />
      <Route path={`${process.env.PUBLIC_URL}/config`} component={Config} />
    </div>
  </Router>,
  document.querySelector("#dashboard"))
