import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import userReducer from './userReducer';
import todosReducer from './todosReducer';
import appReducer from './appReducer';


let reducers = combineReducers({
    form: formReducer,
    app: appReducer,
    user: userReducer,
    todos: todosReducer
})


let store = createStore(reducers, applyMiddleware(thunkMiddleware));


window.store = store;


export default store;
