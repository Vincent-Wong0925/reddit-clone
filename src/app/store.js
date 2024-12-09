import { configureStore } from '@reduxjs/toolkit';
import subredditSliceReducers from '../features/subreddit/subredditSlice';
import postSliceReducers from '../features/post/postSlice';
import commentSliceReducers from '../features/comment/commentslice';

export const storeConfig = {
  reducer: {
    subreddit: subredditSliceReducers,
    post: postSliceReducers,
    comment: commentSliceReducers
  }
};
export const store = configureStore(storeConfig);