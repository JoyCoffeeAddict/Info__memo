import React from 'react';
import classes from './NavigationItem.module.scss';
import {NavLink} from 'react-router-dom';
const NavigationItem = ({link, exact, children, clicked, isClosed}) => {
	let classList = `${classes.navigationItem}`;
	if (isClosed) {
		classList = `${classes.navigationItem} ${classes.closed}`;
	}
	return (
		<li onClick={clicked} className={classList}>
			<NavLink to={link} exact={exact} activeClassName={classes.active}>
				{children}
			</NavLink>
		</li>
	);
};

export default NavigationItem;
