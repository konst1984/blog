import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';

import classes from './App.module.scss';
import { ArticleList } from './components/ArticleList';
import { Header } from './components/Header';
import { CreateAccount } from './components/Pages/CreateAccount';
import { CreateArticle } from './components/Pages/CreateArticle';
import { EditArticlePage } from './components/Pages/EditArticlePage';
import { EditProfile } from './components/Pages/EditProfile';
import { LoginPage } from './components/Pages/LoginPage';
import { SingleArticle } from './components/Pages/SingleArticle';
import { LoginAuth, ProfileAuth } from './hoc/LoginAuth';
import { RequiredAuthorization } from './hoc/RequiredAuthorization';
import { setLogin } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      dispatch(setLogin());
    }
    navigator('articles');
  }, []);
  return (
    <div className={classes.App}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:id" element={<SingleArticle />} />
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
    </>
  );
};

export default App;
