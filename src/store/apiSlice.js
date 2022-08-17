import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'apiArticles',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),

  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (offset = 0) => `articles?${`offset=${offset}`}`,
    }),
    addArticle: builder.mutation({
      query: (body) => ({
        url: 'articles',
        method: 'POST',
        header: {
          Authorization: 'Token' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    changeArticle: builder.mutation({
      query: (slug, body) => ({
        url: `articles/${slug}`,
        method: 'POST',
        body,
      }),
    }),
    addNewUser: builder.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useAddArticleMutation,
  useAddNewUserMutation,
  useSignInMutation,
  useChangeArticleMutation,
} = apiSlice;
