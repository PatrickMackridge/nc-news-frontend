import React from "react";
import TopicList from "./TopicList";
import SortArticleList from "./SortArticleList";
import LogInForm from "./LogInForm";

const Nav = props => {
  return (
    <div className="nav-area">
      <SortArticleList sortArticles={props.sortArticles} />
      <LogInForm user={props.user} logIn={props.logIn} logOut={props.logOut} />
      <TopicList topics={props.topics} />
    </div>
  );
};

export default Nav;
