import 'antd/dist/antd.css';
import { notification } from 'antd';

export const notificationTypes = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
};

export const openNotification = ({ message, description, type }) => {
    notification[type]({
        message,
        description
    });
};