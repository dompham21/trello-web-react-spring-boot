import { createSlice } from '@reduxjs/toolkit';



export const columnSlice = createSlice({
    name: 'column',
    initialState: {
        isLoading: false,
        columns: [],
        column: null
    },
    reducers: {
        postNewColumn: (state, action) => {
            state.isLoading = true;
        },
        postNewColumnDone: (state, action) => {
            state.isLoading = false;
            state.column = action.payload;
        },
        postNewColumnFailure: (state, action) => {
            state.isLoading = false;
        },
        getAllColumn: (state, action) => {
            state.isLoading = true;
        },
        getAllColumnDone: (state, action) => {
            state.isLoading = false;
            state.columns = action.payload
        },
        getAllColumnFailure: (state, action) => {
            state.isLoading = false;
        },

    }
    
})
export const { postNewColumn, postNewColumnDone, postNewColumnFailure, getAllColumn, getAllColumnDone, getAllColumnFailure } = columnSlice.actions
export default columnSlice.reducer;