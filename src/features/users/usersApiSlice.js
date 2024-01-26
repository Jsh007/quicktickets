/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-09 15:31:09
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 08:44:07
 * @FilePath: /quicktickets_frontend/src/features/users/usersApiSlice.js
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter?.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: { ...initialUserData },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: { ...initialUserData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// Return the query results object

const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Create memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // This returns normalized state object with ids and entities
);

// getSelectors creates these selectors and here we're renaming them with aliases using destructuring

export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
