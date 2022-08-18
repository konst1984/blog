export const articleGenerator = (article) => {
  return {
    id: article.slug,
    author: article.author.username,
    avatar: article.author.image,
    date: article.createdAt,
    tagList: article.tagList,
    title: article.title,
    description: article.description,
    body: article.body,
    favoritesCount: article.favoritesCount,
  };
};

export const createTag = () => {
  let idTag = 1;

  return function (tag) {
    return {
      id: idTag++,
      text: tag,
    };
  };
};

export const tagsCreator = createTag();
