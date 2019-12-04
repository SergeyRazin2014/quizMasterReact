import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import quizReducer from './quizReducer';

export default combineReducers({
    categoryReducer,
    quizReducer
});