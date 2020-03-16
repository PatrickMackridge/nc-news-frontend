import React from "react";
import "./App.css";
import AllArticles from "./Components/AllArticles";

function App() {
  return (
    <div className="app">
      <header className="app-header">Northcoders News</header>
      <AllArticles className="article-area" />
      <div className="description">Description</div>
      <div className="nav-area">Nav</div>
    </div>
  );
}

export default App;
