import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';

export const SelectCategory = ({ quiz, allCategories, setQuiz }) => {
    const { Option } = Select;

    function onChange(value) {
        setQuiz({ ...quiz, categoryId: value });
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    const categoryList = allCategories.map(cat => {
        return <Option key={cat._id} value={cat._id}>{cat.title}</Option>;
    });

    const defaultValue = !!quiz.categoryId ? quiz.categoryId : undefined;


    return <Select
        showSearch
        defaultValue={defaultValue}
        style={{ width: 200 }}
        placeholder="Выберите категорию"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
        {categoryList}
    </Select>;

};
