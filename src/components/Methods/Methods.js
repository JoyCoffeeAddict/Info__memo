import React from 'react';
import {ReactComponent as Flashcards} from '../../assets/Flashcards.svg';
import {ReactComponent as Soon} from '../../assets/Soon.svg';
import {ReactComponent as SpacedRepetition} from '../../assets/SpacedRepetition.svg';
import {ReactComponent as Questions} from '../../assets/Questions.svg';
import {Link} from 'react-router-dom';

import classes from './Methods.module.scss';
const Methods = props => (
	<div className={classes.Methods}>
		<Link to="/flashcards-help">
			<Flashcards />
		</Link>
		{/* <Link to="/" className={classes.Disabled}>
			<Soon className={classes.Disabled} />
		</Link>

		<Link to="/spaced-repetition-help">
			<SpacedRepetition />
		</Link> */}
		<Link to="/questions-help">
			<Questions />
		</Link>
	</div>
);

export default Methods;
