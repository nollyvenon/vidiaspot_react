import {createAsyncThunk} from "@reduxjs/toolkit";
import {au_api_headers} from "../services/au_api_headers";
import {api_headers} from "../services/api_headers";

export const listLanguages = createAsyncThunk(
    'listLanguages',
    async ({ excludedFromFooter, sort, pageLimit }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}languages`
            );

            fetch(url, {
                method: 'GET',
                mode: "cors",
                headers: api_headers,
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


export const getLanguage = createAsyncThunk(
    'getLanguage',
    async ({ code }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}languages/${code}`   //The language's code.
            );

            fetch(url, {
                method: 'GET',
                mode: "cors",
                headers: api_headers,
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
