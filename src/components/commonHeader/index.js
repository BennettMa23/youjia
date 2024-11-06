import React from "react";

import "./index.css";

import { Button, Layout, Menu, Avatar, Dropdown } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const CommonHeader = ({ collapsed }) => {
  const layout = () => {};
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => layout} target="_blank" rel="noopener noreferrer">
          退出
        </a>
      ),
    },
  ];

  //点击展开收起
  const setCollapsed = () => {
    console.log(collapsed);
  };
  return (
    <Header className="header-container">
      <Button
        type="text"
        // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        // onClick={() => setCollapsed(!collapsed)}
        icon={<MenuFoldOutlined />}
        style={{
          fontSize: "16px",
          width: 64,
          height: 32,
          background: "#fff",
        }}
        onClick={()=>setCollapsed()}
      />
      <Dropdown menu={{ items }}>
        <Avatar
          src={<img size={66} src={require("../../assets/images/user.jpg")} />}
        ></Avatar>
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
