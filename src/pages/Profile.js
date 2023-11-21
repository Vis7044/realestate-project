import React from 'react'

import classes from './Profile.module.css'
import profilepic from '../Assets/profile.jpg'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'

const Profile = () => {
  return (
   <div className={classes.container}>
   
    <div className={classes['profile-box']}>
      <img src={profilepic} className={classes['profile-pic']} />
      {/* home link need to be changed */}
      <a href='./Home' className={classes['home-pic']}><FaHome></FaHome></a> 
      <h3 className={classes.name}>Jhonny Bhaiya</h3>
      <p className={classes.des}> International khiladi</p>
      <div className={classes['profile-lower']}>
      <a href='https://www.facebook.com/JoSinss'><FaFacebook></FaFacebook></a>
      <a href='https://www.instagram.com/jhony_.sins._/'><FaInstagram></FaInstagram></a>
      </div>
    </div>
   </div>
  )
}

export default Profile