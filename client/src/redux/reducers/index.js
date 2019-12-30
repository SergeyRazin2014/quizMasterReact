import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import quizReducer from './quizReducer';
import { reducer as reudxFormReducer } from 'redux-form';

export default combineReducers({
    categoryReducer,
    quizReducer,
    form: reudxFormReducer
});