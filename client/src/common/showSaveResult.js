import { openNotification, notificationTypes } from 'src/components/ui-kit/Modal/Notification';


export const showSaveResult = (response, message) => {

    if (response.status === 200 && !response.data.errors) {
        openNotification({ message, type: notificationTypes.success });
        return;
    }

    if (response.data && response.data.errors && response.data.errors.text) {
        openNotification({ message: `Ошибка сохранения данных: ${response.data.errors.text.message}`, type: notificationTypes.error });
    } else {
        openNotification({ message: `Ошибка сохранения данных`, description: '', type: notificationTypes.error });
    }

};