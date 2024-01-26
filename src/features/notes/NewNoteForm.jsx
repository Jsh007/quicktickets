/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-15 11:01:47
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 08:50:55
 * @FilePath: /quicktickets_frontend/src/features/notes/NewNoteForm.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewNoteMutation } from "./notesApiSlice";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NewNoteForm = ({ users }) => {
  const TITLE_REGEX = /[a-zA-Z]+/;
  const TEXT_REGEX = /[a-zA-Z]+/;

  // Prepare form state for editable fields
  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [text, setText] = useState("");
  const [validText, setValidText] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [usersList, setUsersList] = useState(users);

  const { username: authUser, isAdmin, isManager } = useAuth();

  const [owner, setOwner] = useState(authUser);

  // Validate fields
  useEffect(() => {
    setValidTitle(TITLE_REGEX.test(title));
  }, [title]);

  useEffect(() => {
    setValidText(TEXT_REGEX.test(text));
  }, [text]);

  // Prepare Navigation object
  const navigate = useNavigate();

  // Prepare RTK mutation actions calls
  const [addNote, { isError, isSuccess, isLoading, error }] =
    useAddNewNoteMutation();

  // Prepare to navigate back to Notes list on successful mutation actions using UseEffect
  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setCompleted(null);
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  // Prepare Select Field options (ASSIGNED TO )

  let options;

  if (isAdmin || isManager) {
    options = users.map((user) => {
      const { _id: id, username } = user;
      return (
        <option key={id} value={username}>
          {username}
        </option>
      );
    });
  } else {
    options = (
      <option key="1" value={authUser}>
        {authUser}
      </option>
    );
  }

  // Prepare handlers
  const handleTitleChanged = (e) => setTitle(e.target.value);
  const handleTextChanged = (e) => setText(e.target.value);
  const handleOwnerChanged = (e) => {
    // console.log(e.target.selectedOptions);
    setOwner(e.target.value);
  };

  const handleSaveNote = async () => {
    const [{ id, username }] = usersList.filter(
      (user) => user.username === owner
    );
    // console.log(username, owner);
    // console.log(id);

    await addNote({
      user: id,
      username,
      title,
      text,
      completed,
    });
  };

  // Prepare  Save Note

  let canSave = [validTitle, validText].every(Boolean) && !isLoading;

  // ERROR STYLES
  const errClass = isError ? "error" : "offscreen";
  const validTitleClass = !validTitle ? "form__input--incomplete" : "";
  const validTextClass = !validText ? "form__input--incomplete" : "";
  const errContent = error?.data?.message ?? "";

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
          CONTENT: <span className="nowrap"> [20-300] </span>
        </label>
        <textarea
          className={`form__textarea ${validTextClass}`}
          rows="6"
          name="text"
          value={text}
          onChange={handleTextChanged}
        />

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

export default NewNoteForm;
