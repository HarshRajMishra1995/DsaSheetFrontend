import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Header className="w-full bg-blue-600">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-white text-2xl">DSA Sheet</h1>
        <Menu theme="dark" mode="horizontal" className="bg-blue-600">
          <Menu.Item key="1">
            <Link to="/home">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Button onClick={handleLogout}>Logout</Button>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
