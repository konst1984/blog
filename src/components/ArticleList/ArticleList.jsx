import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchShortArticles } from '../../store/articleSlice';
import { articleGenerator } from '../../utilites/helpers';
import ArticlesPagination from '../ArticlesPagination';
import ShortArticle from '../Pages/ShortArticle';
import LoadErrorHandler from '../SideComponents/LoadErrorComponent';

import classes from './ArticleList.module.scss';

const ArticleList = () => {
  const { articles, offsetArticles } = useSelector((state) => state.articles);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShortArticles());
  }, [offsetArticles]);

  const transformArticles = articles.map(articleGenerator).map((article) => {
    const linkPage = `/articles/${article.id}`;

    return <ShortArticle key={article.id} {...article} link={linkPage} />;
  });

  return (
    <>
      <div style={{ height: '32px' }}>
        <LoadErrorHandler />
      </div>
      <div className={classes['articles-list']}>{articles ? transformArticles : null}</div>
      <ArticlesPagination />
    </>
  );
};

export default ArticleList;
