import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {api_headers} from "../../services/api_headers";
import {api_post_headers} from "../../services/api_post_headers";
import {au_api_headers} from "../../services/au_api_headers";
import { setMessage } from "../slices/messageSlice";
import 'regenerator-runtime/runtime';

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
}

const user = JSON.parse(localStorage.getItem("user"));

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {

      const { response  } = await axios.post(
        `${process.env.REACT_APP_API_URL}auth/login`,
        { "email": email,
          "password": password,
          "auth_field": "email", },
          au_api_headers
      )

      // store user's token in local storage
      localStorage.setItem('userToken', data.extra['authToken'])
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;

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

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ fullname, email, password, phone, phone_country, country_code, language_code, ip_addr }, { rejectWithValue }) => {
      try {

          fetch(`${process.env.REACT_APP_API_URL}users`, {
              method: 'POST',
              mode: "cors",
              headers: au_api_headers,
              body: JSON.stringify({
                  "name": fullname,
                  "email": email,
                  "password": password,
                  "phone": phone,
                  "accept_terms": "1",
                  "accept_marketing_offers": "1",
                  "time_zone": "America/New_York",
                  "auth_field": "email",
                  "captcha_key": "wwwwwwwwwwww",
                  "user_type_id": "1",
                  "ip_addr": ip_addr,
                  "phone_country": phone_country,
                  "country_code": country_code,
                  "language_code": language_code,
              })
          }).then(response => {
              return response.json()
          })
      } catch (error) {
          if (error.response && error.response.data.message) {
              return rejectWithValue(error.response.data.message)
          } else {
              return rejectWithValue(error.message)
          }
      }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer
