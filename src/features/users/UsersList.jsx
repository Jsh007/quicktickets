/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-09 14:45:34
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 09:15:55
 * @FilePath: /quicktickets_frontend/src/features/users/UsersList.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */

import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";

const UsersList = () => {
  const {
    data: users,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    // console.log(users);
    const { ids } = users;
    const tableContent =
      ids.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__name">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default UsersList;
