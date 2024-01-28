import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "./notesApiSlice";
/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-15 11:07:34
 * @LastEditors: Joshua Eigbe jeigbe@gmail.com
 * @LastEditTime: 2024-01-28 15:49:48
 * @FilePath: /quicktickets_frontend/src/features/notes/EditNoteForm.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const EditNoteForm = ({ note, users }) => {
  //   console.log(note);
  // Prepare REGEX
  //   const TITLE_REGEX = /^[A-z]$/;
  const TITLE_REGEX = /[a-zA-Z]+/;
  const TEXT_REGEX = /[a-zA-Z]+/;
  // Prepare form state for editable fields
  const [title, setTitle] = useState(note.title);
  const [validTitle, setValidTitle] = useState(false);
  const [text, setText] = useState(note.text);
  const [validText, setValidText] = useState(false);
  const [completed, setCompleted] = useState(note.completed);

  const { username, isAdmin, isManager } = useAuth();

  const [owner, setOwner] = useState(note.user);
  // const [ownerId, setOwnerId] = useState(note.user || "");

  // Field Refs
  // const statusRef = useRef();

  // Prepare RTK mutation actions
  // const user = useSelector((state) => selectUsersById(state, note.user));
  // const allUsers = useSelector(selectAllUsers);
  // console.log(allUsers);

  const [updateNote, { isError, isSuccess, isLoading, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isError: isDelError, isSuccess: isDelSuccess, error: delError },
  ] = useDeleteNoteMutation();

  //   console.log(user);
  // Validate fields
  useEffect(() => {
    setValidTitle(TITLE_REGEX.test(title));
  }, [title]);

  useEffect(() => {
    setValidText(TEXT_REGEX.test(text));
  }, [text]);

  // Update Note Staus realtime
  //   useEffect(() => {
  //  const newStatus = statusRef.current.value
  //   }, [completed])
  // Prepare Navigation object
  const navigate = useNavigate();

  // Prepare to navigate back to Notes list on successful mutation actions using UseEffect
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setCompleted(null);
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  let options;

  if (isAdmin || isManager) {
    options = users.map((user) => {
      const { id, username } = user;
      return (
        <option key={id} value={id}>
          {username}
        </option>
      );
    });
  } else {
    options = (
      <option key="1" value={owner}>
        {username}
      </option>
    );
  }

  // Prepare handlers
  const handleTitleChanged = (e) => setTitle(e.target.value);
  const handleTextChanged = (e) => setText(e.target.value);
  const handleStatusChanged = () => setCompleted((prev) => !prev);
  const handleOwnerChanged = (e) => {
    // console.log(e.target.selectedOptions);
    setOwner(e.target.value);
    // console.log(owner);
    // console.log(e.target.selectedOptions.innerText);
  };

  const handleSaveNote = async () => {
    // console.log(users);
    // const [{ username }] = users.filter((user) => {
    //   return user.id === owner;
    // });

    // console.log(username);
    await updateNote({
      id: note.id,
      user: owner,
      // username: username,
      title,
      text,
      completed,
    });
  };

  const handleDeleteNote = async () => {
    await deleteNote({ id: note.id });
  };

  //

  let canSave;
  if (title) {
    canSave = [validTitle, validText].every(Boolean) && !isLoading;
  } else {
    canSave = [validText].every(Boolean) && !isLoading;
  }

  // ERROR STYLES
  const errClass = isError ? "error" : "offscreen";
  const validTitleClass = !validTitle ? "form__input--incomplete" : "";
  const validTextClass = !validText ? "form__input--incomplete" : "";
  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button className="icon-button" title="Delete" onClick={handleDeleteNote}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const content = (
    <>
      <p className={errClass}> {errContent} </p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h1>Edit Note</h1>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
              onClick={handleSaveNote}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>

        <label className="form__label" htmlFor="title">
          Title: <span className="nowrap"> [20-150 letters] </span>
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={handleTitleChanged}
        />

        <label className="form__label" htmlFor="text">
          NOTE CONTENT: <span className="nowrap"> [20-300] </span>
        </label>
        <textarea
          className={`form__textarea ${validTextClass}`}
          rows="6"
          name="text"
          value={text}
          onChange={handleTextChanged}
        />

        <label className="form__label" htmlFor="note-status">
          STATUS:
          <input
            className="form__checkbox"
            type="checkbox"
            id="note-status"
            name="note-status"
            checked={completed}
            onChange={handleStatusChanged}
          />
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </label>

        <label className="form__label" htmlFor="owner">
          ASSIGNED TO:
        </label>
        <select
          className={`form__select`}
          id="owner"
          name="owner"
          //   multiple={true}
          //   size="3"
          value={owner}
          onChange={handleOwnerChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

export default EditNoteForm;
