import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_headers} from "../../services/api_headers";
import {au_api_headers} from "../../services/au_api_headers";

export const listPayments = createAsyncThunk(
    'payments',
    async ({ limit }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}payments`
            );

            const params = {
                "embed": "null",
                "sort": "created_at",
                "perPage": { limit },
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

export const getPaymentInfo = createAsyncThunk(
    'getPaymentInfo',
    async ({ payId  }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}payments/${payId}`
            );

            const params = {
                "embed": "null",  //Comma-separated list of the payment relationships for Eager Loading - Possible values: post,paymentMethod,package,currency. (optional)
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

//Note: This endpoint is only available for the multi steps post edition.
export const storePayment = createAsyncThunk(
    'storePayment',
    async ({ countryId, postId, packageName, packageId, PayMethodId  }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}payments`
            );

            const params = {
                "package": packageName,  //The package's ID (Auto filled when the query parameter 'package' is set). (optional)
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

            let body = {
                "country_code": { countryId },
                "post_id": { postId },
                "package_id": { packageId },  //The package's ID (Auto filled when the query parameter 'package' is set).
                "payment_method_id": { PayMethodId }  //The payment method's ID (required when the selected package's price is > 0).
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