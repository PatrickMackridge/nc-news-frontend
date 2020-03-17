import axios from "axios";

export const getArticles = topic => {
  return axios.get(
    "https://patrick-mackridge-nc-news.herokuapp.com/api/articles",
    { params: { topic } }
  );
};

export const getTopics = () => {
  return axios.get(
    "https://patrick-mackridge-nc-news.herokuapp.com/api/topics"
  );
};
