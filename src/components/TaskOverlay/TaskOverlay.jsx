import React from 'react'
import './TaskOverlay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TaskOverlay = (props) => {
	return(
		<div className='task-overlay'>
			<div className='task-overlay__icon'>
				{(props.status == 'done') ? <FontAwesomeIcon icon="check"/> : <FontAwesomeIcon icon="atom" spin={true}/>}
			</div>
			<div className='task-overlay__message'>
				{(props.message != undefined) ? props.message : ""}
			</div>
		</div>
	)
}

export default TaskOverlay