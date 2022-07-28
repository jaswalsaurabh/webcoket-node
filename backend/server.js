const express = require("express");

const app = express();

const http = require("http");
const server = http.createServer(app);

const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("socket is active to conection");

  socket.on("chat", (payload) => {
    socket.emit("chat", payload);
  });
});

server.listen(3000, () => {
  console.log("server is started at port 3000");
});
