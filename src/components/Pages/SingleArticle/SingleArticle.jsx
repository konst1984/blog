import React, { useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchSingleArticle } from '../../../store/articleSlice';
import { articleGenerator } from '../../../utilites/helpers';
import DelEditButtons from '../../DelEditButtons';
import EventMessage from '../../EventMessage';
import LoadErrorHandler from '../../LoadErrorComponent';
import ShortArticle from '../ShortArticle';

import classes from './SingleArticle.module.scss';

const SingleArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { fullArticle, status, error } = useSelector((state) => state.articles);
  const { eventMessage } = useSelector((state) => state.articles);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleArticle(id));
    }
  }, [dispatch, id]);

  const transformArticle = fullArticle && articleGenerator(fullArticle);
  return status === 'rejected' ? (
    <LoadErrorHandler link={'/article'} status={status} error={error} />
  ) : (
    (transformArticle && (
      <div className={classes['full-article']}>
        <ShortArticle
          cls="non-filter"
          id={id}
          title={transformArticle.title}
          tagList={transformArticle.tagList}
          description={transformArticle.description}
          favoritesCount={transformArticle.favoritesCount}
          avatar={transformArticle.avatar}
          author={transformArticle.author}
          updatedAt={transformArticle.updatedAt}
        >
          <DelEditButtons id={id} />
        </ShortArticle>
        <div className={classes['article-body']}>
          <ReactMarkdown>{transformArticle.body}</ReactMarkdown>
        </div>
      </div>
    )) || <EventMessage text={'Article deleted'} eventMessage={eventMessage} link={'/article'} />
  );
};

export default SingleArticle;
