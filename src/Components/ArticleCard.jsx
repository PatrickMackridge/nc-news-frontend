import React from "react";
import { Link } from "@reach/router";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <Link to={`/${article.topic}`}>
        <div id="card-topic">{article.topic}</div>{" "}
      </Link>
      <div id="card-author">{article.author}</div>
      <div id="card-title">{article.title}</div>
      <div id="card-date">
        {article.created_at.slice(0, 10)} at {article.created_at.slice(-13, -5)}
      </div>
      <div id="card-comments">{article.comment_count} Comments</div>
      <div id="card-votes">Votes: {article.votes}</div>
    </div>
  );
};

// moment relative to now
// javascript date methods for exact dates

export default ArticleCard;
