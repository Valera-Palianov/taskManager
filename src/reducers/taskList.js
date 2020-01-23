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
	EDITABLE_TASK_SAVE_FAILURE
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
		activeSortField: "id",
		activeSortDirection: "asc",
		pageNumber: 1,
		itemsPerPage: 3,
		totalTaskCount: 0,
	},
	flags: {
		listNeedToUpdate: false,
		isListUpdating: false,
		updatingError: false,
		updatingErrorMessage: null
	},
	editableTask: {
		id: null,
		text: null,
		status: null,
		isSaving: false,
		savingError: false,
		savingErrorMessage: null
	}
}

const taskListReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_TASK_LIST_REQUEST:
			return {
				...state,
				flags: {
					...state.flags,
					isListUpdating: true,
					updatingError: false,
					updatingErrorMessage: null,
					listNeedToUpdate: false
				}
			}
		case UPDATE_TASK_LIST_SUCCESS: 
			return {
				...state,
				list: action.payload.list,
				options: {
					...state.options,
					totalTaskCount: action.payload.totalTaskCount,
				},
				flags: {
					...state.flags,
					isListUpdating: false,
					updatingError: false,
					updatingErrorMessage: null,
					listNeedToUpdate: false
				}
			}
		case UPDATE_TASK_LIST_FAILURE: 
			return {
				...state,
				list: null,
				options: {
					...state.options,
					totalTaskCount: 0,
				},
				flags: {
					...state.flags,
					isListUpdating: false,
					updatingError: true,
					updatingErrorMessage: action.payload,
					listNeedToUpdate: false
				}
			}
		case PAGE_NUMBER_CHANGE:
			return {
				...state,
				options: {
					...state.options,
					pageNumber: action.payload,
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
					activeSortField: action.payload
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
					activeSortDirection: action.payload
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
				editableTask: {
					id: editableTask.id,
					text: editableTask.text,
					status: editableTask.status,
					isSaving: false,
					savingError: false,
					savingErrorMessage: null
				}
			}
		case TASK_UNSELECTED_TO_EDIT:
			return {
				...state,
				editableTask: {
					id: null,
					text: null,
					status: null,
					isSaving: false,
					savingError: false,
					savingErrorMessage: null
				}
			}
		case EDITABLE_TASK_CHANGE:
			let newState = {
				...state,
				editableTask: {
					...state.editableTask
				}
			}
			switch(action.payload.name) {
				case "text":
					newState.editableTask.text = action.payload.value
					break
				case "status":
					newState.editableTask.status = action.payload.value
					break
			}
			return newState
		case EDITABLE_TASK_SAVE_REQUEST: 
			return {
				...state,
				editableTask: {
					...state.editableTask,
					isSaving: true
				}
			}
		case EDITABLE_TASK_SAVE_SUCCESS:
			let newStateSuccess = {
				...state,
				list: [...state.list],
				editableTask: {
					id: null,
					text: null,
					status: null,
					isSaving: false,
					savingError: false,
					savingErrorMessage: null
				}
			}
			state.list.forEach(function(item, i) {
				if(item.id == state.editableTask.id) {
					newStateSuccess.list[i] = {
						...state.list[i],
						text: state.editableTask.text,
						status: state.editableTask.status,
					}
				}
			})
			return newStateSuccess
		case EDITABLE_TASK_SAVE_FAILURE: 
			return {
				...state,
				editableTask: {
					...state.editableTask,
					isSaving: false,
					savingError: true,
					savingErrorMessage: action.payload
				}
			}
		default:
			return state;
	}
}

export default taskListReducer