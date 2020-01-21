import React from 'react'
import './TaskOverlay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TaskOverlay = (props) => {
	return(
		<div className='task-overlay'>
			<div className='task-overlay__icon'>
				<FontAwesomeIcon icon="atom" spin={true}/>
			</div>
		</div>
	)
}

export default TaskOverlay