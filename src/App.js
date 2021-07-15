import React, {useEffect} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/actions';
import Layout from './components/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';

import Main from './pages/Main/Main';
// I believe code splitting everything is better than nothing,
//but i actually have to little knowledge to decide what to split and what to not.

const FlashcardsHelp = React.lazy(() => import('./pages/FlashcardsHelp/FlashcardsHelp'));
const QuestionsHelp = React.lazy(() => import('./pages/QuestionsHelp/QuestionsHelp'));
const Flashcards = React.lazy(() => import('./pages/Flashcards/Flashcards'));
const FlashcardsEditDecks = React.lazy(() => import('./pages/FlashcardsEditDecks/FlashcardsEditDecks'));
const FlashcardsStudying = React.lazy(() => import('./pages/FlashcardsStudying/FlashcardsStudying'));
const Register = React.lazy(() => import('./pages/Auth/Register/Register'));
const Login = React.lazy(() => import('./pages/Auth/Login/Login'));
const QuestionsStudying = React.lazy(() => import('./pages/QuestionsStudying/QuestionsStudying'));
const App = props => {
	useEffect(() => {
		props.onAutoSignIn();
		// eslint-disable-next-line
	}, []);

	let routes = (
		<Switch>
			<Route path="/" exact component={Main} />
			<React.Suspense
				fallback={
					<div
						style={{
							height: 'calc(100vh - var(--navbar-height) - var(--footer-height)',
							marginTop: 'var(--navbar-height)',
							width: '100%',
							display: 'grid',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Spinner />
					</div>
				}>
				<Route path="/flashcards-help" exact component={FlashcardsHelp} />
				<Route path="/questions-help" exact component={QuestionsHelp} />
				<Route path="/flashcards" exact component={Flashcards} />
				<Route path="/flashcards-edit-decks" exact component={FlashcardsEditDecks} />
				<Route path="/flashcards-studying" exact component={FlashcardsStudying} />
				<Route path="/questions-studying" exact component={QuestionsStudying} />
				<Route path="/register" exact component={Register} />
				<Route path="/log-in" exact component={Login} />
			</React.Suspense>

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
