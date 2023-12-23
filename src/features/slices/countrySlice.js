import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_headers} from "../../services/api_headers";

export const listCountries = createAsyncThunk(
    'listCountries',
    async ({  }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}countries`
            );

            const embed = !embed ? "null" : embed;
            const includeNonActive = !includeNonActive ? '0' : includeNonActive;
            const iti = !iti ? 0 : iti;
            const countryCode = !countryCode ? "null" : countryCode;
            const sort = !sort ? 'created_at' : sort;
            const perPage = !perPage ? '20' : perPage;

            const params = {
                "embed": embed,   //Comma-separated list of the post relationships for Eager Loading - Possible values: currency,continent. (Optional)
                "includeNonActive": includeNonActive,   //Allow to include the non-activated countries in the list. Type: Boolean (Optional)
                "iti": iti,  //Allow to get the countries list for the phone number input (No other parameters need except 'countryCode'). Type: Boolean (Optional)
                "countryCode": countryCode,  //The code of the current country (Only when the 'iti' parameter is filled to true). (Optional)
                "sort": sort,   //e.g(-name) The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: name. (Optional)
                "perPage": perPage,   //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100. (Optional)
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

export const getCountry = createAsyncThunk(
    'getCountry',
    async ({ countryCode }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}countries/${countryCode}`     //e.g (DE) The country's ISO 3166-1 code.
            );

            const params = {
                "embed": "currency",    //Comma-separated list of the country relationships for Eager Loading - Possible values: currency.
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

export const listAdminDivisions1 = createAsyncThunk(
    'listAdminDivisions1',
    async ({ countryCode, page, embed, sort, perPage }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}countries/${countryCode}/subAdmins1`     //e.g (DE) The country code of the country of the cities to retrieve.
            );
            const embed = !embed ? "null" : embed;
            const sort = !sort ? '-name' : sort;
            const perPage = !perPage ? '20' : perPage;
            const page = !page ? '1' : page;

            const params = {
                "embed": embed,   //Comma-separated list of the administrative division (1) relationships for Eager Loading - Possible values: country.
                "sort": sort,       //e.g. -name   The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: name.
                "perPage": perPage,   //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100.
                "page": page,       //Items page number. From 1 to ("total items" divided by "items per page value - perPage").
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

export const listAdminDivisions2 = createAsyncThunk(
    'listAdminDivisions2',
    async ({ countryCode, page, embed, sort, perPage }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}countries/${countryCode}/subAdmins2`     //e.g (DE) The country code of the country of the cities to retrieve.
            );
            const embed = !embed ? "null" : embed;
            const sort = !sort ? '-name' : sort;
            const perPage = !perPage ? '20' : perPage;
            const page = !page ? '1' : page;

            const params = {
                "embed": embed,   //Comma-separated list of the administrative division (1) relationships for Eager Loading - Possible values: country.
                "sort": sort,       //e.g. -name   The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: name.
                "perPage": perPage,   //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100.
                "page": page,       //Items page number. From 1 to ("total items" divided by "items per page value - perPage").
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

export const listCities = createAsyncThunk(
    'listCities',
    async ({ countryCode, page, embed, sort, perPage }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}countries/${countryCode}/cities`     //e.g (DE) The country code of the country of the cities to retrieve.
            );
            const embed = !embed ? "null" : embed;
            const sort = !sort ? '-name' : sort;
            const perPage = !perPage ? '20' : perPage;
            const page = !page ? '1' : page;

            const params = {
                "embed": embed,   //Comma-separated list of the city relationships for Eager Loading - Possible values: country,subAdmin1,subAdmin2.
                "sort": sort,       //e.g. -name   string|array The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: name,population.
                "perPage": perPage,   //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100.
                "page": page,       //Items page number. From 1 to ("total items" divided by "items per page value - perPage").
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

export const getAdminDivision1 = createAsyncThunk(
    'getAdminDivision1',
    async ({ adminDivisionCode1 }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}subAdmins1/${adminDivisionCode1}`     //e.g (CH.VD) The administrative division (1)'s code.
            );
            const embed = !embed ? "null" : embed;

            const params = {
                "embed": embed,   //Comma-separated list of the administrative division (1) relationships for Eager Loading - Possible values: country.
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

export const getAdminDivision2 = createAsyncThunk(
    'getAdminDivision2',
    async ({ adminDivisionCode2 }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}subAdmins2/${adminDivisionCode2}`     //e.g (CH.VD) The administrative division (2)'s code.
            );
            const embed = !embed ? "null" : embed;

            const params = {
                "embed": embed,   //Comma-separated list of the administrative division (2) relationships for Eager Loading - Possible values: country,subAdmin1.
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

export const getCities = createAsyncThunk(
    'getCities',
    async ({ cityID }, { rejectWithValue }) => {
        try {  //
            const url = new URL(
                `${process.env.REACT_APP_API_URL}cities/${cityID}`     //e.g (12544) The city's ID.
            );
            const embed = !embed ? "country" : embed;

            const params = {
                "embed": embed,   //Comma-separated list of the city relationships for Eager Loading - Possible values: country,subAdmin1,subAdmin2.
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