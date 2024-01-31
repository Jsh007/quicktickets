/*
 * @Author: Joshua Eigbe jeigbe@gmail.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-24 09:54:30
 * @LastEditors: Joshua Eigbe jeigbe@gmail.com
 * @LastEditTime: 2024-01-31 13:21:08
 * @FilePath: /quicktickets_frontend/src/features/auth/PersistLogin.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { Link, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { PulseLoader } from "react-spinners";
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSucess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "production") {
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
    content = <PulseLoader color={"#fff"} />;
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
