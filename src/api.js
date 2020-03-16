import axios from "axios";

export const getArticles = () => {
  return axios.get(
    "https://patrick-mackridge-nc-news.herokuapp.com/api/articles"
  );
};
