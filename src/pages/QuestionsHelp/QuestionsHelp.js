import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
// import {ReactComponent as QuestionList} from '../../../assets/QuestionList.svg';
// import {Link} from 'react-router-dom';

// import QuestionsHelpList from './QuestionsHelpList/QuestionsHelpList';
import {ReactComponent as QuestionsList} from '../../assets/QuestionsList.svg';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import ListItem from './ListItem/ListItem';
import classes from './QuestionsHelp.module.scss';

import * as actions from '../../store/actions/actions';

const QuestionsHelp = ({isAuth, questionsLists, onAddList, onDeleteList}) => {
	const [isChoosingList, setIsChoosingList] = useState(false);
	const [questionsListsArray, setQuestionsListsArray] = useState([]);
	const [newListInput, setNewListInput] = useState('');
	useEffect(() => {
		const tempQuestionListArray = [];

		for (let key in questionsLists) {
			tempQuestionListArray.push(key);
		}
		setQuestionsListsArray(tempQuestionListArray);
	}, [questionsLists]);

	const addListHandler = () => {
		if (newListInput.trim() === '') return;
		// let tempQuestionListArray = [...questionsListsArray];
		// console.log('handler2');
		// console.log(tempQuestionListArray);
		// tempQuestionListArray.push(newListInput);
		onAddList(newListInput);
		// setQuestionsListsArray(tempQuestionListArray);
		setNewListInput('');
	};

	let questionList;
	if (questionsListsArray.length === 0) {
		questionList = (
			<span className={`${classes.QuestionsListItem} ${classes.ListIsEmpty}`}>
				You must create a question list first.
			</span>
		);
	} else if (questionsListsArray.length !== 0) {
		questionList = questionsListsArray.map((list, index) => {
			const location = {pathname: '/questions-studying', search: list};
			return (
				<ListItem location={location} key={index} deleteListFunction={() => onDeleteList(list)}>
					{list}
				</ListItem>
			);
		});
	}
	//  else {
	// 	questionList = <span className={classes.QuestionsListItem}>You must create a deck first</span>;
	// }
	return (
		<>
			<div className={`LayoutContent ${classes.QuestionsHelp}`}>
				<div className={classes.QuestionsHelpLeft}>
					<p>
						Active Recall Sheet is a method which will help your remember any complex topic. The focus here
						is put on actively recalling information, that you already know. We provide you with a simple,
						structured sheet that will help you actively work with topics to learn. You make yourself a list
						of questions and then answer them without looking at any of your notes. You should check answers
						after each session and correct yourself where you were wrong. Then choose a color which will
						tell you next time if you answered right or wrong.
					</p>
				</div>
				<div className={classes.QuestionsHelpRight}>
					{/* <QuestionsHelpList /> */}
					<QuestionsList />
					<Button clicked={() => setIsChoosingList(state => !state)}>STUDY</Button>
				</div>
			</div>
			<Modal
				show={isChoosingList}
				modalClosed={() => {
					setIsChoosingList(prevState => !prevState);
				}}>
				<div className={classes.InsideModal}>
					<div className={classes.createListWrapper}>
						<span className={classes.CreateList} onClick={addListHandler}>
							Create another list
						</span>
						<input
							className={classes.CreateListInput}
							value={newListInput}
							onChange={event => setNewListInput(event.target.value)}
							onKeyPress={event => {
								event.key === 'Enter' && addListHandler();
							}}
						/>
					</div>
					<div className={classes.QuestionsList}>{questionList}</div>
				</div>
			</Modal>
		</>
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
		onAddList: listName => dispatch(actions.addList(listName)),
		onDeleteList: listName => dispatch(actions.deleteList(listName)),

		//onRetrieveData: () => dispatch(actions.retrieveAsyncData),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsHelp);
