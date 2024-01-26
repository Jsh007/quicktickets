/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-26 09:20:52
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 12:51:39
 * @FilePath: /quicktickets_frontend/src/features/auth/RequireAuth.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();
  console.log(roles);

  // const content = roles.some((role) => allowedRoles?.includes(role)) ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
  const adminRoles = roles?.some((role) => allowedRoles.includes(role));
  let content = null;
  if (adminRoles) {
    content = <Outlet />;
  } else {
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }

  return content;
};

export default RequireAuth;
