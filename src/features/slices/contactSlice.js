import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_headers} from "../../services/api_headers";

export const contactUs = createAsyncThunk(
    'contactUs',
    async ({ first_name, last_name, email, phone, message, ip_addr}, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}contact`
            );

            fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: api_headers,
		body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "phone": phone,
                "message": message,
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

export const reportPost = createAsyncThunk(
    'reportPost',
    async ({ postId, report_type_id, email , message, captcha_key }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}/posts/${postId}/report`
            );

	    let body = {
                "report_type_id": report_type_id,
    		"email": email,
    		"message": message,
    		"captcha_key": captcha_key 
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