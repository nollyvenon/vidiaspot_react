import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_post_headers} from "../services/api_post_headers";
import {api_headers} from "../services/api_headers";

export const getPostTypes = createAsyncThunk(
    'getPostTypes',
    async ({ }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}postTypes`
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

export const getPostType = createAsyncThunk(
    'getPostType',
    async ({ typeId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}postTypes/${typeId}`   //The listing type's ID.
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

export const getReportTypes = createAsyncThunk(
    'getReportTypes',
    async ({ }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}reportTypes`
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

export const getReportType = createAsyncThunk(
    'getReportType',
    async ({ typeId }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}reportTypes/${typeId}`   //The report type's ID.
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

export const listListing = createAsyncThunk(
    'listListing',
    async ({ op, postId, distance, belongLoggedUser, pendingApproval, archived, embed, sort, perPage}, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}posts`
            );

            const op = !op ? "null" : op;
            const postId = !postId ? '0' : postId;
            const distance = !distance ? 0 : distance;
            const belongLoggedUser = !belongLoggedUser ? '1' : belongLoggedUser;
            const pendingApproval = !pendingApproval ? 0 : pendingApproval;
            const archived = !archived ? '0' : archived;
            const embed = !embed ? "null" : embed;
            const sort = !sort ? 'created_at' : sort;
            const perPage = !perPage ? '20' : perPage;

            const params = {
                "op": op,       //Type of listings list (optional) - Possible value: search,sponsored,latest,similar.
                "postId": postId,      //Base Listing's ID to get similar listings (optional) - Mandatory to get similar listings (when op=similar).
                "distance": distance,  //Distance to get similar listings (optional) - Also optional when the type of similar listings is based on the current listing's category. Mandatory when the type of similar listings is based on the current listing's location. So, its usage is limited to get similar listings (when op=similar) based on the current listing's location.
                "belongLoggedUser": belongLoggedUser,  //Do listings are belonged the logged user? Authentication token need to be sent in the header, and the "op" parameter need be null or unset - Possible value: 0 or 1.
                "pendingApproval": pendingApproval,  //To list a user's listings in pending approval. Authentication token need to be sent in the header, and the "op" parameter need be null or unset - Possible value: 0 or 1.
                "archived": archived,  //To list a user's archived listings. Authentication token need to be sent in the header, and the "op" parameter need be null or unset - Possible value: 0 or 1.
                "embed": embed,   //Comma-separated list of the post relationships for Eager Loading - Possible values: user,category,parent,postType,city,savedByLoggedUser,pictures,latestPayment,package.
                "sort": sort,   //The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: created_at.
                "perPage": perPage,   //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100.
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

export const getListing = createAsyncThunk(
    'getListing',
    async ({ unactivatedIncluded, belongLoggedUser, noCache, embed, detailed }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}posts/${postId}`   //The post Id
            );
            const unactivatedIncluded = !unactivatedIncluded ? 1 : unactivatedIncluded;
            const belongLoggedUser = !belongLoggedUser ? '0' : belongLoggedUser;

            const params = {
                "unactivatedIncluded": "1",  //Include or not unactivated entries - Possible value: 0 or 1.
                "belongLoggedUser": "0",    //Does the listing is belonged the logged user? - Possible value: 0 or 1.
                "noCache": "0",             //Disable the cache for this request - Possible value: 0 or 1.
                "embed": "user,postType",   //Comma-separated list of the post relationships for Eager Loading - Possible values: user,category,parent,postType,city,savedByLoggedUser,pictures,latestPayment,package,fieldsValues.
                "detailed": "0",            //Allow to get the listing's details with all its relationships (No need to set the 'embed' parameter).
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

export const AddListing = createAsyncThunk(
    'addlisting',
    async ({ category_id, post_type_id, title, description, contact_name, auth_field, phone, phone_country, city_id, accept_terms, email, country_code, admin_code, price, negotiable, ip_addr, accept_marketing_offers, tags, package_id, payment_method_id, pictures }, { rejectWithValue }) => {
        try {

            fetch(`${process.env.REACT_APP_API_URL}posts`, {
                method: 'POST',
                mode: "cors",
                headers: api_post_headers,
                body: JSON.stringify({
                    "category_id": category_id,
                    "post_type_id": post_type_id,
                    "title": title,
                    "description": description,
                    "contact_name": contact_name,
                    "auth_field": "email",
                    "phone": phone,
                    "phone_country": phone_country,
                    "city_id": city_id,
                    "accept_terms": accept_terms,
                    "email": email,
                    "country_code": country_code,
                    "admin_code": admin_code,
                    "price": price,
                    "negotiable": negotiable,
                    "phone_hidden": "",
                    "ip_addr": ip_addr,
                    "accept_marketing_offers": accept_marketing_offers,
                    'is_permanent': '',
                    'tags': tags,
                    'package_id': package_id,
                    'payment_method_id': payment_method_id,
                    'captcha_key': 'vero',
                    'pictures[]': document.querySelector('input[name="pictures[]"]').files[0]

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

export const archiveListing = createAsyncThunk(
    'archivelisting',
    async ({ listing_id }, { rejectWithValue }) => {
        try {

            fetch(`${process.env.REACT_APP_API_URL}posts/${listing_id}/offline`, {
                method: 'PUT',
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

export const repostListing = createAsyncThunk(
    'repostlisting',
    async ({ listing_id }, { rejectWithValue }) => {
        try {

            fetch(`${process.env.REACT_APP_API_URL}posts/${listing_id}/repost`, {
                method: 'PUT',
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

export const updateListing = createAsyncThunk(
    'updatelisting',
    async ({ listing_id, category_id, post_type_id, title, description, contact_name, auth_field, phone, phone_country, city_id, accept_terms, email, country_code, admin_code, price, negotiable, ip_addr, accept_marketing_offers, tags, package_id, payment_method_id, pictures }, { rejectWithValue }) => {
        try {

            fetch(`${process.env.REACT_APP_API_URL}posts/${listing_id}`, {
                method: 'PUT',
                mode: "cors",
                headers: api_post_headers,
                body: JSON.stringify({
                    "category_id": category_id,
                    "post_type_id": post_type_id,
                    "title": title,
                    "description": description,
                    "contact_name": contact_name,
                    "auth_field": "email",
                    "phone": phone,
                    "phone_country": phone_country,
                    "city_id": city_id,
                    "accept_terms": accept_terms,
                    "email": email,
                    "country_code": country_code,
                    "admin_code": admin_code,
                    "price": price,
                    "negotiable": negotiable,
                    "phone_hidden": "",
                    "ip_addr": ip_addr,
                    "accept_marketing_offers": accept_marketing_offers,
                    'is_permanent': '',
                    'tags': tags,
                    'package_id': package_id,
                    'payment_method_id': payment_method_id,
                    'captcha_key': 'vero',
                    'pictures[]': document.querySelector('input[name="pictures[]"]').files[0]

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

export const deleteListing = createAsyncThunk(
    'deletelisting',
    async ({ listing_ids }, { rejectWithValue }) => {
        try {  // where listing_ids is the ID or comma-separated IDs list of listing(s)

            fetch(`${process.env.REACT_APP_API_URL}posts/${listing_ids}`, {
                method: 'DELETE',
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

export const resendEmailLink = createAsyncThunk(
    'resendEmailLink',
    async ({ listingId }, { rejectWithValue }) => {
        try {
            const url = new URL(
                `${process.env.REACT_APP_API_URL}posts/${listingId}/verify/resend/email`
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
    async ({ listingId }, { rejectWithValue }) => {
        try {
            const url = new URL(
                `${process.env.REACT_APP_API_URL}posts/${listingId}/verify/resend/sms`
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
            const token = !token ? process.env.REACT_APP_API_TOKEN : token;  //The verification token.
            const field = !field ? 'email' : field;  //The field to verify.
            const url = new URL(
                `${process.env.REACT_APP_API_URL}posts/verify/${field}/${token}`
            );
            const params = {
                "entitySlug": "users",   //The slug of the entity to verify ('users' or 'posts').
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