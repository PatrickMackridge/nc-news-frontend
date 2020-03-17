import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <div id="card-topic">{article.topic}</div>{" "}
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
