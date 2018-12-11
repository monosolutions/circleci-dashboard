import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ErrorBoundary from './ErrorBoundary';
import Dashboard from './Dashboard';

ReactDOM.render(<ErrorBoundary><Dashboard /></ErrorBoundary>, document.querySelector("#dashboard"))
