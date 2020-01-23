import React from 'react'
import './TaskForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TaskOverlay from '../TaskOverlay/TaskOverlay'

const TaskForm = (props) => {

	const {username, email, text} = props.form.values
	const {networkError, sendingProcess, sendingSuccess, sendingError, showOverlay} = props.flags

	const usernameValidationFail = props.form.validators.username.validationFail
	const emailValidationFail = props.form.validators.email.validationFail
	const textValidationFail = props.form.validators.text.validationFail

	const usernameValidationMessage = props.form.validators.username.message
	const emailValidationMessage = props.form.validators.email.message
	const textValidationMessage = props.form.validators.text.message

	let usernameClasses = 'task-from__input task-form__username'
	let emailClasses = 'task-from__input task-form__email'
	let textClasses = 'task-from__input task-form__text'
	usernameClasses += (usernameValidationFail) ? " validation-error" : ""
	emailClasses += (emailValidationFail) ? " validation-error" : ""
	textClasses += (textValidationFail) ? " validation-error" : ""

	const {
		username: usernamePH,
		email: emailPH,
		text: textPH
	} = props.form.placeholders

	const {
		sendingProcess: sendingProcessMessage,
		sendingSuccess: sendingSuccessMessage,
		networkError: networkErrorMessage,
		sendingError: sendingErrorMessage
	} = props.messages

	let validatorError = false
	if(
		usernameValidationFail ||
		emailValidationFail ||
		textValidationFail ||
		props.form.values.username == '' ||
		props.form.values.email == '' ||
		props.form.values.text == '') {
		validatorError = true
	}

	let overlay
	if(showOverlay) {
		let status
		let message

		if(networkError) {
			status = "error"
			message = networkErrorMessage
		}
		if(sendingError) {
			status = "error"
			console.log(message)
			message = "Неверные данные. Подробности в консоли"
		}
		if(sendingSuccess) {
			status = "success"
			message = sendingSuccessMessage
		}
		if(sendingProcess) {
			status = "process"
			message = sendingProcessMessage
		}

		overlay = <TaskOverlay status={status} message={message} />
	}

	return(
		<div className='card task-form'>
			{overlay}
			<div className='card__wrap'>
				<form onSubmit={props.addTaskRequest}>
					<div className='task-form__template'>
						<div className='task-form__inputs-wrap'>
							<div>
								<input
									value={username}
									placeholder={usernamePH}
									onChange={props.taskFormChange}
									className={usernameClasses}
									name="username"
									type="text"/>
								{(usernameValidationFail) ? <div className='validation__message'>{usernameValidationMessage}</div> : ""}
							</div>
							<div>
								<input
									value={email}
									placeholder={emailPH}
									onChange={props.taskFormChange}
									className={emailClasses}
									name="email"
									type="text"/>
								{(emailValidationFail) ? <div className='validation__message'>{emailValidationMessage}</div> : ""}
							</div>
						</div>
						<div className='task-form__textarea-wrap'>
							<div>
								<textarea
									value={text}
									placeholder={textPH}
									onChange={props.taskFormChange}
									className={textClasses}
									name="text"/>
								{(textValidationFail) ? <div className='validation__message'>{textValidationMessage}</div> : ""}
							</div>
						</div>
						<div className='task-form__submit-wrap'>
							<button disabled={validatorError} className='submit-button task-form__submit'>Создать</button>
							<div className='task-form__status'></div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default TaskForm