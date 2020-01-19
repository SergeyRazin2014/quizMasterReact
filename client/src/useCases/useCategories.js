import { useEffect, useState } from 'react';
import { api } from 'src/api/index';
import { useDispatch } from 'react-redux';
import { types } from 'src/redux/reducers/types';

export const useCategories = () => {

    const [rootCategory, setRootCategory] = useState(null);
    const [allCategories, setAllCategories] = useState(null);
    const [isLoaded, setLoaded] = useState(false);
    const dispatch = useDispatch();


    // загружаю данные по категориям
    useEffect(() => {
        dispatch({ type: types.CATEGORY_ISLOADED, payload: false });

        api.get('/getAllCategories').then((response) => {
            setAllCategories(response.data);
            dispatch({ type: types.CATEGORY_DATA, payload: response.data });
        });

    }, []);


    // формирую дерево категорий
    useEffect(() => {

        if (allCategories) {

            allCategories.forEach(c => {
                c.childOb = [];
                c.children.forEach(childId => {
                    const findedCat = allCategories.find(x => x._id === childId);
                    c.childOb.push(findedCat);
                });
            });

            const allChildrenIds = allCategories.map(x => x.children).flat();
            const topLevelCategories = allCategories.filter(cat => allChildrenIds.every(childId => childId !== cat._id));
            const rootCategory = {_id: "root", title: "Выберите категорию", childOb: topLevelCategories, isRoot: true, children: topLevelCategories };

            setRootCategory(rootCategory);
            dispatch({ type: types.ROOT_CATEGORY, payload: rootCategory });
            setLoaded(true);
        }

    }, [allCategories]);

    return { rootCategory, allCategories, setAllCategories, isLoaded };
};