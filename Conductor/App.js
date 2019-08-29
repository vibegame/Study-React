"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Conductor from './components/Conductor';
import './components/styles/reset.css';
import './components/styles/stand.css';
// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {
let tree = require('./components/Tree.json');
ReactDOM.render( 
  <Conductor tree = {tree} />
, document.getElementById('root'));
