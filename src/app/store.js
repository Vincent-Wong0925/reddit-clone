import { configureStore } from '@reduxjs/toolkit';
import searchSliceReducers from '../features/search/searchSlice';
import subredditSliceReducers from '../features/subreddit/subredditSlice';

export const store = configureStore({
  reducer: {
    search: searchSliceReducers,
    subreddit: subredditSliceReducers
  },
});
