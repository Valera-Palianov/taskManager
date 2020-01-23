import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'

import User from '../components/User/User'
import {ajaxData} from '../utils/ajaxData'
import {
	loginFormChange,
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
		this.loginFormChange = this.loginFormChange.bind(this)
		this.storageLoginHandler = this.storageLoginHandler.bind(this)
	}

	storageLoginHandler(event){
		if(event.key == 'login') {
			if(event.newValue == 'false' || event.newValue == null) {
				this.props.logout()
			}
			if(event.newValue == 'true') {
				const {token, isAdmin, username} = Cookies.get()
				if(token != undefined) {
					this.props.loginSuccess(token, isAdmin, username)
				}
			}
		}
	}

	componentDidMount(){
		window.addEventListener('storage', this.storageLoginHandler)
		const {token, isAdmin, username} = Cookies.get()
		if(token != undefined) {
			localStorage.setItem('login', true)
			this.props.loginSuccess(token, isAdmin, username)
		}
	}

	componentWillUnmount() {
		window.removeEventListener('storage', this.storageLoginHandler)
	}

	loginFormChange (e) {
		const value = e.target.value
		const name = e.target.name

		let validationFail = false
		if(name == 'login') {
			const loginRe = this.props.form.validators.login.regEx
			validationFail = !loginRe.test(value)
		}
		if(name == 'password') {
			const passwordRe = this.props.form.validators.password.regEx
			validationFail = !passwordRe.test(value)
		}

		this.props.loginFormChange(name, value, validationFail)
	}

	loginRequest(e) {

		e.preventDefault() 

		this.props.loginRequest()

		const formData = new FormData()
        formData.append("username", this.props.form.values.login)
        formData.append("password", this.props.form.values.password)

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

					localStorage.setItem('login', true);

					that.props.loginSuccess(token, isAdmin, username)
				} else {
					that.props.loginFailure('server', response.data.message.password)
				}
			})
			.catch(function (error) {
				that.props.loginFailure('network', error)
			})
	}

	logout() {
		this.props.logout()
		Cookies.remove('token')
		Cookies.remove('isAdmin')
		Cookies.remove('username')
		localStorage.setItem('login', false);
	}

	render() {
		return <User
			general={this.props.general}
			form={this.props.form}
			flags={this.props.flags}
			messages={this.props.messages}
			loginFormChange={this.loginFormChange}
			loginRequest={this.loginRequest}
			logout={this.logout}/>
	}
}

const mapStateToProps = (state) => {
	return state.user
}

const mapDispatchToProps = (dispatch) => {
	return {
		loginFormChange: (name, value, validationFail) => dispatch(loginFormChange(name, value, validationFail)),
		loginSuccess: (token, isAdmin, username) => dispatch(loginSuccess(token, isAdmin, username)),
		loginFailure: (errorType, errorMessage) => dispatch(loginFailure(errorType, errorMessage)),
		loginRequest: () => dispatch(loginRequest()),
		logout: () => dispatch(logout()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)