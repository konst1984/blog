import React from 'react';

import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { switchPage } from '../../store/articleSlice';

import classes from './ArticlesPagination.module.scss';

const ArticlesPagination = () => {
  const { articlesCount, currentPage } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const totalPages = Math.floor(articlesCount);
  // const totalPages = Math.floor(countPages);
  console.log(articlesCount);
  console.log(totalPages);
  const SwitchPageEvent = (page) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(switchPage({ page: page }));
  };

  return (
    <>
      {totalPages > 0 ? (
        <Pagination
          className={classes.pagination}
          current={currentPage}
          defaultPageSize={1}
          defaultCurrent={1}
          total={totalPages}
          showSizeChanger={false}
          showQuickJumper={false}
          onChange={(page) => SwitchPageEvent(page)}
        />
      ) : null}
    </>
  );
};

export default ArticlesPagination;
