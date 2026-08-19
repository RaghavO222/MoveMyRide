import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router";
import { Button, Form, Input, ConfigProvider, Checkbox, Flex } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { baseURL } from "../../utils/config.jsx"


const Login = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            await axios.post(`${baseURL}/api/auth/login`, values)
                .then((response) => {
                    if (response?.status === 200 && (response.data.userVerification.role === "admin" || response.data.userVerification.role === "superadmin")) {
                        setData(response)
                        localStorage.setItem('user-info', response.data.userVerification.username);
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('role', response.data.userVerification.role)
                        navigate("/")
                    } else {
                        console.log("good vibes");
                    }

                });
        } catch (e) {
            console.log(e);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Input: {
                            activeBorderColor: 'black',
                            hoverBorderColor: 'black',
                        },
                    },
                }}
            >

                <div className="flex items-center justify-center min-h-screen bg-gray-200" >

                    <div className="w-96 bg-white rounded-2xl z-10 shadow-lg">
                        <div className="w-full text-3xl font-semibold text-white text-center py-6 rounded-t-2xl bg-black ">
                            LOGIN
                        </div>
                        <div className="p-8">
                            <Form
                                name="basic"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                                </Form.Item>

                                <Form.Item>
                                    <Button color="default" variant="solid" size="large" block htmlType="submit">
                                        Login
                                    </Button>
                                </Form.Item>



                            </Form>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </>
    )
}

export default Login