import {createAsyncThunk} from "@reduxjs/toolkit";
import {au_api_headers} from "../../services/au_api_headers";
import {api_headers} from "../../services/api_headers";

export const listSavedPosts = createAsyncThunk(
    'listSavedPosts',
    async ({ country, embed, sort, pageLimit  }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}savedPosts`
            );
            let embed = embed ? embed : "null";
            let sort = sort ? sort : "created_at";
            let pageLimit = pageLimit ? pageLimit : 20;
            let country = country ? country : "US";

            const params = {
                "country_code": { country }, //The code of the user's country.
                "embed": { embed },    //The Comma-separated list of the category relationships for Eager Loading - Possible values: post,city,pictures,user.
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

//Store/Delete saved listing
export const storeSavedPosts = createAsyncThunk(
    'storeSavedPosts',
    async ({ postId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}savedPosts`
            );

            let body = {
                "post_id": { postId }              //The post/listing's ID.
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

export const deleteSavedPosts = createAsyncThunk(
    'deleteSavedPosts',
    async ({ postId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}savedPosts/${postId}`  //The ID or comma-separated IDs list of saved post/listing(s).
            );

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
