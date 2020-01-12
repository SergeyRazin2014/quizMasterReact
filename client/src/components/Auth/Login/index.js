import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import 'antd/dist/antd.css';
import './index.css';
import { Box } from 'src/components/ui-kit/Box';

const MyLoginForm = (props) => {

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    if (!props.form) {
        return null;
    }

    const { getFieldDecorator } = props.form;

    return (
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', minHeight: '100vh' }} >
            <Form style={{ paddingBottom: '140px' }} onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('login', {
                        rules: [{ required: true, message: 'Заполните логин!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Логин"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Заполните пароль!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Пароль"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Запомнить меня</Checkbox>)}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Войти
                    </Button>
                    Или <a href="">Зарегистрируйтесь!</a>
                </Form.Item>
            </Form>
        </Box >
    );
};

export const LoginForm = Form.create({ name: 'normal_login' })(MyLoginForm);
