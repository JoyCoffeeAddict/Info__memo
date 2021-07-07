import React, {useEffect} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/actions';

import Layout from './components/Layout/Layout';
import Main from './pages/Main/Main';
import FlashcardsHelp from './pages/FlashcardsHelp/FlashcardsHelp';
import Flashcards from './pages/Flashcards/Flashcards';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
const App = props => {
	useEffect(() => {
		props.onAutoSignIn();
	}, []);

	let routes = (
		<Switch>
			<Route path="/" exact component={Main} />
			<Route path="/flashcards-help" exact component={FlashcardsHelp} />
			<Route path="/flashcards" exact component={Flashcards} />
			<Route path="/register" exact component={Register} />
			<Route path="/log-in" exact component={Login} />

			<Redirect to="/" />
		</Switch>
	);

	return (
		<div className="App">
			<Layout>{routes}</Layout>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onAutoSignIn: () => dispatch(actions.autoSignIn),
	};
};

export default withRouter(connect(null, mapDispatchToProps)(App));
