import { React, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import CommonAsider from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom";


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
      {/* <Sider trigger={null} collapsible collapsed={collapsed}>
        <h3 className="app-name">后台管理系统</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
          style={{
            height: '100%'
          }}
        />
      </Sider> */}
      <CommonAsider collapsed={collapsed} />
      <Layout>
        <CommonHeader collapsed={collapsed} />
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
