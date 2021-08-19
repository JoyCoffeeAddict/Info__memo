import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import {Link} from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../shared/calendarStyles.scss';

import classes from './SpacedRepetitionHelp.module.scss';
const SpacedRepetitionHelp = ({isAuth}) => {
	const [value, setValue] = useState();

	const onChange = useCallback(
		value => {
			setValue(value);
		},
		[setValue]
	);

	console.log(value);
	return (
		<div className={`LayoutContent `}>
			<div className={classes.SpacedRepetitionHelp}>
				<div className={classes.Left}>
					<p>
						Spaced Repetition is a method based on forgetting curve. The focus here is put on regular
						repetition over a period of time. To begin with, you can choose a date of a first study session
						on given subject. Simply click on the suitable date and set yourself a reminder to study the
						topic. Then the system will put another four reminders for you. One a day after of a first
						session, the other after three days, next one will be a week later and the last, but not least
						after a month. After thesse five study sessions you should be well-acquainted with nearly every
						topic.
					</p>
				</div>

				<div className={classes.Right}>
					<Calendar onChange={onChange} value={value} className="calendar" />
					{isAuth ? (
						<Link to="/spaced-repetition-studying">
							<Button>STUDY</Button>
						</Link>
					) : (
						<Link to="/log-in">
							<Button>First, you have to log in</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpacedRepetitionHelp);
