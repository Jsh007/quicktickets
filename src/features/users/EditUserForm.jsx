import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-14 15:20:51
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-15 14:31:33
 * @FilePath: /mern_frontend_app2/src/features/users/EditUserForm.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";

const EditUserForm = ({ user }) => {
  const USER_REGEX = /^[A-z]{3,20}$/;
  const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

  const [updateUser, { isError, isSuccess, isLoading, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isError: isDelError, isSuccess: isDelSuccess, error: delError },
  ] = useDeleteUserMutation();

  // Prepare Navigation and State
  const navigate = useNavigate();
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  // Validate username and password
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // Prepare the <option> {role name} </option> jsx to be used in the <select> </select> form field element
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  // HANLDER FUNCTIONS
  const handleUsernameChanged = (e) => setUsername(e.target.value);
  const handlePasswordChanged = (e) => setPassword(e.target.value);
  const handleRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, // returns a HTML Collection
      (option) => option.value // Exctracts each option value from the HTML Collection returned above one by one.
    );
    setRoles(values);
  };

  const handleActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }
  // ERROR STYLES
  const errClass = isError ? "error" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !roles.length ? "form__input--incomplete" : "";
  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}> {errContent} </p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h1>Edit User</h1>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
              onClick={onSaveUserClicked}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap"> [3-20 letters] </span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={handleUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap"> [4-12 chars incl. !@#$%] </span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="pasword"
          type="password"
          autoComplete="off"
          value={password}
          onChange={handlePasswordChanged}
        />

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          className={`form__select ${validRolesClass}`}
          id="roles"
          name="roles"
          multiple={true}
          size="3"
          value={roles}
          onChange={handleRolesChanged}
        >
          {options}
        </select>
        <label className="form__label" htmlFor="user-active">
          ACTIVE:
          <input
            className="form__checkbox"
            type="checkbox"
            id="user-active"
            name="user-active"
            checked={active}
            onChange={handleActiveChanged}
          />
        </label>
      </form>
    </>
  );

  return content;
};

export default EditUserForm;
