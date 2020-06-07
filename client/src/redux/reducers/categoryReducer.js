import { useSelector } from 'react-redux';
import { types } from './types';

// получить выбранную категорию
export const useSelectedCategory = () => {
        const result = useSelector((store) => {
            return store.categoryReducer.selectedCategory;
        });
        return result;
};

// получить загруженные категории
export const useLoadedCategories = () => {
    const result = useSelector(store => store.categoryReducer.categories);
    return result;
};

// получить ошибки категорий
export const useCategoriesErrors = () => {
    const result = useSelector(store => store.categoryReducer.errors);
    return result;
};

// получить признак загружены категории или нет
export const useIsCategoryLoaded = () => {
    const result = useSelector(store => store.categoryReducer.isLoaded);
    return result;
};

const initialState = { selectedCategory: null, isLoaded: false, errors: null, categories: null };

// редюсер
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CATEGORY_ISLOADED:
            return { ...state, isLoaded: payload };
        case types.CATEGORY_DATA:
            return { ...state, categories: payload, isLoaded: true };
        case types.ROOT_CATEGORY: {
            return { ...state, rootCategory: payload, isLoaded: true };
        }
        case types.CATEGORY_ERROR:
            return { ...state, errors: payload };
        case types.SELECT_CATEGORY:
            return { ...state, selectedCategory: payload };
        default: return state;
    }
};