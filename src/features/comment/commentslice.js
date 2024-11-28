import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadComments = createAsyncThunk(
    'commentSlice/loadComments',
    async ({id, permalink}) => {
        const response = await fetch(`https://www.reddit.com${permalink}.json`);
        const json = await response.json();
        return {
            id: id,
            json: json
        };
    }
);

export const commentSlice = createSlice({
    name:'comment',
    initialState: {
        comments: {},
        isLoadingComments: false,
        failedToLoadComments: false
    },
    reducers: {},
    extraReducers: {
        [loadComments.pending]: (state, action) => {
            state.isLoadingComments = true;
            state.failedToLoadComments = false;
        },
        [loadComments.fulfilled]: (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = false;
            state.comments[action.payload.id] = action.payload.json[1].data.children;
        },
        [loadComments.rejected]: (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = true;
        }
    }
});

export const selectComments = (state) => state.comment.comments;
export const isLoadingComments = (state) => state.comment.isLoadingComments;
export default commentSlice.reducer;