import {
	ADD_TASK_FORM_CHANGE,
	ADD_TASK_FAILURE,
	ADD_TASK_SUCCESS,
	ADD_TASK_REQUEST
} from '../actions/TaskListFormActions'

const initialState = {
	form: {
		username: "",
		email: "",
		text: "",
	},
	flags: {
		isMessageSending: false,
		sendingError: false,
		sendingErrorMessage: null,
		newMessageSended: false
	}
}

const taskListFormReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_TASK_REQUEST: {
			return {
				...state,
				flags: {
					...state.flags,
					isMessageSending: true,
					sendingError: false
				}
			}
		}
		case ADD_TASK_SUCCESS: {
			return {
				...state,
				flags: {
					...state.flags,
					isMessageSending: false,
					sendingError: false
				},
				form: {
					username: "",
					email: "",
					text: "",
				}
			}
		}
		case ADD_TASK_FAILURE: {
			return {
				...state,
				flags: {
					...state.flags,
					isMessageSending: false,
					sendingError: true,
					sendingErrorMessage: action.payload
				}
			}
		}
		case ADD_TASK_FORM_CHANGE:
			let newState = {
				...state,
				form: {
					...state.form
				},
				flags: {
					sendingError: false
				}
			}
			switch(action.payload.name) {
				case "username":
					newState.form.username = action.payload.value
					break
				case "email":
					newState.form.email = action.payload.value
					break
				case "text":
					newState.form.text = action.payload.value
					break
			}
			return newState
		default:
			return state;
	}
}

export default taskListFormReducer