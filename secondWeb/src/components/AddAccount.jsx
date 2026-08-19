import React from 'react';
import { Button,  Form, Input, Select } from 'antd';
import axiosInstance from "../../utils/axiosInstance"
import { baseURL } from "../../utils/config"

const AddAccount = () => {
    const onFinish = async(values) => {
        try{
            await axiosInstance.post(`${baseURL}/api/auth/adduser`,values)
            .then((response) => {
                if (response?.status === 200){
                    try{
                        const res = axiosInstance.post(`${baseURL}/api/mail/sendcred`,values)

                        if (res.data.success) {
                            console.error("Email sent successfully!");
                          } else {
                            console.error("Email sending failed!");
                          }

                    }catch(error){
                        console.error("Error:", error);
                    }

                    console.log("Success in adding new user");
                }else {
                    console.log("galt ho giya add krte hoe");
                  }
            })
        } catch(error){
            console.log("new user add krte hoe : ",error);
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select role!' }]}>
                    <Select >
                        <Select.Option value="user">user</Select.Option>
                        <Select.Option value="admin">admin</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddAccount