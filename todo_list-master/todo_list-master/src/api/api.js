import * as axios from 'axios';

const DOMEN = "todolist"

const baseURL = `http://${DOMEN}/api/index.php?`;

export const usersAPI = {
    signUp(login, password, password2) {
        return axios({
            method: 'POST',
            url: baseURL,
            params: {
                method: 'registration',
                login, password, password2
            }
        });
    },
    signIn(login, password) {
        return axios({
            method: 'POST',
            url: baseURL,
            params: {
                method: 'login',
                login, password
            }
        });
    },
    logout(token) {
        return axios({
            method: 'GET',
            url: baseURL,
            params: {
                method: 'logout',
                token
            }
        });
    },
    getUserByToken(token) {
        return axios({
            method: 'GET',
            url: baseURL,
            params: {
                method: 'getuserbytoken',
                token
            }
        });
    },
}


export const todosAPI = {
    addTodo(id, message, about) {
        return axios({
            method: 'POST',
            url: baseURL,
            params: {
                method: 'addtodo',
                id, message, about
            }
        });
    },
    getAllTodos(id) {
        return axios({
            method: 'GET',
            url: baseURL,
            params: {
                method: 'getalltodos',
                id
            }
        });
    },
    deleteTodo(todoId) {
        return axios({
            method: 'GET',
            url: baseURL,
            params: {
                method: 'deletetodo',
                id: todoId
            }
        });
    },
    countTodos(id) {
        return axios({
            method: 'GET',
            url: baseURL,
            params: {
                method: 'counttodos',
                id
            }
        })
    },
    dateLastTodo(id) {
        return axios({
            method: 'GET',
            url: baseURL,
            params: {
                method: 'datelasttodo',
                id
            }
        })
    }
}

