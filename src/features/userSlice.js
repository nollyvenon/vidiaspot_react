import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {api_headers} from "../../services/api_headers";
import {api_post_headers} from "../../services/api_post_headers";
import {au_api_headers} from "../../services/au_api_headers";

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ fullname, email, password, phone, phone_country, country_code, language_code, ip_addr }, { rejectWithValue }) => {
        try {

            fetch(`${process.env.REACT_APP_API_URL}users`, {
                method: 'POST',
                mode: "cors",
                headers: au_api_headers,
                body: JSON.stringify({
                    "name": fullname,
                    "email": email,
                    "password": password,
                    "phone": phone,
                    "accept_terms": "1",
                    "accept_marketing_offers": "1",
                    "time_zone": "America/New_York",
                    "auth_field": "email",
                    "captcha_key": "wwwwwwwwwwww",
                    "user_type_id": "1",
                    "ip_addr": ip_addr,
                    "phone_country": phone_country,
                    "country_code": country_code,
                    "language_code": language_code,
                })
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

/*export const logout = createAsyncThunk(
    'auth/logout',
    async ({ userId }, { rejectWithValue }) => {
        try {

            const { data } =  await axios.get(
                `${process.env.REACT_APP_API_URL}auth/logout/${userId}`,
                api_headers
            )

            localStorage.setItem('userToken', null)
            return data;

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)*/

export const updateUser = createAsyncThunk(
    'updateUser',
    async ({ userId, fullname, email, password, phone, phone_country, country_code, language_code, user_type_id, gender_id, ip_addr }, { rejectWithValue }) => {
        try {

            fetch(`${process.env.REACT_APP_API_URL}users/${userId}`, {
                method: 'PUT',
                mode: "cors",
                headers: au_api_headers,
                body: JSON.stringify({
                    "name": fullname,
                    "email": email,
                    "password": password,
                    "phone": phone,
                    "auth_field": "email",
                    "phone_country": phone_country,
                    "country_code": country_code,
                    "language_code": language_code,
                    "user_type_id": user_type_id,
                    "gender_id": gender_id,
                    "ip_addr": ip_addr,
                    "accept_terms": "1",
                    "accept_marketing_offers": "1",
                    "time_zone": "America/New_York",
                    "captcha_key": "",
                    'disable_comments': '1',
                    "photo": document.querySelector('input[name="photo"]').files[0]
                })
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



export const resendEmailLink = createAsyncThunk(
    'resendEmailLink',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const url = new URL(
                `${process.env.REACT_APP_API_URL}users/${userId}/verify/resend/email`
            );
            const params = {
                "entitySlug": "users",
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

export const resendSMSLink = createAsyncThunk(
    'resendSMSLink',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const url = new URL(
                `${process.env.REACT_APP_API_URL}users/${userId}/verify/resend/sms`
            );
            const params = {
                "entitySlug": "users",
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

export const userVerification = createAsyncThunk(
    'userVerification',
    async ({ field, token }, { rejectWithValue }) => {
        try {
            const token = !token ? process.env.REACT_APP_API_TOKEN : token;
            const field = !field ? 'email' : field;
            const url = new URL(
                `${process.env.REACT_APP_API_URL}users/verify/${field}/${token}`
            );
            const params = {
                "entitySlug": "users",
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

            fetch(url, {
                method: 'GET',
                mode: "cors",
                headers: au_api_headers
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

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async ({ email, password, phone, phone_country, captcha_key }, { rejectWithValue }) => {
        try {

            fetch(`${process.env.REACT_APP_API_URL}auth/password/email`, {
                method: 'POST',
                mode: "cors",
                headers: au_api_headers,
                body: JSON.stringify({
                    "email": email,
                    "auth_field": "email",   //The user's auth field ('email' or 'phone').
                    "phone": "null",          //The user's mobile phone number (Required when 'auth_field' value is 'phone').
                    "phone_country": "null",  //The user's phone number's country code (Required when the 'phone' field is filled).
                    "captcha_key": "eos"      //Key generated by the CAPTCHA endpoint calling (Required when the CAPTCHA verification is enabled from the Admin panel).
                })
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

export const ResetPasswordToken = createAsyncThunk(
    'auth/ResetPasswordToken',
    async ({ code }, { rejectWithValue }) => {
        try {

            fetch(`${process.env.REACT_APP_API_URL}auth/password/token`, {
                method: 'POST',
                mode: "cors",
                headers: au_api_headers,
                body: JSON.stringify({
                    "code": code,
                })
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

export const ResetPassword = createAsyncThunk(
    'auth/ResetPassword',
    async ({ code, token, password, phone_country, phone, password_confirmation, captcha_key }, { rejectWithValue }) => {
        try {

            fetch(`${process.env.REACT_APP_API_URL}auth/password/reset `, {
                method: 'POST',
                mode: "cors",
                headers: au_api_headers,
                body: JSON.stringify({
                    "code": code,
                    "token": token,
                    "password": password,
                    "phone_country": phone_country,
                    "auth_field": "email",
                    "phone": phone,
                    "password_confirmation": password_confirmation,
                    "captcha_key": captcha_key
                })
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