const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const expressServer = http.createServer(app);
const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log("👽 new user connected");
  socket.on("chat", (msg) => {
    io.emit("chat_send", msg);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(4000, () => {
  console.log("Server Is Running...");
});
