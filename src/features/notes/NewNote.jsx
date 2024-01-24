/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-12 14:37:10
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-23 14:16:45
 * @FilePath: /mern_frontend_app2/src/features/notes/NewNote.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import NewNoteForm from "./NewNoteForm";
import { selectAllUsers } from "../users/usersApiSlice";
import { useSelector } from "react-redux";

const NewNote = () => {
  const users = useSelector(selectAllUsers);
  // const owner = { ...users[0], id: users[0]._id };
  if (!users?.length) return <p> Not currently available</p>;
  const content = <NewNoteForm users={users} />;
  return content;
};

export default NewNote;
