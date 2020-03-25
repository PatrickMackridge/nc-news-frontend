import React from "react";

const SortArticleList = props => {
  return (
    <div className="sort-options">
      <label>
        Sort By: <br />
        <select className="sort" onChange={props.sortArticles}>
          <option value="created_at">Date Created</option>
          <option value="comment_count">Number of Comments</option>
          <option value="votes">Votes</option>
        </select>
      </label>
      <label>
        {" "}
        Order: <br />
        <select className="order" onChange={props.sortArticles}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
};

export default SortArticleList;
