import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./TaskListStatus.css"

const LoadStatus = (props) => {

	const {updatingError, isListUpdating, updatingErrorMessage} = props.flags
	const totalTaskCount = props.totalTaskCount

	let icon = 'none'
	let message
	let spin = false
	if(updatingError) {

		icon = "exclamation-triangle"
		message="Ошибка загрузки, подробности в консоли"
		console.log(updatingErrorMessage)

	} else {

		if(isListUpdating) {

			spin = true
			icon = "atom"
			message="Загрузка..."

		} else {

			if(totalTaskCount == 0) {

				icon = "folder-open"
				message="Ваш список задач пуст"

			} else {

				icon = "dizzy"
				message="Неизвестная ошибка, попробуйте еще раз"

			}
		}
	}

	icon = (icon != "none") ? <FontAwesomeIcon icon={icon} spin={spin}/> : ""

	return (
		<div className='tasklist-status'>
			<div className='tasklist-status__icon'>{icon}</div>
			<div className='tasklist-status__message'>{message}</div>		
		</div>
	)
}

export default LoadStatus