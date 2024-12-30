import http from "./axios";

export const getData = () => {
    return http.request({
        url: "/home/getData",
        method: "get"
    });
};

export const getUser = (params) => {
    return http.request({
        url: "/user/getUser",
        method: "get",
        params: params
    });
};
export const addUser = (data) => {
    return http.request({
        url: "/user/addUser",
        method: "post",
        data
    });
};
export const editUser = (data) => {
    return http.request({
        url: "/user/editUser",
        method: "post",
        data
    });
};
export const delUser = (data) => {
    return http.request({
        url: "/user/delUser",
        method: "post",
        data
    });
};
export const getMenu = (data) => {
    return http.request({
        url: "/permission/getMenu",
        method: "post",
        data
    });
};