import React, { useEffect, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const userId = nanoid(4);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userId });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  // console.log("chat ",chat);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
        {chat.map((payload, index) => (
          <p style={{ color: "white" }} key={index}>
            {payload?.message}
          </p>
        ))}
        <form onSubmit={sendChat}>
          <input
            type={"text"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type={"submit"}>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
