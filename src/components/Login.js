import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {PORTAL_URL} from '../url'

const Login = () => {
  const navigate = useNavigate();

  const signup = async (e) => {
    await axios
      .post(`${PORTAL_URL.api_url}/login`, e)
      .then((resp) => {
        resp.status === 200 && navigate("/dashboard", { replace: true });
      });
  };

  return (
    <div className="h-screen flex justify-center items-center w-full">
      <div>
        <h1 className="block text-2xl my-3">Login</h1>
        <Form
          onFinish={(values) => {
            signup(values);
          }}
          className="w-[550px] mx-auto border px-4 py-4"
        >
          <Form.Item
            name="email"
            label="Email"
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
            name="password"
            label="Password"
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
          Don't have account? <Link to={'/'} replace={true}>Click here</Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
