import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/slices/AuthSlice";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import LoginImage from "../Assets/LoginImage.avif";

const Signup = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const resultAction = await dispatch(signUpUser(values));
    if (signUpUser.fulfilled.match(resultAction)) {
      if (resultAction.payload == true) {
        toast.success("Signup Successful");
        navigate("/");
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
            alt="Sign Up"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right side: Signup form */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-center text-3xl mb-6 text-blue-600">Sign Up</h2>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="Email" />
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

            <Button type="primary" htmlType="submit" className="w-full mb-4">
              Sign Up
            </Button>

            {/* Navigation to Login */}
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600">
                Login
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
