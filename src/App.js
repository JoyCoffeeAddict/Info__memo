import React from 'react';
import Layout from './components/Layout/Layout';
import Main from './pages/Main/Main';
import {Switch, Route, Redirect} from 'react-router-dom';
function App() {
	let routes = (
		<Switch>
			<Route path="/" exact component={Main} />

			<Redirect to="/" />
		</Switch>
	);

	return (
		<div className="App">
			<Layout>{routes}</Layout>
		</div>
	);
}

export default App;
