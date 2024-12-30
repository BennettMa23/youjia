import { React, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Tag, theme } from "antd";
import CommonAsider from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom";
import CommonTag from "../components/commonTag";


const { Header, Sider, Content } = Layout;


const Main = () => {
//   const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //获取展开收起状态
  const collapsed = useSelector(state => state.tab.isCollapse)
  return (
    <Layout className="main-container">
      <CommonAsider collapsed={collapsed} />
      <Layout>
        <CommonHeader collapsed={collapsed} />
        <CommonTag />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
