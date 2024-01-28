/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-12 14:37:10
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 22:53:42
 * @FilePath: /quicktickets_frontend/src/features/notes/NewNote.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import NewNoteForm from "./NewNoteForm";
import { PulseLoader } from "react-spinners";
import { useGetUsersQuery } from "../users/usersApiSlice";

const NewNote = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#fff"} />;
  const content = <NewNoteForm users={users} />;
  return content;
};

export default NewNote;
