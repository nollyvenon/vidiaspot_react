import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {api_headers} from "../api_headers";

const baseUrl = process.env.REACT_APP_API_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
        headers.append( "Content-Type", "application/json")
        headers.append("Accept", "application/json")
        headers.append("Content-Language", "en")
        headers.append("X-AppApiToken", "Bearer " + process.env.REACT_APP_API_TOKEN +"")
        headers.set("X-AppType", "docs")
        return headers
      }
    },
  }),
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: `${process.env.REACT_APP_API_URL}/users/${userId}`,
        method: 'GET',
        api_headers
      }),
    }),
  }),
})

// export react hook
export const { useGetUserDetailsQuery } = authApi
