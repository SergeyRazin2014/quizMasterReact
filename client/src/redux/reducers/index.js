import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import quizReducer from './quizReducer';
import * as RF from 'redux-form';

export default combineReducers({
    categoryReducer,
    quizReducer,
    form: RF.reducer
});