import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Button, Drawer, Space, Form, Row, Col, Input, Select, Checkbox, Divider , Tag , Switch } from "antd";
import { UserOutlined, BarsOutlined, MailOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import RegistrationModal from "../components/RegistrationModal";
import AuthorizationModal from '../components/AuthorizationModal';
import NewsService from "../services/NewsService";
import Cookies from 'universal-cookie';
import mail_logo from "../img/logo/Mail_logo.png";
import telegram_logo from "../img/logo/Telegram_logo.png";
import viber_logo from "../img/logo/Viber_logo.png";
import Column from 'antd/es/table/Column';

const tagsData = ['Вода', 'Газ', 'Мусор'];


// const {Header} = Layout;

const CreateHeader = () => {
    const [username, setUsername] = useState("Dima");
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [validMassage, setValidMassage] = useState('');
    const [openDrawer , setOpenDrawer ] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const handleChange = (tag, checked) => {
      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
      console.log('You are interested in: ', nextSelectedTags);
      setSelectedTags(nextSelectedTags);
    };
    // const [textMsg, setTextMsg] = useState('');
    // const [isOkModalOpen, setIsOkModalOpen] = useState(false);
    const [roles, setRoles] = useState([]);

    const cookies = new Cookies();

    const showDrawer = () => {
        setOpenDrawer(true);
    };
    
    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // const getUsername = () => {
    //     NewsService.getUsername().then((response) => {
    //         setUsername(response.data);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }

    const showRegModal = () => {
        setIsRegModalOpen(true);
    };
    const showAuthModal = () => {
        setIsAuthModalOpen(true);
    };
    const handleRegCancel = () => {
        setIsRegModalOpen(false);
    };
    const handleAuthCancel = () => {
        setIsAuthModalOpen(false);
    };

    const registration = (username, password, conf) => {
        NewsService.registration(username, password, conf).then((response) => {
            console.log(response.data);
        }).catch(error => {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setValidMassage(error.response.data);
            }
        });
        setIsRegModalOpen(false);
    }

    const auth = (username, password) => {
        NewsService.auth(username, password).then((response) => {
            cookies.set('jwt', response.data.token, { path: 'http://localhost:3000/news' });
            //document.cookie = 'jwt=' + response.data.token + ';max-age=604800;domain=http://localhost:3000/news';
            console.log(response.data.token);
        }).catch(error => {
            if (error.response.status === 400) {
                console.log(error.response.data);
                // setValidMassage(error.response.data);
                // setTextMsg(error.response.data)
                // setIsOkModalOpen(true)
            }
        });
        NewsService.getRoles(cookies.get('jwt')).then((response) => {
            console.log(response.data);
            setRoles(response.data)
        }).catch(error => {
            if (error.response.status === 400) {
                console.log(error.response.data);
                // setValidMassage(error.response.data);
                // setTextMsg(error.response.data)
                // setIsOkModalOpen(true)
            }
        });
        console.log(roles);
        setIsAuthModalOpen(false);
    }

    const CreateAvatar = ({username}) => {
        // const avatar = (username === undefined) ?
        // <Avatar icon={<UserOutlined />} /> : <Avatar size={40} style={{backgroundColor: 'white', color: 'black'}}>{username}</Avatar>;
        return (        
            <div>
                <Avatar className='header_avatar' icon={<UserOutlined />} />
                <div>{username}</div>
            </div>
        );
    }
    
    return (
        <>
            <header className='header'>
                <div className='header_name'>Название</div>
                <div className='header_info'>Информация</div>
                <div className='header_buttons'>
                    <div>
                        <Button type="primary" onClick={showRegModal}>
                            Регистрация
                        </Button>
                        <RegistrationModal
                            isModalOpen={isRegModalOpen}
                            onCansel={handleRegCancel}
                            validMessage={validMassage}
                            registration={registration}
                        />
                    </div>
                    <div >
                        <Button type="primary" onClick={showAuthModal}>
                            Авторизация
                        </Button>
                        <AuthorizationModal
                            isModalOpen={isAuthModalOpen}
                            onCansel={handleAuthCancel}
                            validMessage={validMassage}
                            auth={auth}
                        />
                    </div>
                </div>
                <div className='header_profile'>
                    <div>
                        <CreateAvatar username={username}/>
                    </div>
                    <div className='header_open_button_profile'>
                        <Button onClick={showDrawer}>
                            <BarsOutlined />
                        </Button>
                        <Drawer
                            title="Профиль" 
                            width={720} 
                            onClose={onCloseDrawer} 
                            open={openDrawer}
                            extra={
                                <Space>
                                    <Button danger onClick={onCloseDrawer}>Закрыть</Button>
                                    <Button onClick={showChildrenDrawer} type="primary">
                                        Редактировать данные
                                    </Button>
                                </Space>
                            }
                        >
                            <Drawer 
                                title="Изменение данных пользователя" 
                                width={720} 
                                onClose={onChildrenDrawerClose} 
                                open={childrenDrawer}
                                extra={
                                    <Space>
                                        <Button danger onClick={onChildrenDrawerClose}>Закрыть</Button>
                                        <Button onClick={onChildrenDrawerClose} type="primary">
                                            Сохранить изменения
                                        </Button>
                                    </Space>
                                }
                            >
                                <Form layout="vertical" >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                        <Form.Item
                                            name="phone"
                                            label="Номер телефона"
                                            rules={[
                                                {required: false, message: 'Пожалуйста, введите телефонный номер!'},
                                                {min: 10, message: "Длина номера - 10 символов"},
                                                {max: 10, message: "Длина номера - 10 символов"},
                                            ]}
                                        >
                                            <Input
                                                Input addonBefore="+7" placeholder="Введите номер телефона"
                                            />
                                        </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                        <Form.Item
                                            name="email"
                                            label="E-mail"
                                            rules={[
                                                {type: 'email', message: 'Введён неверный E-mail!'},
                                                {required: false, message: 'Please input your E-mail!'}]}
                                        >
                                            <Input placeholder="Введите E-mail" />
                                        </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                        <Form.Item
                                            name="street"
                                            label="Улица"
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Выберите улицу"
                                                onChange={onChange}
                                                onSearch={onSearch}
                                                filterOption={filterOption}
                                                options={[
                                                {
                                                    value: 'Куйбышева',
                                                    label: 'Куйбышева',
                                                },
                                                {
                                                    value: 'Ленина',
                                                    label: 'Ленина',
                                                },
                                                {
                                                    value: 'Пушкина',
                                                    label: 'Пушкина',
                                                },
                                                ]}
                                            />
                                        </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                        <Form.Item
                                            name="house"
                                            label="Номер дома"
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Выберите номер дома"
                                                onChange={onChange}
                                                onSearch={onSearch}
                                                filterOption={filterOption}
                                                options={[
                                                {
                                                    value: '1',
                                                    label: '1',
                                                },
                                                {
                                                    value: '2',
                                                    label: '2',
                                                },
                                                {
                                                    value: '3',
                                                    label: '3',
                                                },
                                                ]}
                                            />
                                        </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                        <Form.Item
                                            name="mailing "
                                            label="Рассылка"
                                        >
                                            <Checkbox value="E-mail"><img className='checkbox_logo' src={mail_logo} alt="alt"/> E-mail</Checkbox>
                                            <br />
                                            <Checkbox value="Telegram"><img className='checkbox_logo' src={telegram_logo} alt="alt"/> Telegram</Checkbox>
                                            <br />
                                            <Checkbox value="Viber"><img className='checkbox_logo' src={viber_logo} alt="alt"/> Viber</Checkbox>
                                            <Switch
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                
                                            />
                                        </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="tags "
                                                label="Категории новостей"
                                            >
                                                {tagsData.map((tag) => (
                                                    <Tag.CheckableTag
                                                        key={tag}
                                                        checked={selectedTags.includes(tag)}
                                                        onChange={(checked) => handleChange(tag, checked)}
                                                    >
                                                        {tag}
                                                    </Tag.CheckableTag>
                                                ))}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Drawer>
                        </Drawer>
                        
                    </div>
                </div>
            </header>
        </>
    );
};

export default CreateHeader;