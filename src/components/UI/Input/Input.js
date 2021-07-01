import React from 'react';
import './Input.css';
const Input = ({
	inputValue,
	setValue,
	labelDescription,
	invalidResponse,
	isInputCorrect,
	inputType,
	isRequired,
}) => (
	<div className="InputWrapper">
		<label>
			<input
				className="Input"
				type={inputType}
				placeholder=""
				value={inputValue}
				onChange={setValue}
				required={isRequired}
			/>
			<span className="LabelDescription">{labelDescription}</span>
		</label>
		{!isInputCorrect && inputValue !== '' && (
			<span className="InvalidResponse">{invalidResponse}</span>
		)}
	</div>
);

export default Input;
