import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'

import User from '../components/User/User'
import {ajaxData} from '../utils/ajaxData'
import {
	loginFormChanged,
	loginRequest,
	loginSuccess,
	loginFailure,
	logout
} from '../actions/UserActions'

class UserContainer extends React.Component {
	constructor(props) {
		super(props)

		this.logout = this.logout.bind(this)
		this.loginRequest = this.loginRequest.bind(this)
		this.loginFormChanged = this.loginFormChanged.bind(this)
	}

	componentDidMount(){
		const {token, isAdmin, username} = Cookies.get()
		if(token != undefined) {
			this.props.loginSuccess(token, isAdmin, username)
		}
	}

	loginFormChanged (e) {
		const value = e.target.value
		const name = e.target.name
		this.props.loginFormChanged(name, value)
	}

	loginRequest(e) {

		e.preventDefault() 

		const formData = new FormData()
        formData.append("username", this.props.form.login)
        formData.append("password", this.props.form.password)

		this.props.loginRequest()

		const requestBase = ajaxData.baseURL
		const requestTarget = ajaxData.toLogIn
		const requestDeveloper = "/?developer="+ajaxData.developerName

		const requestURL = requestBase+requestTarget+requestDeveloper

		const that = this

		axios.post(requestURL, formData)
			.then(function (response) {
				if(response.data.status == 'ok') {
					const token = response.data.message.token
					const isAdmin = true
					const username = "Admin"

					Cookies.set('token', token, { expires: 1 })
					Cookies.set('isAdmin', isAdmin, { expires: 1 })
					Cookies.set('username', username, { expires: 1 })

					that.props.loginSuccess(token, isAdmin, username)
				} else {
					that.props.loginFailure(response.data.message)
				}
			})
			.catch(function (error) {
				that.props.loginFailure(error)
			})
	}

	logout() {
		this.props.logout()
		Cookies.remove('token')
		Cookies.remove('isAdmin')
		Cookies.remove('username')
	}

	render() {
		return <User
			isLogin={this.props.isLogin}
			username={this.props.username}
			form={this.props.form}
			flags={this.props.flags}
			loginFormChanged={this.loginFormChanged}
			loginRequest={this.loginRequest}
			logout={this.logout}/>
	}
}

const mapStateToProps = (state) => {
	return state.user
}

const mapDispatchToProps = (dispatch) => {
	return {
		loginFormChanged: (name, value) => dispatch(loginFormChanged(name, value)),
		loginRequest: () => dispatch(loginRequest()),
		loginSuccess: (token, isAdmin, username) => dispatch(loginSuccess(token, isAdmin, username)),
		loginFailure: (errorMessage) => dispatch(loginFailure(errorMessage)),
		logout: () => dispatch(logout()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)