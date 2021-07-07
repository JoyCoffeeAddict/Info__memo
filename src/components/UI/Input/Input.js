import React from 'react';
import './Input.css';
const Input = ({inputValue, setValue, labelDescription, invalidResponse, isInputCorrect, inputType, isRequired}) => (
	<div className="InputWrapper">
		<label className="Label">
			<input
				className="Input"
				type={inputType}
				placeholder="name"
				value={inputValue}
				onChange={setValue}
				required={isRequired}
			/>
			<span className="LabelDescription">{labelDescription}</span>
		</label>
		<span className="InvalidResponse">{!isInputCorrect && inputValue !== '' ? invalidResponse : ''}</span>
	</div>
);

export default Input;
