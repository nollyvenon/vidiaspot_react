import {createAsyncThunk} from "@reduxjs/toolkit";
import {au_api_headers} from "../services/au_api_headers";
import {api_headers} from "../services/api_headers";

export const listSettings = createAsyncThunk(
    'listSettings',
    async ({ }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}settings`
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

export const getSetting = createAsyncThunk(
    'getSetting',
    async ({ key }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}settings/${key}`
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
