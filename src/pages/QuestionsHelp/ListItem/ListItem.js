import React from 'react';

import {Link} from 'react-router-dom';
import classes from './ListItem.module.scss';
import DeleteIcon from '../../../components/UI/DeleteIcon/DeleteIcon';
const ListItem = ({location, deleteListFunction, children}) => (
	<span className={classes.QuestionsListItem}>
		<Link to={location}>{children}</Link>
		<DeleteIcon
			clicked={list => {
				deleteListFunction(list);
			}}
		/>
	</span>
);

export default ListItem;
