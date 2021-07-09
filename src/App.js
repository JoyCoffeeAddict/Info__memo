import React, {useEffect} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/actions';

import Layout from './components/Layout/Layout';
import Main from './pages/Main/Main';
import Flashcards from './pages/Flashcards/Flashcards';
import FlashcardsHelp from './pages/FlashcardsHelp/FlashcardsHelp';
import FlashcardsEditDecks from './pages/FlashcardsEditDecks/FlashcardsEditDecks';
import FlashcardsStudying from './pages/FlashcardsStudying/FlashcardsStudying';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
const App = props => {
	useEffect(() => {
		props.onAutoSignIn();
		// eslint-disable-next-line
	}, []);

	let routes = (
		<Switch>
			<Route path="/" exact component={Main} />
			<Route path="/flashcards" exact component={Flashcards} />
			<Route path="/flashcards-help" exact component={FlashcardsHelp} />
			<Route path="/flashcards-edit-decks" exact component={FlashcardsEditDecks} />
			<Route path="/flashcards-studying" exact component={FlashcardsStudying} />

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
