import EditNoteForm from "./EditNoteForm";
// import { selectAllUsers } from "../users/usersApiSlice";
import { selectNotesById } from "./notesApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditNote = () => {
  // const users = useSelector(selectAllUsers);
  const { id } = useParams();
  const note = useSelector((state) => selectNotesById(state, id));
  const content = note ? <EditNoteForm note={note} /> : `<p>Loading...</p>`;

  return content;
};

export default EditNote;
