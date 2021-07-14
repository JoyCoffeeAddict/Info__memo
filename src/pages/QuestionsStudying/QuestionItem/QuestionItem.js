import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/actions/actions';
import * as questionColors from '../../../shared/questionColors';
import classes from './QuestionItem.module.scss';
const QuestionItem = ({questionText, listName, color, id, onChangeColor, onDeleteQuestion}) => {
	let [QuestionClasses, setQuestionClasses] = useState(`${classes.Question}`);

	const QuestionBackgroundHandler = backgroundColor => {
		console.log('changed color');
		onChangeColor(listName, id, backgroundColor);
	};

	useEffect(() => {
		switch (color) {
			case questionColors.GREEN:
				setQuestionClasses(`${classes.Question}  ${classes.ColorGreen}`);
				break;
			case questionColors.ORANGE:
				setQuestionClasses(`${classes.Question}  ${classes.ColorOrange}`);
				break;
			case questionColors.RED:
				setQuestionClasses(`${classes.Question}  ${classes.ColorRed}`);
				break;
			default:
				setQuestionClasses(`${classes.Question}`);
				break;
		}
	}, [color]);

	return (
		<div className={QuestionClasses}>
			<span>{questionText}</span>

			<span className={classes.ControlButtons}>
				<span
					onClick={() => QuestionBackgroundHandler(questionColors.GREEN)}
					className={`${classes.Color} ${classes.ColorGreen}`}></span>
				<span
					onClick={() => QuestionBackgroundHandler(questionColors.ORANGE)}
					className={`${classes.Color} ${classes.ColorOrange}`}></span>
				<span
					onClick={() => QuestionBackgroundHandler(questionColors.RED)}
					className={`${classes.Color} ${classes.ColorRed}`}></span>
				<FontAwesomeIcon
					icon={faTrashAlt}
					className={classes.DeleteQuestion}
					onClick={() => onDeleteQuestion(listName, id)}
				/>
			</span>
		</div>
	);
};

const mapStateToProps = state => {
	return {};
};
const mapDispatchToProps = dispatch => {
	return {
		onChangeColor: (listName, id, color) => dispatch(actions.changeColor(listName, id, color)),
		onDeleteQuestion: (listName, id) => dispatch(actions.deleteQuestion(listName, id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionItem);
