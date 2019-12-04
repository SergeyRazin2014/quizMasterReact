import { useSelector } from 'react-redux';
import { types } from './types';

// получить выбранные тесты
export const useSelectedQuizes = () => {
    const result = useSelector((store) => {
        return store.quizReducer.selectedQuiz;
    });
    return result;
}

const initialState = { selectedQuiz: null }

// редюсер
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SELECT_QUIZ:
            return { ...state, selectedQuiz: payload };
        default: return state;
    }
};