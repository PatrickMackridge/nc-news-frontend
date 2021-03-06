import React from "react";
import * as moment from "moment";

const CommentCard = props => {
  return (
    <div className="comment-card">
      <p id="comment-title">
        {props.comment.author}:{" "}
        {moment(props.comment.created_at).format("Do MMM YYYY, h:mm:ss a")}
      </p>
      <p id="comment-body">{props.comment.body}</p>
      <p>
        Votes: {props.comment.votes}{" "}
        <button
          className="upvote-button"
          id={props.comment.currentVote === 1 ? "transparent-button" : null}
          onClick={event => {
            props.changeCommentVote(props.comment, 1);
          }}
        >
          +1
        </button>{" "}
        <button
          className="downvote-button"
          id={props.comment.currentVote === -1 ? "transparent-button" : null}
          onClick={event => {
            props.changeCommentVote(props.comment, -1);
          }}
        >
          -1
        </button>{" "}
        {props.comment.author === props.user ? (
          <button
            className="delete-button"
            onClick={() => {
              props.removeComment(props.comment.comment_id);
            }}
          >
            Delete
          </button>
        ) : null}
      </p>
    </div>
  );
};

export default CommentCard;
