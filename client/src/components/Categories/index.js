import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Nod } from 'src/components/Categories/common/Nod';
import { Tree } from 'antd';

import 'antd/dist/antd.css';
import './category.css';
import { types } from 'src/redux/reducers/types';

const { TreeNode } = Tree;

const quizTest = [{ id: 1, name: 'Понос' }, { id: 2, name: 'Запор' }, { id: 3, name: 'Хроническая усталость' }];

const createTestCategoryes = () => {
	const root = new Nod({ id: 1, name: 'root' });
	const adult = new Nod({ id: 2, name: 'Взрослый' });

	const baby = new Nod({ id: 3, name: 'Ребенок' });
	const babyBeforYear = new Nod({ id: 3, name: 'Младенец до года' });
	const babyAfterYear = new Nod({ id: 4, name: 'Дети старше года' });
	const teenagers = new Nod({ id: 5, name: 'Подросток' });

	const man = new Nod({ id: 6, name: 'Мужчина' });
	const commonProblems = new Nod({ id: 7, name: 'Проблемы общего характера' });
	commonProblems.quizIds = [1, 2, 3];
	const sexProblem = new Nod({ id: 8, name: 'Проблемы секса' });

	const woman = new Nod({ id: 9, name: 'Женщина' });

	root.add(baby);

	// ребенок
	baby.add(babyBeforYear);
	baby.add(babyAfterYear);
	baby.add(teenagers);

	// взрослый
	root.add(adult);

	// мужчина
	adult.add(man);
	man.add(commonProblems);
	man.add(sexProblem);

	// женщина
	adult.add(woman);

	return root;
};



const Categories = () => {
	const rootCategory = createTestCategoryes();



	const renderCategories = (rootCategory) => {
		return (
			<TreeNode title={<span className="categoryItem">{rootCategory.name}</span>} key={rootCategory.id}>
				{rootCategory.children.map(x => renderCategories(x))}
			</TreeNode>
		);
	};

	const categoriesElements = renderCategories(rootCategory);

	const dispatch = useDispatch();

	return (

		<Tree
			onSelect={selectedCategoriesIds => {
				const categoryId = selectedCategoriesIds[0];
				const category = rootCategory.findByIdDeep({ id: categoryId })[0];
				dispatch({ type: types.SELECT_CATEGORY, payload: category });

				const quizes = quizTest.filter(x => category.quizIds && category.quizIds.some(y => y == x.id));
				dispatch({ type: types.SELECT_QUIZ, payload: quizes });


			}}

		>
			{categoriesElements}
		</Tree >

	);
};

export default Categories;
