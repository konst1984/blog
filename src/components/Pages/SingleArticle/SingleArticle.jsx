import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchSingleArticle } from '../../../store/articleSlice';
import { articleGenerator } from '../../../utilites/helpers';
import LoadErrorHandler from '../../LoadErrorHandler';
import ShortArticle from '../ShortArticle';

import ActionButtons from './ActionButtons';
// import DeletionConfirm from './DeletionConfirm';
import MessageAboutDeleting from './MessageAboutDeleting';
import classes from './SingleArticle.module.scss';

const SingleArticle = () => {
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { url, fullArticle, status } = useSelector((state) => state.articles);

  const changeShow = (value) => setShow(value);

  useEffect(() => {
    if (id) {
      const urlArticles = `${url}/articles/${id}`;
      dispatch(fetchSingleArticle(urlArticles));
    }
  }, [dispatch, id]);

  const transformArticle = fullArticle && articleGenerator(fullArticle);
  return status === 'rejected' ? (
    <LoadErrorHandler />
  ) : (
    (transformArticle && (
      <div className={classes['full-article']}>
        <ShortArticle
          cls="non-filter"
          id={''}
          title={transformArticle.title}
          tagList={transformArticle.tagList}
          description={transformArticle.description}
          favoritesCount={transformArticle.favoritesCount}
          avatar={transformArticle.avatar}
          author={transformArticle.author}
          updatedAt={transformArticle.updatedAt}
        >
          <ActionButtons id={id} changeShow={changeShow} />
        </ShortArticle>
        <div className={classes['article-body']}>
          <ReactMarkdown>{transformArticle.body}</ReactMarkdown>
        </div>
      </div>
    )) || <MessageAboutDeleting show={show} changeShow={changeShow} />
  );
};

export default SingleArticle;
