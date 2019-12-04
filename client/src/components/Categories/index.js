import React from 'react';
import { useDispatch } from 'react-redux';
import { Nod } from 'src/components/Categories/common/Nod';
import { Tree } from 'antd';

import 'antd/dist/antd.css';
import './category.css';
import { types } from 'src/redux/reducers/types';

const { TreeNode } = Tree;

const createTestCategoryes = () => {
	const root = new Nod('root');
	root.id = 1;
	const adult = new Nod('Взрослый');
	adult.id = 2;

	const baby = new Nod('Ребенок');
	baby.id = 3;
	const babyBeforYear = new Nod('Младенец до года');
	babyBeforYear.id = 4;
	const babyAfterYear = new Nod('Дети старше года');
	babyAfterYear.id = 5;
	const teenagers = new Nod('Подросток');
	teenagers.id = 6;

	const man = new Nod('Мужчина');
	man.id = 7;
	const commonProblems = new Nod('Проблемы общего характера');
	commonProblems.id = 8;
	const sexProblem = new Nod('Проблемы секса');
	sexProblem.id = 9;

	const woman = new Nod('Женщина');
	woman.id = 10;

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
			onSelect={e => {
				dispatch({ type: types.SELECT_CATEGORY_ID, payload: 'categoryTest' });
			}}

		>
			{categoriesElements}
		</Tree >

	);
};

export default Categories;
