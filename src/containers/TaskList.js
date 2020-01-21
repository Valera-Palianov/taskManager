import React from 'react'
import {connect} from 'react-redux'
import axios from "axios"
import Cookies from 'js-cookie'

import TaskList from '../components/TaskList/TaskList'
import {ajaxData} from "../utils/ajaxData"
import {
	updateTaskListRequest,
	updateTaskListSuccess,
	updateTaskListFailure,
	sortDirectionChange,
	sortFieldChange,
	pageNumberChange,
	taskSelectedToEdit,
	editableTaskChange,
	taskUnselectedToEdit,
	editableTaskSaveRequest,
	editableTaskSaveSuccess,
	editableTaskSaveFailure
} from '../actions/TaskListActions'

class TaskListContainer extends React.Component {

	constructor(props) {
		super(props)
		this.listUpdate = this.listUpdate.bind(this)
		this.editableTaskSaveRequest = this.editableTaskSaveRequest.bind(this)
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

		const {activeSortField, activeSortDirection, pageNumber} = this.props.options

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
					const errorMessage = response.data.message

					that.props.updateTaskListFailure(errorMessage)
				}
			})
			.catch(function (error) {
				const errorMessage = error

				that.props.updateTaskListFailure(errorMessage)
			})
	}

	editableTaskSaveRequest() {	

		const formData = new FormData()
        formData.append("text", this.props.editableTask.text)
        formData.append("status", this.props.editableTask.status)
        formData.append("token", Cookies.get('token'))

		this.props.editableTaskSaveRequest()

		const requestBase = ajaxData.baseURL
		const requestTarget = ajaxData.toEdit
		const requestTargetId = "/"+this.props.editableTask.id
		const requestDeveloper = "?developer="+ajaxData.developerName

		const requestURL = requestBase+requestTarget+requestTargetId+requestDeveloper

		const that = this

		axios.post(requestURL, formData)
			.then(function (response) {
				if(response.data.status == 'ok') {
					that.props.editableTaskSaveSuccess()
				} else {
					that.props.editableTaskSaveFailure(response.data.message)
				}
			})
			.catch(function (error) {
				that.props.editableTaskSaveFailure(error)
			})
	}

	render() {
		return <TaskList
				sortFieldChange={this.props.sortFieldChange}
				pageNumberChange={this.props.pageNumberChange}
				addTaskFormChange={this.props.addTaskFormChange}
				taskSelectedToEdit={this.props.taskSelectedToEdit}
				editableTaskChange={this.props.editableTaskChange}
				sortDirectionChange={this.props.sortDirectionChange}
				taskUnselectedToEdit={this.props.taskUnselectedToEdit}
				editableTaskSaveRequest={this.editableTaskSaveRequest}
				list={this.props.list}
				flags={this.props.flags}
				options={this.props.options}
				editableTask={this.props.editableTask}
				editorEnabled={this.props.editorEnabled}/>
		
	}
}

const mapStateToProps = (state) => {
	return {
		list: state.taskList.list,
		flags: state.taskList.flags,
		options: state.taskList.options,
		editorEnabled: state.user.isAdmin,
		editableTask: state.taskList.editableTask,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateTaskListRequest: () => dispatch(updateTaskListRequest()),
		updateTaskListSuccess: (list, totalTaskCount) => dispatch(updateTaskListSuccess(list, totalTaskCount)),
		updateTaskListFailure: (errorMessage) => dispatch(updateTaskListFailure(errorMessage)),
		pageNumberChange: (pageNumber) => dispatch(pageNumberChange(pageNumber)),
		sortFieldChange: (sortField) => dispatch(sortFieldChange(sortField)),
		sortDirectionChange: (sortDirection) => dispatch(sortDirectionChange(sortDirection)),
		taskSelectedToEdit: (id) => dispatch(taskSelectedToEdit(id)),
		editableTaskChange: (name, value) => dispatch(editableTaskChange(name, value)),
		taskUnselectedToEdit: () => dispatch(taskUnselectedToEdit()),
		editableTaskSaveRequest: () => dispatch(editableTaskSaveRequest()),
		editableTaskSaveSuccess: () => dispatch(editableTaskSaveSuccess()),
		editableTaskSaveFailure: (errorMessage) => dispatch(editableTaskSaveFailure(errorMessage))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer)