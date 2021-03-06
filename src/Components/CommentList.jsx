import React from "react";
import CommentCard from "./CommentCard";
import ErrorPage from "./ErrorPage";

const CommentList = props => {
  const {
    comments,
    changeCommentVote,
    user,
    removeComment,
    errObj,
    commentsLoading
  } = props;
  if (errObj !== null) {
    return <ErrorPage errObj={errObj} />;
  } else if (commentsLoading === true) {
    return <p>Loading...</p>;
  } else {
    return (
      <ul className="comments-list">
        {comments.map(comment => {
          return (
            <li key={comment.comment_id}>
              <CommentCard
                comment={comment}
                changeCommentVote={changeCommentVote}
                user={user}
                removeComment={removeComment}
              />
            </li>
          );
        })}
      </ul>
    );
  }
};

export default CommentList;
