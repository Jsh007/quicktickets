import { selectNotesById, useGetNotesQuery } from "./notesApiSlice";

/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-11 22:49:43
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 14:22:31
 * @FilePath: /quicktickets_frontend/src/features/notes/Note.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
// import { selectUsersById } from "../users/usersApiSlice";
import { useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "../auth/authSlice";

const Note = ({ noteId }) => {
  // const token = useSelector(selectCurrentToken);
  // const note = useSelector((state) => selectNotesById(state, noteId));
  // console.log(note);

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  const navigate = useNavigate();

  if (note) {
    const createdDate = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
    const updatedDate = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
    const handleEdit = () => navigate(`/dash/notes/${noteId}`);
    // const handleEdit = (note) => navigate(`/dash/notes/edit/${note.id}`)

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__title"> {note.title} </td>
        <td className="table__cell note__username">{note.username}</td>
        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedNote = memo(Note);
export default memoizedNote;
