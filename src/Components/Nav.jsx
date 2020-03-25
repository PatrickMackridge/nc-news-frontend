import React from "react";
import TopicList from "./TopicList";
import SortArticleList from "./SortArticleList";
import LogInForm from "./LogInForm";

const Nav = props => {
  return (
    <nav className="nav-area">
      <LogInForm user={props.user} logIn={props.logIn} logOut={props.logOut} />
      <SortArticleList sortArticles={props.sortArticles} />
      <TopicList
        getTopicDescription={props.getTopicDescription}
        topic={props.topic}
      />
    </nav>
  );
};

export default Nav;
