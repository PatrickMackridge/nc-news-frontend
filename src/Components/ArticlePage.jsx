import React, { Component } from "react";
import {
  getArticle,
  patchArticleVotes,
  getComments,
  postComment,
  patchCommentVotes,
  deleteComment
} from "../api";
import CommentList from "./CommentList";
import LogInForm from "./LogInForm";
import PostCommentForm from "./PostCommentForm";
import ErrorPage from "./ErrorPage";
import ArticleInfo from "./ArticleInfo";

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    commentsShowing: false,
    errObj: null,
    comments: [],
    commentsLoading: true,
    currentVote: 0
  };

  fetchArticle = () => {
    getArticle(this.props.article_id)
      .then(res => {
        this.setState({ article: res.data.article, isLoading: false });
      })
      .catch(err => {
        this.setState({ errObj: err.response.data });
      });
  };

  fetchComments = () => {
    getComments(this.state.article.article_id).then(res => {
      this.setState(currentState => {
        return {
          commentsShowing: !currentState.commentsShowing,
          comments: res.data.comments,
          commentsLoading: false
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
    if (this.state.currentVote !== direction) {
      patchArticleVotes(this.state.article.article_id, direction).catch(err => {
        this.setState({ errObj: err.response.data });
      });
      this.setState(currentState => {
        const newArticle = { ...currentState.article };
        newArticle.votes += direction;
        return {
          article: newArticle,
          currentVote: currentState.currentVote + direction
        };
      });
    }
  };

  addNewComment = comment => {
    const { article } = this.state;
    this.setState({ commentsLoading: true });
    postComment(article.article_id, this.props.user, comment).then(res => {
      this.setState(currentState => {
        const newComments = [res.data.comment, ...currentState.comments];
        const newArticle = { ...currentState.article };
        newArticle.comment_count = newComments.length;
        return {
          article: newArticle,
          comments: newComments,
          commentsLoading: false
        };
      });
    });
  };

  changeCommentVote = (chosenComment, direction) => {
    if (chosenComment.currentVote !== direction) {
      patchCommentVotes(chosenComment.comment_id, direction).catch(err => {
        this.setState({ errObj: err.response.data });
      });
      this.setState(currentState => {
        const newComments = currentState.comments.map(comment => {
          if (comment.comment_id === chosenComment.comment_id) {
            return {
              ...comment,
              votes: (comment.votes += direction),
              currentVote: direction + (comment.currentVote || 0)
            };
          } else {
            return { ...comment };
          }
        });
        return { comments: newComments };
      });
    }
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
      const newArticle = { ...currentState.article };
      newArticle.comment_count = newComments.length;
      return { article: newArticle, comments: newComments };
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
      comments,
      commentsLoading,
      currentVote
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
          <ArticleInfo
            article={article}
            commentsShowing={commentsShowing}
            toggleComments={this.toggleComments}
            changeArticleVote={this.changeArticleVote}
            currentVote={currentVote}
          />
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
              commentsLoading={commentsLoading}
            />
          </div>
        ) : null}
      </>
    );
  }
}

export default ArticlePage;
