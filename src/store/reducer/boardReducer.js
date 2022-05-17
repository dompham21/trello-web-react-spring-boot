import { createSlice } from '@reduxjs/toolkit';



export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        isLoading: false,
        boards: [],
        board: null
    },
    reducers: {
        postNewBoard: (state, action) => {
            state.isLoading = true;
        },
        postNewBoardDone: (state, action) => {
            state.isLoading = false;
        },
        postNewBoardFailure: (state, action) => {
            state.isLoading = false;
        },
        getAllBoard: (state, action) => {
            state.isLoading = true;
        },
        getAllBoardDone: (state, action) => {
            state.boards = action.payload;
            state.isLoading = false;

        },
        getAllBoardFailure: (state, action) => {
            state.isLoading = false;
        },
        getBoardById: (state, action) => {
            state.isLoading = true;
        },
        getBoardByIdDone: (state, action) => {
            state.isLoading = false;
            state.board = action.payload;
        },
        getBoardByIdFailure: (state, action) => {
            state.isLoading = false;
        },

    }
    
})
export const { postNewBoard, postNewBoardDone, postNewBoardFailure, getAllBoard, getAllBoardDone, getAllBoardFailure,
    getBoardById, getBoardByIdDone, getBoardByIdFailure} = boardSlice.actions
export default boardSlice.reducer;