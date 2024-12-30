import React from "react";
import MenuConfig from "../../config";
import * as Icon from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectMenuList } from "../../store/reducers/tab";

const { Header, Sider, Content } = Layout;


// 动态获取icon
const iconToElement = (name) => React.createElement(Icon[name]);
const items = MenuConfig.map((icon) => {
  // 没有子菜单
  const child = {
    key: icon.path,
    icon: iconToElement(icon.icon),
    label: icon.label,
  };
  // 有子菜单
  if (icon.children) {
    child.children = icon.children.map((item) => {
      return {
        key: item.path,
        label: item.label,
      };
    });
  }
  return child;
});

const CommonAsider = ({ collapsed }) => {
  // console.log(collapsed, "commonAsider");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //添加数据到store
  const setTabsList = (val) => {
    dispatch(selectMenuList(val));
  }
  //点击菜单
  const selectMenu = (e) => {
    let data
    MenuConfig.forEach((item) => {
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item;
        //如果有二级菜单
        if (e.keyPath.length > 1){
          data = item.children.find(child => {
            return child.path === e.key;
          });
        }
      }
    });
    setTabsList({
      path: data.path,
      name: data.name,
      label: data.label,
    });
    navigate(e.key);
  };
  return (
    // <Sider trigger={null} collapsible collapsed={collapsed}>
    <Sider trigger={null} collapsed={collapsed}>
      {/* <h3 className="app-name">后台管理系统</h3> */}
      <h3 className="app-name">{collapsed ? "优佳" : "优佳后台管理系统"}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{
          height: "100%",
        }}
        onClick={selectMenu}
      />
    </Sider>
  );
};

export default CommonAsider;
