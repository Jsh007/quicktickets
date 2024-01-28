/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-24 09:54:30
 * @LastEditors: Joshua Eigbe jeigbe@gmail.com
 * @LastEditTime: 2024-01-28 13:19:39
 * @FilePath: /quicktickets_frontend/src/features/notes/EditNote.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import EditNoteForm from "./EditNoteForm";
import { PulseLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useParams } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams();
  const { username, id: userId, isAdmin, isManager } = useAuth();
  // Get this note
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({ note: data?.entities[id] }),
  });

  // Get all users
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color={"#fff"} />;

  if (!isManager || !isAdmin) {
    // Better to use id because username can change
    // if (note.user !== userId) {
    //   return <p className="errmsg">Access Denied !</p>;
    // }

    // You may use username if it is prefected in the getNotes() query and spread into the notes data coming from the backend.
    if (note.username !== username) {
      return <p className="errmsg">Access Denied !</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};

export default EditNote;
