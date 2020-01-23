export const PAGE_NUMBER_CHANGE = 'PAGE_NUMBER_CHANGE'
export const SORT_FIELD_CHANGE = 'SORT_FIELD_CHANGE'
export const SORT_DIRECTION_CHANGE = 'SORT_DIRECTION_CHANGE'

export const UPDATE_TASK_LIST_REQUEST = 'UPDATE_TASK_LIST_REQUEST'
export const UPDATE_TASK_LIST_SUCCESS = 'UPDATE_TASK_LIST_SUCCESS'
export const UPDATE_TASK_LIST_FAILURE = 'UPDATE_TASK_LIST_FAILURE'

export const TASK_SELECTED_TO_EDIT = 'TASK_SELECTED_TO_EDIT'
export const TASK_UNSELECTED_TO_EDIT = 'TASK_UNSELECTED_TO_EDIT'
export const EDITABLE_TASK_SAVE_REQUEST = 'EDITABLE_TASK_SAVE_REQUEST'
export const EDITABLE_TASK_SAVE_SUCCESS = 'EDITABLE_TASK_SAVE_SUCCESS'
export const EDITABLE_TASK_SAVE_FAILURE = 'EDITABLE_TASK_SAVE_FAILURE'
export const EDITABLE_TASK_CHANGE = 'EDITABLE_TASK_CHANGE'

export const HIDE_EDITOR_OVERLAY = "HIDE_EDITOR_OVERLAY"

export const updateTaskListRequest = () => {
	return {
		type: UPDATE_TASK_LIST_REQUEST
	}
}

export const updateTaskListSuccess = (list, totalTaskCount) => {
	return {
		type: UPDATE_TASK_LIST_SUCCESS,
		payload: {
			list: list,
			totalTaskCount: totalTaskCount
		}
	}
}

export const updateTaskListFailure = (errorType, errorMessage) => {
	return {
		type: UPDATE_TASK_LIST_FAILURE,
		payload: {
			errorType: errorType,
			errorMessage: errorMessage
		}
	}
}

export const pageNumberChange = (pageNumber) => {
	return {
		type: PAGE_NUMBER_CHANGE,
		payload: pageNumber
	}
}

export const sortFieldChange = (sortField) => {
	return {
		type: SORT_FIELD_CHANGE,
		payload: sortField
	}
}

export const sortDirectionChange = (sortDirection) => {
	return {
		type: SORT_DIRECTION_CHANGE,
		payload: sortDirection
	}
}

export const taskSelectedToEdit = (id) => {
	return {
		type: TASK_SELECTED_TO_EDIT,
		payload: id
	}
}

export const taskUnselectedToEdit = () => {
	return {
		type: TASK_UNSELECTED_TO_EDIT
	}
}

export const editableTaskSaveRequest = () => {
	return {
		type: EDITABLE_TASK_SAVE_REQUEST
	}
}

export const editableTaskSaveSuccess = () => {
	return {
		type: EDITABLE_TASK_SAVE_SUCCESS
	}
}

export const editableTaskSaveFailure = (errorType, errorMessage) => {
	return {
		type: EDITABLE_TASK_SAVE_FAILURE,
		payload: {
			errorMessage: errorMessage,
			errorType: errorType
		}
	}
}

export const editableTaskChange = (name, value, validationFail) => {
	return {
		type: EDITABLE_TASK_CHANGE,
		payload: {
			name: name,
			value: value,
			validationFail: validationFail
		}
	}
}

export const hideEditorOverlay = () => {
	return {
		type: HIDE_EDITOR_OVERLAY
	}
}