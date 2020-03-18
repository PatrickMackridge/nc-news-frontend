import React from "react";
import { Link } from "@reach/router";

const TopicList = props => {
  return (
    <div className="topics">
      <h3>Topics: </h3>
      <ul className="topic-list">
        {props.topics.map(topic => {
          return (
            <Link to={`/${topic.slug}`}>
              <li key={topic.slug}>
                {topic.slug.slice(0, 1).toUpperCase() + topic.slug.slice(1)}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default TopicList;
