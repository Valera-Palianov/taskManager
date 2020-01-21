import React from 'react'

import './LoginForm.css'

const LoginForm = (props) => {
	const {loginInProcess, errorLogin, errorLoginMessage} = props.flags

	let status
	if(loginInProcess) {
		status = "Отправка..."
	}
	if(errorLogin) {
		status = "Ошибка отправки, подробности в консоли"
		console.log(errorLoginMessage)
	}

	return (
		<form className='login-form' onSubmit={props.loginRequest}>
			<div className='login-form__input-wrap'>
				<input
					type='text'
					name='login'
					placeholder="Логин"
					value={props.login}
					onChange={props.loginFormChanged}
					className='login-from__username login-form__input'/>
			</div>
			<div className='login-form__input-wrap'>
				<input
					type='password'
					name='password'
					placeholder="Пароль"
					value={props.password}
					onChange={props.loginFormChanged}
					className='login-form__password login-form__input'/>
			</div>
			<div className='login-form__submit-wrap'>
				<button className='submit-button login-form__submit'>Войти</button>
				<div className='login-form__status'>{status}</div>
			</div>
		</form>
	)
}

export default LoginForm