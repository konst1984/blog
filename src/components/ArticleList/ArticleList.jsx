import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchShortArticles } from '../../store/articleSlice';
import { articleGenerator } from '../../utilites/helpers';
import ArticlesPagination from '../ArticlesPagination';
import LoadErrorHandler from '../LoadErrorHandler';
import ShortArticle from '../Pages/ShortArticle';

import classes from './ArticleList.module.scss';

// import { useGetArticlesQuery } from '../../store/apiSlice';

const ArticleList = () => {
  const { articles, offsetArticles, url } = useSelector((state) => state.articles);
  // const { data = [], isLoading } = useGetArticlesQuery(offsetArticles);
  const dispatch = useDispatch();
  useEffect(() => {
    const urlArticles = `${url}/articles/?offset=${offsetArticles}`;
    dispatch(fetchShortArticles(urlArticles));
  }, [offsetArticles]);

  const likeIt = (id) => {
    articles.map();
  };

  const transformArticles = articles.map(articleGenerator).map((article) => {
    const linkPage = `/articles/${article.id}`;

    return <ShortArticle key={article.id} {...article} link={linkPage} />;
  });

  // const transformArticles =
  //   data.articles &&
  //   data.articles.map(articleGenerator).map((article) => {
  //     const linkPage = `/articles/${article.id}`;
  //
  //     return <ShortArticle key={article.id} {...article} link={linkPage} />;
  //   });

  return (
    <>
      <LoadErrorHandler />
      <div className={classes['articles-list']}>{articles ? transformArticles : null}</div>
      <ArticlesPagination />
      {/*<ArticlesPagination countPages={data.articlesCount ? data.articlesCount / 20 : 0} />*/}
    </>
  );
};

export default ArticleList;
