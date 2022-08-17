// export const getArticles = async () => {
//   try {
//     const response = await fetch('https://api.realworld.io/api/articles/');
//     if (!response.ok) {
//       throw new Error('Data error');
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// };

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
export const fetchGetRequest = async function (url, { rejectWithValue }) {
  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error('Data error');
    }
    const data = await response.json();
    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
};
