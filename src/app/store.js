import { configureStore } from '@reduxjs/toolkit';
import subredditSliceReducers from '../features/subreddit/subredditSlice';
import postSliceReducers from '../features/post/postSlice';
import commentSliceReducers from '../features/comment/commentslice';

export const store = configureStore({
  reducer: {
    subreddit: subredditSliceReducers,
    post: postSliceReducers,
    comment: commentSliceReducers
  },
});
