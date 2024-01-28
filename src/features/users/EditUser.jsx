import EditUserForm from "./EditUserForm";
import { PulseLoader } from "react-spinners";
// import { selectUsersById } from "./usersApiSlice";
import { useGetUsersQuery } from "./usersApiSlice";
/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-12 14:35:47
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 14:42:43
 * @FilePath: /quicktickets_frontend/src/features/users/EditUser.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

const EditUser = () => {
  const { id } = useParams();
  // const user = useSelector((state) => selectUsersById(state, id));
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <PulseLoader color={"#fff"} />;

  const content = <EditUserForm user={user} />;

  return content;
};

export default EditUser;
