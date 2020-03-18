import React from "react";
import TopicList from "./TopicList";
import SortArticleList from "./SortArticleList";

const Nav = props => {
  return (
    <div className="nav-area">
      <SortArticleList />
      <TopicList topics={props.topics} />
    </div>
  );
};

export default Nav;
