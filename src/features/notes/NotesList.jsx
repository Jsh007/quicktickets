/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-11 14:40:29
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-25 14:58:11
 * @FilePath: /quicktickets_frontend/src/features/notes/NotesList.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import useAuth from "../../hooks/useAuth";
import Note from "./Note";
import { useGetNotesQuery } from "./notesApiSlice";

const NotesList = () => {
  const { username, isAdmin, isManager } = useAuth();

  const {
    data: notes,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids, entities } = notes;
    console.log(notes);

    let filteredIds;
    if (isAdmin || isManager) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username // Find a way to create notes that has a username field in addition to existing user field.
      );
    }
    // console.log(filteredIds);
    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />); // Returns a row of notes data to the table

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Status
            </th>
            <th scope="col" className="table__th note_title">
              Title
            </th>
            <th scope="col" className="table__th note_username">
              Owner
            </th>
            <th scope="col" className="table__th note_edit">
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

export default NotesList;
