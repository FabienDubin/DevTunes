import React from "react";
import devtuneslogo from "../assets/logo.png";
import devtuneslogodark from "../assets/LogoDark.png";

import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "./ThemeProvider";

//ShadCN
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
const Navbar = ({ handleNavUserChange }) => {
  const { theme } = useTheme();

  return (
    <div className="navbar">
      <Link to="/">
        <img
          src={theme === "dark" ? devtuneslogodark : devtuneslogo}
          alt="devtunes logo"
        />
      </Link>
      <div className="menubar">
        <Menubar>
          <Link to="/my-albums">
            <MenubarMenu>
              <MenubarTrigger>My Collection</MenubarTrigger>
            </MenubarMenu>
          </Link>
          <Link to="search-album">
            <MenubarMenu>
              <MenubarTrigger>Search</MenubarTrigger>
            </MenubarMenu>
          </Link>
          <Link>
            <MenubarMenu>
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent>
                Choose your profile
                <MenubarItem onClick={handleNavUserChange}>
                  Bruno <MenubarShortcut>⌘B</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={handleNavUserChange}>
                  Emilia <MenubarShortcut>⌘E</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={handleNavUserChange}>
                  Fab <MenubarShortcut>⌘F</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Link>
        </Menubar>
        <div className="theme-prov">
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
