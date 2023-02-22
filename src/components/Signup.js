import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {PORTAL_URL} from '../url'

const Signup = () => {
  const navigate = useNavigate();

  const signup = async (e) => {
    await axios.post(`${PORTAL_URL.api_url}`, e).then((resp) => {
      resp.status === 200 && navigate("/login", { replace: true });
    });
  };

  return (
    <div className="h-screen flex justify-center items-center w-full">
      <div>
        <h1 className="block text-2xl my-3">Sign In</h1>
        <Form
          onFinish={(values) => {
            signup(values);
          }}
          className="w-[550px] mx-auto border px-4 py-4"
        >
          <Form.Item
            name="name"
            label="Name"
            className="form"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "Please enter valid email .",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            type="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
           <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-gray-900 ml-[170px]"
            >
              Submit
            </Button>
          </Form.Item>
          Already have account? <Link to={'/login'} replace={true}>Click here</Link>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
