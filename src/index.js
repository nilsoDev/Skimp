//Import Modules
import React from 'react';
import ReactDOM from 'react-dom';
//Import Stylesheet
import './index.css';
//Import React App Component
import App from './App';
//Import Service Worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

//Render Application in DOM 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') //Render React-App in HTML-Div with sepcific ID 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

