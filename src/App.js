import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

import classes from './App.module.scss';
import ArticleList from './components/ArticleList';
import ArticlesPagination from './components/ArticlesPagination';
import Header from './components/Header';
import { Edit, LoginAuth, ProfileAuth } from './components/hoc/LoginAuth';
import { RequiredAuthorization } from './components/hoc/RequiredAuthorization';
import CreateAccount from './components/Pages/CreateAccount';
import CreateArticle from './components/Pages/CreateArticle';
import EditArticlePage from './components/Pages/EditArticlePage';
import EditProfile from './components/Pages/EditProfile';
import LoginPage from './components/Pages/LoginPage';
import SingleArticle from './components/Pages/SingleArticle';
import { fetchShortArticles } from './store/articleSlice';

function App() {
  // const { articles, offsetArticles } = useSelector((state) => state.articles);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const urlArticles = `https://api.realworld.io/api/articles?offset=${offsetArticles}`;
  //   dispatch(fetchShortArticles(urlArticles));
  // }, [offsetArticles]);
  return (
    <div className={classes.App}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:id" element={<SingleArticle />} />
          {/*<Route*/}
          {/*  path="articles/:id/edit"*/}
          {/*  element={*/}
          {/*    <Edit>*/}
          {/*      <EditArticlePage />*/}
          {/*    </Edit>*/}
          {/*  }*/}
          {/*/>*/}
          {/*<Route path="articles/:id/edit" element={<EditArticlePage />} />*/}
          {/*<Route path="profile/" element={<EditProfile />} />*/}
          <Route
            path="profile/"
            element={
              <ProfileAuth>
                <EditProfile />
              </ProfileAuth>
            }
          />
          <Route
            path="articles/:id/edit"
            element={
              <RequiredAuthorization>
                <EditArticlePage />
              </RequiredAuthorization>
            }
          />
          <Route
            path="new-article"
            element={
              <RequiredAuthorization>
                <CreateArticle />
              </RequiredAuthorization>
            }
          />
          <Route
            path="sign-in"
            element={
              <LoginAuth>
                <LoginPage />
              </LoginAuth>
            }
          />
          {/*<Route path="sign-in" element={<LoginPage />} />*/}
          <Route path="sign-up" element={<CreateAccount />} />
          <Route path="*" element={<ArticleList />} />
        </Route>
      </Routes>
    </div>
  );
}

const Layout = () => {
  return (
    <>
      <Header />
      <div className={classes.main}>
        <Outlet />
      </div>
      {/*<ArticlesPagination />*/}
    </>
  );
};

export default App;
