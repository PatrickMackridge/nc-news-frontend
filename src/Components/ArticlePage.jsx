import React, { Component } from "react";
import { getArticle, patchArticleVotes } from "../api";
import { Link } from "@reach/router";
import * as moment from "moment";
import CommentList from "./CommentList";
import LogInForm from "./LogInForm";
import PostCommentForm from "./PostCommentForm";

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    commentsShowing: false,
    newComment: null
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
    patchArticleVotes(this.state.article.article_id, direction).then(res => {
      // console.log(res.data.article);
      this.setState({ article: res.data.article });
    });
  };

  setNewComment = comment => {
    this.setState(currentState => {
      const newArticle = { ...currentState.article };
      let newCommentCount = parseInt(newArticle.comment_count, 10);
      newCommentCount += 1;
      newArticle.comment_count = newCommentCount.toString();
      return { newComment: comment, article: newArticle };
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
    const { article, isLoading, commentsShowing, newComment } = this.state;
    if (isLoading === true) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <div className="article-body">
          <h2>{article.title}</h2>
          <p className="article-text">{article.body}</p>
          {commentsShowing ? (
            <PostCommentForm
              user={this.props.user}
              setNewComment={this.setNewComment}
            />
          ) : null}
        </div>
        <div className="article-details">
          <LogInForm
            user={this.props.user}
            logIn={this.props.logIn}
            logOut={this.props.logOut}
          />
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
            {article.comment_count} comments:{" "}
            <button onClick={this.toggleComments}>
              {commentsShowing ? "Hide" : "Show"}
            </button>
          </p>
        </div>
        {commentsShowing ? (
          <div className="article-comments">
            <CommentList
              article_id={article.article_id}
              user={this.props.user}
              newComment={newComment}
            />
          </div>
        ) : null}
      </>
    );
  }
}

export default ArticlePage;
