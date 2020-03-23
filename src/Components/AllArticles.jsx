import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";
import Nav from "./Nav";
import Description from "./Description";

class AllArticles extends Component {
  state = {
    articles: [],
    sort_by: "created_at",
    order: "desc",
    isLoading: true
  };

  fetchArticles = () => {
    const { sort_by, order } = this.state;
    getArticles({ sort_by, order }).then(res => {
      this.setState({ articles: res.data.articles, isLoading: false });
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
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    if (prevState.sort_by !== sort_by || prevState.order !== order) {
      this.fetchArticles();
    }
  }

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading === true) {
      return <div className="loading-msg">Loading...</div>;
    }
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
        <Description />
        <Nav
          sortArticles={this.sortArticles}
          user={this.props.user}
          logIn={this.props.logIn}
          logOut={this.props.logOut}
        />
      </>
    );
  }
}

export default AllArticles;
