import { useEffect, useState } from 'react';
import { api } from 'src/api/index';
import { useDispatch } from 'react-redux';
import { types } from 'src/redux/reducers/types';

export const useCategories = () => {

    const [rootCategory, setRootCategory] = useState(null);
    const [allCategories, setAllCategories] = useState(null);
    const [isLoaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch({ type: types.CATEGORY_ISLOADED, payload: false });

        api.get('/getAllCategories').then((response) => {
            // всем категориям добавить те категори которые есть в виде id в []children
            response.data.forEach(c => {
                c.childOb = [];
                c.children.forEach(childId => {
                    const findedCat = response.data.find(x => x._id === childId);
                    c.childOb.push(findedCat);
                });
            });

            // выровнять ссылки на категории в одну линию
            // выбрать те категории которые не чилдрены не чьи
            // добавить эти категории в root категорию

            const allChildrenIds = response.data.map(x => x.children).flat();
            const topLevelCategories = response.data.filter(cat => allChildrenIds.every(childId => childId !== cat._id));
            const rootCategory = { title: "Выберите категорию", childOb: topLevelCategories };

            setAllCategories(response.data);
            setRootCategory(rootCategory);
            setLoaded(true);
            dispatch({ type: types.CATEGORY_DATA, payload: response.data });
            dispatch({ type: types.ROOT_CATEGORY, payload: rootCategory });


        }).catch((err) => {
            dispatch({ type: types.CATEGORY_ERROR, payload: err });
        });
    }, []);

    return { rootCategory, allCategories, isLoaded };
};