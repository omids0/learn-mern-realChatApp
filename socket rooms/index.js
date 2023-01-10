const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const expressServer = http.createServer(app);
const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log("👽 new user connected");
  socket.join("kitchen-room");
  let sizeOfkitchen = io.sockets.adapter.rooms.get("kitchen-room").size;
  io.sockets
    .in("kitchen-room")
    .emit("cooking", "fried Rice cooking" + sizeOfkitchen);
  io.sockets.in("kitchen-room").emit("boiling", "booling water");

  socket.join("bed-room");
  io.sockets.in("bed-room").emit("sleep", "im sleeping");
  io.sockets.in("bed-room").emit("rest", "im taking rest");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(4000, () => {
  console.log("Server Is Running...");
});
