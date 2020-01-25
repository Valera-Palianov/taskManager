export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST'
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS'
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE'

export const HIDE_OVERLAY = 'HIDE_OVERLAY'

export const TASK_FORM_CHANGE = 'TASK_FORM_CHANGE'

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

export const addTaskFailure = (errorType, errorMessage) => {
	return {
		type: ADD_TASK_FAILURE,
		payload: {
			errorType: errorType,
			errorMessage: errorMessage
		}
	}
}

export const taskFormChange = (name, value, validationFail) => {
	return {
		type: TASK_FORM_CHANGE,
		payload: {
			name: name,
			value: value,
			validationFail: validationFail
		}
	}
}

export const hideOverlay = () => {
	return {
		type: HIDE_OVERLAY
	}
}

//Remote Update обращается не к редьюсеру Формы, как все остальные, а к редьюсеру Списка.
export const remoteUpdate = () => {
	return {
		type: REMOTE_UPDATE
	}
}