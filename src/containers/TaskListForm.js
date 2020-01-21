import React from 'react'
import {connect} from 'react-redux'
import axios from "axios"

import TaskListForm from '../components/TaskListForm/TaskListForm'
import {ajaxData} from "../utils/ajaxData"
import {
	addTaskFormChange,
	addTaskRequest,
	addTaskSuccess,
	addTaskFailure,
	remoteUpdate
} from '../actions/TaskListFormActions'

class TaskListFormContainer extends React.Component {

	constructor(props) {
		super(props)
		this.addTaskRequest = this.addTaskRequest.bind(this)
		this.addTaskFormChange = this.addTaskFormChange.bind(this)
	}
	addTaskRequest(e) {

		e.preventDefault()

		const formData = new FormData()
        formData.append("username", this.props.form.username)
        formData.append("email", this.props.form.email)
        formData.append("text", this.props.form.text)

		this.props.addTaskRequest()

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
				} else {
					that.props.addTaskFailure(response.data.message)
				}
			})
			.catch(function (error) {
				that.props.addTaskFailure(error)
			})
	}

	addTaskFormChange(e) {
		const value = e.target.value
		const name = e.target.name
		this.props.addTaskFormChange(name, value)
	}

	render() {

		return <TaskListForm
			form={this.props.form}
			flags={this.props.flags}
			addTaskRequest={this.addTaskRequest}
			addTaskFormChange={this.addTaskFormChange}/>
		
	}
}

const mapStateToProps = (state) => {
	return {
		form: state.taskListForm.form,
		flags: state.taskListForm.flags
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTaskFormChange: (name, value) => dispatch(addTaskFormChange(name, value)),
		remoteUpdate: () => dispatch(remoteUpdate()),
		addTaskRequest: () => dispatch(addTaskRequest()),
		addTaskSuccess: () => dispatch(addTaskSuccess()),
		addTaskFailure: (errorMessage) => dispatch(addTaskFailure(errorMessage)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListFormContainer)