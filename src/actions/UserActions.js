export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const LOGOUT = "LOGOUT"

export const LOGIN_FORM_CHANGE = "LOGIN_FORM_CHANGE"

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

export const loginFailure = (errorType, errorMessage) => {
	return {
		type: LOGIN_FAILURE,
		payload: {
			errorType: errorType,
			errorMessage: errorMessage
		}
	}
}

export const loginFormChange = (name, value, validationFail) => {
	return {
		type: LOGIN_FORM_CHANGE,
		payload: {
			value: value,
			name: name,
			validationFail: validationFail
		}
	}
}

export const logout = () => {
	return {
		type: LOGOUT
	}
}