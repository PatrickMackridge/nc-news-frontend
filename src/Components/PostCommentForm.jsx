import React, { Component } from "react";

class PostCommentForm extends Component {
  state = { comment: "" };

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.comment === "") {
      return;
    } else {
      this.props.setNewComment(this.state.comment);
      this.setState({ comment: "" });
    }
  };

  render() {
    const { comment } = this.state;
    return (
      <div className="comment-form">
        {this.props.user === null ? (
          <h4>Please log in to post a comment</h4>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <label>
              Post a Comment:{" "}
              <textarea
                value={comment}
                placeholder="Your comment here..."
                id="comment-text"
                cols="100"
                rows="10"
                onChange={this.handleChange}
              ></textarea>
            </label>
            <button>Post Comment</button>
            <br />
          </form>
        )}
      </div>
    );
  }
}
export default PostCommentForm;
