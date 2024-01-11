import React from "react";

import classes from "./Profile.module.css";
import profilepic from "../Assets/profile.jpg";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Profile = () => {
  return (
    <div className={classes["container-area"]}>
      <div className={classes["profile-box"]}>
        <div className={classes["img-area"]}>
          <img src={profilepic} />
        </div>
        <div className={classes["text-area"]}>
          <p className={classes["name"]}>Jhonny Bhaiya</p>
          <p className={classes["job"]}>Aurto ka masiha</p>
          <p>Age:40 yrs</p>
          <p>Girl-Friend: Vishal ki Maugi</p>
        </div>
        <div className={classes["button-area"]}>
          <button className={classes["follow-button"]}>Log Out</button>
        </div>
        <div className={classes["media-button"]}>
          <a className={classes["link-area"]}>
            <FaFacebook></FaFacebook>
          </a>
          <a id="one" className={classes["link-area"]}>
            <FaInstagram></FaInstagram>
          </a>
          <a className={classes["link-area"]}>
            <FaTwitter></FaTwitter>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
