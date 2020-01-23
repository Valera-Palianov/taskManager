import React from 'react'
import './TaskOverlay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TaskOverlay = (props) => {

	let icon
	switch(props.status) {
		case "error":
			icon = <FontAwesomeIcon icon="exclamation-triangle"/>
			break
		case "success":
			icon = <FontAwesomeIcon icon="check"/>
			break
		default:
			icon = <FontAwesomeIcon icon="atom" spin={true}/>
	}
	let message = (props.message != undefined) ? props.message : ""
	return(
		<div className='task-overlay'>
			<div className='task-overlay__icon'>
				{icon}
			</div>
			<div className='task-overlay__message'>
				{message}
			</div>
		</div>
	)
}

export default TaskOverlay