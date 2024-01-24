/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-11 14:38:19
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-23 15:15:17
 * @FilePath: /mern_frontend_app2/src/components/DashHeader.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();

  // useEffect(() => {
  //   // console.log(isSuccess);
  //   // console.log(isError);
  //   // console.log(error);
  //   if (isSuccess) {
  //     navigate("/");
  //   }
  // }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging out...</p>;

  if (isError) return <p> {error.data?.message} </p>;

  const handleLogout = () => {
    // Find a safer way to log out
    sendLogout();
    navigate("/");
  };

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) ||
    !NOTES_REGEX.test(pathname) ||
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const content = (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add nav buttons later */}
          {logoutButton}
        </nav>
      </div>
    </header>
  );

  return content;
};

export default DashHeader;
