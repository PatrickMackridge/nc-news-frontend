import React from "react";
import { Link } from "@reach/router";
import * as moment from "moment";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <Link to={`/${article.topic}`}>
        <div id="card-topic">
          {article.topic.slice(0, 1).toUpperCase() + article.topic.slice(1)}
        </div>
      </Link>
      <div id="card-author">{article.author}</div>
      <div id="card-title">{article.title}</div>
      <div id="card-date">
        Posted: {moment(article.created_at).format("Do MMM YYYY, h:mm:ss a")}
      </div>
      <div id="card-comments">{article.comment_count} Comments</div>
      <div id="card-votes">Votes: {article.votes}</div>
    </div>
  );
};

export default ArticleCard;
