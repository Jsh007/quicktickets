/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-11 22:49:43
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-15 12:46:35
 * @FilePath: /mern_frontend_app2/src/features/notes/Note.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { selectNotesById } from "./notesApiSlice";
import { selectUsersById } from "../users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNotesById(state, noteId));
  const { username } = useSelector((state) =>
    selectUsersById(state, note.user)
  );
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
        <td className="table__cell note__username"> {username} </td>
        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default Note;
