import Mock from "mockjs";
import homeApi from "./mockServeData/home";
import userApi from "./mockServeData/user";

//拦截接口
Mock.mock(/home\/getData/, homeApi.getStatisticalData);

Mock.mock(/user\/getUser/,'get',userApi.getUserList);