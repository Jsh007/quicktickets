/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-09 15:31:09
 * @LastEditors: Joshua Eigbe jeigbe@gmail.com
 * @LastEditTime: 2024-01-27 23:40:40
 * @FilePath: /quicktickets_frontend/src/features/notes/notesApiSlice.js
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = notesAdapter?.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: "/notes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        // console.log(responseData);
        // const idField = {responseData.id}
        // const responseObject = [...responseData];
        // console.log(responseObject);
        // console.log(responseData);

        // if (!responseData.length) {
        //   loadedNotes = [];
        // }

        let loadedNotes = responseData?.map((note) => {
          note.id = note._id;
          return note;
        });

        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        } else return [{ type: "Note", id: "LIST" }];
      },
    }),
    addNewNote: builder.mutation({
      query: (initialNoteData) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNoteData,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNoteData) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNoteData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: "/notes",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// Return the query results object

const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// Create memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data // This returns normalized state object with ids and entities
);

// getSelectors creates these selectors and here we're renaming them with aliases using destructuring

export const {
  selectAll: selectAllNotes,
  selectById: selectNotesById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
