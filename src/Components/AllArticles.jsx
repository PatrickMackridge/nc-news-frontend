import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";
import Nav from "./Nav";
import SiteDesc from "./SiteDesc";

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
      <>
        <ul className="article-list">
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                <ArticleCard article={article} />
              </li>
            );
          })}
        </ul>
        <SiteDesc />
        <Nav />
      </>
    );
  }
}

export default AllArticles;
