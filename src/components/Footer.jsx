import React from "react";
import githublogo from "../assets/githubimg.png";
import githublogoDark from "../assets/github-mark-white.png";
import "../App.css";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <div>
      <Link to="https://github.com/FabienDubin/DevTunes">
        <div className="footer ">
          <img
            className="githublogo"
            src={theme === "dark" ? githublogoDark : githublogo}
            alt="github logo"
          />
          <p>Find our work in github!</p>
        </div>
      </Link>
    </div>
  );
};

export default Footer;
