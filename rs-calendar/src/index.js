import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from './App';

import store from './store';

var Immutable = require("immutable");
 
var installDevTools = require("immutable-devtools");
installDevTools(Immutable);


ReactDOM.render(
<Provider store={store}>
	<App />
</Provider>
, document.getElementById('root'));

store.dispatch({ type: 'LOAD_DATA' });