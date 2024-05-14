import React from 'react';
import {Modal} from "antd";
import UpdateNewsForm from "./UpdateNewsForm";

const UpdateNewsModal = (props) => {
    return (
        <>
            <Modal open={props.isModalOpen}
                   centered={true}
                   width="50%"
                   title="Редактирование новости"
                   okButtonProps={{ style: { display: 'none' } }}
                   onCancel={props.onCansel}
            >
                <UpdateNewsForm updateNews={props.updateNews} news={props.news}/>
            </Modal>
        </>
    );
};

export default UpdateNewsModal;