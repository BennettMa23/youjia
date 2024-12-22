import React from "react";
import "./index.css";
import { Button, Layout, Menu, Avatar, Dropdown } from "antd";
import { MenuFoldOutlined,MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { collapseMenu } from "../../store/reducers/tab";

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

  // 创建dispath
  const dispatch = useDispatch();

  //点击展开收起
  const setCollapsed = () => {
    console.log(collapsed);
    dispatch(collapseMenu()); // 切换收起状态
  };
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        // onClick={() => setCollapsed(!collapsed)}
        // icon={<MenuFoldOutlined />}
        style={{
          fontSize: "16px",
          width: 46,
          height: 30,
          background: "#fff",
          marginLeft: -20,
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
