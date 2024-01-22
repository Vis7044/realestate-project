import React, { useEffect, useState } from "react";
import classes from "./Header.module.css";
import { FaHamburger } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { NavLink,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [serachTerm, setSearchTerm] = useState('');

  const isActive = () => {
    setShowMenu(!showMenu);
  };

  const navigate= useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', serachTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  },[window.location.search])

  return (
    <div className={`container-fluid`}>
      <div className={`row ${classes.nav}`}>
        <div className={`col-lg-4 col-md-12 ${classes.header}`}>
          <h1 className={classes.Logo}>RealEstate</h1>

          {!showMenu &&
            (currentUser ? (
              <img
                className={`${classes.profileImage} ${classes.active}`}
                src={currentUser.avatar}
                alt="profile"
                onClick={isActive}
              />
            ) : (
              <FaHamburger className={classes.active} onClick={isActive} />
            ))}
          {showMenu &&
            (currentUser ? (
              <img
                className={`${classes.profileImage} ${classes.active}`}
                src={currentUser.avatar}
                alt="profile"
                onClick={isActive}
              />
            ) : (
              <FaWindowClose className={classes.active} onClick={isActive} />
            ))}
        </div>
        <div
          className={`${
            showMenu ? classes.show : classes.hide
          } col-lg-8 col-md-12 d-flex justify-content-lg-around`}
        >
          <form onSubmit={handleSubmit} className={classes.search}>
            <input placeholder="search.." value={serachTerm} onChange={(e => setSearchTerm(e.target.value))}/>
            <button><FaSearch className={classes.searchicon} /></button>
          </form>
          <ul className={classes.menu}>
            {currentUser && (
              <li className={classes.profile}>
                <NavLink to={"/profile"}>profile</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/sign-in">
                {currentUser ? (
                  <NavLink to="/profile">
                    <img
                      className={`${classes.profileImage} ${classes.img_header}`}
                      src={currentUser.avatar}
                      alt="profile"
                    />
                  </NavLink>
                ) : (
                  "sign In"
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

