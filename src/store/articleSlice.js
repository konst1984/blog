import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchGetRequest } from '../utilites/helpers';

export const fetchShortArticles = createAsyncThunk('articles/fetchShortArticles', fetchGetRequest);
export const fetchSingleArticle = createAsyncThunk('articles/fetchFullArticle', fetchGetRequest);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const url = getState().articles.url;
    try {
      const response = await fetch(`${url}/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Can not delete article, request status ${response.statusText}`);
      }
      dispatch(delFulLArticle());
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addNewArticle = createAsyncThunk(
  'articles/addNewArticle',
  async function ({ title, description, body, tagList }, { rejectWithValue }) {
    try {
      const response = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`Can not add new article, request status ${response.statusText}`);
      }
      const data = await response.json();

      console.log(data);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const editArticle = createAsyncThunk(
  'articles/editArticle',
  async function ({ title, description, body, tagList }, { rejectWithValue, getState }) {
    const url = getState().articles.url;
    const slug = getState().articles.fullArticle.slug;
    try {
      const response = await fetch(`${url}/articles/${slug}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList,
          },
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error(`Can not edit article, request status ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLikeCounts = createAsyncThunk(
  'articles/fetchLikeCounts',
  async function (slug, { rejectWithValue, getState }) {
    const url = getState().articles.url;
    try {
      const response = await fetch(`${url}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Can not add like, request status ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};
const pending = (state) => {
  state.status = 'loading';
  state.error = false;
};

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    url: 'https://blog.kata.academy/api',
    status: null,
    error: false,
    articlesCount: 0,
    limitItemsOnPage: 20,
    offsetArticles: 0,
    currentPage: 1,
    fullArticle: null,
    tags: [],
  },
  reducers: {
    switchPage(state, action) {
      state.currentPage = action.payload.page;
      state.offsetArticles = action.payload.page * state.limitItemsOnPage;
    },

    delFulLArticle(state) {
      state.fullArticle = null;
    },
  },
  extraReducers: {
    [fetchShortArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [fetchShortArticles.fulfilled]: (state, action) => {
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount / state.limitItemsOnPage;
      state.status = 'fulfilled';
      state.error = false;
    },
    [fetchShortArticles.rejected]: setError,
    [fetchSingleArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [fetchSingleArticle.fulfilled]: (state, action) => {
      state.fullArticle = action.payload.article;
      state.tags = action.payload.article.tagList;
      state.status = 'fulfilled';
      state.error = false;
    },
    [fetchSingleArticle.rejected]: setError,
    [deleteArticle.pending]: pending,
    [deleteArticle.fulfilled]: (state) => {
      state.status = 'fulfilled';
      state.error = false;
    },
    [deleteArticle.rejected]: setError,
    [addNewArticle.pending]: pending,
    [addNewArticle.rejected]: setError,
    [addNewArticle.fulfilled]: (state) => {
      // state.tags = [];
      state.status = 'fulfilled';
      state.error = false;
    },
    [editArticle.pending]: pending,
    [editArticle.rejected]: setError,
    [fetchLikeCounts.pending]: pending,
    [fetchLikeCounts.fulfilled]: (state) => {
      state.status = 'fulfilled';
      state.error = false;
    },
    [fetchLikeCounts.rejected]: setError,
  },
});
export const { switchPage, addTag, delFulLArticle, delTag, changeTag } = articleSlice.actions;

export default articleSlice.reducer;
