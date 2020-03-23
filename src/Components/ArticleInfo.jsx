import React from "react";
import { Link } from "@reach/router";
import * as moment from "moment";

const ArticleInfo = props => {
  const { article, commentsShowing, changeArticleVote, toggleComments } = props;
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
          onClick={event => {
            changeArticleVote(event, 1);
          }}
        >
          +1
        </button>{" "}
        <button
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
