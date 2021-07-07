/*rules is an object with properties describing a value to check
Available rules are: 
required (bool)
minLength
maxLength
isEmail (contains @ and typical email chars)
isStrongPassword
*/
export const checkValidity = (value, rules) => {
	let isValid = true;

	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}
	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}
	if (rules.isEmail) {
		const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		isValid = pattern.test(value) && isValid;
	}

	if (rules.isStrongPassword) {
		// eslint-disable-next-line
		const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
		isValid = pattern.test(value) && isValid;
	}
	return isValid;
};
