import React from "react";

const TopicDesc = props => {
  if (props.chosenTopic === undefined) {
    return (
      <div className="description">
        <h3>Welcome to NC News!</h3>
        <p>Your one stop shop for all the hot goss!</p>
      </div>
    );
  } else {
    return (
      <div className="description">
        <h3>
          {props.chosenTopic.slice(0, 1).toUpperCase() +
            props.chosenTopic.slice(1)}
        </h3>
        <p>{props.topicDesc}</p>
      </div>
    );
  }
};

export default TopicDesc;
