import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/AuthSlice";
import LoginImage from "../Assets/LoginImage.avif";
// import { login } from "../actions/authActions";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const error = useSelector((state) => state.auth.error);

  const onFinish = async (values) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      if (resultAction.payload == 200) {
        toast("Login Successfull");
        navigate("/home");
      }
    } else {
      toast.error(resultAction.payload || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Container for image and form */}
      <div className="flex w-3/4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side: Image */}
        <div className="w-1/2">
          <img
            src={LoginImage}
            alt="Login"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right side: Login form */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-center text-3xl mb-6 text-blue-600">Login</h2>

          {/* {error && (
            <Alert message={error} type="error" showIcon className="mb-4" />
          )} */}

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Sign Up
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
