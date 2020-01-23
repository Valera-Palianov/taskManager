import React from 'react'
import {connect} from 'react-redux'
import axios from "axios"
import Cookies from 'js-cookie'

import TaskList from '../components/TaskList/TaskList'
import {ajaxData} from "../utils/ajaxData"
import {
	editableTaskSaveFailure,
	editableTaskSaveRequest,
	editableTaskSaveSuccess,
	updateTaskListRequest,
	updateTaskListSuccess,
	updateTaskListFailure,
	taskUnselectedToEdit,
	sortDirectionChange,
	editableTaskChange,
	taskSelectedToEdit,
	hideEditorOverlay,
	pageNumberChange,
	sortFieldChange,
} from '../actions/TaskListActions'

class TaskListContainer extends React.Component {

	constructor(props) {
		super(props)
		this.listUpdate = this.listUpdate.bind(this)
		this.editableTaskSaveRequest = this.editableTaskSaveRequest.bind(this)
		this.editableTaskChange = this.editableTaskChange.bind(this)
	}

	componentDidMount(){
		this.listUpdate()
	}

	componentDidUpdate() {
		if(this.props.flags.listNeedToUpdate){
			this.listUpdate()
		}	
	}

	listUpdate() {
		this.props.updateTaskListRequest()

		const {activeSortField, activeSortDirection, pageNumber} = this.props.options.current

		const requestBase = ajaxData.baseURL
		const requestDeveloper = "/?developer="+ajaxData.developerName
		const requestSortField = "&sort_field="+activeSortField
		const requestSortDirection = "&sort_direction="+activeSortDirection
		const requestPageNumber = "&page="+pageNumber

		const requestURL = requestBase+requestDeveloper+requestSortField+requestSortDirection+requestPageNumber

		const that = this
		axios.get(requestURL)
			.then(function (response) {

				if(response.data.status == 'ok') {

					const list = response.data.message.tasks
					const totalTaskCount = parseInt(response.data.message.total_task_count)

					that.props.updateTaskListSuccess(list, totalTaskCount)
				} else {
					console.log('server')
					const errorMessage = response.data.message
					that.props.updateTaskListFailure('server', errorMessage)
				}
			})
			.catch(function (error) {
				console.log('network')
				const errorMessage = error
				that.props.updateTaskListFailure('network', errorMessage)
			})
	}

	editableTaskSaveRequest() {	

		this.props.editableTaskSaveRequest()

		const formData = new FormData()
        formData.append("text", this.props.editor.task.text)
        formData.append("status", this.props.editor.task.status)
        formData.append("token", Cookies.get('token'))

		const requestBase = ajaxData.baseURL
		const requestTarget = ajaxData.toEdit
		const requestTargetId = "/"+this.props.editor.task.id
		const requestDeveloper = "?developer="+ajaxData.developerName

		const requestURL = requestBase+requestTarget+requestTargetId+requestDeveloper

		const that = this

		axios.post(requestURL, formData)
			.then(function (response) {
				if(response.data.status == 'ok') {
					that.props.editableTaskSaveSuccess()
				} else {
					that.props.editableTaskSaveFailure('server', response.data.message)
					setTimeout(()=> {
						that.props.hideEditorOverlay()	
					}, 2500)
				}
			})
			.catch(function (error) {
				that.props.editableTaskSaveFailure('network', error)
				setTimeout(()=> {
					that.props.hideEditorOverlay()	
				}, 2500)
			})
	}

	editableTaskChange(name, value) {

		let validationFail = false
		if(name == 'text') {
			const textRe = this.props.editor.validator.regEx
			validationFail = !textRe.test(value)
		}

		this.props.editableTaskChange(name, value, validationFail)
	}

	render() {
		return <TaskList
				editableTaskChange={this.editableTaskChange}
				sortFieldChange={this.props.sortFieldChange}
				pageNumberChange={this.props.pageNumberChange}
				addTaskFormChange={this.props.addTaskFormChange}
				taskSelectedToEdit={this.props.taskSelectedToEdit}
				sortDirectionChange={this.props.sortDirectionChange}
				taskUnselectedToEdit={this.props.taskUnselectedToEdit}
				editableTaskSaveRequest={this.editableTaskSaveRequest}
				list={this.props.list}
				flags={this.props.flags}
				editor={this.props.editor}
				options={this.props.options}
				messages={this.props.messages}
				editorEnabled={this.props.editorEnabled}/>
		
	}
}

const mapStateToProps = (state) => {
	return {
		...state.taskList,
		editorEnabled: state.user.general.isAdmin,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editableTaskSaveFailure: (errorType, errorMessage) => dispatch(editableTaskSaveFailure(errorType, errorMessage)),
		editableTaskChange: (name, value, validationFail) => dispatch(editableTaskChange(name, value, validationFail)),
		updateTaskListFailure: (errorType, errorMessage) => dispatch(updateTaskListFailure(errorType, errorMessage)),
		updateTaskListSuccess: (list, totalTaskCount) => dispatch(updateTaskListSuccess(list, totalTaskCount)),
		sortDirectionChange: (sortDirection) => dispatch(sortDirectionChange(sortDirection)),
		pageNumberChange: (pageNumber) => dispatch(pageNumberChange(pageNumber)),
		sortFieldChange: (sortField) => dispatch(sortFieldChange(sortField)),
		editableTaskSaveRequest: () => dispatch(editableTaskSaveRequest()),
		editableTaskSaveSuccess: () => dispatch(editableTaskSaveSuccess()),
		updateTaskListRequest: () => dispatch(updateTaskListRequest()),
		taskSelectedToEdit: (id) => dispatch(taskSelectedToEdit(id)),
		taskUnselectedToEdit: () => dispatch(taskUnselectedToEdit()),
		hideEditorOverlay: () => dispatch(hideEditorOverlay()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer)