import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";
import config from "../lib/config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.urlApi}/api`,
    paramsSerializer: (params) => {
      return queryString.stringify(params, { arrayFormat: "none" });
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    feed: builder.query({
      query: (params) => ({
        url: "/feed",
        params,
      }),
      transformResponse: (res) => res.result,
    }),
  }),
});

export const { useFeedQuery } = apiSlice;
