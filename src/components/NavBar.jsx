import React from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
                <span>Новости</span>
                <Link to="/news" />
            </Menu.Item>
            <Menu.Item key="2">
                <span>Опция 2</span>
                <Link to="/" />
            </Menu.Item>
            <Menu.Item key="3">
                <span>Опция 3</span>
                <Link to="/" />
            </Menu.Item>
        </Menu>
    );
};

export default NavBar;