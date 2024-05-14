import React from 'react';
import {Modal} from "antd";
import Title from "antd/es/skeleton/Title";

const OkModal = (props) => {
    return (
        <>
            <Modal open={props.isModalOpen}
                   centered={false}
                   width="15%"
                   okButtonProps={{ style: { display: 'none' } }}
                   onCancel={props.onCansel}
            >
                <div>{props.text}</div>
                {/* <RegistrationForm Registration={props.Registration} validMessage={props.validMessage}/> */}

            </Modal>
        </>
    );
};

export default OkModal;