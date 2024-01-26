/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-23 16:04:39
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 09:19:14
 * @FilePath: /quicktickets_frontend/src/features/auth/PersistLogin.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { Link, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import React from "react";
import { selectCurrentToken } from "./authSlice";
import useAuth from "../../hooks/useAuth";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";

const PersistLogin = () => {
  // const { roles } = useAuth();

  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSucess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        console.log("...verifying Refresh Token");
        try {
          //const response =
          await refresh();
          // const {accessToken} = response.data;
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    // Persist: no
    console.log("No persist");
    content = <Outlet />;
  } else if (isLoading) {
    // persist: yes, token: no
    console.log("Loading");
    content = <p>Loading..</p>;
  } else if (isError) {
    // persist: yes, token: no
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSucess) {
    // persist: yes, token: yes
    console.log("Success!");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // persist: yes, token: yes
    console.log("token and uninit !");
    console.log(isUninitialized);
    // console.log(roles);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
