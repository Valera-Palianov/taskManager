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

import HTMLDecoderEncoder from "html-encoder-decoder"

class TaskListContainer extends React.Component {

	constructor(props) {
		super(props)
		this.listUpdate = this.listUpdate.bind(this)
		this.editableTaskSaveRequest = this.editableTaskSaveRequest.bind(this)
		this.editableTaskChange = this.editableTaskChange.bind(this)
	}

	//Обновление листа сразу после подключения компонента
	componentDidMount(){
		this.listUpdate()
	}

	//После каждой перерисовки компонента список задач обновляется, если есть в этом необходимость.
	//Необходимость появляется при переключении сортировки или страницы
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
					const errorMessage = response.data.message
					that.props.updateTaskListFailure('server', errorMessage)
				}
			})
			.catch(function (error) {
				const errorMessage = error
				that.props.updateTaskListFailure('network', errorMessage)
			})
	}

	editableTaskSaveRequest() {	

		this.props.editableTaskSaveRequest()

		//Текст задачи декодируется перед отправкой на сервер, чтобы не произошло двойной кодировки, так как сервер ее тоже проводит
		//Токен запрашивается из куки, а не из хранилища,
		//дабы не произошло ситуации, когда из одной вкладки пользователь вышел, а во второй продолжает редактирование
		const formData = new FormData()
        formData.append("text", HTMLDecoderEncoder.decode(this.props.editor.task.text))
        formData.append("status", this.props.editor.task.status)
        formData.append("token", Cookies.get('token'))

        //Здесь текст задачи сверяется с текстом, отправленным из редактора, чтобы понять, был ли он изменен.
        let taskTextHasBeenChanged = false
        let taskArrayPosition
        let taskToFind = this.props.editor.task.id
        this.props.list.forEach(function(item, i) {
			if(taskToFind == item.id) {
				taskArrayPosition = i
			}
		})
        if(this.props.editor.task.text != this.props.list[taskArrayPosition].text) {
        	taskTextHasBeenChanged = true
        }

		const requestBase = ajaxData.baseURL
		const requestTarget = ajaxData.toEdit
		const requestTargetId = "/"+this.props.editor.task.id
		const requestDeveloper = "?developer="+ajaxData.developerName

		const requestURL = requestBase+requestTarget+requestTargetId+requestDeveloper

		const that = this
		
		axios.post(requestURL, formData)
			.then(function (response) {
				if(response.data.status == 'ok') {
					//Если текст был изменен, создается специальная куки, нужная для отметки об редактировании администратором
					if(taskTextHasBeenChanged) {
						Cookies.set('tthbc'+that.props.editor.task.id, true, { expires: 1 })
					}
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
		let currentValue = value
		let validationFail = false
		if(name == 'text') {
			const textRe = this.props.editor.validator.regEx
			validationFail = !textRe.test(currentValue)
			//Перед помещением в общий state, спецсимволы, на всякий случай, кодируются
			currentValue = HTMLDecoderEncoder.encode(currentValue)
		}

		this.props.editableTaskChange(name, currentValue, validationFail)
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

//Контейнер забирает свой собственный state, однако запрашивает так же и статус текущего пользователя.
//При авторизации или выходе, список задач будет перерисовываться из-за смены состояния, это позволит включать и отключать редактор задач
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