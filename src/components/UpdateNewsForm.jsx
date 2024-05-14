import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";

const UpdateNewsForm = (props) => {
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const options = [{label: 'gas', value: 'gas'}, {label: 'water', value: 'water',}];

    const [header, setHeader] = useState(props.news.header);
    const [body, setBody] = useState(props.news.body);
    const [tags, setTags] = useState(props.news.tags);
    const [imageUrl, setImageUrl] = useState(props.news.imageUrl);

    const onFinish = (values) => {
        values.tags = values.tags.map((tag) => toTag(tag));
        values.id = props.news.id;
        props.updateNews(values);
    }

    const toTag = (tag) => {
        return {
            "name": tag
        };
    }

    const tagToStr = (tag) => {
        return tag.name;
    }

    const [form] = Form.useForm();
    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                width: "90%",
            }}
            initialValues={{
                remember: true,
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onFinish={onFinish}
        >
            <Form.Item
                label="Заголовок"
                name="header"
                rules={[{min: 5, message: "Минимальная длина заголовка - 5 символов"},
                    {required: true, message: "Минимальная длина заголовка - 5 символов"}]}
            >
                <Input
                    defaultValue={header}
                    value={header}
                    onChange={e => setHeader(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Содержание"
                name="body"
                rules={[{ max: 3000, message: "Максимальная длина содержания - 3000 символов"}]}
            >
                <TextArea
                    rows={4}
                    defaultValue={body}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
            </Form.Item>

            <Form.Item label="Теги" name="tags">
                <Checkbox.Group
                    defaultValue={tags.map((tag) => tagToStr(tag))}
                    options={options}
                    value={tags}
                    onChange={(checkedValues) => setTags(checkedValues.map(
                        (tag) => toTag(tag)))}
                />
            </Form.Item>

            <Form.Item
                label="Ссылка на картинку"
                name="imageUrl"
                rules={[{ required: true, message: "Ссылка на картинку не может быть пустой"}]}
            >
                <Input
                    defaultValue={imageUrl}
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                />
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Изменить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateNewsForm;