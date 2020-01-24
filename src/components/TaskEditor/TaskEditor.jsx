import React from 'react'
import './TaskEditor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HTMLDecoderEncoder from "html-encoder-decoder"

import TaskOverlay from '../TaskOverlay/TaskOverlay'

const TaskEditor = (props) => {

	const {savingProcess, savingError, networkError, showOverlay} = props.editor.flags
	const {status, text, id} = props.editor.task
	const {username, email} = props.task
	const {validationFail, validationMessage} = props.editor.validator

	const {
		savingProcess: savingProcessMessage,
		savingError: savingErrorMessage,
		networkError: networkErrorMessage
	} = props.editor.messages

	let classes = 'card task task-editor'
	let icon = 'check-circle'
	if(status == 0) {
		classes += ' task_inprogress'
		icon = "circle"
	}

	let textareaClasses = 'task__text task-editor__text'
	textareaClasses += (validationFail) ? " validation-error" : ""

	let overlay
	if(showOverlay) {
		let status
		let message

		if(networkError) {
			status = "error"
			message = networkErrorMessage
		}
		if(savingError) {
			status = "error"
			message = savingErrorMessage
			console.log(message)
			message = "Неверные данные. Подробности в консоли"
		}
		if(savingProcess) {
			status = "process"
			message = savingProcessMessage
		}

		overlay = <TaskOverlay status={status} message={message} />
	}

	return (
		<div className={classes} key={props.task.id}>
			{overlay}
			<div className='card__wrap'>
				<div className='task__creator'>
					<div className='task__username'>{username}</div>
					<div className='task__email'>{email}</div>
				</div>
				<div>
					<textarea
						onChange={(e) => {props.editableTaskChange('text', e.target.value)}}
						className={textareaClasses}
						value={HTMLDecoderEncoder.decode(text)}/>
					{(validationFail) ? <div className='validation__message'>{validationMessage}</div> : ""}
				</div>
				<div className='task__status-wrap'>
					<div className='task__error'></div>
					<div
						onClick={() => {props.editableTaskChange('status', (status == 0) ? 10 : 0)}}
						className='task__status'>
							<FontAwesomeIcon icon={['far', icon]}/>
					</div>
				</div>
			</div>
			<div className='task__buttons-holder'>
				<FontAwesomeIcon onClick={props.taskUnselectedToEdit} className='task__button' icon="ban"/>
				<FontAwesomeIcon onClick={(!validationFail) ? props.editableTaskSaveRequest : () => {return false}} className='task__button' icon="save"/>
			</div>
		</div>
	)
}

export default TaskEditor