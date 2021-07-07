export const nameRules = {
	isRequired: true,
	minLength: 3,
};
export const emailRules = {
	isRequired: true,
	isEmail: true,
	minLength: 3,
};
export const passwordRules = {
	isRequired: true,
	isStrongPassword: true,
	minLength: 8,
};
