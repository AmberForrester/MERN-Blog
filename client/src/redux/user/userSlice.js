import { createSlice } from "@reduxjs/toolkit";


// Create some initial values. 
const initialState = {
    currentUser: null,
    error: null, 
    loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { // Reducers have special functions that perform actions = sign in start, sign in success, or sign in failure. 
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        signInSuccess: (state, action) => { // Storing the payload with the information we need to store in the state. 
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }, 

        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },

        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        deleteSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
        },

        deleteFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        signOutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        }

    },
});

export const { signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure, deleteStart, deleteSuccess, deleteFailure, signOutSuccess } = userSlice.actions; 
// Export these functions to use in other places of our application. 


export default userSlice.reducer; 