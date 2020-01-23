import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./TaskListStatus.css"

const LoadStatus = (props) => {

	let icon
	switch(props.status) {
		case "error":
			icon = <FontAwesomeIcon icon="exclamation-triangle"/>
			break
		case "empty":
			icon = <FontAwesomeIcon icon="folder-open"/>
			break
		case "wtf":
			icon = <FontAwesomeIcon icon="dizzy"/>
			break
		default:
			icon = <FontAwesomeIcon icon="atom" spin={true}/>
	}
	let message = (props.message != undefined) ? props.message : ""

	return (
		<div className='tasklist-status'>
			<div className='tasklist-status__icon'>{icon}</div>
			<div className='tasklist-status__message'>{message}</div>		
		</div>
	)
}

export default LoadStatus