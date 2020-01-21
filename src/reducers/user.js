import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_FORM_CHANGED,
	LOGOUT
} from "../actions/UserActions"

let initialState = {
	isLogin: false,
	isAdmin: false,
	token: null,
	username: null,
	form: {
		login: "",
		password: ""
	},
	flags: {
		loginInProcess: false,
		errorLogin: false,
		errorLoginMessage: ""
	}
}

const userReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				flags: {
					...state.flags,
					loginInProcess: true,
					errorLogin: false
				}
			}
		case LOGIN_SUCCESS: 
			return {
				...state,
				isLogin: true,
				token: action.payload.token,
				isAdmin: action.payload.isAdmin,
				username: action.payload.username,
				flags: {
					...state.flags,
					loginInProcess: false,
					errorLogin: false
				},
				form: {
					login: "",
					password: "",
				},
			}
		case LOGIN_FAILURE: 

			return {
				...state,
				flags: {
					...state.flags,
					loginInProcess: false,
					errorLogin: true,
					errorLoginMessage: action.payload
				},
			}
		case LOGIN_FORM_CHANGED: 
			let newState = {
				...state,
				form: {
					...state.form
				},
				flags: {
					...state.flags,
					errorLogin: false
				}
			}
			switch(action.payload.name) {
				case "login":
					newState.form.login = action.payload.value
					break
				case "password":
					newState.form.password = action.payload.value
					break
			}
			return newState
		case LOGOUT: 
			return {
				...state,
				isLogin: false,
				token: null,
				isAdmin: false,
				username: null,
			}
		default:
			return state;
	}
}

export default userReducer