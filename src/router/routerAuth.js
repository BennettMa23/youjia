import { Navigate } from "react-router-dom";

export const RouterAuth = ({children}) => { //{}结构出来
    const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};