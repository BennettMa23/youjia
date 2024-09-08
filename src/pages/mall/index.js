import React from "react";
import { Outlet } from "react-router-dom";

const Mall = () => {
    return (
        <div>
            Mall购物页面
            <Outlet/>
        </div>
    )
}

export default Mall