'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './exampleApp/App.jsx';
import registerServiceWorker from './exampleApp/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
