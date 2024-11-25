import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadPost = createAsyncThunk(
    'postSlice/loadPost',
    async (subreddit) => {
        const response = await fetch(`https://www.reddit.com/${subreddit}.json`);
        const json = await response.json();
        return json;
    }
);

export const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        isLoadingPost: false,
        failedToLoadPost: false
    },
    reducers: {},
    extraReducers: {
        [loadPost.pending]: (state, action) => {
            state.isLoadingPost = true;
            state.failedToLoadPost = false;
        },
        [loadPost.fulfilled]: (state, action) => {
            state.isLoadingPost = false;
            state.failedToLoadPost = false;
            state.posts = action.payload.data.children;
            console.log(state.posts);
        },
        [loadPost.rejected]: (state, action) => {
            state.isLoadingPost = false;
            state.failedToLoadPost = true;
        }
    }
});

export const selectPost = (state) => state.post.posts;
export const isLoadingPost = (state) => state.post.isLoadingPost;

export default postSlice.reducer;