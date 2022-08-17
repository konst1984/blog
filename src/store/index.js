import { configureStore } from '@reduxjs/toolkit';

import articleSlice from './articleSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    articles: articleSlice,
    user: userSlice,
  },
});
