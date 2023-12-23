import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/slices/userSlice.js';
//import listingsReducer from '../features/slices/allListingsSlice.js';
import listingsReducer from '../features/slices/listingSlice.js';
import currentLocationReducer from '../features/slices/currentLocationSlice.js';
import listReviewsReducer from '../features/slices/reviews/reviewSlice.js';

const store = configureStore({
    reducer: {
        users: userReducer,
        listings: listingsReducer,
        userlocation: currentLocationReducer,
        reviews: listReviewsReducer,
    },
});

export default store;