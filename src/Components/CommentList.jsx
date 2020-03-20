import React, { Component } from "react";
import CommentCard from "./CommentCard";
import {
  getComments,
  patchCommentVotes,
  deleteComment,
  postComment
} from "../api";

class CommentList extends Component {
  state = {
    comments: []
  };

  fetchComments = () => {
    getComments(this.props.article_id).then(res => {
      this.setState({ comments: res.data.comments });
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
    deleteComment(commentId).then(() => {
      this.fetchComments();
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { newComment, article_id, user } = this.props;
    if (prevProps.newComment !== newComment) {
      console.log(newComment);
      postComment(article_id, user, newComment).then(() => {
        this.fetchComments();
      });
    }
  }

  componentDidMount() {
    this.fetchComments();
  }

  render() {
    const { comments } = this.state;
    return (
      <ul className="comments-list">
        {comments.map(comment => {
          return (
            <li key={comment.comment_id}>
              <CommentCard
                comment={comment}
                changeCommentVote={this.changeCommentVote}
                user={this.props.user}
                removeComment={this.removeComment}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CommentList;
