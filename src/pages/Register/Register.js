import classes from './Register.module.scss';
import React from 'react';
// import registerPicture from '/images/registerPicture.jpg';
const Register = props => (
	<div className={classes.Register}>
		<div className={classes.RegisterPicture} style={{backgroundImage: `url(/images/registerPicture.jpg)`}}>
			{/* <img src={registerPicture} alt="Studying woman" /> */}
		</div>
		<div>Register here</div>
	</div>
);

export default Register;
