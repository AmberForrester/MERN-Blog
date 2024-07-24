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
        SignInStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        SignInSuccess: (state, action) => { // Storing the payload with the information we need to store in the state. 
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }, 
    }
});

export const {SignInStart, SignInSuccess, signInFailure} = userSlice.actions; 
// Export these functions to use in other places of our application. 


export default userSlice.reducer; 