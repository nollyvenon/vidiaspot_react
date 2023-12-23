import {createAsyncThunk} from "@reduxjs/toolkit";
import {au_api_headers} from "../../services/au_api_headers";
import {api_headers} from "../../services/api_headers";

export const listSearch = createAsyncThunk(
    'listSearch',
    async ({ embed, sort, pageLimit }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}savedSearches`
            );
            let embed = embed ? embed : "null";
            let sort = sort ? sort : "created_at";
            let pageLimit = pageLimit ? pageLimit : 20;

            const params = {
                "embed": { embed },    //The Comma-separated list of the category relationships for Eager Loading - Possible values: user,country.
                "sort": { sort },  //The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: created_at.
                "perPage": { pageLimit },  //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100.
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

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

export const storeSearch = createAsyncThunk(
    'storeSearch',
    async ({ query, count_posts }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}savedSearches`
            );

            let body = {
                "url": { query },  //Search URL to save.
                "count_posts": { count_posts }  // The number of posts found for the URL.
            };

            fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: au_api_headers,
                body: JSON.stringify(body),
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

export const getSavedSearch = createAsyncThunk(
    'getSavedSearch',
    async ({ searchId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}savedSearches/${searchId}`
            );
            const params = {
                "embed": "null",           //The Comma-separated list of the category relationships for Eager Loading - Possible values: user,country,pictures,postType,category,city,country.
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

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
export const deleteSavedSearch = createAsyncThunk(
    'deleteSavedSearch',
    async ({ query }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}savedSearches/${query}`
            );
            const params = {
                "embed": "null",           //The Comma-separated list of the category relationships for Eager Loading - Possible values: user,country,pictures,postType,category,city,country.
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

            fetch(url, {
                method: 'DELETE',
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
