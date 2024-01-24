/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-12 14:36:21
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-15 09:48:55
 * @FilePath: /mern_frontend_app2/src/features/users/NewUserForm.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROLES } from "../../config/roles";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isError, isSuccess, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const handleUsernameChanged = (e) => setUsername(e.target.value);
  const handlePasswordChanged = (e) => setPassword(e.target.value);
  const handleRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, // returns a HTML Collection
      (option) => option.value // Exctracts each option value from the HTML Collection returned above one by one.
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };
  // Prepare the <option> {role name} </option> jsx to be used in the <select> </select> form field element
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  // Error CSS styles
  const errClass = isError ? "error" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !roles.length ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}> {error?.data.message} </p>
      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h1>New User</h1>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
              onClick={onSaveUserClicked}
            >
              <FontAwesomeIcon icon={faSave} />
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
      </form>
    </>
  );

  return content;
};

export default NewUserForm;
