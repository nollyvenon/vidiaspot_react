import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_headers} from "../services/api_headers";

export const listPackages = createAsyncThunk(
    'listPackages',
    async ({  }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}packages`
            );

            const params = {
                "embed": "null",
                "sort": "-lft",
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

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

export const getPackage = createAsyncThunk(
    'getPackage',
    async ({ packageId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}packages/${packageId}`
            );

            const params = {
                "embed": "currency",
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

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