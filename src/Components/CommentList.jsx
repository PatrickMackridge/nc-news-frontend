import React, { Component } from "react";
import CommentCard from "./CommentCard";
import { getComments } from "../api";

class CommentList extends Component {
  state = {
    comments: []
  };

  fetchComments = () => {
    getComments(this.props.article_id).then(res => {
      this.setState({ comments: res.data.comments });
    });
  };
  // fetchComments => getComments(props.article.id) map(<li> return CommentCard/> </li>)

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
              <CommentCard comment={comment} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CommentList;
