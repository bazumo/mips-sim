'use strict';

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './exampleApp/App.jsx';
import registerServiceWorker from './exampleApp/registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
