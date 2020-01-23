import React from 'react'

import './LoginForm.css'

const LoginForm = (props) => {

	const {login, password} = props.form.values
	const {loginProcess, loginError, networkError} = props.flags

	const loginValidationFail = props.form.validators.login.validationFail
	const passwordValidationFail = props.form.validators.password.validationFail

	const loginValidationMessage = props.form.validators.login.message
	const passwordValidationMessage = props.form.validators.password.message

	let loginClasses = 'login-from__username login-form__input'
	let passwordClasses = 'login-from__password login-form__input'

	loginClasses += (loginValidationFail) ? " validation-error" : ""
	passwordClasses += (passwordValidationFail) ? " validation-error" : ""

	const {
		login: loginPH,
		password: passwordPH,
	} = props.form.placeholders

	const {
		loginProcess: loginProcessMessage,
		networkError: networkErrorMessage,
		loginError: loginErrorMessage
	} = props.messages

	let validatorError = false
	if(
		loginValidationFail ||
		passwordValidationFail ||
		props.form.values.login == '' ||
		props.form.values.password == '') {
		validatorError = true
	}

	let status
	if(networkError) {
		status = networkErrorMessage
	}
	if(loginError) {
		status = loginErrorMessage
	}
	if(loginProcess) {
		status = loginProcessMessage
	}

	return (
		<form className='login-form' onSubmit={props.loginRequest}>
			<div className='login-form__input-wrap'>
				<input
					onChange={props.loginFormChange}
					className={loginClasses}
					placeholder={loginPH}
					value={login}
					name='login'
					type='text'/>
				{(loginValidationFail) ? <div className='validation__message'>{loginValidationMessage}</div> : ""}
			</div>
			<div className='login-form__input-wrap'>
				<input
					onChange={props.loginFormChange}
					className={passwordClasses}
					placeholder={passwordPH}
					value={password}
					type='password'
					name='password'/>
				{(passwordValidationFail) ? <div className='validation__message'>{passwordValidationMessage}</div> : ""}
			</div>
			<div className='login-form__submit-wrap'>
				<button disabled={validatorError} className='submit-button login-form__submit'>Войти</button>
				<div className='login-form__status'>{status}</div>
			</div>
		</form>
	)
}

export default LoginForm