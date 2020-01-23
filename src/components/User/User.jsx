import React from 'react'

import UserInfo from "../UserInfo/UserInfo"
import LoginForm from "../LoginForm/LoginForm"

import './User.css'

const User = (props) => {

	let content
	if(props.general.isLogin) {
		content = <UserInfo username={props.general.username} logout={props.logout}/>
	} else {
		content = <LoginForm
					loginRequest={props.loginRequest}
					loginFormChange={props.loginFormChange}
					flags={props.flags}
					form={props.form}
					messages={props.messages}/>
	}

	return (
		<div className='user'>
			{content}
		</div>
	)
}

export default User