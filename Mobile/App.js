"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Mobile from './components/Mobile';
import './components/styles/reset.css';
import './components/styles/stand.css';
let clients = require('./components/Clients.json');
// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render( 
  <Mobile clients = {clients} />
, document.getElementById('root'));
