import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getAllListings = createAsyncThunk(
    'listings/getAllListings',
    async ({
               op,
               postId,
               distance,
               belongLoggedUser,
               pendingApproval,
               archived,
               embed,
               sort,
               perPage
           }, {rejectWithValue}) => {
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
                //   "postId": postId,      //Base Listing's ID to get similar listings (optional) - Mandatory to get similar listings (when op=similar).
                // "distance": distance,  //Distance to get similar listings (optional) - Also optional when the type of similar listings is based on the current listing's category. Mandatory when the type of similar listings is based on the current listing's location. So, its usage is limited to get similar listings (when op=similar) based on the current listing's location.
                //      "belongLoggedUser": belongLoggedUser,  //Do listings are belonged the logged user? Authentication token need to be sent in the header, and the "op" parameter need be null or unset - Possible value: 0 or 1.
                //      "pendingApproval": pendingApproval,  //To list a user's listings in pending approval. Authentication token need to be sent in the header, and the "op" parameter need be null or unset - Possible value: 0 or 1.
                //      "archived": archived,  //To list a user's archived listings. Authentication token need to be sent in the header, and the "op" parameter need be null or unset - Possible value: 0 or 1.
                "embed": embed,   //Comma-separated list of the post relationships for Eager Loading - Possible values: user,category,parent,postType,city,savedByLoggedUser,pictures,latestPayment,package.
                "sort": sort,   //The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: created_at.
                "perPage": perPage,   //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100.
            };
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));

            fetch(url, {
                method: 'GET',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Content-Language": "en",
                    "X-AppApiToken": +process.env.REACT_APP_API_TOKEN,
                    "X-AppType": "docs",
                },
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
const allListingsSlice = createSlice({
    name: 'listsdata',
    initialState: {
        listsdata: [],
        entities: [],
        loading: 'idle',
        error: null
    },
    reducers: {
        reserveListings: (state, action) => {
            const listsdata = state.listsdata.find(
                (results) => results.id === action.payload,
            );
            listsdata.reserved = !listsdata.reserved;
        },
        myReservedListings: (state) => {
            const listsdata = state.listsdata.filter((listsdata) => (listsdata.reserved === true));
            state.reserved = listsdata;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllListings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllListings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.entities = action.payload;
            })
            .addCase(getAllListings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export const selectAllListings = (state) => state.entities;
export const listingsStatus = (state) => state.loading;
export const getListingsError = (state) => state.error;
export const getReservedListings = (state) => state.listsdata.reserved;
export const {reserveListings, myReservedListings} = allListingsSlice.actions;
export default allListingsSlice.reducer;