import React, { useState } from "react";
import classes from "./Header.module.css";
import { FaHamburger } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
 

  const isActive = () => {
    setShowMenu(!showMenu);
    console.log("hlelo");
  };

  return (
    <div className={`container-fluid`}>
      <div className={`row ${classes.nav}`}>
        <div className={`col-lg-4 col-md-12 ${classes.header}`}>
          <h1>RealEstate</h1>
          {!showMenu && (
            <FaHamburger className={classes.active} onClick={isActive} />
          )}
          {showMenu && (
            <FaWindowClose className={classes.active} onClick={isActive} />
          )}
        </div>
        <div
          className={`${
            showMenu ? classes.show : classes.hide
          } col-lg-8 col-md-12 d-flex justify-content-lg-around`}
        >
          <form className={classes.search}>
            <input placeholder="search.." />
            <FaSearch className={classes.searchicon} />
          </form>
          <ul className={classes.menu}>
            <li>
              <NavLink to="/"  >Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={"hover:text-red-500"}>About</NavLink>
            </li>
            <li>
              <NavLink to="/sign-in" className={"hover:text-red-500"}>SignIn</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
