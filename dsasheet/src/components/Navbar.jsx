import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="bg-blue-600">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl">DSA Sheet</h1>
        <Menu theme="dark" mode="horizontal" className="bg-blue-600">
          <Menu.Item key="1">
            <Link to="/home">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
