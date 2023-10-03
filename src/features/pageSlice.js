import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_headers} from "../services/api_headers";

export const listPages = createAsyncThunk(
    'listPages',
    async ({ limit }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}pages`
            );

            const params = {
                "excludedFromFooter": "0",   //Select or unselect pages that can list in footer. ( optional  )
                "sort": "-lft",   //The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: lft, created_at.  ( optional  )
                "perPage": {limit},
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

export const getPage = createAsyncThunk(
    'getPage',
    async ({ slugOrId  }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}pages/${slugOrId}`
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