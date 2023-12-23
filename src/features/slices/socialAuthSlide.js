import {createAsyncThunk} from "@reduxjs/toolkit";
import {au_api_headers} from "../../services/au_api_headers";
import {api_headers} from "../../services/api_headers";

export const getTargetUrl = createAsyncThunk(
    'getTargetUrl',
    async ({ provider }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}auth/${provider}`      //The provider's name - Possible values: facebook, linkedin, or google.
            );

            fetch(url, {
                method: 'GET',
                mode: "cors",
                headers: au_api_headers,
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

export const getUserInfo = createAsyncThunk(
    'getUserInfo',
    async ({ provider }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}auth/${provider}/callback`      //The provider's name - Possible values: facebook, linkedin, or google.
            );

            fetch(url, {
                method: 'GET',
                mode: "cors",
                headers: au_api_headers,
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