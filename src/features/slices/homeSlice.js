import {createAsyncThunk} from "@reduxjs/toolkit";
import {au_api_headers} from "../../services/au_api_headers";
import {api_headers} from "../../services/api_headers";

export const homeSections = createAsyncThunk(
    'homeSections',
    async ({ }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}homeSections`
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

//Get category by its unique slug or ID.
export const getSection = createAsyncThunk(
    'getSection',
    async ({ method, parentCatSlug }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}homeSections/${method}`   //The key/method of the section. e.g. getCategories
            );

	    const params = {
    		"parentCatSlug": parentCatSlug,  //The slug of the parent category to retrieve used when category's slug provided instead of ID. e.g. automobiles
	    };
	    Object.keys(params)
    		.forEach(key => url.searchParams.append(key, params[key]));

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
