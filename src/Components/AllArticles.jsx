import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles, getTopics } from "../api";
import Nav from "./Nav";
import SiteDesc from "./SiteDesc";

class AllArticles extends Component {
  state = {
    articles: [],
    topics: []
  };

  fetchArticles = () => {
    getArticles().then(res => {
      this.setState({ articles: res.data.articles });
    });
  };

  fetchTopics = () => {
    getTopics().then(res => {
      this.setState({ topics: res.data.topics });
    });
  };

  componentDidMount() {
    this.fetchArticles();
    this.fetchTopics();
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
        <Nav topics={this.state.topics} />
      </>
    );
  }
}

export default AllArticles;
