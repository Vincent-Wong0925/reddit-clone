import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadSearchResult = createAsyncThunk(
    'searchSlice/loadSearchResult',
    async (term) => {
        const response = await fetch(`https://www.reddit.com/search.json?q=${term}`);
        const json = await response.json();
        return json;
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResult: {},
        isLoadingResult: false,
        failedToLoadResult: false
    },
    reducers: {},
    extraReducers: {
        [loadSearchResult.pending]: (state, action) => {
            state.isLoadingResult = true;
            state.failedToLoadResult = false;
        },
        [loadSearchResult.fulfilled]: (state, action) => {
            state.isLoadingResult = false;
            state.failedToLoadResult = false;
            console.log(action.payload);
        },
        [loadSearchResult.rejected]: (state, action) => {
            state.isLoadingResult = false;
            state.failedToLoadResult = true;
        }
    }
});

export const selectSearchResult = (state) => state.search.searchResult;
export const isLoadingResult = (state) => state.search.isLoadingResult;
export const failedToLoadResult = (state) => state.search.failedToLoadResult;
export default searchSlice.reducer;