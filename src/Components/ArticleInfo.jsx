import React from "react";
import { Link } from "@reach/router";
import * as moment from "moment";

const ArticleInfo = props => {
  const {
    article,
    commentsShowing,
    changeArticleVote,
    toggleComments,
    currentVote
  } = props;
  return (
    <div className="article-info">
      <p>
        Topic:{" "}
        <Link to={`/topics/${article.topic}`}>
          {article.topic.slice(0, 1).toUpperCase() + article.topic.slice(1)}
        </Link>
      </p>
      <p>Posted By: {article.author}</p>
      <p>
        Posted: {moment(article.created_at).format("Do MMM YYYY, h:mm:ss a")}
      </p>
      <p>
        Votes: {article.votes}{" "}
        <button
          className="upvote-button"
          id={currentVote === 1 ? "transparent-button" : null}
          onClick={event => {
            changeArticleVote(event, 1);
          }}
        >
          +1
        </button>{" "}
        <button
          className="downvote-button"
          id={currentVote === -1 ? "transparent-button" : null}
          onClick={event => {
            changeArticleVote(event, -1);
          }}
        >
          -1
        </button>
      </p>
      <p>
        {article.comment_count} comments:{" "}
        <button onClick={toggleComments}>
          {commentsShowing ? "Hide" : "Show"}
        </button>
      </p>
    </div>
  );
};

export default ArticleInfo;
