import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles, getTopics } from "../api";
import TopicDesc from "./TopicDesc";
import Nav from "./Nav";

class ArticlesByTopic extends Component {
  state = { articles: [], topics: [] };

  fetchArticles = () => {
    getArticles(this.props.topic).then(res => {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
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
        <TopicDesc
          chosenTopic={this.props.topic}
          topicList={this.state.topics}
        />
        <Nav topics={this.state.topics} />
      </>
    );
  }
}

export default ArticlesByTopic;
