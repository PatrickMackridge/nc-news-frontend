import React, { Component } from "react";

class SortArticleList extends Component {
  render() {
    return (
      <div className="sort-options">
        <label>
          Sort By:{" "}
          <select>
            <option value="created_at">Date Created</option>
            <option value="comment_count">Number of Comments</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <label>
          {" "}
          Order:{" "}
          <select>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
    );
  }
}

export default SortArticleList;
