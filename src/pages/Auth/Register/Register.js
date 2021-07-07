import React, {useState, useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import {checkValidity} from '../../../shared/checkValidity';
import {nameRules, emailRules, passwordRules} from '../../../shared/dataRules';
import * as actions from '../../../store/actions/actions';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from '../Auth.module.scss';
const Register = props => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const isNameCorrect = useMemo(() => checkValidity(name, nameRules), [name]);
	const isEmailCorrect = useMemo(() => checkValidity(email, emailRules), [email]);
	const isPasswordCorrect = useMemo(() => checkValidity(password, passwordRules), [password]);

	const submitHandler = event => {
		event.preventDefault();
		console.log('submit handler');
		if (isNameCorrect && isPasswordCorrect && isEmailCorrect) {
			//Register request
			//isSignup is equal to false, since user is not signed up yet.
			const isSignup = false;
			props.onAuth(email, password, isSignup, name);
		}
	};
	return (
		<div className={classes.Auth}>
			<div
				className={classes.AuthPicture}
				style={{backgroundImage: `url(/images/registerPicture.jpg)`}}
				data-ad-text="register for free"></div>
			<div className={classes.FormWrapper}>
				<form className={classes.Form} onSubmit={submitHandler}>
					<span className={classes.Title}>Register</span>
					<span className={classes.Inputs}>
						<Input
							inputValue={name}
							setValue={event => setName(event.target.value)}
							labelDescription="First Name"
							invalidResponse="Provide valid first name"
							isInputCorrect={isNameCorrect}
							inputType="text"
							isRequired={true}
						/>

						<Input
							inputValue={email}
							setValue={event => setEmail(event.target.value)}
							labelDescription="Email"
							invalidResponse="Provide valid email adress"
							isInputCorrect={isEmailCorrect}
							inputType="email"
							isRequired={true}
						/>
						<Input
							inputValue={password}
							setValue={event => setPassword(event.target.value)}
							labelDescription="Password"
							invalidResponse="Correct password contains at least 8 characters, one capital letter, a
						number and special character"
							isInputCorrect={isPasswordCorrect}
							inputType="password"
							isRequired={true}
						/>
					</span>
					<span className={classes.Submit}>{props.isLoading ? <Spinner /> : <Button>SIGN UP</Button>}</span>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.auth.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup, name) => dispatch(actions.auth(email, password, isSignup, name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
