import React from 'react';
import { render } from 'react-dom';
import { combineReducers , createStore , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { Route , Link , HashRouter as Router , browserHistory } from 'react-router-dom'
import { routerReducer , syncHistoryWithStore } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import createHistory from 'history/createHashHistory'
import investReducer from './reducers/investReducer.js';
import App from './components/App.js';

const store = createStore(
	combineReducers({ 
		investReducer,
		routing: routerReducer
	}),
	applyMiddleware(createLogger(),thunk)
);

render(
	<Provider store={store} history={createHistory()}>
		<Router>
			<App></App>
		</Router>
	</Provider>
  ,
  document.getElementById("container")
);
