import React, { Component } from "react";
import {
  getArticle,
  patchArticleVotes,
  getComments,
  postComment,
  patchCommentVotes,
  deleteComment
} from "../api";
import { Link } from "@reach/router";
import * as moment from "moment";
import CommentList from "./CommentList";
import LogInForm from "./LogInForm";
import PostCommentForm from "./PostCommentForm";
import ErrorPage from "./ErrorPage";

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    commentsShowing: false,
    errObj: null,
    comments: []
  };

  fetchArticle = () => {
    getArticle(this.props.article_id)
      .then(res => {
        this.setState({ article: res.data.article, isLoading: false });
      })
      .catch(err => {
        const errObj = err.response.data;
        this.setState({ errObj });
      });
  };

  fetchComments = () => {
    getComments(this.state.article.article_id).then(res => {
      this.setState(currentState => {
        return {
          commentsShowing: !currentState.commentsShowing,
          comments: res.data.comments
        };
      });
    });
  };

  toggleComments = event => {
    if (this.state.comments.length === 0) {
      this.fetchComments();
    } else {
      this.setState(currentState => {
        return { commentsShowing: !currentState.commentsShowing };
      });
    }
  };

  changeArticleVote = (event, direction) => {
    patchArticleVotes(this.state.article.article_id, direction).then(res => {
      this.setState({ article: res.data.article });
    });
  };

  addNewComment = comment => {
    const { article } = this.state;
    postComment(article.article_id, this.props.user, comment).then(res => {
      this.setState(currentState => {
        const newComments = [res.data.comment, ...currentState.comments];
        return { comments: newComments };
      });
    });
  };

  changeCommentVote = (commentId, direction) => {
    patchCommentVotes(commentId, direction).then(res => {
      const resComment = res.data.comment;
      this.setState(currentState => {
        const commentList = currentState.comments.map(comment => {
          if (comment.comment_id === commentId) {
            return { ...comment, votes: resComment.votes };
          } else {
            return { ...comment };
          }
        });
        return { comments: commentList };
      });
    });
  };

  removeComment = commentId => {
    deleteComment(commentId).catch(err => {
      const errObj = err.response.data;
      this.setState({ errObj });
    });
    this.setState(currentState => {
      const newComments = currentState.comments.filter(comment => {
        return comment.comment_id !== commentId;
      });
      return { comments: newComments };
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
    const {
      article,
      isLoading,
      commentsShowing,
      errObj,
      comments
    } = this.state;
    if (errObj !== null) {
      return <ErrorPage status={errObj.status} msg={errObj.msg} />;
    }
    if (isLoading === true) {
      return <div className="loading-msg">Loading...</div>;
    }
    return (
      <>
        <div className="article-body">
          <h2>{article.title}</h2>
          <p className="article-text">{article.body}</p>
          {commentsShowing ? (
            <PostCommentForm
              user={this.props.user}
              addNewComment={this.addNewComment}
            />
          ) : null}
        </div>
        <div className="article-details">
          <LogInForm
            user={this.props.user}
            logIn={this.props.logIn}
            logOut={this.props.logOut}
          />
          <div className="details">
            <p>
              Topic:{" "}
              <Link to={`/topics/${article.topic}`}>
                {article.topic.slice(0, 1).toUpperCase() +
                  article.topic.slice(1)}
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
                  this.changeArticleVote(event, 1);
                }}
              >
                +1
              </button>{" "}
              <button
                onClick={event => {
                  this.changeArticleVote(event, -1);
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
        </div>
        {commentsShowing ? (
          <div className="article-comments">
            <CommentList
              comments={comments}
              article_id={article.article_id}
              user={this.props.user}
              changeCommentVote={this.changeCommentVote}
              removeComment={this.removeComment}
              errObj={errObj}
            />
          </div>
        ) : null}
      </>
    );
  }
}

export default ArticlePage;
