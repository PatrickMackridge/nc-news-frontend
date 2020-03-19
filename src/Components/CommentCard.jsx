import React from "react";
import * as moment from "moment";

const CommentCard = props => {
  return (
    <div className="comment-card">
      <p id="comment-title">
        {props.comment.author}:{" "}
        {moment(props.comment.created_at).format("Do MMM YYYY, h:mm:ss a")}
      </p>
      <p>{props.comment.body}</p>
      <p>
        Votes: {props.comment.votes}{" "}
        <button
          onClick={event => {
            props.changeCommentVote(props.comment.comment_id, 1);
          }}
        >
          +1
        </button>{" "}
        <button
          onClick={event => {
            props.changeCommentVote(props.comment.comment_id, -1);
          }}
        >
          -1
        </button>
      </p>
    </div>
  );
};

export default CommentCard;
