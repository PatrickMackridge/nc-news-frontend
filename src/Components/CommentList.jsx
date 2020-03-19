import React, { Component } from "react";
import CommentCard from "./CommentCard";
import { getComments, patchCommentVotes } from "../api";

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
      const updatedComment = res.data.comment;
      this.setState(currentState => {
        const commentList = [...currentState.comments];
        commentList.forEach((comment, i) => {
          if (comment.comment_id === commentId) {
            commentList.splice(i, 1, updatedComment);
          }
        });
        return { comments: commentList };
      });
    });
  };

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
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CommentList;
