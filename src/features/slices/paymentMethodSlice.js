import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_headers} from "../../services/api_headers";

export const listPaymentMethods = createAsyncThunk(
    'paymentMethods',
    async ({ limit }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}paymentMethods`
            );

            const params = {
                "countryCode": "US",
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

export const getpaymentMethod = createAsyncThunk(
    'getpaymentMethod',
    async ({ payId  }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}paymentMethods/${payId}`
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