export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const LOGOUT = "LOGOUT"

export const LOGIN_FORM_CHANGED = "LOGIN_FORM_CHANGED"

export const loginRequest = () => {
	return {
		type: LOGIN_REQUEST
	}
}

export const loginSuccess = (token, isAdmin, username) => {
	return {
		type: LOGIN_SUCCESS,
		payload: {
			token: token,
			isAdmin: isAdmin,
			username: username
		}
	}
}

export const loginFailure = (errorMessage) => {
	return {
		type: LOGIN_FAILURE,
		payload: errorMessage
	}
}

export const loginFormChanged = (name, value) => {
	return {
		type: LOGIN_FORM_CHANGED,
		payload: {
			value: value,
			name: name
		}
	}
}

export const logout = () => {
	return {
		type: LOGOUT
	}
}