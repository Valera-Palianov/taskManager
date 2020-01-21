import React from 'react'

import Task from '../Task/Task'
import TaskEditor from '../TaskEditor/TaskEditor'
import Pagination from "../Pagination/Pagination"
import TaskListStatus from "../TaskListStatus/TaskListStatus"
import TaskListSortSwitcher from "../TaskListSortSwitcher/TaskListSortSwitcher"

const TaskList = (props) => {

	let content

	const list = props.list
	const {updatingError, isListUpdating, updatingErrorMessage} = props.flags
	const {totalTaskCount, activeSortField, activeSortDirection, sortFields, pageNumber, itemsPerPage} = props.options

	if(updatingError || isListUpdating || totalTaskCount == 0) {
		content = <TaskListStatus flags={props.flags} totalTaskCount={totalTaskCount}/>
	} else {
		const listJSX = props.list.map(t => {
			if(t.id == props.editableTask.id && props.editorEnabled) {
				return (<TaskEditor 
							username={t.username}
							email={t.email}
							editableTask={props.editableTask}
							id={t.id}
							key={t.id}
							editableTaskChange={props.editableTaskChange}
							taskUnselectedToEdit={props.taskUnselectedToEdit}
							editableTaskSaveRequest={props.editableTaskSaveRequest}/>)
			}
			return (<Task 
						username={t.username}
						email={t.email}
						status={t.status}
						text={t.text}
						id={t.id}
						key={t.id}
						taskSelectedToEdit={props.taskSelectedToEdit}
						editorEnabled={props.editorEnabled}
						editableTaskIsSaving={props.editableTask.isSaving}/>)
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
			</div>)
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