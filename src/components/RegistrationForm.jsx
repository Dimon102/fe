import React, {useState, Option} from 'react';
import {Button, Cascader, Form, Input, Select} from "antd";

const address = [
    {
      value: 'Кроснофлотская',
      label: 'ул. Кроснофлотская',
      children: [
        {
          value: '28',
          label: 'д. 28',
          children: [
            {
              value: '154',
              label: 'кв. 154',
            },
          ],
        },
        {
          value: '27',
          label: 'д. 27',
          children: [
            {
              value: '253',
              label: 'кв. 253',
            },
          ],
        },
      ],
    },
    {
      value: 'Куйбышева',
      label: 'ул. Куйбышева',
      children: [
        {
          value: '53',
          label: 'д. 53',
          children: [
            {
              value: '24',
              label: 'кв. 24',
            },
            {
              value: '23',
              label: 'кв. 23',
            },
          ],
        },
      ],
    },
  ];
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const RegistrationForm = (props) => {
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  //const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    props.registration(values.username, values.password, values.conf);
    // props.Registration(values);
  };

  const [username, setUsername] = useState('');
  const [conf, setConf] = useState('');
  const [password, setPassword] = useState('');
  // const [confirm, setConfirm] = useState('');
  // // const [address, setAddress] = useState('');
  // const [phone, setPhone] = useState('');



  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       style={{
  //         width: 70,
  //       }}
  //     >
  //       <Option value="7">+7</Option>
  //     </Select>
  //   </Form.Item>
  // );

  // const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  // const onWebsiteChange = (value) => {
  //   if (!value) {
  //     setAutoCompleteResult([]);
  //   } else {
  //     setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
  //   }
  // };
  // const websiteOptions = autoCompleteResult.map((website) => ({
  //   label: website,
  //   value: website,
  // }));
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      autoComplete="off"

      onFinishFailed={onFinishFailed}

      initialValues={{
        // address: ['', '', ''],
        // prefix: '+7',
        remember: true,

      }}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
          span: 16,
      }}
      style={{
          width: "90%"
      }}
      scrollToFirstError
    >

      <Form.Item
        name="username"
        label="Логин"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите Логин!',
            whitespace: true,
          },
        ]}
      >
        <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
        />
      </Form.Item> 

      {/* <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'Неверный формат E-mail!',
          },
          {
            required: true,
            message: 'Пожалуйста, введите E-mail!',
          },
        ]}
      >
        <Input 
          // value={email}
        />
      </Form.Item> */}

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль!',
          },
        ]}
        hasFeedback
      >
        <Input.Password
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="conf"
        label="Подтверждение пароля"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста, подтвердите пароль!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
        ]}
      >
        <Input.Password
            value={conf}
            onChange={e => setConf(e.target.value)}
        />
      </Form.Item>

      {/* <Form.Item
        name="address"
        label="Адрес"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Пожалуйста, введите адрес!',
          },
        ]}
      >
        <Cascader options={address} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Номер телефона"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите телефонный номер!',
          },
          {
            min: 10, 
            message: "Длина номера - 10 символов",
          },
          {
            max: 11, 
            message: "Длина номера - 10 символов",
          },
        ]}
      >
        <Input
          // value={phone}
          // addonBefore={prefixSelector}
          Input addonBefore="+7"
          style={{
            width: '100%',
          }}
        />
      </Form.Item> */}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
         Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
// const ComponentDemo = RegistrationForm;

export default RegistrationForm;
// createRoot(mountNode).render(<ComponentDemo />);