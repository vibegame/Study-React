"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import SpinLoader from './components/SpinLoader'
import './components/styles/reset.css';
import './components/styles/stand.css';
// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render( 
  <SpinLoader />
, document.getElementById('root'));
