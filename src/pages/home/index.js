import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from "antd";
import * as Icon from "@ant-design/icons";
import * as echarts from "echarts";

import "./home.css";
import { getData } from "../../api";
import MyECharts from "../../components/Echarts";

const columns = [
  {
    title: "课程",
    dataIndex: "name",
  },
  {
    title: "今日购买",
    dataIndex: "todayBuy",
  },
  {
    title: "本月购买",
    dataIndex: "monthBuy",
  },
  {
    title: "总购买",
    dataIndex: "totalBuy",
  },
];
const countData = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "今日未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "本月支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "本月未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];

// 动态获取icon
const iconToElement = (name) => React.createElement(Icon[name]);

const Home = () => {
  const userImg = require("../../assets/images/user.jpg");
  // 创建echart响应数据
  const [echartData, setEchartData] = useState({});
  // 使用useEffect钩子来处理组件的副作用
  // 这里在组件挂载时执行一次数据获取操作
  //dom首次渲染完成
  useEffect(() => {
    // 调用getData函数获取数据
    getData().then((data) => {
      // 打印获取到的原始数据，用于调试
      console.log(data, "res");
      // 从获取的数据中提取tableData
      const { tableData,orderData,userData,videoData } = data.data.data;
      // 打印tableData，用于调试
      console.log(tableData, "tableData");
      // 使用setTableData更新组件的状态
      setTableData(tableData);
      
      const order = orderData;
      const xData = order.date
      const keyArray = Object.keys(order.data[0])
      const series = []
      keyArray.forEach(key => {
        series.push({
          name: key,
          data: order.data.map(item => item[key]),
          type: 'line',
        })
      });

      // console.log(xData, series,keyArray);
      console.log(orderData, "echartData");
      setEchartData({
        order:{
          xData,
          series
        },
        user:{
          xData: userData.map(item => item.date),
          series: [
            {
              name: '新增用户',
              data: userData.map(item => item.new),
              type: 'bar',
            },
            {
              name: '活跃用户',
              data: userData.map(item => item.active),
              type: 'bar',
            }
          ]
        },
        video:{
          series:[
            {
              data:videoData,
              type:'pie'
            }
            
          ]
        }
        
      })
    });
  }, []);
  //定义table数据
  const [tableData, setTableData] = useState([]);

  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userImg} />
            <div className="userinfo">
              <p className="name">Admin</p>
              <p className="access">超级管理员</p>
            </div>
          </div>
          <div className="login-info">
            <p>
              上次登录时间：<span>2024-11-18</span>
            </p>
            <p>
              上次登录地点：<span>苏州</span>
            </p>
          </div>
        </Card>
        <Card hoverable style={{ marginTop: 20 }}>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            rowKey={"name"}
          />
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {countData.map((item, index) => {
            return (
              <Card key={index}>
                <div className="icon-box" style={{ background: item.color }}>
                  {iconToElement(item.icon)}
                </div>
                <div className="detail">
                  <p className="num">¥{item.value}</p>
                  <p className="text">{item.name}</p>
                </div>
              </Card>
            );
          })}
        </div>
        {echartData.order && <MyECharts chartData={echartData.order} style={{ height: "280px"}} />}
        <div className="graph">
          {echartData.user && <MyECharts chartData={echartData.user} style={{ height: "240px", width:'50%'}} />}
          {echartData.video && <MyECharts chartData={echartData.video} isAxisChart={false} style={{ height: "260px", width:'50%'}} />}
        </div>
      </Col>
    </Row>
  );
};

export default Home;
