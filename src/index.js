import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import ErrorBoundary from './ErrorBoundary';
import Dashboard from './Dashboard';
import * as serviceWorker from './serviceWorker';


//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<ErrorBoundary><Dashboard /></ErrorBoundary>, document.querySelector("#dashboard"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
