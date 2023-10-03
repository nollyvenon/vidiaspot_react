import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {api_headers} from "../../services/api_headers";
import {api_post_headers} from "../../services/api_post_headers";
import {au_api_headers} from "../../services/au_api_headers";

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}auth/login`,
        { "email": email,
          "password": password,
          "auth_field": "email", },
          au_api_headers
      )

      // store user's token in local storage
      localStorage.setItem('userToken', data.extra['authToken'])

      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


