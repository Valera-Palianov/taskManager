import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_FORM_CHANGE,
	LOGOUT
} from "../actions/UserActions"

let initialState = {
	general: {
		isLogin: false,
		isAdmin: false,
		token: null,
		username: null,
	},
	form: {
		values: {
			login: "",
			password: ""
		},
		placeholders: {
			login: "Логин",
			password: "Пароль"
		},
		validators: {
			login: {
				validationFail: false,
				regEx: /^([a-zа-яё]+|\d+)$/i,
				message: "Поле может содержать лишь буквы и не должно быть пустым"
			},
			password: {
				validationFail: false,
				regEx: /^([a-zа-яё0-9]+|\d+)$/i,
				message: "Поле может содержать лишь буквы и цифры и не должно быть пустым"
			}
		}
	},
	flags: {
		loginProcess: false,
		loginError: false,
		networkError: false,
	},
	messages: {
		loginProcess: "Вход...",
		loginError: null,
		networkError: "Ошибка сети"
	}
}

const userReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				flags: {
					...state.flags,
					loginProcess: true,
				}
			}
		case LOGIN_SUCCESS: 
			return {
				...state,
				general: {
					isLogin: true,
					token: action.payload.token,
					isAdmin: action.payload.isAdmin,
					username: action.payload.username,
				},
				flags: {
					...state.flags,
					loginProcess: false,
					loginError: false,
					networkError: false,
				},
				form: {
					...state.form,
					values: {
						login: "",
						password: "",
					},
				},
			}
		case LOGIN_FAILURE: 
			let loginState = {
				...state,
				flags: {
					...state.flags,
					loginProcess: false,
				}
			}
			switch(action.payload.errorType) {
				case "server":
					loginState.flags.loginError = true
					loginState.messages.loginError = action.payload.errorMessage
					break
				case "network":
					loginState.flags.networkError = true
			}
			return loginState
		case LOGIN_FORM_CHANGE:
			let loginFormChangeState = {
				...state,
				form: {
					...state.form,
					values: {
						...state.form.values
					},
					validators: {
						login: {
							...state.form.validators.login
						},
						password: {
							...state.form.validators.password
						}
					}
				}
			}
			switch(action.payload.name) {
				case "login":
					loginFormChangeState.form.values.login = action.payload.value
					loginFormChangeState.form.validators.login.validationFail = action.payload.validationFail
					break
				case "password":
					loginFormChangeState.form.values.password = action.payload.value
					loginFormChangeState.form.validators.password.validationFail = action.payload.validationFail
					break
			}
			return loginFormChangeState
		case LOGOUT: 
			return {
				...state,
				general: {
					...state.general,
					isLogin: false,
					isAdmin: false,
					token: null,
					username: null,
				}
			}
		default:
			return state;
	}
}

export default userReducer