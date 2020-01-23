import { combineReducers } from 'redux'
import taskListReducer from './taskList'
import taskFormReducer from './taskForm'
import userReducer from './user'


export const rootReducer = combineReducers({
	taskList: taskListReducer,
	taskForm: taskFormReducer,
	user: userReducer
})