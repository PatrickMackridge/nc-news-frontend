import React from "react";
import "./App.css";
import AllArticles from "./Components/AllArticles";
import { Router, Link } from "@reach/router";
import ArticlesByTopic from "./Components/ArticlesByTopic";
import ArticlePage from "./Components/ArticlePage";

function App() {
  return (
    <div className="app">
      <Link to="/" className="app-header">
        <header>Northcoders News</header>
      </Link>
      <Router className="page">
        <AllArticles path="/" />
        <ArticlesByTopic path="/:topic" />
        <ArticlePage path="articles/:article_id" />
      </Router>
    </div>
  );
}

export default App;
