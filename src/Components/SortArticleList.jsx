import React, { Component } from "react";

class SortArticleList extends Component {
  render() {
    return (
      <label>
        Sort By:{" "}
        <select>
          <option value="option1">Option1</option>
        </select>
      </label>
    );
  }
}

export default SortArticleList;
