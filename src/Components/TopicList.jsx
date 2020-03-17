import React from "react";
import { getTopics } from "../api";
import { Link } from "@reach/router";

class TopicList extends React.Component {
  state = {
    topics: []
  };

  fetchTopics = () => {
    getTopics().then(res => {
      this.setState({ topics: res.data.topics });
    });
  };

  componentDidMount() {
    this.fetchTopics();
  }

  render() {
    const { topics } = this.state;
    return (
      <div className="topics">
        <h3>Topics: </h3>
        <ul className="topic-list">
          {topics.map(topic => {
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
  }
}

export default TopicList;
