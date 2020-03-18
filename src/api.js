import axios from "axios";

const baseUrl = "https://patrick-mackridge-nc-news.herokuapp.com/api";

export const getArticles = ({ sort_by, order }, topic) => {
  return axios.get(`${baseUrl}/articles`, {
    params: { sort_by: sort_by, order: order, topic: topic }
  });
};

export const getTopics = () => {
  return axios.get(`${baseUrl}/topics`);
};

export const getArticle = article_id => {
  return axios.get(`${baseUrl}/articles/${article_id}`);
};

export const getComments = article_id => {
  return axios.get(`${baseUrl}/articles/${article_id}/comments`);
};
