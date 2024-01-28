/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-11 00:29:27
 * @LastEditors: Joshua Eigbe jeigbe@gmail.com
 * @LastEditTime: 2024-01-27 23:04:04
 * @FilePath: /quicktickets_frontend/src/features/users/User.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
// import { useSelector } from "react-redux";
import { useGetUsersQuery } from "./usersApiSlice";
// import { selectUsersById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const User = ({ userId }) => {
  // const user = useSelector((state) => selectUsersById(state, userId));

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");
    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row usrer">
        <td className={`table__cell ${cellStatus}`}> {user.username} </td>
        <td className={`table__cell ${cellStatus}`}> {userRolesString} </td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedUser = memo(User);
export default memoizedUser;
