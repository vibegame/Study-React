"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Rainbow from './components/Rainbow';
import './components/styles/reset.css';
import './components/styles/stand.css';
// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render( 
  <Rainbow />
, document.getElementById('root'));
