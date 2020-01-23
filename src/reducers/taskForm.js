import {
	ADD_TASK_REQUEST,
	ADD_TASK_SUCCESS,
	ADD_TASK_FAILURE,
	TASK_FORM_CHANGE,
	HIDE_OVERLAY,
} from '../actions/TaskFormActions'

const initialState = {
	form: {
		values: {
			username: "",
			email: "",
			text: "",
		},
		placeholders: {
			username: "Ваше имя",
			email: "Ваш Email",
			text: "Задание",
		},
		validators: {
			username: {
				validationFail: false,
				regEx: /^([a-zа-яё]+|\d+)$/i,
				message: "Поле может содержать лишь буквы и не должно быть пустым"
			},
			email: {
				validationFail: false,
				regEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: "Введите корректный Email формата xxx@yyy.zzz"
			},
			text: {
				validationFail: false,
				regEx: /^(.+)$/i,
				message: "Задача не может быть пустой"
			}
		}
	},
	flags: {
		sendingProcess: false,
		sendingSuccess: false,
		sendingError: false,
		networkError: false,
		showOverlay: false
	},
	messages: {
		sendingProcess: "Отправка...",
		sendingSuccess: "Задача добавлена",
		sendingError: null,
		networkError: "Ошибка сети"
	}
}

const taskFormReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_TASK_REQUEST: {
			return {
				...state,
				flags: {
					...state.flags,
					sendingProcess: true,
					showOverlay: true
				}
			}
		}
		case ADD_TASK_SUCCESS: {
			return {
				...state,
				flags: {
					...state.flags,
					sendingProcess: false,
					sendingSuccess: true
				},
				form: {
					...state.form,
					values: {
						username: "",
						email: "",
						text: "",
					}
				}
			}
		}
		case ADD_TASK_FAILURE: {
			let addTaskFailureState = {
				...state,
				flags: {
					...state.flags,
					sendingProcess: false,
				},
				messages: {
					...state.messages
				}
			}
			switch(action.payload.errorType) {
				case "server":
					addTaskFailureState.flags.sendingError = true
					addTaskFailureState.messages.sendingError = action.payload.errorMessage
					break
				case "network":
					addTaskFailureState.flags.networkError = true
			}
			return addTaskFailureState
		}
		case HIDE_OVERLAY: {
			return {
				...state,
				flags: {
					sendingProcess: false,
					sendingSuccess: false,
					sendingError: false,
					networkError: false,
					showOverlay: false
				},
				messages: {
					...state.messages,
					sendingError: null,
				}
			}
		}
		case TASK_FORM_CHANGE:
			let taskFormChangeState = {
				...state,
				form: {
					...state.form,
					values: {
						...state.form.values
					},
					validators: {
						username: {
							...state.form.validators.username
						},
						email: {
							...state.form.validators.email
						},
						text: {
							...state.form.validators.text
						}
					}
				}
			}
			switch(action.payload.name) {
				case "username":
					taskFormChangeState.form.values.username = action.payload.value
					taskFormChangeState.form.validators.username.validationFail = action.payload.validationFail
					break
				case "email":
					taskFormChangeState.form.values.email = action.payload.value
					taskFormChangeState.form.validators.email.validationFail = action.payload.validationFail
					break
				case "text":
					taskFormChangeState.form.values.text = action.payload.value
					taskFormChangeState.form.validators.text.validationFail = action.payload.validationFail
					break
			}
			return taskFormChangeState
		default:
			return state;
	}
}

export default taskFormReducer