import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isLodingResult } from "../search/searchSlice";

export const loadSubredditsList = createAsyncThunk(
    'subredditSlice/loadSubredditsList',
    async () => {
        const response = await fetch('https://www.reddit.com/reddits.json');
        const json = await response.json();
        return json;
    }
);

/*
{
    DISPLAY_NAME: {
        name: DISPLAY_NAME_PREFIXED,
        url: URL,
        icon: ICON_IMG
    }
}
*/

export const subredditSlice = createSlice({
    name: 'subreddit',
    initialState: {
        subredditsList: [],
        isLoadingSubreddit: false,
        failedToLoadSubreddit: false
    },
    reducers: {},
    extraReducers: {
        [loadSubredditsList.pending]: (state, action) => {
            state.isLodingResult = true;
            state.failedToLoadSubreddit = false;
        },
        [loadSubredditsList.fulfilled]: (state, action) => {
            state.isLoadingSubreddit = false;
            state.failedToLoadSubreddit = false;
            action.payload.data.children.forEach(subreddit => {
                const { display_name, display_name_prefixed, url, icon_img, id} = subreddit.data;
                state.subredditsList.push({
                    name: display_name_prefixed,
                    url: url,
                    icon: icon_img ,
                    id: id
                });
            });
        },
        [loadSubredditsList.rejected]: (state, action) => {
            state.isLoadingSubreddit = false;
            state.failedToLoadSubreddit = true;
        }
    }
});

export const selectSubredditsList = (state) => state.subreddit.subredditsList;
export const isLoadingSubreddit = (state) => state.subreddit.isLoadingSubreddit;
export default subredditSlice.reducer;