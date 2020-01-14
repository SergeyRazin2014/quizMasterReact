import { types } from "./types";
import { useSelector } from 'react-redux';

export const useIsAuth = () => {
    const result = useSelector(store => store.authReducer.isLoaded);
    return result;
};

export const useCurrentUser = () => {
    const result = useSelector(store => store.authReducer.user);
    return result;
};

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: null,
    isLoaded: false,
    user: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.USER_LOADED:
            return {
                ...state,
                isAuth: true,
                isLoaded: true,
                user: payload
            };
        case types.AUTH_ERROR:
            return {
                ...state,
                isAuth: false,
                isLoaded: false,
                user: null
            };
        default:
            return { ...state };
    }

};