import React from "react";
import "./App.css";
import AllArticles from "./Components/AllArticles";
import { Router, Link } from "@reach/router";
import ArticlesByTopic from "./Components/ArticlesByTopic";
import ArticlePage from "./Components/ArticlePage";

class App extends React.Component {
  state = { loggedInUser: null };

  logInUser = username => {
    this.setState({ loggedInUser: username });
  };

  logOutUser = () => {
    this.setState({ loggedInUser: null });
  };

  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="app">
        <Link to="/" className="app-header">
          <header>Northcoders News</header>
        </Link>
        <Router className="page">
          <AllArticles
            path="/"
            user={loggedInUser}
            logIn={this.logInUser}
            logOut={this.logOutUser}
          />
          <ArticlesByTopic
            path="/:topic"
            user={loggedInUser}
            logIn={this.logInUser}
            logOut={this.logOutUser}
          />
          <ArticlePage
            path="articles/:article_id"
            user={loggedInUser}
            logIn={this.logInUser}
            logOut={this.logOutUser}
          />
        </Router>
      </div>
    );
  }
}

export default App;
