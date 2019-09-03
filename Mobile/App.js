"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Mobile from './components/Mobile';
import './components/styles/reset.css';
import './components/styles/stand.css';
let clients = require('./components/Clients.json');

ReactDOM.render( 
  <Mobile clients = {clients} />
, document.getElementById('root'));
