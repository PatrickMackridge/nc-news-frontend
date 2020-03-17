import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";

class ArticlesByTopic extends Component {
  state = { articles: [] };

  fetchArticles = () => {
    getArticles(this.props.topic).then(res => {
      console.log(res.data.articles);
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

export default ArticlesByTopic;
