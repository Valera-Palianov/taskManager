import React from 'react'

import UserInfo from "../UserInfo/UserInfo"
import LoginForm from "../LoginForm/LoginForm"

import './User.css'

const User = (props) => {

	let content
	if(props.isLogin) {
		content = <UserInfo username={props.username} logout={props.logout}/>
	} else {
		content = <LoginForm
					loginRequest={props.loginRequest}
					loginFormChanged={props.loginFormChanged}
					flags={props.flags}
					form={props.form}/>
	}

	return (
		<div className='user'>
			{content}
		</div>
	)
}

export default User