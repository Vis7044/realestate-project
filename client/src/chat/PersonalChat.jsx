import React from 'react'
import io from "socket.io-client"


const socket = io("http://localhost:5000");

const PersonalChat = () => {
  return (
    <div>personalChat</div>
  )
}

export default PersonalChat