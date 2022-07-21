import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./userContext";

function Auth(props) {
  const { user } = useContext(UserContext)

  if (!user?.isLogin) {
    return <Navigate to="/" replace />;
  }
  
  return props.children;
}

export default Auth;
