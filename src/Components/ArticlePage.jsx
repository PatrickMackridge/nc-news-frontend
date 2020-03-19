import React, { Component } from "react";
import { getArticle, patchArticleVotes } from "../api";
import { Link } from "@reach/router";
import * as moment from "moment";
import CommentList from "./CommentList";

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    commentsShowing: false
  };

  fetchArticle = () => {
    getArticle(this.props.article_id).then(res => {
      this.setState({ article: res.data.article, isLoading: false });
    });
  };

  toggleComments = event => {
    this.setState(currentState => {
      return { commentsShowing: !currentState.commentsShowing };
    });
  };

  changeVote = (event, direction) => {
    console.log(event.target.value);
    patchArticleVotes(this.state.article.article_id, direction).then(res => {
      this.setState({ article: res.data.article });
    });
  };

  componentDidMount() {
    this.fetchArticle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchArticle();
    }
  }

  render() {
    const { article, isLoading, commentsShowing } = this.state;
    if (isLoading === true) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <div className="article-body">
          <h2>{article.title}</h2>
          <p className="article-text">{article.body}</p>
        </div>
        <div className="article-details">
          <p>
            Topic:{" "}
            <Link to={`/${article.topic}`}>
              {article.topic.slice(0, 1).toUpperCase() + article.topic.slice(1)}
            </Link>
          </p>
          <p>Posted By: {article.author}</p>
          <p>
            Posted:{" "}
            {moment(article.created_at).format("Do MMM YYYY, h:mm:ss a")}
          </p>
          <p>
            Votes: {article.votes}{" "}
            <button
              onClick={event => {
                this.changeVote(event, 1);
              }}
            >
              +1
            </button>{" "}
            <button
              onClick={event => {
                this.changeVote(event, -1);
              }}
            >
              -1
            </button>
          </p>
          <p>
            Comments: {article.comment_count}
            <br />
            <br />
            <button onClick={this.toggleComments}>
              {commentsShowing ? "Hide Comments" : "Show Comments"}
            </button>
          </p>
        </div>
        {commentsShowing ? (
          <div className="article-comments">
            <CommentList article_id={article.article_id} />
          </div>
        ) : null}
      </>
    );
  }
}

export default ArticlePage;
