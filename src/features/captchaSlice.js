import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_headers} from "../services/api_headers";

//Calling this endpoint is mandatory if the captcha is enabled in the Admin panel. Return a JSON data with an 'img' item that contains the captcha image to show and a 'key' item that contains the generated key to send for validation.
export const getCaptcha = createAsyncThunk(
    'getCaptcha',
    async ({ slugOrId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}captcha`
            );

            fetch(url, {
                method: 'GET',
                mode: "cors",
                headers: api_headers
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
