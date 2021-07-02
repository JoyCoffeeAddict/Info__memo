import React from 'react';
import Methods from '../../components/Methods/Methods';
import classes from './Main.module.scss';
const Main = props => (
	<div className={`LayoutContent`}>
		<div className={classes.MainLeft}>
			<p>
				Info.memo() is a tool that will help you remember things! We created this website with a mission to help
				anyone who had ever struggled with studying.
			</p>
			<p>You can choose your favourite learining method, all of them are scientifically proven.</p>
		</div>
		<div className={classes.MainRight}>
			<Methods />
		</div>
	</div>
);

export default Main;
