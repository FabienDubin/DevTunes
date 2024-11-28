import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="homepage">
      <h2 className="noth2">404 Not Found Page</h2>
      <p className="texttry">Try again</p>

      <Link to="/search-album">
        <Button className="startbuttonnot" size="lg">
          SEARCH FOR ANOTHER ALBUM!
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
