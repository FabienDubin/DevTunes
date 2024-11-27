import React from "react";
import devtuneslogo from "../assets/logo.png";
import { Link } from "react-router-dom";
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
  return (
    <div className="navbar">
      <Link to="/">
        <img src={devtuneslogo} alt="devtunes logo" />
      </Link>
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
        <Link to="/tests">
          <MenubarMenu>
            <MenubarTrigger>Tests</MenubarTrigger>
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
    </div>
  );
};
export default Navbar;
