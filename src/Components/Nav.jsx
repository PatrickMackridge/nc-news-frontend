import React, { Component } from "react";
import TopicList from "./TopicList";

class Nav extends Component {
  render() {
    return (
      <div className="nav-area">
        <TopicList />
      </div>
    );
  }
}

export default Nav;
