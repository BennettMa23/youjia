import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// echarts配置数据
// 此配置用于轴类图表
const axisOption = {
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  // 系列颜色
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
};

// 此配置用于普通图表
const normalOption = {
  tooltip: {
    trigger: "item",
  },
  // 系列颜色
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
};

/**
 * ECharts封装组件
 * 该组件用于根据传入的数据渲染ECharts图表
 * @param {Object} style - 图表容器的样式
 * @param {Object} chartData - 图表数据，包括x轴数据和系列数据
 * @param {boolean} isAxisChart - 是否为坐标轴图表，默认为true
 */
const MyECharts = ({ style, chartData, isAxisChart = true }) => {
  // 获取dom实例
  const echartsRef = useRef();
  // 用于存储echarts实例
  let echartObj = useRef(null);

  console.log(chartData, "chartData");

  // 当chartData变化时，重新渲染图表
  useEffect(() => {
    let options;
    // echarts初始化
    echartObj.current = echarts.init(echartsRef.current);

    // 根据isAxisChart决定使用哪种配置项
    if (isAxisChart) {
      // 假设 chartData.xData 中的每一项是一个对象，使用对象的 name 属性
      axisOption.xAxis.data = chartData.xData;
      axisOption.series = chartData.series;
      options = axisOption;
    } else {
      normalOption.series = chartData.series;
      options = normalOption;
    }

    // 设置图表配置项
    echartObj.current.setOption(options);
  }, [chartData]);

  // 渲染图表容器
  return <div style={style} ref={echartsRef}></div>;
};

export default MyECharts;
