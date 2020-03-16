import React, { Component } from "react";
import ArticleCard from "./ArticleCard";

class AllArticles extends Component {
  state = {
    articles: [
      {
        author: "yooser",
        title: "The Best Article Ever Written",
        article_id: "1",
        body: "A mind blowingly great article...",
        topic: "Life, the universe and everything",
        created_at: "2018-11-20T12: 24: 03.000Z",
        votes: "42",
        comment_count: "99"
      },
      {
        author: "uzaToo",
        title: "Rubbish Article",
        article_id: "2",
        body: "A boring article that no-one read...",
        topic: "Slippers",
        created_at: "2019-04-10T12: 24: 03.000Z",
        votes: "-1",
        comment_count: "0"
      }
    ]
  };

  render() {
    const { articles } = this.state;
    return (
      <div>
        <ul className="article-list">
          {articles.map(article => {
            return (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AllArticles;
