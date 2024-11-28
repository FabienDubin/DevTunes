import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { Button } from "@/components/ui/button";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="hometext">
        <h1 className="homeh1">Welcome to DevTunes</h1>
        <h2 className="homeh2">Your personal music adventure starts here. </h2>
        <h3>Add your first album to begin!</h3>

        <Link to="/search-album">
          <Button className="startbutton" size="lg">
            ADD ALBUM TO MY COLLECTION
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
