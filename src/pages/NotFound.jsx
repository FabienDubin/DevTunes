import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>404 Not Found Page</h2>
      <p>Try again</p>
      <Link to="/search-album">
        <button>Search for another album!</button>
      </Link>
    </div>
  );
};

export default NotFound;
