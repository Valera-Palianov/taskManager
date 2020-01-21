import { combineReducers } from 'redux'
import taskListReducer from './taskList'
import taskListFormReducer from './taskListForm'
import userReducer from './user'


export const rootReducer = combineReducers({
	taskList: taskListReducer,
	taskListForm: taskListFormReducer,
	user: userReducer
})