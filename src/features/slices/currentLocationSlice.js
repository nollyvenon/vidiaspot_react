import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const getUserLocation = createAsyncThunk(
    'userlocation/getUserLocation',
    async (thunkAPI) => {
        /*
             const userLocation = {
                 countryName: [data.country_name],
                 countryCode: [data.country_code],
                 country_code_iso3: [data.country_code_iso3],
                 country_calling_code: [data.country_calling_code],
                 city: [data.city],
                 region: [data.region],
                 country_capital: [data.country_capital],
                 ip: [data.ip],
                 continent_code: [data.continent_code],
                 network: [data.network],
                 timezone: [data.timezone],
                 currency: [data.currency],
                 languages: [data.languages],
                 postal: [data.postal],
                 latitude: [data.latitude],
                 longitude: [data.longitude],
             };
            */
        return await fetch('https://ipapi.co/json/').then(
            (data) => data.json()
        )

    })

const getUserLocationSlice = createSlice({
    name: 'userlocation',
    initialState: {
        entities: [],
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserLocation.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getUserLocation.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.entities = action.payload;
            })
            .addCase(getUserLocation.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            });
    }
});


export default getUserLocationSlice.reducer;