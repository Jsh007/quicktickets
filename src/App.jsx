/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-11 13:44:04
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-23 23:08:54
 * @FilePath: /mern_frontend_app2/src/App.jsx
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import "./App.css";

import { Route, Routes } from "react-router-dom";

import DashLayout from "./components/DashLayout";
import EditNote from "./features/notes/EditNote";
import EditUser from "./features/users/EditUser";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import NewNote from "./features/notes/NewNote";
import NewUserForm from "./features/users/NewUserForm";
import NotesList from "./features/notes/NotesList";
import PersistLogin from "./features/auth/PersistLogin";
import Prefetch from "./features/auth/Prefetch";
import Public from "./components/Public";
import UsersList from "./features/users/UsersList";
import Welcome from "./features/auth/Welcome";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="new" element={<NewUserForm />} />
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
          {/* END OF DASH ROUTES */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
