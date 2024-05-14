import React from 'react';
import {Modal} from "antd";
import RegistrationForm from "./RegistrationForm";

const RegistrationModal = (props) => {
    return (
        <>
            <Modal open={props.isModalOpen}
                   centered={true}
                   width="50%"
                   title="Регистрация"
                   okButtonProps={{ style: { display: 'none' } }}
                   onCancel={props.onCansel}
            >
                <RegistrationForm registration={props.registration} validMessage={props.validMessage}/>
                {/* <RegistrationForm Registration={props.Registration} validMessage={props.validMessage}/> */}

            </Modal>
        </>
    );
};

export default RegistrationModal;