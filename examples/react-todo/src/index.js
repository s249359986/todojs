import React from 'react';
import { render } from 'react-dom';
import './style/index.css';
import './style/base.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

render((
   <App />
 )
, document.getElementById('root'))
