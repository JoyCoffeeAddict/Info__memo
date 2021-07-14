import React, {useEffect, useState, useMemo} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';

import QuestionItem from './QuestionItem/QuestionItem';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/actions';
import * as questionColors from '../../shared/questionColors';
import classes from './QuestionsStudying.module.scss';

const FlashcardsStudying = ({
	location,
	isAuth,
	questionsLists,
	onAddQuestion,
	onRetrieveQuestionsData,
	onSaveQuestionsDataToDB,
}) => {
	const [listName, setListName] = useState('');
	const [questionInput, setQuestionInput] = useState('');

	useEffect(() => {
		if (isAuth) {
			onRetrieveQuestionsData();
		}
	}, [onRetrieveQuestionsData, isAuth]);

	//prep states at component's mounting
	useEffect(() => {
		let tempListName = location.search;
		//remove ? question mark from location.search
		tempListName = tempListName.slice(1);
		console.log(location.search);
		setListName(tempListName);
	}, [location.search]);

	const addQuestionHandler = (question, listName) => {
		if (question.trim() === '') return;
		setQuestionInput('');
		onAddQuestion({questionText: question, color: questionColors.WHITE}, listName);
	};

	const questionsListContent = useMemo(() => {
		if (!isAuth) return;
		if (!listName) return;
		if (!questionsLists) return;
		if (listName.trim() === '') return;
		const tempQuestionsList = questionsLists[listName]?.map((question, index) => {
			// eslint-disable-next-line
			if (question.questionText.trim() === '') return;
			return (
				<QuestionItem
					key={index}
					questionText={question.questionText}
					listName={listName}
					color={question.color}
					id={index}
				/>
			);
		});
		return tempQuestionsList;
	}, [listName, questionsLists, isAuth]);

	return (
		isAuth && (
			<div className={classes.QuestionsStudying}>
				<span className={classes.AddQuestionWrapper}>
					<Button clicked={() => addQuestionHandler(questionInput, listName)}>Add new question</Button>
					<input
						type="text"
						className={classes.AddQuestionInput}
						value={questionInput}
						onChange={event => setQuestionInput(event.target.value)}
						onKeyPress={event => event.key === 'Enter' && addQuestionHandler(questionInput, listName)}
					/>
					<Button clicked={() => onSaveQuestionsDataToDB()} additionalStyles={classes.SaveButton}>
						<FontAwesomeIcon icon={faSave} />
					</Button>
				</span>
				{listName}
				{questionsListContent}
			</div>
		)
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
		questionsLists: state.questionsLists,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onRetrieveQuestionsData: () => dispatch(actions.retrieveQuestionsData),
		onSaveQuestionsDataToDB: () => dispatch(actions.saveQuestionsDataToDB),
		onAddQuestion: (question, listName) => dispatch(actions.addQuestion(question, listName)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(FlashcardsStudying);
