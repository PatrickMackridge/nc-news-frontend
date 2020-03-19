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

export const getArticle = articleId => {
  return axios.get(`${baseUrl}/articles/${articleId}`);
};

export const getComments = articleId => {
  return axios.get(`${baseUrl}/articles/${articleId}/comments`);
};

export const getUser = username => {
  return axios.get(`${baseUrl}/users/${username}`);
};

export const patchArticleVotes = (articleId, direction) => {
  return axios.patch(`${baseUrl}/articles/${articleId}`, {
    inc_votes: direction
  });
};

export const patchCommentVotes = (commentId, direction) => {
  return axios.patch(`${baseUrl}/comments/${commentId}`, {
    inc_votes: direction
  });
};

export const postComment = (articleId, username, body) => {
  return axios.post(`${baseUrl}/articles/${articleId}/comments`, {
    username: username,
    body: body
  });
};

export const deleteComment = commentId => {
  return axios.delete(`${baseUrl}/comments/${commentId}`);
};
