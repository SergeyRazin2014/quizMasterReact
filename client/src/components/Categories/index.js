import React from 'react';
import { useDispatch } from 'react-redux';
import { Tree } from 'antd';
import { useCategories } from 'src/useCases/useCategories';
import 'antd/dist/antd.css';
import './category.css';
import { types } from 'src/redux/reducers/types';
import { useQuizTitles } from 'src/useCases/useQuizTitles';

const { TreeNode } = Tree;

// ☻ todo: загрузить с сервера эти тесты
// const quizTest = [{ id: 1, name: 'Понос' }, { id: 2, name: 'Запор' }, { id: 3, name: 'Хроническая усталость' }];


const Categories = () => {

	const dispatch = useDispatch();
	const { rootCategory, allCategories, isLoaded: categoryLoaded } = useCategories();
	const { quizTitles, isLoaded: quizTitlesLoaded } = useQuizTitles();


	const isLoaded = categoryLoaded && quizTitlesLoaded;

	if (!isLoaded) {
		return <p>LOADING...</p>;
	}


	const renderCategories = (rootCategory) => {
		return (
			<TreeNode title={<span className="categoryItem">{rootCategory.title}</span>} key={rootCategory._id}>
				{rootCategory.childOb.map(x => renderCategories(x))}
			</TreeNode>
		);
	};

	const categoriesElements = renderCategories(rootCategory);


	return (

		<Tree
			onSelect={selectedCategoriesIds => {

				if (!selectedCategoriesIds || !selectedCategoriesIds.length) {
					return;
				}

				const selectedCategoryId = selectedCategoriesIds[0];
				// const category = rootCategory.findByIdDeep({ id: categoryId })[0]; // вместо этого выбрать из списка категорий нужную по categoryId
				const category = allCategories.find(x => x._id === selectedCategoryId);

				if (!category) {
					return;
				}

				dispatch({ type: types.SELECT_CATEGORY, payload: category });

				const quizes = quizTitles.filter(x => category.quizIds && category.quizIds.some(y => y == x._id));
				dispatch({ type: types.SELECT_QUIZ, payload: quizes });
			}}

		>
			{categoriesElements}
		</Tree >

	);
};

export default Categories;
