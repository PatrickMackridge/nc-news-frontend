import React from "react";
import "./App.css";
import AllArticles from "./Components/AllArticles";
import Nav from "./Components/Nav";
import { Router } from "@reach/router";
import SiteDesc from "./Components/SiteDesc";
import TopicDesc from "./Components/TopicDesc";
import ArticlesByTopic from "./Components/ArticlesByTopic";

function App() {
  return (
    <div className="app">
      <header className="app-header">Northcoders News</header>
      <Router className="article-list">
        <AllArticles path="/" className="article-area" />
        <ArticlesByTopic path="/:topic" />
      </Router>
      <Router className="description">
        <SiteDesc path="/" />
        <TopicDesc path="/:topic" />
      </Router>
      <Nav />
    </div>
  );
}

export default App;
