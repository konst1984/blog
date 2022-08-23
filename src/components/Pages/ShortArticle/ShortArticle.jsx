import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import ButtonLike from './ButtonLike';
import classes from './ShortArticle.module.scss';

const ShortArticle = (props) => {
  if (props) {
    const { title, tagList, description, favoritesCount, avatar, author, date, cls, id, children } = props;

    return (
      <div className={`${classes.article} ${classes[cls]}`}>
        <div className={classes['article__header']}>
          <div className={classes['article__title']}>
            <h3 className={classes.title}>
              <Link to={`/articles/${id}`}>{title}</Link>
            </h3>
            <ButtonLike favoritesCount={favoritesCount} id={id} />
          </div>
          <div className={classes['article__author']}>
            <div className={classes.info}>
              <p className={classes.info__name}>{author}</p>
              <p className={classes.date}>{date && format(new Date(date), 'MMMM d, yyyy')}</p>
            </div>
            <div className={classes.avatar}>
              <img src={avatar} alt="avatar" />
            </div>
          </div>
          {children}
        </div>
        <div className={classes.tags}>
          <ul className={classes['tags-list']}>
            {tagList &&
              tagList.map((tag, index) => (
                <li key={index} className={classes['tag-item']}>
                  {tag}
                </li>
              ))}
          </ul>
        </div>
        <div className={classes.description}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>
    );
  }
};

ShortArticle.propTypes = {
  title: PropTypes.string,
  favoritesCount: PropTypes.number,
  tagList: PropTypes.array,
  description: PropTypes.string,
  avatar: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  cls: PropTypes.string,
  children: PropTypes.element,
};

export default React.memo(ShortArticle);
