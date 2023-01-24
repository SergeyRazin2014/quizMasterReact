import React from 'react';
import { useDispatch } from 'react-redux';
import { Tree } from 'antd';
import { useCategories } from 'src/useCases/useCategories';
import 'antd/dist/antd.css';
import './category.css';
import { types } from 'src/redux/reducers/types';
import { useQuizTitles } from 'src/useCases/useQuizTitles';
import { Spinner } from '../ui-kit/Spinner';
import { useSelectedCategory } from 'src/redux/reducers/categoryReducer';

const { TreeNode } = Tree;

const Categories = () => {

	const dispatch = useDispatch();
	const { rootCategory, allCategories, isLoaded: categoryLoaded } = useCategories();
	const { quizTitles, isLoaded: quizTitlesLoaded } = useQuizTitles();

	const isLoaded = categoryLoaded && quizTitlesLoaded;

	const currentCategory = useSelectedCategory();
	let currentCategoryId = null;

	if (currentCategory) {
		currentCategoryId = currentCategory._id;
	}


	if (!isLoaded) {
		return <Spinner />;
	}

	const renderCategories = (rootCategory) => {

		if (!rootCategory) {
			return null;
		}

		return (
			<TreeNode title={<span className="categoryItem">{rootCategory.title}</span>} key={rootCategory._id}>
				{rootCategory.childOb.map(x => renderCategories(x))}
			</TreeNode>
		);
	};

	const categoriesElements = renderCategories(rootCategory);

	return (
		<Tree
			defaultExpandedKeys={[currentCategoryId]}
			onSelect={selectedCategoriesIds => {

				if (!selectedCategoriesIds || !selectedCategoriesIds.length) {
					return;
				}

				const selectedCategoryId = selectedCategoriesIds[0];
				const category = allCategories.find(x => x._id === selectedCategoryId);

				if (!category) {
					return;
				}

				dispatch({ type: types.SELECT_CATEGORY, payload: category });

				const quizes = quizTitles.filter(qt => qt.categoryId === category._id);
				dispatch({ type: types.CATEGORY_QUIZES, payload: quizes });
			}}

		>
			{categoriesElements}
		</Tree >
	);
};

export default Categories;
