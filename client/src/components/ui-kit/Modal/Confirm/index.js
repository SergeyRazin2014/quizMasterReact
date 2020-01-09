import 'antd/dist/antd.css';
import { Modal } from 'antd';

export const modalStatuses = {
    ok: 'ok',
    cancel: 'cancel',
    close: 'close'
};

const { confirm } = Modal;

export function showConfirm({ title, content }) {
    const promise = new Promise((resolve, reject) => {
        try {
            confirm({
                title,
                content,
                okText: 'Да',
                cancelText: 'Отмена',
                okType: 'danger',
                onOk() {
                    resolve(modalStatuses.ok);
                },
                onCancel() {
                    resolve(modalStatuses.cancel);
                },
            });
        } catch (err) {
            reject(err);
        }
    });

    return promise;


}
