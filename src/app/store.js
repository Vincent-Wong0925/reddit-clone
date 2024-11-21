import { configureStore } from '@reduxjs/toolkit';
import searchSliceReducers from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchSliceReducers,
  },
});
