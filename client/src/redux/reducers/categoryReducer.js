import { useSelector } from 'react-redux';
import { types } from './types';

// получить выбранную категорию
export const useSelectedCategoryId = () => {
    const result = useSelector((store) => {
        return store.categoryReducer.selectedCategory;
    });
    return result;
}

const initialState = { category: null }

// редюсер
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SELECT_CATEGORY_ID:
            return { ...state, selectedCategory: payload };
        default: return state;
    }
}