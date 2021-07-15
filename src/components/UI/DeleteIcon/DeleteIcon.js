import classes from './DeleteIcon.module.scss';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
const DeleteIcon = ({clicked}) => (
	<div className={classes.DeleteIcon} onClick={clicked}>
		<FontAwesomeIcon icon={faTrashAlt} className={classes.default} />
		<FontAwesomeIcon icon={faTrashAlt} className={classes.active} />
	</div>
);

export default DeleteIcon;
