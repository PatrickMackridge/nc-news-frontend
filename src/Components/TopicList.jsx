import React from "react";
import { Link } from "@reach/router";
import { getTopics } from "../api";

class TopicList extends React.Component {
  state = { topics: [] };

  fetchTopics = () => {
    getTopics().then(res => {
      const topicArr = res.data.topics;
      if (this.props.topic) {
        this.props.getTopicDescription(topicArr);
      }
      this.setState({ topics: topicArr });
    });
  };

  componentDidMount() {
    this.fetchTopics();
  }

  render() {
    const { topics } = this.state;
    if (topics.length === 0) {
      return <p>Loading...</p>;
    }
    return (
      <div className="topics">
        <h3>Topics: </h3>
        <ul className="topic-list">
          {topics.map(topic => {
            return (
              <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                <li>
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
