import { takeLatest, all, call, select, put } from 'redux-saga/effects';
import types from './types';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import { setLogginSession, resetSession } from './actions';

export function* registerUser() {
    const { customer } = yield select(state => state.user);
    const response = yield call(api.post, `/register`, customer);
    const res = response.data;
    if(res.error) {
        const msgs = (res.message).join(" ");
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: msgs                
        });
        return false;
    }
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfull registration!'
    });
}

export function* loginUser() {
    const { customer } = yield select(state => state.user);
    const response = yield call(api.post, '/user/login', customer);
    //console.log("Inside SAGA loginUser, response: " + JSON.stringify(response));
    const res = response.data;
    //console.log("Inside SAGA loginUser, res: " + JSON.stringify(res));
    const session = {
        userID: res.userID,
        userName: res.userName,
        userEmail: res.userEmail,
        userIsAdmin: res.userIsAdmin,
        isAuthenticated: res.isAuthenticated
    };
    //console.log("Inside SAGA loginUser, session: " + JSON.stringify(session));
    yield put(setLogginSession(session));
    
    if(res.error) {
        //const msgs = (res.message).join(" ");
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: res.message                 
        });
        return false;
    }
    Swal.fire({
        icon: 'success',
        title: 'Welcome, ' + res.userName + '!',
        text: res.message 
    });
    
    
}

export function* logoutUser() {
    const response = yield call(api.get, '/user/logout');
    const res = response.data;
    console.log("Inside SAGA logoutUser, res: " + JSON.stringify(res));
    if(res.error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: res.message                 
        });
        return false;
    }
    yield put(resetSession());
    Swal.fire({
        icon: 'success',
        title: 'User logged-out!',
    });
}

export default all([
    takeLatest(types.REGISTER_USER, registerUser),
    takeLatest(types.LOGIN_USER, loginUser),
    takeLatest(types.LOGOUT_USER, logoutUser)
]);