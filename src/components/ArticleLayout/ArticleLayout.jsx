import React from 'react';

import PropTypes from 'prop-types';

import SubmitButton from '../SubmitButton';

import classes from './ArticleLayout.module.scss';
import TagsBlock from './TagsBlock';

const ArticleLayout = ({ titleForm, regTitle, regDescribe, regText, submit, regTags }) => {
  return (
    <form className={classes.article} onSubmit={submit}>
      <h1 className={classes.article__title}>{titleForm}</h1>
      <label>
        Title
        <input className={classes.input} type="text" placeholder="Title" {...regTitle} />
      </label>
      <label>
        Short description
        <input className={classes.input} type="text" placeholder="Short description" {...regDescribe} />
      </label>
      <label>
        Text
        <textarea className={classes.textarea} name={'textarea'} cols="30" rows="10" placeholder="Text" {...regText} />
      </label>
      <TagsBlock regTags={regTags} />
      <SubmitButton name={'Send'} className={classes.submit} />
    </form>
  );
};

ArticleLayout.defaultProps = {
  regTags: () => {},
  submit: () => {},
};

ArticleLayout.propTypes = {
  regTags: PropTypes.func,
  regTitle: PropTypes.object,
  titleForm: PropTypes.string,
  regDescribe: PropTypes.object,
  regText: PropTypes.object,
  submit: PropTypes.func,
};

export default ArticleLayout;
