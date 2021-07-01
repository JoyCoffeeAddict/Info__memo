import React from 'react';
import classes from './Button.module.css';

const button = ({ButtonType, children, clicked, additionalStyles}) => (
	<button onClick={clicked} className={[classes.Button, classes[ButtonType], additionalStyles].join(' ')}>
		{children}
	</button>
);

export default button;
