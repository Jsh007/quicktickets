/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-24 09:54:30
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-25 23:03:41
 * @FilePath: /quicktickets_frontend/src/features/notes/EditNote.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import EditNoteForm from "./EditNoteForm";
import { selectAllUsers } from "../users/usersApiSlice";
// import { selectAllUsers } from "../users/usersApiSlice";
import { selectNotesById } from "./notesApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditNote = () => {
  // const users = useSelector(selectAllUsers);
  const { id } = useParams();
  const note = useSelector((state) => selectNotesById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};

export default EditNote;
