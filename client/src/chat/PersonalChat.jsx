import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const PersonalChat = () => {
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");

  socket.emit("join_room", 1);

  const handlesubmit = () => {
    socket.emit("send_message", { message, room: 1 });
    console.log("snexpected");
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setReceiveMessage(message);
    });
  }, [socket]);

  return (
    <div className="flex md:flex-row w-full h_screen">
      <div className="bg-gray-500 w-4/12">
        <h1>Personal chat</h1>
      </div>
      <div className="w-8/12 flex flex-col justify-end items-center">
        <div className="">{receiveMessage}</div>
        <div className="sticky flex flex-row w-full">
          <input
            type="text"
            placeholder="Enter chat name"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="w-8/12"
          />
          <div className="">
            <button onClick={handlesubmit}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalChat;
