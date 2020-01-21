import React from 'react'
import './TaskEditor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TaskOverlay from '../TaskOverlay/TaskOverlay'

const Task = (props) => {

	const {isSaving, status, text, savingError, savingErrorMessage} = props.editableTask

	let classes = 'card task task-editor'
	let icon = 'check-circle'
	if(status == 0) {
		classes += ' task_inprogress'
		icon = "circle"
	}

	let overlay = <TaskOverlay />
	overlay = (isSaving) ? overlay : null

	let error
	if(savingError) {
		console.log(savingErrorMessage)
		error = "Ошибка сохранения. Подробности в консоли"
	}

	return (
		<div className={classes} key={props.id}>
			{overlay}
			<div className='card__wrap'>
				<div className='task__creator'>
					<div className='task__username'>{props.username}</div>
					<div className='task__email'>{props.email}</div>
				</div>
				<textarea
					onChange={(e) => {props.editableTaskChange('text', e.target.value)}}
					className='task__text task-editor__text'
					value={text}/>
				<div className='task__status-wrap'>
					<div className='task__error'>{error}</div>
					<div
						onClick={() => {props.editableTaskChange('status', (status == 0) ? 10 : 0)}}
						className='task__status'>
							<FontAwesomeIcon icon={['far', icon]}/>
					</div>
				</div>
			</div>
			<div className='task__buttons-holder'>
				<FontAwesomeIcon onClick={props.taskUnselectedToEdit} className='task__button' icon="ban"/>
				<FontAwesomeIcon onClick={props.editableTaskSaveRequest} className='task__button' icon="save"/>
			</div>
		</div>
	)
}

export default Task