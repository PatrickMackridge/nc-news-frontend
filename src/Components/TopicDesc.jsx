import React from "react";

const TopicDesc = props => {
  return (
    <div className="description">
      <h3>
        {props.chosenTopic.slice(0, 1).toUpperCase() +
          props.chosenTopic.slice(1)}
      </h3>
      <p>
        {props.topicList.map(topic => {
          return topic.slug === props.chosenTopic ? topic.description : null;
        })}
      </p>
    </div>
  );
};

export default TopicDesc;
