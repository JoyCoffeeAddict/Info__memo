import React, {useState, useMemo} from 'react';
import {connect} from 'react-redux';
import {checkValidity} from '../../../shared/checkValidity';
import {nameRules, emailRules, passwordRules} from '../../../shared/dataRules';
import * as actions from '../../../store/actions/actions';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from '../Auth.module.scss';
const Register = ({isAuth, isLoading, isAuthenticatedCorrectly, didAuthenticationFail, onAuth}) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const isNameCorrect = useMemo(() => checkValidity(name, nameRules), [name]);
	const isEmailCorrect = useMemo(() => checkValidity(email, emailRules), [email]);
	const isPasswordCorrect = useMemo(() => checkValidity(password, passwordRules), [password]);

	//Register request
	//isSignup is equal to false, since user is not signed up yet.
	const isSignup = false;
	const submitHandler = event => {
		event.preventDefault();
		if (isNameCorrect && isPasswordCorrect && isEmailCorrect) {
			onAuth(email, password, isSignup, name);
			setName('');
			setEmail('');
			setPassword('');
		}
	};

	let authenticationResponse = useMemo(() => {
		if (didAuthenticationFail)
			return (
				<span className={`${classes.AuthenticationResponse} ${classes.AuthenticationFail}`}>
					Authentication Failed
				</span>
			);

		if (isAuthenticatedCorrectly)
			return (
				<span className={`${classes.AuthenticationResponse} ${classes.AuthenticationSuccess}`}>
					Registration went smoothly
				</span>
			);
		else {
			return <span className={classes.Title}>Register</span>;
		}
	}, [isAuthenticatedCorrectly, didAuthenticationFail]);

	return (
		<div className={classes.Auth}>
			<div
				className={classes.AuthPicture}
				style={{backgroundImage: `url(/images/registerPicture.jpg)`}}
				data-ad-text="register for free"></div>
			<div className={classes.FormWrapper}>
				<form className={classes.Form} onSubmit={submitHandler}>
					<span className={classes.Title}>{authenticationResponse}</span>
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

					<span className={classes.Submit}>{isLoading ? <Spinner /> : <Button>SIGN UP</Button>}</span>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticatedCorrectly: state.auth.token !== null,
		didAuthenticationFail: state.auth.error !== null,
		isLoading: state.auth.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup, name) => dispatch(actions.auth(email, password, isSignup, name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
