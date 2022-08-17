import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import articleSlice from './articleSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    articles: articleSlice,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
