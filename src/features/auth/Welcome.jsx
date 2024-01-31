/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-09 14:25:29
 * @LastEditors: Joshua Eigbe jeigbe@gmail.com
 * @LastEditTime: 2024-01-31 13:17:06
 * @FilePath: /quicktickets_frontend/src/features/auth/Welcome.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { Link } from "react-router-dom";
import { selectCurrentToken } from "./authSlice";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  useTitle("TechNotes Dashboard");
  const { username, isAdmin, isManager } = useAuth();

  // const navigate = useNavigate();
  // const token = useSelector(selectCurrentToken);

  // useEffect(() => {
  //   // console.log(token);
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome! {username} </h1>

      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">Add New Note</Link>
      </p>

      {(isAdmin || isManager) && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}

      {(isAdmin || isManager) && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );

  return content;
};

export default Welcome;
