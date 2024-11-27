import React from "react";
import githublogo from "../assets/githubimg.png";
import "../App.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Link to="https://github.com/FabienDubin/DevTunes">
      <div className="footer">
        <img className="githublogo" src={githublogo} alt="github logo" />
        <p>Find our work in github!</p>
      </div>
    </Link>
  );
};

export default Footer;
