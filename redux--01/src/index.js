import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './store/reducer';

const store = createStore(rootReducer);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
