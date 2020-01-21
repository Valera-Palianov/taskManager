import React from 'react'
import './Task.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Task = (props) => {

	let classes = 'card task'
	let icon = 'check-circle'
	if(props.status == 0) {
		classes += ' task_inprogress'
		icon = "circle"
	}

	const buttonsHolder = (<div
							className='task__buttons-holder'
							onClick={()=>{props.taskSelectedToEdit(props.id)}}>
								<FontAwesomeIcon className="task__button" icon="pen"/>
							</div>)
	let editButton = (props.editorEnabled && !props.editableTaskIsSaving) ? buttonsHolder : null
	return (
		<div className={classes} key={props.id}>
			<div className='card__wrap'>
				<div className='task__creator'>
					<div className='task__username'>{props.username}</div>
					<div className='task__email'>{props.email}</div>
				</div>
				<div className='task__text'>{props.text}</div>
				<div className='task__status-wrap'>
					<div className='task__error'></div>
					<div className='task__status'>
						<FontAwesomeIcon icon={['far', icon]}/>
					</div>
				</div>
			</div>
			{editButton}
		</div>
	)
}

export default Task