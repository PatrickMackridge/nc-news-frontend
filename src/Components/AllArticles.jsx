import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";

class AllArticles extends Component {
  state = {
    articles: []
  };

  fetchArticles = () => {
    getArticles().then(res => {
      this.setState({ articles: res.data.articles });
    });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  render() {
    const { articles } = this.state;
    return (
      <ul>
        {articles.map(article => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default AllArticles;
