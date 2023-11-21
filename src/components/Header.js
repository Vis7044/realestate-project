import React, { useState } from "react";
import classes from "./Header.module.css";
import { FaHamburger } from "react-icons/fa";
import { FaWindowClose} from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

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
          {!showMenu && <FaHamburger className={classes.active} onClick={isActive} />}
          {showMenu && <FaWindowClose className={classes.active} onClick={isActive} />}
        </div>
        <div
          className={`${
            showMenu ? classes.show : classes.hide
          } col-lg-8 col-md-12 d-flex justify-content-lg-around`}
        >
          <form className={classes.search}>
            <input placeholder="search.." />
            <FaSearch className={classes.searchicon}/>
          </form>
          <div className={classes.menu}>
            <a>Home</a>
            <a>About</a>
            <a>Signin</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
