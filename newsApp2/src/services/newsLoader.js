import apiKey from '../settings';

export const getNewsSources = async () => {
  const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
  const res = await fetch(url);
  const resJson = await res.json();
  return resJson.sources;
};

export const getNews = async (source) => {
  const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
  const res = await fetch(url);
  const resJson = await res.json();
  return resJson.articles;
};
