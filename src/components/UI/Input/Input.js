import React from 'react';
import classes from './Input.module.scss';
const Input = ({
	inputValue,
	setValue,
	labelDescription,
	invalidResponse,
	isInputCorrect,
	inputType,
	isRequired,
	pressedEnter,
}) => (
	<div className={classes.InputWrapper}>
		<label className={classes.Label}>
			<input
				className={classes.Input}
				type={inputType}
				placeholder=""
				value={inputValue}
				onChange={setValue}
				required={isRequired}
				// For 'Enter' only
				onKeyPress={pressedEnter}
			/>
			<span className={classes.LabelDescription}>{labelDescription}</span>
		</label>
		<span className={classes.InvalidResponse}>{!isInputCorrect && inputValue !== '' ? invalidResponse : ''}</span>
	</div>
);

export default Input;
