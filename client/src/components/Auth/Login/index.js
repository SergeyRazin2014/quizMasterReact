import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { openNotification, notificationTypes } from 'src/components/ui-kit/Modal/Notification';
import { navigate, A } from 'hookrouter';
import { Box } from 'src/components/ui-kit/Box';
import { api } from 'src/api';

import './index.css';
import 'antd/dist/antd.css';
import { setAxiosAuthToken } from 'src/utils/setAxiosAuthToken';

const MyLoginForm = (props) => {

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                api.post('/login', values).then(response => {
                    if (response.status === 200) {
                        openNotification({ message: 'Вход выполнен успешно', type: notificationTypes.success });
                        setAxiosAuthToken(response.data.token);
                        navigate('/');
                    } else {
                        openNotification({ message: 'Ошибка лгина, попробуйте снова', type: notificationTypes.error });
                        setAxiosAuthToken(null);
                    }
                }).catch(err => {
                    if (err && err.response && err.response.data && err.response.data.message) {
                        openNotification({ message: "Неверный логин или пароль", description: err.response.data.message, type: notificationTypes.error });
                    } else {
                        openNotification({ message: "Ошибка логина" });
                    }
                    setAxiosAuthToken(null);
                });
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
                    Или <A href="/register">Зарегистрируйтесь!</A>
                </Form.Item>
            </Form>
        </Box >
    );
};

export const LoginForm = Form.create({ name: 'normal_login' })(MyLoginForm);
