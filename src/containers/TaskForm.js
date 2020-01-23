import React from 'react'
import {connect} from 'react-redux'
import axios from "axios"

import TaskListForm from '../components/TaskForm/TaskForm'
import {ajaxData} from "../utils/ajaxData"
import {
	taskFormChange,
	addTaskRequest,
	addTaskSuccess,
	addTaskFailure,
	hideOverlay,
	remoteUpdate
} from '../actions/TaskFormActions'

class TaskFormContainer extends React.Component {

	constructor(props) {
		super(props)
		this.addTaskRequest = this.addTaskRequest.bind(this)
		this.taskFormChange = this.taskFormChange.bind(this)
	}

	addTaskRequest(e) {

		e.preventDefault()
		this.props.addTaskRequest()

		const formData = new FormData()
        formData.append("username", this.props.form.values.username)
        formData.append("email", this.props.form.values.email)
        formData.append("text", this.props.form.values.text)

		const requestBase = ajaxData.baseURL
		const requestTarget = ajaxData.toCreate
		const requestDeveloper = "/?developer="+ajaxData.developerName

		const requestURL = requestBase+requestTarget+requestDeveloper

		const that = this

		axios.post(requestURL, formData)
			.then(function (response) {
				if(response.data.status == 'ok') {
					that.props.addTaskSuccess()
					that.props.remoteUpdate()

					setTimeout(()=> {
						that.props.hideOverlay()	
					}, 2500)

				} else {
					that.props.addTaskFailure('server', response.data.message)
					setTimeout(()=> {
						that.props.hideOverlay()	
					}, 2500)
				}
			})
			.catch(function (error) {
				that.props.addTaskFailure('network', error)
				setTimeout(()=> {
					that.props.hideOverlay()	
				}, 2500)
			})
	}

	taskFormChange(e) {
		const value = e.target.value
		const name = e.target.name

		let validationFail = false
		if(name == 'username') {
			const usernameRe = this.props.form.validators.username.regEx
			validationFail = !usernameRe.test(value)
		}
		if(name == 'email') {
			const emailRe = this.props.form.validators.email.regEx
			validationFail = !emailRe.test(value)
		}
		if(name == 'text') {
			const usernameRe = this.props.form.validators.text.regEx
			validationFail = !usernameRe.test(value)
		}

		this.props.taskFormChange(name, value, validationFail)
	}

	render() {

		return <TaskListForm
			form={this.props.form}
			flags={this.props.flags}
			messages={this.props.messages}
			addTaskRequest={this.addTaskRequest}
			taskFormChange={this.taskFormChange}/>
		
	}
}

const mapStateToProps = (state) => {
	return state.taskForm
}

const mapDispatchToProps = (dispatch) => {
	return {
		hideOverlay: () => dispatch(hideOverlay()),
		remoteUpdate: () => dispatch(remoteUpdate()),
		addTaskRequest: () => dispatch(addTaskRequest()),
		addTaskSuccess: () => dispatch(addTaskSuccess()),
		addTaskFailure: (errorType, errorMessage) => dispatch(addTaskFailure(errorType, errorMessage)),
		taskFormChange: (name, value, validationFail) => dispatch(taskFormChange(name, value, validationFail)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskFormContainer)