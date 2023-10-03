import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_headers} from "../services/api_headers";

export const listCategories = createAsyncThunk(
    'listCategories',
    async ({ page, perPage }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}categories`
            );

            const params = {
                "parentId": "0",
                "nestedIncluded": "0",
                "embed": "null",
                "sort": "-lft",
                "perPage": perPage,
                "page": page,
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

export const getACategory = createAsyncThunk(
    'getACategory',
    async ({ slugOrId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}categories/${slugOrId}`
            );

            const params = {
                "parentCatSlug": slugOrId,
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

export const listCategoryFields_get = createAsyncThunk(
    'listCategoryFields_get',
    async ({ categoryId, langCode, postId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}categories/${categoryId}/fields`   //The ID of the category.
            );
            const langCode = !langCode ? "en" : langCode;

            let body = {
                "language_code": langCode,  //The code of the user's spoken language.
                "post_id": postId  //The unique ID of the post.
            };

            fetch(url, {
                method: 'GET',
                mode: "cors",
                headers: api_headers,
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

export const listCategoryFields_post = createAsyncThunk(
    'listCategoryFields_post',
    async ({ categoryId, langCode, postId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}categories/${categoryId}/fields`   //The ID of the category.
            );
            const langCode = !langCode ? "en" : langCode;

            let body = {
                "language_code": langCode,  //The code of the user's spoken language.
                "post_id": postId  //The unique ID of the post.
            };

            fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: api_headers,
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