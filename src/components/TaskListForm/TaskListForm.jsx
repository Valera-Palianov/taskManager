import React from 'react'
import './TaskListForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TaskOverlay from '../TaskOverlay/TaskOverlay'

const TaskListForm = (props) => {

	const {username, email, text} = props.form
	const {sendingError, sendingErrorMessage, isMessageSending, newMessageSended} = props.flags

	let overlay
	if(isMessageSending || newMessageSended) {

		const status = (isMessageSending) ? "process" : "done"
		const message = (isMessageSending) ? "Отправка..." : "Отправлено!"
		overlay = <TaskOverlay status={status} message={message}/>
	}

	let status = ""
	if(sendingError) {
		status = "Ошибка отправки, подробности в консоли"
		console.log(sendingErrorMessage)
	}


	return(
		<div className='card task-list-form'>
			{overlay}
			<div className='card__wrap'>
				<form onSubmit={props.addTaskRequest}>
					<div className='task-list-form__template'>
						<div className='task-list-form__inputs-wrap'>
							<input
								placeholder="Имя"
								className='task-list-form__username'
								onChange={props.addTaskFormChange}
								name="username"
								type="text"
								value={username}/>
							<input
								placeholder="email"
								className='task-list-form__email'
								onChange={props.addTaskFormChange}
								name="email"
								type="email"
								value={email}/>
						</div>
						<div className='task-list-form__textarea-wrap'>
							<textarea
								placeholder="Текст задачи"
								className="task-list-form__text"
								onChange={props.addTaskFormChange}
								name="text"
								value={text}/>
						</div>
						<div className='task-list-form__submit-wrap'>
							<button className='submit-button task-list-form__submit'>Создать</button>
							<div className='task-list-form__status'>{status}</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default TaskListForm