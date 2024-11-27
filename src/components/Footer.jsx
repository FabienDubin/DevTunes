import React from "react";
import githublogo from "../assets/githubimg.png";
import "../App.css";

const Footer = () => {
  return (
    <div className="footer">
      <img className="githublogo" src={githublogo} alt="github logo" />

      <p>Find our work in github!</p>
    </div>
  );
};

export default Footer;
