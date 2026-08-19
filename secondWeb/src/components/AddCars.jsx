import React from 'react';
import { Button, Form, Input } from 'antd';
import axiosInstance from "../../utils/axiosInstance"
import { baseURL } from "../../utils/config"


const AddCars = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try{
            const response = await axiosInstance.post(`${baseURL}/api/addcar/car`,values)
            .then((response) => {
                if (response?.status === 200){
                    console.log("Success in adding car");
                    form.resetFields();
                }else {
                    console.log("galt ho giya add krte hoe");
                  }
            })
    
        }catch(err){
            console.log(err);
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
      label="Plate"
      name="plate"
      rules={[{ required: true, message: 'Please input plate number!' }]}
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

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
        </>
    )
}

export default AddCars;