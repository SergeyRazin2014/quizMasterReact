import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import 'antd/dist/antd.css';
import './index.css';
import { Box } from 'src/components/ui-kit/Box';
import { api } from 'src/api';
import { openNotification, notificationTypes } from 'src/components/ui-kit/Modal/Notification';
import { navigate, A } from 'hookrouter';

const MyRegisterForm = (props) => {

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {

            if (err) {
                openNotification({ message: 'Ошибка регистрации', description: 'Должны быить заполнены все поля формы регистрации', type: notificationTypes.error });
                return;
            }

            api.post('/register', values).then(response => {
                if (response.statusText === 'Created') {
                    openNotification({ message: 'Новый пользователь зарегистрирован успешно', type: notificationTypes.success });
                    navigate('/');
                } else {
                    openNotification({ message: 'Ошибка регистрации, попробуйте снова', type: notificationTypes.error });
                }
            }).catch(err => {
                if (err && err.response && err.response.data && err.response.data.message) {
                    openNotification({ message: "Ошибка регистрации.", description: err.response.data.message, type: notificationTypes.error });
                } else {
                    openNotification({ message: "Ошибка регистрации." });
                }

            });
        });
    };

    if (!props.form) {
        return null;
    }

    const { getFieldDecorator } = props.form;

    // проверяем что пароли совпадают
    const handleComparePassword = (rule, value, callback) => {
        const { getFieldValue } = props.form;

        if (value && value !== getFieldValue('password')) {
            callback('Пароли не совпадают!');
        }

        callback();
    };

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
                    {getFieldDecorator('password2', {
                        rules: [
                            { required: true, message: 'Заполните пароль!' },
                            { validator: handleComparePassword }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Повторите пароль"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Запомнить меня</Checkbox>)}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Регистрация
                    </Button>
                    Или <A href="/login">Войти!</A>
                </Form.Item>
            </Form>
        </Box >
    );
};

export const RegisterForm = Form.create({ name: 'normal_login' })(MyRegisterForm);
