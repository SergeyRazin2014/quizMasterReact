import React from 'react';
import { Modal } from 'antd';

export const QuestionModal = ({ isModalVisible, okClick, noClick, title, text }) => {
    return (<Modal
        title={title}
        visible={isModalVisible}
        onOk={() => okClick()}
        onCancel={() => noClick()}
        okText="ДА"
        cancelText="НЕТ"
        width="90%"
        closable={false}
        maskClosable={false}
    >
        <p>{text}</p>
    </Modal>);
};