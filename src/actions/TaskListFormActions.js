export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST'
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS'
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE'

export const ADD_TASK_FORM_CHANGE = 'ADD_TASK_FORM_CHANGE'

export const REMOTE_UPDATE = 'REMOTE_UPDATE'

export const addTaskRequest = () => {
	return {
		type: ADD_TASK_REQUEST
	}
}

export const addTaskSuccess = () => {
	return {
		type: ADD_TASK_SUCCESS
	}
}

export const addTaskFailure = (errorMessage) => {
	return {
		type: ADD_TASK_FAILURE,
		payload: errorMessage
	}
}

export const addTaskFormChange = (name, value) => {
	return {
		type: ADD_TASK_FORM_CHANGE,
		payload: {
			name: name,
			value: value
		}
	}
}

export const remoteUpdate = () => {
	return {
		type: REMOTE_UPDATE
	}
}