import React from 'react'

import './UserInfo.css'

const UserInfo = (props) => {

	return (
		<div className='user-info'>
			<div className='user-info__name'>
				{props.username}
			</div>
			<div className='user-info__logout'>
				<button className='submit-button' onClick={props.logout}>Выход</button>
			</div>
		</div>
	)
}

export default UserInfo