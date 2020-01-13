import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import quizReducer from './quizReducer';
import authReducer from './authReducer';

export default combineReducers({
    categoryReducer,
    quizReducer,
    authReducer
});