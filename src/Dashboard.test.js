import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Route path="/" exact component={Dashboard} /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
