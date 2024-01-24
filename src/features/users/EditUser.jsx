import EditUserForm from "./EditUserForm";
import { selectUsersById } from "./usersApiSlice";
/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-12 14:35:47
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-14 16:10:50
 * @FilePath: /mern_frontend_app2/src/features/users/EditUser.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditUser = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUsersById(state, id));
  const content = user ? <EditUserForm user={user} /> : <p>Loading ...</p>;

  return content;
};

export default EditUser;
