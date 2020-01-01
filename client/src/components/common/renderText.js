import React, { useState } from 'react';
import { Field } from 'redux-form';
import { useRenderField } from 'src/components/common/renderField';

export const TextValid = ({ myVal, myComponent: MyComponent, name }) => {
    const renderField = useRenderField();
    const [val, setVal] = useState(myVal);

    const handleChange = (e) => {
        setVal(e.target.value);
    };


    return (
        <Field
            name={name}
            component={renderField}
            myComponent={MyComponent}
            onChange={handleChange}
            value={val}
            test="hello world"
            myVal={val}
        />
    );
};
