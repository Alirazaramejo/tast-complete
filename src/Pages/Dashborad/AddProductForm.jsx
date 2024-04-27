import React, { useState } from 'react';
import { Form, Input, InputNumber, Upload, Button, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addProduct } from '../../services/products.service';

const { TextArea } = Input;

const AddProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // State to manage loading

  const onFinish = async (data) => {
    setLoading(true); // Set loading to true when form is submitted
    try {
      console.log('Form data:', data);
      const addProductResponse = await addProduct(data);
      form.resetFields();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Reset loading after submission is completed
    }
  };

  return (
    <Spin spinning={loading}> {/* Render Spin component when loading */}
      <Form
        form={form}
        name="my-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter price!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: 'Please enter quantity!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter description!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Upload"
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          rules={[{ required: true, message: 'Please upload a file!' }]}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default AddProductForm;
