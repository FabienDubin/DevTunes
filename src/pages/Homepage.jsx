import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <p>Welcome to our Amazin APP</p>
      <Link to="/search-album">
        <button>ADD RECORDS TO MY COLLECTION</button>
      </Link>
    </div>
  );
};

export default Homepage;
