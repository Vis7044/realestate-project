import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function Profile(){
  const {currentUser}=useSelector((state)=>state.user)
console.log(currentUser)
const [changeEmail,setChangeEmail]=useState(currentUser.email)

const [changeUsername,setChangeUsername]=useState(currentUser.username)
const [changePassword,setChangePassword]=useState("")

  return(
    <div className="  p-3 max-w-lg mx-auto ">
    <h1 className="text-3xl font-semibold text-center my-7 text-black">Profile</h1>
    <form className="flex flex-col gap-5">
      <img src={currentUser.avatar} alt="Profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" />

      <input placeholder={currentUser.username} value={currentUser.username} type="text" className="bordr p-3 rounded-lg" id="username" onChange={setChangeUsername} />
      
      <input placeholder={currentUser.email} type="email" value={currentUser.email} className="bordr p-3 rounded-lg" id="email" onClick={setChangeEmail} />

      <input placeholder="password" type="password" className="bordr p-3 rounded-lg" id="password"  />
      <button className="bg-slate-700 text-white roundedl-lg p-3 uppercase hover:opacity-95 disabled: opacity-80">Update</button>
  
    </form>
    <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer"> Delete Account</span>

      <span className="text-red-700 cursor-pointer"> Sign Out</span>
    </div>
    </div>
  )

 
}