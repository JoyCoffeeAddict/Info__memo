import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import classes from './ListItem.module.scss';
const ListItem = ({location, deleteListFunction, children}) => (
	<span className={classes.QuestionsListItem}>
		<Link to={location}>{children}</Link>
		<span
			className={classes.DeleteList}
			onClick={list => {
				deleteListFunction(list);
			}}>
			<FontAwesomeIcon icon={faTrashAlt} className={classes.default} />
			<FontAwesomeIcon icon={faTrashAlt} className={classes.active} />
		</span>
	</span>
);

export default ListItem;
