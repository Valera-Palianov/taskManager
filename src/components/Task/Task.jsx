import React from 'react'
import './Task.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HTMLDecoderEncoder from "html-encoder-decoder"

const Task = (props) => {

	let classes = 'card task'
	let icon = 'check-circle'
	if(props.status == 0) {
		classes += ' task_inprogress'
		icon = "circle"
	}

	const buttonsHolder = (
		<div className='task__buttons-holder' onClick={()=>{props.taskSelectedToEdit(props.task.id)}}>
			<FontAwesomeIcon className="task__button" icon="pen"/>
		</div>
	)

	return (
		<div className={classes} key={props.id}>
			<div className='card__wrap'>
				<div className='task__creator'>
					<div className='task__username'>{props.task.username}</div>
					<div className='task__email'>{props.task.email}</div>
				</div>
				<div className='task__text'>{HTMLDecoderEncoder.decode(props.text)}</div>
				<div className='task__status-wrap'>
					<div className='task__error'>{(props.task.hasBeenChanged) ? "Отредактированно администратором" : ""}</div>
					<div className='task__status'>
						<FontAwesomeIcon icon={['far', icon]}/>
					</div>
				</div>
			</div>
			{(props.editorEnabled && !props.savingProcess) ? buttonsHolder : null}
		</div>
	)
}

export default Task