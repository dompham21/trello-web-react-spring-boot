import { createSlice } from "@reduxjs/toolkit";



export const backgroundSlice = createSlice({
    name: "background",
    initialState: {
        backgrounds: [],
        isLoading: false
    },
    reducers: {
        getAllBackgrounds: (state, action) => {
            state.isLoading = true;
        },
        getAllBackgroundDone: (state, action) => {
            state.backgrounds = action.payload;
            state.isLoading = false;
        },
        getAllBackgroundsFailure: (state, action) => {
            state.isLoading = false;
        }
    }
    
})
export const { getAllBackgrounds, getAllBackgroundDone, getAllBackgroundsFailure } = backgroundSlice.actions
export default backgroundSlice.reducer;