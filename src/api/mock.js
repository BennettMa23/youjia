import Mock from "mockjs";
import homeApi from "./mockServeData/home";
import userApi from "./mockServeData/user";
import permissionApi from "./mockServeData/permission";

//拦截接口
Mock.mock(/home\/getData/, homeApi.getStatisticalData);
Mock.mock(/user\/getUser/,'get',userApi.getUserList);

Mock.mock(/user\/addUser/,'post',userApi.createUser)
Mock.mock(/user\/editUser/,'post',userApi.updateUser)
Mock.mock(/user\/delUser/,'post',userApi.deleteUser)
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)