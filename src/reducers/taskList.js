import {
	PAGE_NUMBER_CHANGE,
	SORT_FIELD_CHANGE,
	SORT_DIRECTION_CHANGE,
	UPDATE_TASK_LIST_REQUEST,
	UPDATE_TASK_LIST_SUCCESS,
	UPDATE_TASK_LIST_FAILURE,
	TASK_SELECTED_TO_EDIT,
	TASK_UNSELECTED_TO_EDIT,
	EDITABLE_TASK_CHANGE,
	EDITABLE_TASK_SAVE_REQUEST,
	EDITABLE_TASK_SAVE_SUCCESS,
	EDITABLE_TASK_SAVE_FAILURE,
	HIDE_EDITOR_OVERLAY,
} from '../actions/TaskListActions'

import {
	REMOTE_UPDATE
} from '../actions/TaskFormActions'

const initialState = {
	list: null,
	options: {
		sortFields: [
			{
				field: "id",
				name: "По умолчанию",
			},
			{
				field: "username",
				name: "По имени",
			},
			{
				field: "email",
				name: "По Email",
			},
			{
				field: "status",
				name: "По статусу",
			},
		],
		sortDirections: [
			{
				direction: "asc",
				name: "Нисходящая"
			},
			{
				direction: "desc",
				name: "Восходящая"
			},
		],
		current: {
			activeSortField: "id",
			activeSortDirection: "asc",
			pageNumber: 1,
			itemsPerPage: 3,
			totalTaskCount: 0,
		}
	},
	flags: {
		updatingProcess: true,
		updatingError: false,
		networkError: false,
		listNeedToUpdate: false,
	},
	messages: {
		updatingProcess: "Загрузка...",
		updatingError: null,
		networkError: "Ошибка сети",
		emptyList: "Список задач пуст"
	},
	editor: {
		task: {
			id: null,
			text: null,
			status: null,
		},
		flags: {
			savingProcess: false,
			savingError: false,
			networkError: false,
			showOverlay: false
		},
		messages: {
			savingProcess: "Сохранение...",
			savingError: null,
			networkError: "Ошибка сети"
		},
		validator: {
			validationFail: false,	
			regEx: /^(.+)$/i,
			validationMessage: "Задача не может быть пустой"
		}
		
	}
}

const taskListReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_TASK_LIST_REQUEST:
			return {
				...state,
				flags: {
					...state.flags,
					updatingProcess: true,
					updatingError: false,
					networkError: false,
					listNeedToUpdate: false
				},
				messages: {
					...state.messages,
					updatingError: null
				}
			}
		case UPDATE_TASK_LIST_SUCCESS: 
			return {
				...state,
				list: action.payload.list,
				options: {
					...state.options,
					current: {
						...state.options.current,
						totalTaskCount: action.payload.totalTaskCount,
					}
				},
				flags: {
					...state.flags,
					updatingProcess: false,
					updatingError: false,
					networkError: false,
					listNeedToUpdate: false
				},
				messages: {
					...state.messages,
					updatingError: null
				}
			}
		case UPDATE_TASK_LIST_FAILURE: 
			let updateTaskListFailureState = {
				...state,
				list: null,
				options: {
					...state.options,
					current: {
						...state.options.current,
						totalTaskCount: 0,
					}
				},
				flags: {
					...state.flags,
					updatingProcess: false
				},
				messages: {
					...state.messages,
				}
			}
			switch(action.payload.errorType) {
				case "server":
					updateTaskListFailureState.flags.updatingError = true
					updateTaskListFailureState.messages.updatingError = action.payload.errorMessage
					break
				case "network":
					updateTaskListFailureState.flags.networkError = true
			}
			return updateTaskListFailureState
		case PAGE_NUMBER_CHANGE:
			return {
				...state,
				options: {
					...state.options,
					current: {
						...state.options.current,
						pageNumber: action.payload,
					}
				},
				flags: {
					...state.flags,
					listNeedToUpdate: true
				}
			}
		case SORT_FIELD_CHANGE:
			return {
				...state,
				options: {
					...state.options,
					current: {
						...state.options.current,
						activeSortField: action.payload
					},
				},
				flags: {
					...state.flags,
					listNeedToUpdate: true
				}
			}
		case SORT_DIRECTION_CHANGE:
			return {
				...state,
				options: {
					...state.options,
					current: {
						...state.options.current,
						activeSortDirection: action.payload
					}
				},
				flags: {
					...state.flags,
					listNeedToUpdate: true
				}
			}
		case REMOTE_UPDATE:
			return {
				...state,
				flags: {
					...state.flags,
					listNeedToUpdate: true
				}
			}
		case TASK_SELECTED_TO_EDIT:
			let editableTask
			state.list.forEach(function(item, i) {
				if(item.id == action.payload) {
					editableTask = item
				}
			})
			return {
				...state,
				editor: {
					...state.editor,
					task: {
						id: editableTask.id,
						text: editableTask.text,
						status: editableTask.status,
					},
					flags: {
						savingProcess: false,
						savingError: false,
						networkError: false,
						showOverlay: false
					},
					messages: {
						...state.editor.messages,
						savingError: null,
					},
					validator: {
						...state.editor.validator,
						validationFail: false
					}
				}
			}
		case TASK_UNSELECTED_TO_EDIT:
			return {
				...state,
				editor: {
					...state.editor,
					task: {
						id: null,
						text: null,
						status: null,
					},
					flags: {
						savingProcess: false,
						savingError: false,
						networkError: false,
						showOverlay: false
					},
					messages: {
						...state.editor.messages,
						savingError: null,
					},
					validator: {
						...state.editor.validator,
						validationFail: false,	
					}
				}
			}
		case EDITABLE_TASK_CHANGE:
			let editableTaskChangeState = {
				...state,
				editor: {
					...state.editor,
					task: {
						...state.editor.task
					}
				}
			}
			switch(action.payload.name) {
				case "text":
					editableTaskChangeState.editor.task.text = action.payload.value
					editableTaskChangeState.editor.validator.validationFail = action.payload.validationFail
					break
				case "status":
					editableTaskChangeState.editor.task.status = action.payload.value
					break
			}
			return editableTaskChangeState
		case EDITABLE_TASK_SAVE_REQUEST: 
			return {
				...state,
				editor: {
					...state.editor,
					flags: {
						savingProcess: true,
						savingError: false,
						networkError: false,
						showOverlay: true
					},
					messages: {
						...state.editor.messages,
						savingError: null,
					},
				}
			}
		case EDITABLE_TASK_SAVE_SUCCESS:
			let editableTaskSaveSuccessState = {
				...state,
				list: [...state.list],
				editor: {
					task: {
						id: null,
						text: null,
						status: null,
					},
					flags: {
						savingProcess: false,
						savingError: false,
						networkError: false,
						showOverlay: false
					},
					messages: {
						...state.editor.messages,
						savingError: null,
					},
					validator: {
						...state.editor.validator,
						validationFail: false,	
					}
				}
			}
			state.list.forEach(function(item, i) {
				if(item.id == state.editor.task.id) {
					editableTaskSaveSuccessState.list[i] = {
						...state.list[i],
						text: state.editor.task.text,
						status: state.editor.task.status,
					}
				}
			})
			return editableTaskSaveSuccessState
		case EDITABLE_TASK_SAVE_FAILURE:
			let editableTaskSaveSuccesState = {
				...state,
				editor: {
					...state.editor,
					flags: {
						...state.editor.flags,
						savingProcess: false,
						showOverlay: true
					},
					messages: {
						...state.editor.messages,
					},
				}
			}
			switch(action.payload.errorType) {
				case "server":
					editableTaskSaveSuccesState.editor.flags.savingError = true
					editableTaskSaveSuccesState.editor.messages.savingError = action.payload.errorMessage
					break
				case "network":
					editableTaskSaveSuccesState.editor.flags.networkError = true
			}
			return editableTaskSaveSuccesState
		case HIDE_EDITOR_OVERLAY:
			return {
				...state,
				editor: {
					...state.editor,
					flags: {
						savingProcess: false,
						savingError: false,
						networkError: false,
						showOverlay: false
					},
					messages: {
						...state.editor.messages,
						savingError: null,
					}
				}
			}
		default:
			return state;
	}
}

export default taskListReducer