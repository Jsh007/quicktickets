/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-14 16:21:05
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 14:11:39
 * @FilePath: /quicktickets_frontend/src/features/auth/Prefetch.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */

import { Outlet } from "react-router-dom";
import { notesApiSlice } from "../notes/notesApiSlice";
import { store } from "../../app/store";
import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";

const Prefetch = () => {
  useEffect(() => {
    // console.log("subscribing ...");
    // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "notesList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );

    // return () => {
    //   console.log("unsubscribing ...");
    //   notes.unsubscribe();
    //   users.unsubscribe();
    // };
  }, []);

  return <Outlet />;
};

export default Prefetch;
