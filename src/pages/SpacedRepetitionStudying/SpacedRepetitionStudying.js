import React, {useState, useCallback} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../shared/calendarStyles.scss';

import classes from './SpacedRepetitionStudying.module.scss';
// import {Calendar} from '@natscale/react-calendar';
// import '@natscale/react-calendar/dist/main.css';
const SpacedRepetitionStudying = props => {
	const [value, setValue] = useState(new Date());

	const onChange = useCallback(
		value => {
			setValue(value);
		},
		[setValue]
	);

	console.log(value);
	const [textInput, setTextInput] = useState('');

	const year = value.getFullYear();
	const month = value.getMonth();
	const day = value.getDate();
	console.log(`year: ${year}, month: ${month}, day: ${day}`);
	return (
		<div className={`LayoutContent ${classes.SpacedRepetitionStudying}`}>
			<Calendar onChange={onChange} value={value} className="calendar" />
			<div className={classes.Notepad}>
				<textarea
					type="text"
					value={textInput}
					onChange={event => setTextInput(event.target.value)}
					className={classes.NotepadInput}
				/>
				<div className={classes.Notes}></div>
			</div>
		</div>
	);
};
export default SpacedRepetitionStudying;
