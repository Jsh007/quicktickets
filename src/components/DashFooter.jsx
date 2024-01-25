/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-11 14:39:12
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-25 00:01:18
 * @FilePath: /quicktickets_frontend/src/components/DashFooter.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleHomeClick = () => navigate("/dash");

  let HomeButton = null;
  if (pathname !== "/dash") {
    HomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={handleHomeClick}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer">
      {HomeButton}
      <p>Current User: {username} </p>
      <p>Status: {status} </p>
    </footer>
  );
  return content;
};

export default DashFooter;
