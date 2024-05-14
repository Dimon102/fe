import React from 'react';
import {Modal} from "antd";
import AuthorizationForm from "./AuthorizationForm";

const AuthorizationModal = (props) => {
    return (
        <>
            <Modal open={props.isModalOpen}
                   centered={true}
                   width="50%"
                   title="Авторизация"
                   okButtonProps={{ style: { display: 'none' } }}
                   onCancel={props.onCansel}
            >
                <AuthorizationForm auth={props.auth} validMessage={props.validMessage}/>
                {/* <RegistrationForm Registration={props.Registration} validMessage={props.validMessage}/> */}

            </Modal>
        </>
    );
};

export default AuthorizationModal;