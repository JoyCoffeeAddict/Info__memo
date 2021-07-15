import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import 'sanitize.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducer from './store/reducers/reducer';

const composeEnhancers =
	process.env.NODE_ENV !== 'production' && typeof window !== 'undefined'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
