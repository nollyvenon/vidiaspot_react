import {createAsyncThunk} from "@reduxjs/toolkit";
import {au_api_headers} from "../../services/au_api_headers";
import {api_headers} from "../../services/api_headers";

export const getPicture = createAsyncThunk(
    'getPicture',
    async ({ pictureId  }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}pictures/${pictureId}`
            );

            const params = {
                "embed": "null",   //The list of the picture relationships separated by comma for Eager Loading.
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

export const storePicture = createAsyncThunk(
    'storePicture',
    async ({ country_code, count_packages, count_payment_methods, post_id, pictures }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}pictures`
            );

            const params = {
                "embed": "null",   //The list of the picture relationships separated by comma for Eager Loading.
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

            let body = {
                "country_code": { country_code },
                "count_packages": { count_packages },
                "count_payment_methods": { count_payment_methods },
                "post_id": { post_id },
                "pictures": { pictures }  //The payment method's ID (required when the selected package's price is > 0).
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

export const deletePicture = createAsyncThunk(
    'deletePicture',
    async ({ picId, postId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}pictures/${picId}`  //The ID of the picture.
            );

            let body = {
                "post_id": { postId }   // The post's ID.
            };

            fetch(url, {
                method: 'DELETE',
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

export const reorderPicture = createAsyncThunk(
    'reorderPicture',
    async ({ picId, postId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}pictures/reorder`  //The ID of the picture.
            );

            let body = {
                "post_id": { postId },  // The post's ID.
                "body": "ut"
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

export const listPictures = createAsyncThunk(
    'listPictures',
    async ({ postId, latest, limit }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}posts/${postId}/pictures`  //The ID of the picture.
            );

            const params = {
                "embed": "null",  //The list of the picture relationships separated by comma for Eager Loading. Possible values: post.  (optional)
                "postId": { postId }, //List of pictures related to a post (using the post ID). (optional)
                "latest": { latest },  //Get only the first picture after ordering (as object instead of collection). (data type: boolean e.g 0)(optional)
                "sort": "-position",  //The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: position, created_at.(optional)
                "perPage": { limit },  //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100.  (optional)
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

            fetch(url, {
                method: 'POST',
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
