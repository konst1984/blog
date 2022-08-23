import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addNewUserFetch = createAsyncThunk('user/addNewUserFetch', async function ({ username, email, password }, { rejectWithValue, getState }) {
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
      throw new Error(`Can not register new user, request status ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const fetchLogin = createAsyncThunk('user/fetchLogin', async function ({ email, password }, { rejectWithValue, dispatch, getState }) {
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
      throw new Error(
        `Unable to login, check the correctness of 
          the request address and input data, request status ${response.statusText}`
      );
    }
    const data = await response.json();
    localStorage.setItem('token', data.user.token);
    localStorage.setItem('user', data.user.username);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('avatar', data.user.image);
    dispatch(setLogin());
    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const getUser = createAsyncThunk('user/getUser', async function (_, { rejectWithValue, getState }) {
  const url = getState().articles.url;
  const username = getState().user.username;
  try {
    const response = await fetch(`${url}/profiles/${username}`);
    if (!response.ok) {
      throw new Error(`Can not get current user, request status ${response.statusText}`);
    }
    const data = await response.json();
    localStorage.setItem('avatar', data.profile.image);
    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const editProfile = createAsyncThunk('user/editProfile', async function ({ username, email, password, image }, { rejectWithValue, getState }) {
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
      throw new Error(`Can not edit profile, request status ${response.statusText}`);
    }
    const data = await response.json();
    localStorage.setItem('token', data.user.token);
    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};
const setPending = (state) => {
  state.status = 'loading';
  state.error = false;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: false,
    bio: '',
    email: '',
    image: localStorage.getItem('avatar') || '/images/avatar.svg',
    username: localStorage.getItem('user'),
    status: '',
    error: false,
    eventMessage: true,
  },
  reducers: {
    setLogin(state) {
      state.login = true;
    },
    setLogout(state) {
      state.login = false;
      state.email = '';
      state.image = '';
      state.username = '';
      state.bio = '';
    },
    showMessageUser(state, action) {
      state.eventMessage = action.payload;
    },
  },
  extraReducers: {
    [addNewUserFetch.pending]: setPending,
    [addNewUserFetch.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.error = false;
    },
    [addNewUserFetch.rejected]: setError,
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
    [fetchLogin.rejected]: setError,
    [getUser.pending]: setPending,
    [getUser.fulfilled]: (state) => {
      state.status = 'fulfilled';
      state.error = false;
    },
    [getUser.rejected]: setError,
    [editProfile.pending]: setPending,
    [editProfile.fulfilled]: (state, action) => {
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state.username = action.payload.user.username;
      state.status = 'fulfilled';
      state.error = false;
    },
    [editProfile.rejected]: setError,
  },
});
export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
