import React from 'react';
import Layout from './components/Layout/Layout';
import {Switch, Route, Redirect} from 'react-router-dom';
import Main from './pages/Main/Main';
import FlashcardsHelp from './pages/FlashcardsHelp/FlashcardsHelp';
import Flashcards from './pages/Flashcards/Flashcards';
function App() {
	let routes = (
		<Switch>
			<Route path="/" exact component={Main} />
			<Route path="/flashcards-help" exact component={FlashcardsHelp} />
			<Route path="/flashcards" exact component={Flashcards} />

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
