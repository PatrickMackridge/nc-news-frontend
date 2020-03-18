import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles, getTopics } from "../api";
import Nav from "./Nav";
import SiteDesc from "./SiteDesc";

class AllArticles extends Component {
  state = {
    articles: [],
    topics: [],
    sort_by: "created_at",
    order: "desc"
  };

  fetchArticles = () => {
    const { sort_by, order } = this.state;
    getArticles({ sort_by, order }).then(res => {
      this.setState({ articles: res.data.articles });
    });
  };

  fetchTopics = () => {
    getTopics().then(res => {
      this.setState({ topics: res.data.topics });
    });
  };

  sortArticles = event => {
    if (event.target.className === "sort") {
      this.setState({ sort_by: event.target.value });
    }
    if (event.target.className === "order") {
      this.setState({ order: event.target.value });
    }
  };

  componentDidMount() {
    this.fetchArticles();
    this.fetchTopics();
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    if (prevState.sort_by !== sort_by || prevState.order !== order) {
      this.fetchArticles();
    }
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
        <Nav topics={this.state.topics} sortArticles={this.sortArticles} />
      </>
    );
  }
}

export default AllArticles;
