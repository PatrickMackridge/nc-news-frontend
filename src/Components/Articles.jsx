import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";
import Description from "./Description";
import Nav from "./Nav";
import ErrorPage from "./ErrorPage";

class ArticlesByTopic extends Component {
  state = {
    articles: [],
    sort_by: "created_at",
    order: "desc",
    isLoading: true,
    errObj: null,
    topicDesc: ""
  };

  fetchArticles = () => {
    const { topic } = this.props;
    const { sort_by, order } = this.state;
    getArticles({ sort_by, order }, topic)
      .then(res => {
        this.setState({ articles: res.data.articles, isLoading: false });
      })
      .catch(error => {
        const errObj = error.response.data;
        this.setState({ errObj });
      });
  };

  getTopicDescription = topics => {
    topics.forEach(topic => {
      if (topic.slug === this.props.topic) {
        this.setState({ topicDesc: topic.description });
      }
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
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles();
    }
    if (prevState.sort_by !== sort_by || prevState.order !== order) {
      this.fetchArticles();
    }
  }

  render() {
    const { articles, errObj, isLoading } = this.state;
    if (errObj !== null) {
      return <ErrorPage status={errObj.status} msg={errObj.msg} />;
    }
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
        <Description
          chosenTopic={this.props.topic}
          topicDesc={this.state.topicDesc}
        />
        <Nav
          sortArticles={this.sortArticles}
          user={this.props.user}
          logIn={this.props.logIn}
          logOut={this.props.logOut}
          getTopicDescription={this.getTopicDescription}
          topic={this.props.topic}
        />
      </>
    );
  }
}

export default ArticlesByTopic;
