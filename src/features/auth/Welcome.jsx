/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-09 14:25:29
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-23 16:12:39
 * @FilePath: /mern_frontend_app2/src/features/auth/Welcome.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { Link } from "react-router-dom";
import { selectCurrentToken } from "./authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Welcome = () => {
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    // console.log(token);
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome!</h1>

      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">Add New Note</Link>
      </p>

      <p>
        <Link to="/dash/users">View User Settings</Link>
      </p>

      <p>
        <Link to="/dash/users/new">Add New User</Link>
      </p>
    </section>
  );

  return content;
};

export default Welcome;
