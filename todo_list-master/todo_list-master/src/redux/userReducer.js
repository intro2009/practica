import { usersAPI } from '../api/api';
import Cookies from 'js-cookie';

const SET_USER = 'SET_USER';
const SET_SIGNUP = 'SET_SIGNUP';
const USER_ERROR = 'USER_ERROR';

let initialState = {
    id: null,
    login: null,
    token: null,
    isLogin: false,
    isSignUp: false,
    error: ""
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                id: Number(action.id),
                login: action.login,
                token: action.token,
                isLogin: action.isLogin
            }
        }
        case SET_SIGNUP: {
            return {
                ...state,
                isSignUp: action.isSignUp
            }
        }
        case USER_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        default: return state;
    }
}

export const setUser = (id, login, token, isLogin) => ({
    type: SET_USER,
    id, login, token, isLogin
})

export const setSignUp = (isSignUp) => ({
    type: SET_SIGNUP,
    isSignUp
})

export const setErrorInUser = (error) => ({
    type: USER_ERROR,
    error
})


export const signUp = (login, password, password2) => async dispatch => {
    let response = await usersAPI.signUp(login, password, password2);
    if (response.data.result === 'ok') {
        dispatch(setSignUp(true));
    } else if (response.data.data === 'error2') {
        dispatch(setErrorInUser("Введены неверные данные"));
    }
}

export const login = (login, password) => async dispatch => {
    let response = await usersAPI.signIn(login, password);
    if (response.data.result === 'ok') {
        dispatch(getUserByToken(response.data.data));
        Cookies.set('token', response.data.data, { expires: 2 });
    } else if (response.data.data === 'error3') {
        dispatch(setErrorInUser("Введен неверный логин или пароль"));
    }
}

export const getUserByToken = token => async dispatch => {
    let response = await usersAPI.getUserByToken(token);
    const data = response.data.data;
    if (response.data.result === 'ok') {
        dispatch(setUser(data.id, data.login, data.token, true));
    }
}


export const logout = token => async dispatch => {
    let response = await usersAPI.logout(token);
    if (response.data.result === 'ok') {
        Cookies.remove('token');
        dispatch(setUser(null, null, null, false));
    }
}


export default userReducer;