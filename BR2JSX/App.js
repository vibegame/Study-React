"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './components/styles/reset.css';
import './components/styles/stand.css';
// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render( 
  <App />
, document.getElementById('root'));
