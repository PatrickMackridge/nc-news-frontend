import axios from "axios";

export const getArticles = ({ sort_by, order }, topic) => {
  return axios.get(
    "https://patrick-mackridge-nc-news.herokuapp.com/api/articles",
    { params: { sort_by: sort_by, order: order, topic: topic } }
  );
};

export const getTopics = () => {
  return axios.get(
    "https://patrick-mackridge-nc-news.herokuapp.com/api/topics"
  );
};
