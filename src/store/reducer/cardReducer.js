import { createSlice } from '@reduxjs/toolkit';



export const cardSlice = createSlice({
    name: 'card',
    initialState: {
        isLoading: false,
        cards: [],
        card: null
    },
    reducers: {
        postNewCard: (state, action) => {
            state.isLoading = true;
        },
        postNewCardDone: (state, action) => {
            console.log(action.payload)
            state.card = action.payload
            state.isLoading = false;
        },
        postNewCardFailure: (state, action) => {
            state.isLoading = false;
        },
        getAllCard: (state, action) => {
            state.isLoading = true;
        },
        getAllCardDone: (state, action) => {
            console.log(action)
            state.isLoading = false;
            state.cards = action.payload
        },
        getAllCardFailure: (state, action) => {
            state.isLoading = false;
        },
        updateCardTitle: (state, action) => {
            state.isLoading = true;
        },
        updateCardTitleDone: (state, action) => {
            state.isLoading = false;
            state.card = action.payload
        },
        updateCardTitleFailure: (state, action) => {
            state.isLoading = false;
        },
        updateCardDescription: (state, action) => {
            state.isLoading = true;
        },
        updateCardDescriptionDone: (state, action) => {
            state.isLoading = false;
            state.card = action.payload
        },
        updateCardDescriptionFailure: (state, action) => {
            state.isLoading = false;
        },
        updateCardCover: (state, action) => {
            state.isLoading = true;
        },
        updateCardCoverDone: (state, action) => {
            state.isLoading = false;
            state.card = action.payload
        },
        updateCardCoverFailure: (state, action) => {
            state.isLoading = false;
        },
        updateCardDueDate: (state, action) => {
            state.isLoading = true;
        },
        updateCardDueDateDone: (state, action) => {
            state.isLoading = false;
            state.card = action.payload
        },
        updateCardDueDateFailure: (state, action) => {
            state.isLoading = false;
        },
        updateCardColumnId: (state, action) => {
            state.isLoading = true;
        },
        updateCardColumnIdDone: (state, action) => {
            state.isLoading = false;
            state.card = action.payload
        },
        updateCardColumnIdFailure: (state, action) => {
            state.isLoading = false;
        },
        postNewTasklist: (state, action) => {
            state.isLoading = true;
        },
        postNewTasklistDone: (state, action) => {
            console.log(action.payload)
            state.card = action.payload
            state.isLoading = false;
        },
        postNewTasklistFailure: (state, action) => {
            state.isLoading = false;
        },
        postNewTask: (state, action) => {
            state.isLoading = true;
        },
        postNewTaskDone: (state, action) => {
            console.log(action.payload)
            state.card = action.payload
            state.isLoading = false;
        },
        postNewTaskFailure: (state, action) => {
            state.isLoading = false;
        },
        updateTaskName: (state, action) => {
            state.isLoading = true;
        },
        updateTaskNameDone: (state, action) => {
            console.log(action.payload)
            state.card = action.payload
            state.isLoading = false;
        },
        updateTaskNameFailure: (state, action) => {
            state.isLoading = false;
        },
        updateTaskState: (state, action) => {
            state.isLoading = true;
        },
        updateTaskStateDone: (state, action) => {
            console.log(action.payload)
            state.card = action.payload
            state.isLoading = false;
        },
        updateTaskStateFailure: (state, action) => {
            state.isLoading = false;
        },

    }
    
})
export const { postNewCard, postNewCardDone, postNewCardFailure, getAllCard, getAllCardDone, getAllCardFailure,
    updateCardTitle, updateCardTitleDone, updateCardTitleFailure, updateCardDescription, updateCardDescriptionDone, updateCardDescriptionFailure,
    updateCardCover, updateCardCoverDone, updateCardCoverFailure, updateCardDueDate, updateCardDueDateDone, updateCardDueDateFailure, updateCardColumnId,
    updateCardColumnIdDone, updateCardColumnIdFailure, postNewTasklist, postNewTasklistDone, postNewTasklistFailure,
    postNewTask, postNewTaskDone, postNewTaskFailure, updateTaskName, updateTaskNameDone, updateTaskNameFailure, updateTaskState, updateTaskStateDone, updateTaskStateFailure
    } = cardSlice.actions
export default cardSlice.reducer;