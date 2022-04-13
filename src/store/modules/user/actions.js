import types from './types';

export function setCustomer(customer) {
    return {
        type: types.SET_CUSTOMER,
        customer
    };
}

export function registerUser() {
    return {
        type: types.REGISTER_USER,
    };
}

export function loginUser() {
    return {
        type: types.LOGIN_USER,
    };
}

export function logoutUser() {
    return {
        type: types.LOGOUT_USER,
    };
}

export function setLogginSession(session) {
    return {
        type: types.SET_LOGGED_ID,
        session
    };
}

export function resetSession() {
    return {
        type: types.RESET_SESSION
    };
}