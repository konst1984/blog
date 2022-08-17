import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { articleGenerator, fetchGetRequest } from '../utilites/helpers';
// import { fetchShortArticles, fetchSingleArticle, removeArticle } from './articleSlice';

export const addNewUserFetch = createAsyncThunk(
  'user/addNewUserFetch',
  async function ({ username, email, password }, { rejectWithValue, getState }) {
    const url = getState().articles.url;
    try {
      const response = await fetch(`${url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Can not register new user');
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async function ({ email, password }, { rejectWithValue, dispatch, getState }) {
    localStorage.setItem('password', password);
    const url = getState().articles.url;
    try {
      const response = await fetch(`${url}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Can not register new user');
      }
      const data = await response.json();
      localStorage.setItem('token', data.user.token);
      dispatch(setLogin());
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async function (_, { rejectWithValue, getState }) {
    const url = getState().articles.url;
    const username = getState().user.username;
    console.log(username);
    try {
      const response = await fetch(`${url}/profiles/${username}`);
      if (!response.ok) {
        throw new Error('Can not register new user');
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem('avatar', data.profile.image);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async function ({ username, email, password, image }, { rejectWithValue, getState }) {
    console.log({ username, email, password, image });
    localStorage.setItem('avatar', image);
    const url = getState().articles.url;
    try {
      const response = await fetch(`${url}/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            username: username,
            image: image,
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Can not register new user');
      }
      const data = await response.json();
      localStorage.setItem('token', data.user.token);
      console.log(data);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: false,
    bio: '',
    email: '',
    image: localStorage.getItem('avatar'),
    username: '',
    status: '',
    error: false,
  },
  reducers: {
    setLogin(state) {
      state.login = true;
    },
    setLogout(state) {
      state.login = false;
      state.email = '';
      state.image = './images/avatar.svg';
      state.username = '';
      state.bio = '';
    },
  },
  extraReducers: {
    [addNewUserFetch.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [addNewUserFetch.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.status = 'fulfilled';
      state.error = false;
    },
    [addNewUserFetch.rejected]: (state) => {
      state.status = 'rejected';
      state.error = true;
    },
    [fetchLogin.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.email = action.payload.user.email;
      state.image = localStorage.getItem('avatar');
      state.bio = action.payload.user.bio || '';
      state.username = action.payload.user.username;
      state.status = 'fulfilled';
      state.error = false;
    },
    [fetchLogin.rejected]: (state) => {
      state.status = 'rejected';
      state.error = true;
    },
    [getUser.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [getUser.fulfilled]: (state) => {
      // state.image = localStorage.getItem('avatar');
      state.status = 'fulfilled';
      state.error = false;
    },
    [getUser.rejected]: (state) => {
      state.status = 'rejected';
      state.error = true;
    },
    [editProfile.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [editProfile.fulfilled]: (state, action) => {
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state.username = action.payload.user.username;
      state.status = 'fulfilled';
      state.error = false;
    },
    [editProfile.rejected]: (state) => {
      state.status = 'rejected';
      state.error = true;
    },
  },
});
export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
