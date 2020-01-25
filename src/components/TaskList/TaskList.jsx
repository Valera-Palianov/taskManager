import React from 'react'
import Cookies from 'js-cookie'

import Task from '../Task/Task'
import TaskEditor from '../TaskEditor/TaskEditor'
import Pagination from "../Pagination/Pagination"
import TaskListStatus from "../TaskListStatus/TaskListStatus"
import TaskListSortSwitcher from "../TaskListSortSwitcher/TaskListSortSwitcher"

const TaskList = (props) => {

	const {totalTaskCount, activeSortField, activeSortDirection, pageNumber, itemsPerPage} = props.options.current
	const {updatingError, updatingProcess, networkError} = props.flags
	const {sortFields} = props.options
	const {list} = props

	const {
		updatingProcess: updatingProcessMessage,
		networkError: networkErrorMessage,
		updatingError: updatingErrorMessage,
		emptyList: emptyListMessage,
	} = props.messages


	let content
	if(updatingError || updatingProcess || networkError || totalTaskCount == 0) {

		let status
		let message

		if(totalTaskCount == 0) {
			status = "empty"
			message = emptyListMessage
		}
		if(networkError) {
			status = "wtf"
			message = networkErrorMessage
		}
		if(updatingError) {
			status = "error"
			message = updatingErrorMessage
			console.log(message)
			message = "Неверные данные. Подробности в консоли"
		}
		if(updatingProcess) {
			status = "process"
			message = updatingProcessMessage
		}

		content = <TaskListStatus status={status} message={message}/>

	} else {

		const listJSX = list.map(t => {

			//Id каждой задачи ищется в cookies, чтобы обнаружить отметку об редактировании администратором.
			let hasBeenChanged = false
			if(Cookies.get('tthbc'+t.id) != undefined) {
				hasBeenChanged = true
			}

			const task = {
				username: t.username,
				email: t.email,
				id: t.id,
				hasBeenChanged: hasBeenChanged
			}
			if(t.id == props.editor.task.id && props.editorEnabled) {
				return (
					<TaskEditor
						key={t.id}
						task={task}
						editor={props.editor}
						editableTaskChange={props.editableTaskChange}
						taskUnselectedToEdit={props.taskUnselectedToEdit}
						editableTaskSaveRequest={props.editableTaskSaveRequest}/>
				)
			}
			return (
				<Task 
					key={t.id}
					task={task}
					status={t.status}
					text={t.text}
					editorEnabled={props.editorEnabled}
					taskSelectedToEdit={props.taskSelectedToEdit}
					savingProcess={props.editor.flags.savingProcess}/>
			)
		})

		content = (
			<div className="task-list">
				{listJSX}
				<Pagination
					pageNumber={pageNumber}
					totalTaskCount={totalTaskCount}
					itemsPerPage={itemsPerPage}
					onChange={props.pageNumberChange}
				 />
			</div>
		)
	}

	return (
		<div>
			<TaskListSortSwitcher
				activeSortField={activeSortField}
				activeSortDirection={activeSortDirection}
				sortFields={sortFields}
				sortDirectionChange={props.sortDirectionChange}
				sortFieldChange={props.sortFieldChange}/>
			{content}
		</div>
	)
}

export default TaskList