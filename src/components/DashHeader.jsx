/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-11 14:38:19
 * @LastEditors: Joshua Eigbe jeigbe@gmail.com
 * @LastEditTime: 2024-01-28 23:02:10
 * @FilePath: /quicktickets_frontend/src/components/DashHeader.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  faFileCirclePlus,
  faFilePen,
  faRightFromBracket,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isAdmin, isManager } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isError, error, isSuccess }] =
    useSendLogoutMutation();

  // useEffect(() => {
  //   console.log(pathname);
  // }, []);

  // useEffect(() => {
  //   // console.log(isSuccess);
  //   // console.log(isError);
  //   // console.log(error);
  //   // if(isSuccess) navigate("/");
  //   navigate("/");
  // }, [sendLogout]);

  // if (isLoading) return <p>Logging out...</p>;

  // if (isError) return <p> {error.data?.message} </p>;

  // Buttons methods
  const handleNewNoteClicked = () => navigate("/dash/notes/new");
  const handleNewUserClicked = () => navigate("/dash/users/new");
  const handleNotesClicked = () => navigate("/dash/notes");
  const handleUsersClicked = () => navigate("/dash/users");

  const handleLogout = () => {
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

  // Buttons
  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={handleNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }
  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={handleNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }
  let notesButton = null;
  if (isAdmin || isManager) {
    if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
      notesButton = (
        <button
          className="icon-button"
          title="Notes"
          onClick={handleNotesClicked}
        >
          <FontAwesomeIcon icon={faFilePen} />
        </button>
      );
    }
  }

  let usersButton = null;
  if (isManager || isAdmin) {
    if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
      usersButton = (
        <button
          className="icon-button"
          title="Users"
          onClick={handleUsersClicked}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Loading Logout...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {usersButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <>
      <p className={errClass}> {error?.data?.message} </p>

      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">
            {/* add nav buttons later */}
            {buttonContent}
            {/* {logoutButton} */}
          </nav>
        </div>
      </header>
    </>
  );

  return content;
};

export default DashHeader;
