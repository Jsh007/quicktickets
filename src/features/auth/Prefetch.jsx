/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-14 16:21:05
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-14 16:57:17
 * @FilePath: /mern_frontend_app2/src/features/auth/Prefetch.jsx
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
    console.log("subscribing ...");
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing ...");
      notes.unsubscribe();
      users.unsubscribe();
    };

    // store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
    // store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
  }, []);

  return <Outlet />;
};

export default Prefetch;
