/*
 * @Author: Joshua Eigbe self@joshuaeigbe.com
 * @Github: https://github.com/jsh007
 * @Date: 2024-01-11 14:28:18
 * @LastEditors: Joshua Eigbe self@joshuaeigbe.com
 * @LastEditTime: 2024-01-26 09:27:16
 * @FilePath: /quicktickets_frontend/src/app/api/apiSlice.js
 * @copyrightText: Copyright (c) Joshua Eigbe. All Rights Reserved.
 * @Description: See Github repo
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    // console.log(token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args); // url, method and body
  // console.log(api); // dispatch, getState, signal
  // console.log(extraOptions); // custom options set by developer
  let result = await baseQuery(args, api, extraOptions);

  // console.log(result);

  // If the request was rejected with a status 403 (forbidden) which  means the initial access token has expired
  if (result?.error?.status === 403) {
    console.log("sending refresh token ..");

    // Send a refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    // console.log(refreshResult);
    if (refreshResult?.data) {
      // Save the new token to state
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // Retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your access token has expired";
      }
    }
    return refreshResult;
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User"],
  endpoints: () => ({}),
});
